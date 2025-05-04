import { createReadStream, createWriteStream, constants } from 'node:fs';
import {
  handleInvalidInput,
  handleOperationError,
  prepareArgs,
  getResolvedPath,
  handleSuccessfulCompression
} from '../utils/index.js';
import { access } from 'node:fs/promises';
import { pipeline } from 'node:stream';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { EOL } from 'node:os';

const prepare = async (state, ...args) => {
  const prepared = prepareArgs(args);
  if (prepared.length !== 2 || !prepared[0] || !prepared[1]) {
    handleInvalidInput();
    return { sourcePath: null, rs: null, ws: null };
  }

  try {
    await access(prepared[0], constants.F_OK);

    const sourcePath = getResolvedPath(state, prepared[0]);
    const destinationPath = getResolvedPath(state, prepared[1]);
  
    const rs = createReadStream(sourcePath, { flags: 'r' });
    const ws = createWriteStream(destinationPath);
    return { sourcePath, rs, ws };
  } catch (err) {
    handleOperationError();
    return { sourcePath: null, rs: null, ws: null };
  }
}

const handleOperation = async (sourcePath, rs, ws, type) => {
  const result = type === 'compress' ? 'compressed' : 'decompressed';
  const method = type === 'compress' ? createBrotliCompress : createBrotliDecompress;
  try {
    await new Promise((resolve, reject) => {
      pipeline(rs, method(), ws, (err) => {
        if (err) {
          reject();
        }
        handleSuccessfulCompression(sourcePath, result);
        process.stdout.write(EOL);
        resolve();
      });
    });
  } catch (err) {
    handleOperationError();
    return;
  }
}
  

export const compress = async (state, ...args) => {
  const { sourcePath, rs, ws } = await prepare(state, ...args);
  if (!sourcePath) return;
  await handleOperation(sourcePath, rs, ws, 'compress');
}

export const decompress = async (state, ...args) => {
  const { sourcePath, rs, ws } = await prepare(state, ...args);
  if (!sourcePath) return;
  await handleOperation(sourcePath, rs, ws, 'decompress');
}
