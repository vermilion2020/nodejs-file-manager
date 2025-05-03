import { help, exit, os } from './handlers/technical.js';

export const COMMANDS = {
  'os' : os,
  'help' : help,
  '.exit' : exit,
};