import {
  handleOperationError,
  handleSuccessfulCreation,
  handleInvalidInput,
  getResolvedPath,
  prepareArgs,
  checkName
} from '../../utils/index.js';
import { mkdir, writeFile } from 'node:fs/promises';

export const add = async (state, ...args) => {
  const prepared = prepareArgs(args);
  if (args.length === 0 || prepared.length !== 1 || !checkName(prepared[0])) {
    handleInvalidInput();
    return;
  }

  const filePath = getResolvedPath(state, prepared[0]);

  try {
    await writeFile(filePath, '', { flag: 'wx' });
    handleSuccessfulCreation('file', args[0]);
    process.stdout.write(state.eol);
    return;
  } catch (err) {
    handleOperationError();
    return;
  }
}

export const makeDir = async (state, ...args) => {
  const prepared = prepareArgs(args);
  if (args.length === 0 || prepared.length !== 1 || !checkName(prepared[0])) {
    handleInvalidInput();
    return;
  }

  const folderPath = getResolvedPath(state, prepared[0]);

  try {
    await mkdir(folderPath);
    handleSuccessfulCreation('directory', prepared[0]);
    process.stdout.write(state.eol);
    return;
  } catch (err) {
    handleOperationError();
    return;
  }
}
