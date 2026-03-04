import { Command } from 'commander';
import prompts from 'prompts';
import Handlebars from 'handlebars';

export const initCommand = new Command('init')
  .description('Initialize a new PSL project scaffold')
  .option('-d, --dummy-flag', 'A dummy flag for testing')
  .action(async (options) => {
    console.log('🚀 Initializing PSL Scaffold...');

    if (options.dummyFlag) {
      console.log('   Dummy flag detected!');
    }

    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'What is the name of your new project?',
      initial: 'my-psl-project',
    });

    if (!response.projectName) {
      console.log('❌ Project initialization cancelled.');
      return;
    }

    console.log(`\n📦 Scaffolding project: ${response.projectName}`);

    // Dummy Handlebars execution
    const dummyTemplate = 'Project Name: {{ projectName }}\nAuthor: {{ author }}';
    const template = Handlebars.compile(dummyTemplate);
    const result = template({
      projectName: response.projectName,
      author: 'Purrfect Soft',
    });

    console.log('📄 Generated Dummy Template:');
    console.log('---------------------------');
    console.log(result);
    console.log('---------------------------');
    console.log('✅ Initialization complete!');
  });
