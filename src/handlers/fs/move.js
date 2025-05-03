import {
  handleOperationError,
  handleSuccessfulDeletion,
  handleSuccessfulRenaming,
  handleInvalidInput,
  getResolvedPath,
  prepareArgs,
  checkName
} from '../../utils/index.js';
import { rm, rename } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';

export const rn = async (state, ...args) => {
  const prepared = prepareArgs(args);
  if (prepared.length !== 2 || !checkName(prepared[1])) {
    handleInvalidInput();
    return;
  }

  const filePath = getResolvedPath(state, prepared[0]);
  const newPath = join(dirname(filePath), prepared[1]);

  try {
    await rename(filePath, newPath);
    handleSuccessfulRenaming(basename(filePath), prepared[1]);
    process.stdout.write(state.eol);
    return;
  } catch (err) {
    console.log(err);
    handleOperationError();
    return;
  }
}

export const remove = async (state, ...args) => {
  const prepared = prepareArgs(args);

  if (!prepared[0]) {
    handleInvalidInput();
    return;
  }

  const filePath = getResolvedPath(state, prepared[0]);
  try {
    const fileName = basename(filePath);
    await rm(filePath);
    handleSuccessfulDeletion(fileName);
    process.stdout.write(state.eol);
    return;
  } catch (err) {
    handleOperationError();
    return;
  }
}
  