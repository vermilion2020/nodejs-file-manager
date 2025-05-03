import { createReadStream, createWriteStream } from 'node:fs';
import { basename, join } from 'node:path';
import { handleOperationError, handleSuccessfulCopying } from '../../utils/common.js';
import { rm } from 'node:fs/promises';
import {
  handleInvalidInput,
  getResolvedPath,
  prepareArgs,
} from '../../utils/index.js';

const copy = async (state, source, destination, type) => {
  const filePath = getResolvedPath(state, source);
  const newDir = getResolvedPath(state, destination);
  const newPath = join(newDir, basename(filePath));

  const rs = createReadStream(filePath);
  const ws = createWriteStream(newPath);

  rs.pipe(ws);

  rs.on('error', () => {
    handleOperationError();
  });

  ws.on('error', () => {
    handleOperationError();
  });

  if (type === 'copy') {
    ws.on('finish', () => {
      handleSuccessfulCopying('copied', basename(filePath), newDir);
      process.stdout.write(state.eol);
    });
  }

  return { filePath, newDir };
}

export const cp = async (state, ...args) => {
  const prepared = prepareArgs(args);
  if (prepared.length !== 2) {
    handleInvalidInput();
    return;
  }

  copy(state, prepared[0], prepared[1], 'copy');
}

export const mv = async (state, ...args) => {
  const prepared = prepareArgs(args);
  if (prepared.length !== 2) {
    handleInvalidInput();
    return;
  }

  const { filePath, newDir } = await copy(state, prepared[0], prepared[1], 'move');

  try {
    await rm(filePath);
    handleSuccessfulCopying('moved', basename(filePath), newDir);
    process.stdout.write(state.eol);
  } catch (err) {
    handleOperationError();
  }
}

