import { handleInvalidInput } from '../utils/common.js';
import { setColor } from '../utils/set-color.js';

export const exit = () => {
  process.exit();
}

export const OS_ARGS = ['--EOL', '--cpus', '--homedir', '--username', '--architecture' ]

export const os = (state, ...args) => {
  if (args.length === 0 || args[0] === '' || !OS_ARGS.includes(args[0])) {
    handleInvalidInput();
    return;
  }
  const arg = args[0];

  switch (arg) {
    case '--EOL':
      console.log(`default system End-Of-Line: ${setColor(JSON.stringify(state.eol), 'blue')}`);
      break;
    case '--cpus':
      const cpus = state.osState.cpus.map(cpu => {
        return {
          model: cpu.model,
          speed: `${cpu.speed / 1000} GHz`,
        }
      })
      console.log(`Overall amount of CPUS: ${setColor(cpus.length, 'blue')}`);
      console.table(cpus);
      break;
    case '--homedir':
      console.log(`Home directory: ${setColor(state.osState.homedir, 'blue')}`);
      break;
    case '--username':
      console.log(`Current system username: ${setColor(state.osState.username, 'blue')}`);
      break;
    case '--architecture':
      console.log(`CPU architecture: ${setColor(state.osState.architecture, 'blue')}`);
      break;
  }
}

export const help = () => {
  console.log(setColor('Available commands:', 'magenta'));
  console.log(setColor('----------------------------------------', 'magenta'));
  console.log(`${setColor('up', 'green')} - go upper from current directory`);
  console.log(`${setColor('cd', 'green')} - change directory (requires a path passed after the command)`);
  console.log(`${setColor('ls', 'green')} - list current directory contents`);
  console.log(`${setColor('cat', 'green')} - display the contents of a file (requires a path to file passed after the command)`);
  console.log(`${setColor('mkdir', 'green')} - create a new directory in a current directory (requres new directory name passed after the command)`);
  console.log(`${setColor('add', 'green')} - create a new file in a current directory (requres new file name passed after the command)`);
  console.log(`${setColor('rn', 'green')} - rename a file (requires a path to file and a new file name passed after the command)`);
  console.log(`${setColor('cp', 'green')} - copy a file (requires a path to file and a path to new directory passed after the command)`);
  console.log(`${setColor('mv', 'green')} - move a file (requires a path to file and a path to new directory passed after the command)`);
  console.log(`${setColor('rm', 'green')} - remove a file (requires a path to file passed after the command)`);
  console.log(`${setColor('os', 'green')} - show os info and requires one of the following arguments:`);
  console.log(`\t${setColor('--EOL', 'blue')} - show the operating system end-of-line characters`);
  console.log(`\t${setColor('--cpus', 'blue')} - show the host machine CPUs info`);
  console.log(`\t${setColor('--homedir', 'blue')} - show home directory path`);
  console.log(`\t${setColor('--username', 'blue')} - show current system username`);
  console.log(`\t${setColor('--architecture', 'blue')} - show CPU architecture`);
  console.log(`${setColor('hash', 'green')} - calculate hash of a file (requires a path to file passed after the command)`);
  console.log(`${setColor('compress', 'green')} - compress a file (requires a path to file and a path to destination directory passed after the command)`);
  console.log(`${setColor('decompress', 'green')} - decompress a file (requires a path to file and a path to destination directory passed after the command)`);
  console.log(`${setColor('help', 'green')} - show help for a list of commands`);
  console.log(`${setColor('.exit', 'green')} - exit the program`);
  console.log(`${setColor('paths and file/folder name arguments', 'magenta')} might be passed directly (e.g. path/to/file) or with quotes (e.g. 'path/to/file' or "path/to/file")`);
  console.log(setColor('----------------------------------------', 'magenta'));
}
