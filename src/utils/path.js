import { isAbsolute, resolve } from 'node:path';

const stripQuotes = (path) => {
  return path.slice(1, -1).trim();
}

export const prepareArgs = (args) => {
  const strArgs = args.join(' ').trim();
  // extract quoted arguments
  const clearArgs = Array.from(strArgs.matchAll(/(\'([^\'])+\')|(\"([^\"])+\")/g), (m) => m[0]);
  // return args splited by whitespace if there are no quoted arguments
  if (!clearArgs.length) return [...strArgs.split(' ')];
  // handle single quoted argument
  if (clearArgs.length === 1) {
    const arg = stripQuotes(clearArgs[0]);
    const rest = strArgs.slice(clearArgs[0].length).trim();
    // return single argument if rest is empty
    if (rest === '') {
      return [arg];
    } else if (strArgs.startsWith(arg)) {
      // return argument and rest args of the string splited by whitespace
      return [arg, ...rest.split(' ')];
    } else {
      // return rest args of the string splited by whitespace and argument
      return [...rest.split(' '), arg];
    }
  }
  // handle two quoted arguments
  if (clearArgs.length === 2) {
    const rest = strArgs.replace(clearArgs[0], '').replace(clearArgs[1], '').trim();
    // return quoted arguments if rest is empty, otherwise it's invalid input
    if (rest === '') {
      return clearArgs.map(stripQuotes);
    }
  }
  // return empty if there are more than two quoted arguments, it's invalid input
  return []; 
}

export const getResolvedPath = (state, path) => {
  const start =
    state.osState.platform === 'win32' && path.includes(':') &&
    !isAbsolute(path) ? '/' : state.currentPath;
  const target = resolve(start, path);
  return target;
}
