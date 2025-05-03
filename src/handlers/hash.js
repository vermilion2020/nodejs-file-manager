import {
  handleInvalidInput,
  handleOperationError,
  prepareArgs,
  getResolvedPath,
} from '../utils/index.js';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';

export const hash = async (state, ...args) => {
  const prepared = prepareArgs(args);
  if (prepared.length !== 1 || !prepared[0]) {
    handleInvalidInput();
    return;
  }

  const filePath = getResolvedPath(state, prepared[0]);
  const rs = createReadStream(filePath);
  const hash = createHash('sha256');
  
  try {
    await new Promise((resolve, reject) => {
      rs.pipe(hash);

      rs.on('end', () => {
        process.stdout.write(hash.digest('hex'));
        process.stdout.write(state.eol);
        resolve();
      });

      rs.on('error', () => {
        reject();
      });
    });
  } catch (err) {
    handleOperationError();
    return;
  }
}
