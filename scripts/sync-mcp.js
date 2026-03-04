const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { parseEnv, substitute } = require("./mcp-utils");

const PROJECT_MCP_PATH = path.join(process.cwd(), "mcp.json");
const VSCODE_MCP_PATH = path.join(process.cwd(), ".vscode/mcp.json");
const GLOBAL_MCP_PATH = path.join(
    os.homedir(),
    ".gemini/antigravity/mcp_config.json",
);
const LOCAL_MCP_PATH = path.join(process.cwd(), "mcp.local.json");

function ensureDirectoryExists(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

function syncMcp() {
    console.log("🔄 Syncing project MCP config...");

    // 1. Read Project Config
    if (!fs.existsSync(PROJECT_MCP_PATH)) {
        console.error("❌ Error: mcp.json not found in project root.");
        process.exit(1);
    }

    let projectConfig;
    try {
        projectConfig = JSON.parse(fs.readFileSync(PROJECT_MCP_PATH, "utf8"));
    } catch (e) {
        console.error(
            "❌ Error: mcp.json contains invalid JSON.",
        );
        if (e instanceof Error) {
            console.error(`   Details: ${e.message}`);
        }
        process.exit(1);
    }

    // Ensure mcpServers exists
    if (!projectConfig.mcpServers) {
        projectConfig.mcpServers = {};
    }

    // 1a. Apply Local Overrides
    if (fs.existsSync(LOCAL_MCP_PATH)) {
        try {
            console.log("   🔸 Detected mcp.local.json. Applying overrides...");
            const localConfig = JSON.parse(fs.readFileSync(LOCAL_MCP_PATH, "utf8"));
            if (localConfig.mcpServers) {
                for (const [key, value] of Object.entries(localConfig.mcpServers)) {
                    if (projectConfig.mcpServers[key]) {
                        // Merge shallowly for now (flags like disabled, env, etc)
                        projectConfig.mcpServers[key] = { ...projectConfig.mcpServers[key], ...value };
                    } else {
                        // Strict mode: Ignore local-only servers to prevent pollution.
                        console.warn(`      ⚠️  Ignoring local-only server: ${key} (not in mcp.json)`);
                    }
                }
            }
        } catch (e) {
            console.warn(`⚠️  Warning: mcp.local.json exists but is invalid: ${e.message}. Ignoring.`);
        }
    }

    // 2. Read (or Init) Global Config
    let globalConfig = { mcpServers: {} };
    const args = process.argv.slice(2);
    const replaceMode = args.includes("--replace");

    if (fs.existsSync(GLOBAL_MCP_PATH)) {
        try {
            const content = fs.readFileSync(GLOBAL_MCP_PATH, "utf8");
            globalConfig = JSON.parse(content);
            if (!globalConfig || typeof globalConfig !== "object") {
                globalConfig = {};
            }
            if (
                !globalConfig.mcpServers ||
                typeof globalConfig.mcpServers !== "object"
            ) {
                globalConfig.mcpServers = {};
            }
        } catch (e) {
            console.warn(
                "⚠️  Warning: Global config found but invalid/unreadable. Overwriting.",
            );
            globalConfig = { mcpServers: {} };
        }
    } else {
        ensureDirectoryExists(GLOBAL_MCP_PATH);
    }

    if (replaceMode) {
        console.log("🔥 Replace mode: Clearing existing global servers.");
        globalConfig.mcpServers = {};
    }

    // 3. Merge Strategies
    const servers = projectConfig.mcpServers || {};
    let addedCount = 0;

    // Load .env vars once
    const fileEnvVars = parseEnv();

    for (const [key, config] of Object.entries(servers)) {
        // 3a. Check for disabled flag
        if (config.disabled === true) {
            console.log(`   ⛔ Skipping disabled server: ${key}`);
            if (globalConfig.mcpServers && globalConfig.mcpServers[key]) {
                delete globalConfig.mcpServers[key];
                console.log(`      - Removed ${key} from global config (disabled locally).`);
            }
            continue;
        }

        // Basic validation
        if (!config.command && !config.url && !config.serverUrl) {
            console.warn(
                `⚠️  Skipping invalid server '${key}': missing 'command', 'url', or 'serverUrl'`,
            );
            continue;
        }

        const serverConfig = structuredClone(config);

        // 1. Filesystem: Resolve relative paths
        if (key === "filesystem" && Array.isArray(serverConfig.args)) {
            const newArgs = serverConfig.args.map((arg) => {
                if (typeof arg === 'string' && !path.isAbsolute(arg) && !arg.startsWith('-') && !arg.startsWith('@')) {
                    return path.resolve(process.cwd(), arg);
                }
                return arg;
            });
            serverConfig.args = newArgs;
            console.log(`   - Resolved relative paths for 'filesystem' server.`);
        }

        // 2. Generic Variable Substitution
        if (Array.isArray(serverConfig.args)) {
            serverConfig.args = serverConfig.args.map((arg) =>
                substitute(arg, fileEnvVars),
            );
        }

        // 5. Env Block Substitution
        if (serverConfig.env && typeof serverConfig.env === "object") {
            for (const [envKey, envValue] of Object.entries(serverConfig.env)) {
                serverConfig.env[envKey] = substitute(envValue, fileEnvVars);
            }
        }

        // 6. CWD Resolution
        if (
            serverConfig.cwd &&
            typeof serverConfig.cwd === "string" &&
            !path.isAbsolute(serverConfig.cwd)
        ) {
            serverConfig.cwd = path.resolve(process.cwd(), serverConfig.cwd);
        }

        // 3. Postgres: Specific Logic
        if (key === "postgres" && Array.isArray(serverConfig.args)) {
            const hasUrl = serverConfig.args.some(
                (arg) => arg.includes("postgres://") || arg.includes("postgresql://"),
            );

            if (!hasUrl) {
                let dbUrl = process.env.DATABASE_URL || fileEnvVars.DATABASE_URL;
                if (dbUrl) {
                    dbUrl = substitute(dbUrl, fileEnvVars);
                    serverConfig.args.push(dbUrl);
                    console.log(
                        "   - Injected DATABASE_URL from .env not explicitly in args.",
                    );
                }
            }

            // Ensure SSL Mode
            serverConfig.args = serverConfig.args.map((arg) => {
                if (arg.includes("postgres://") || arg.includes("postgresql://")) {
                    if (!arg.includes("?")) {
                        return `${arg}?sslmode=disable`;
                    }
                    if (!arg.includes("sslmode=")) {
                        return `${arg}&sslmode=disable`;
                    }
                }
                return arg;
            });
        }

        // 4. Context7: Special Handling
        if (key === "context7" && Array.isArray(serverConfig.args)) {
            const flagIndex = serverConfig.args.indexOf("--api-key");
            if (flagIndex !== -1 && flagIndex + 1 < serverConfig.args.length) {
                const apiKeyValue = serverConfig.args[flagIndex + 1];
                if (!apiKeyValue || apiKeyValue.trim() === "") {
                    console.log("   - Removing empty --api-key argument (optional).");
                    serverConfig.args.splice(flagIndex, 2);
                }
            }
        }

        globalConfig.mcpServers[key] = serverConfig;
        addedCount++;
        console.log(`   - Synced server: ${key}`);
    }

    // 4a. Write Global Config
    try {
        ensureDirectoryExists(GLOBAL_MCP_PATH);
        fs.writeFileSync(GLOBAL_MCP_PATH, JSON.stringify(globalConfig, null, 2), {
            mode: 0o600,
        });
        console.log(
            `✅ Global: Synced to ${GLOBAL_MCP_PATH}`,
        );
    } catch (e) {
        console.error(`❌ Error: Could not write to global config: ${e.message}`);
        process.exit(1);
    }

    // 4b. Write VS Code Config
    try {
        const vscodeConfig = { servers: {} };
        // Re-create the VS Code config from the processed servers that belong to this project.
        for (const key of Object.keys(projectConfig.mcpServers)) {
            if (Object.prototype.hasOwnProperty.call(globalConfig.mcpServers, key)) {
                vscodeConfig.servers[key] = globalConfig.mcpServers[key];
            }
        }

        ensureDirectoryExists(VSCODE_MCP_PATH);
        fs.writeFileSync(VSCODE_MCP_PATH, JSON.stringify(vscodeConfig, null, 2));
        console.log(`✅ VS Code: Synced to ${VSCODE_MCP_PATH}`);
    } catch (e) {
        console.error(`❌ Error: Could not write to VS Code config: ${e.message}`);
        // Don't exit, just warn
    }
}

syncMcp();
