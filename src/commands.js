import { cd, up } from './handlers/navigation.js';
import { help, exit, os } from './handlers/technical.js';
import { hash } from './handlers/hash.js';
import { cat, add, makeDir, remove, ls, rn, mv, cp } from './handlers/fs/index.js';
import { compress, decompress } from './handlers/compress.js';

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
  'hash' : hash,
  'compress' : compress,
  'decompress' : decompress,
  'help' : help,
  '.exit' : exit,
};