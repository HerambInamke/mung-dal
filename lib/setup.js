const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

async function setupProject(projectName) {
  // If no project name provided, ask for it
  if (!projectName) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        default: 'my-mern-app',
        validate: (input) => {
          if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
          return 'Project name may only include letters, numbers, underscores and hashes.';
        }
      }
    ]);
    projectName = answers.projectName;
  }

  const targetPath = path.join(process.cwd(), projectName);

  // Check if directory already exists
  if (fs.existsSync(targetPath)) {
    console.error(chalk.red(`Directory ${projectName} already exists!`));
    process.exit(1);
  }

  console.log(chalk.cyan(`\n🚀 Creating your MERN project: ${projectName}\n`));

  // Create project directory
  fs.mkdirSync(targetPath);

  // Copy server template
  const spinner = ora('Setting up server structure...').start();
  const templatePath = path.join(__dirname, '../templates/server');
  const serverPath = path.join(targetPath, 'server');
  
  try {
    await fs.copy(templatePath, serverPath);
    
    // Create empty directories that git doesn't track
    const logsDir = path.join(serverPath, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    spinner.succeed('Server structure created!');
  } catch (error) {
    spinner.fail('Failed to create server structure');
    console.error(error);
    process.exit(1);
  }

  // Install server dependencies
  const installSpinner = ora('Installing server dependencies (this may take a while)...').start();
  try {
    execSync('npm install', { 
      cwd: serverPath, 
      stdio: 'pipe' 
    });
    installSpinner.succeed('Server dependencies installed!');
  } catch (error) {
    installSpinner.fail('Failed to install dependencies');
    console.error(chalk.yellow('\nYou can install them manually by running:'));
    console.error(chalk.white(`  cd ${projectName}/server && npm install\n`));
  }

  // Success message
  console.log(chalk.green('\n✅ Project created successfully!\n'));
  console.log(chalk.cyan('📋 Next steps:\n'));
  console.log(chalk.white(`  1. cd ${projectName}/server`));
  console.log(chalk.white(`  2. cp .env.example .env`));
  console.log(chalk.white(`  3. Update .env with your MongoDB URI and secrets`));
  console.log(chalk.white(`  4. npm run dev`));
  console.log(chalk.white(`\n  Your server will be running on http://localhost:5000\n`));
  console.log(chalk.yellow('💡 Tip: Make sure MongoDB is running before starting the server!\n'));
}

module.exports = { setupProject };