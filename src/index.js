import { State } from './state/state.js';
import { createInterface } from 'node:readline/promises';
import { setColor } from './utils/set-color.js';
import { COMMANDS } from './commands.js';
import { handleInvalidInput } from './utils/common.js';

const fileManager = () => {
  const username = !!process.argv[2] && process.argv[2].match(/--username=(.*)/)?.[1] || 'Username';
  const state = new State(username);

  console.log(setColor(`Welcome to the File Manager, ${state.username}!`, 'magenta'));  

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: setColor('> ', 'yellow'),
  });

  rl.on('line', async (data) => {
    const dataString = data.trim();    
    if (!dataString) {
      rl.prompt();
      return;
    }

    const [command, ...args] = dataString.split(' ');

    if (!Object.keys(COMMANDS).includes(command)) {
      handleInvalidInput();
      rl.prompt();
      return;
    }

    await COMMANDS[command](state, ...args);

    console.log(`${setColor(`You are currently in ${state.currentPath}`, 'cyan')}`);
    rl.prompt();
  });

  rl.prompt();

  process.on('SIGINT', () => {
    process.exit(0);
  });

  process.on('exit', () => {
    rl.close();
    process.stdout.write(state.eol) 
    process.stdout.write(setColor(`Thank you for using File Manager, ${state.username}, goodbye!`, 'magenta'));
    process.stdout.write(state.eol) 
  });
};


fileManager();