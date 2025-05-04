import { createReadStream, createWriteStream, constants } from 'node:fs';
import { basename, join } from 'node:path';
import { handleOperationError, handleSuccessfulCopying } from '../../utils/common.js';
import { rm, access } from 'node:fs/promises';
import {
  handleInvalidInput,
  getResolvedPath,
  prepareArgs,
} from '../../utils/index.js';

const copy = async (state, source, destination, type) => {
  const filePath = getResolvedPath(state, source);
  const newDir = getResolvedPath(state, destination);
  const newPath = join(newDir, basename(filePath));
  try {
    await access(filePath, constants.F_OK);
    return await new Promise((resolve, reject) => {
      const rs = createReadStream(filePath, { flags: 'r' });
      const ws = createWriteStream(newPath, { flags: 'wx' });

      rs.pipe(ws);

      rs.on('error', () => {
        reject({ filePath: null });
      });

      ws.on('error', () => {
        reject({ filePath: null });
      });


      ws.on('finish', () => {
        if (type === 'copy') {
          handleSuccessfulCopying('copied', basename(filePath), newDir);
          process.stdout.write(state.eol);
        }
        resolve({ filePath, newDir });
      });
    });
  }
  catch (err) {
    handleOperationError();
    return { filePath: null };
  }
}

export const cp = async (state, ...args) => {
  const prepared = prepareArgs(args);
  if (prepared.length !== 2) {
    handleInvalidInput();
    return;
  }

  await copy(state, prepared[0], prepared[1], 'copy');
}

export const mv = async (state, ...args) => {
  const prepared = prepareArgs(args);
  if (prepared.length !== 2) {
    handleInvalidInput();
    return;
  }

  const { filePath, newDir } = await copy(state, prepared[0], prepared[1], 'move');
  if (!filePath) return;

  try {
    await rm(filePath);
    handleSuccessfulCopying('moved', basename(filePath), newDir);
    process.stdout.write(state.eol);
  } catch (err) {
    handleOperationError();
  }
}

