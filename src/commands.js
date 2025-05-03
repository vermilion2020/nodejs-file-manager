import { cd, up } from './handlers/navigation.js';
import { help, exit, os } from './handlers/technical.js';
import { cat, add, makeDir, remove, ls, rn, mv, cp } from './handlers/fs/index.js';

export const COMMANDS = {
  'up': up,
  'cd' : cd,
  'ls' : ls,
  'cat' : cat,
  'add' : add,
  'mkdir' : makeDir,
  'rn' : rn,
  'cp' : cp,
  'mv' : mv,
  'rm' : remove,
  'os' : os,
  'help' : help,
  '.exit' : exit,
};