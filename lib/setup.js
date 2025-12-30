const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

async function setupProject(projectName) {
  // Prompt for project name if not provided
  if (!projectName) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        default: 'my-mern-app',
        validate: (input) => {
          if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
          return 'Project name may only include letters, numbers, underscores and dashes.';
        }
      }
    ]);
    projectName = answers.projectName;
  }

  const targetPath = path.join(process.cwd(), projectName);

  // Prevent overwriting existing directory
  if (fs.existsSync(targetPath)) {
    console.error(chalk.red(`Directory "${projectName}" already exists.`));
    process.exit(1);
  }

  console.log(chalk.cyan(`\nCreating MERN project: ${projectName}\n`));

  // Create project directory
  fs.mkdirSync(targetPath, { recursive: true });

  // Copy entire template directly into project root (Option A)
  const spinner = ora('Setting up project structure...').start();
  const templatePath = path.join(__dirname, '../templates');

  try {
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template directory not found: ${templatePath}`);
    }

    await fs.copy(templatePath, targetPath, {
      overwrite: false,
      errorOnExist: true
    });

    // Ensure empty directories exist (git-safe)
    const logsDir = path.join(targetPath, 'server', 'logs');
    fs.ensureDirSync(logsDir);

    spinner.succeed('Project structure created.');
  } catch (error) {
    spinner.fail('Failed to create project structure.');
    console.error(chalk.red(error.message));
    process.exit(1);
  }

  // Install server dependencies
  const installSpinner = ora('Installing server dependencies...').start();
  const serverPath = path.join(targetPath, 'server');

  try {
    execSync('npm install', {
      cwd: serverPath,
      stdio: 'inherit'
    });
    installSpinner.succeed('Server dependencies installed.');
  } catch (error) {
    installSpinner.fail('Dependency installation failed.');
    console.log(chalk.yellow('\nYou can install them manually:'));
    console.log(chalk.white(`  cd ${projectName}/server && npm install\n`));
  }

  // Final instructions
  console.log(chalk.green('\nProject created successfully.\n'));
  console.log(chalk.cyan('Next steps:\n'));
  console.log(chalk.white(`  cd ${projectName}/server`));
  console.log(chalk.white(`  cp .env.example .env`));
  console.log(chalk.white(`  Update .env with your MongoDB URI and secrets`));
  console.log(chalk.white(`  npm run dev\n`));
  console.log(chalk.yellow('Ensure MongoDB is running before starting the server.\n'));
}

module.exports = { setupProject };
