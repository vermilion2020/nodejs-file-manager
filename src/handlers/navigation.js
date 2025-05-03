import { stat } from 'node:fs/promises';
import {
  handleOperationError,
  handleInvalidInput,
  getResolvedPath,
  prepareArgs
} from '../utils/index.js';

export const cd = async (state, ...args) => {
  const prepared = prepareArgs(args);

  if (args.length === 0 || prepared.length !== 1) {
    handleInvalidInput();
    return;
  }

  const target = getResolvedPath(state, prepared[0]);

  try {
    const stats = await stat(target);

    if (!stats.isDirectory()) {
      handleOperationError();
      return;
    }
    state.currentPath = target;
  } catch (error) {
    handleOperationError();
    return;
  }
}

export const up = (state) => {
  return cd(state, '..');
}
