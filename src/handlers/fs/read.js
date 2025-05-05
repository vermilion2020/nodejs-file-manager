import { readdir } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import {
  handleOperationError,
  handleInvalidInput,
  prepareArgs,
  getResolvedPath,
} from '../../utils/index.js';
import { stat } from 'node:fs/promises';

export const ls = async (state, ...args) => {
  const prepared = prepareArgs(args);
  if (prepared[0]) {
    handleInvalidInput();
    return;
  }

  const items = await readdir(state.currentPath, { withFileTypes: true });

  const table = items.map((item) => ({
    name: item.name,
    type: item.isDirectory() ? 'directory' : 'file',
  })).sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
  
  console.table(table);
};

export const cat = async (state, ...args) => {
  const prepared = prepareArgs(args);
  if (prepared.length !== 1 || !prepared[0]) {
    handleInvalidInput();
    return;
  }

  const filePath = getResolvedPath(state, prepared[0]);

  try {
    const stats = await stat(filePath);

    if (!stats.isFile()) {
      handleOperationError();
      return;
    }
    const rs = createReadStream(filePath, 'utf-8');

    return await new Promise((resolve, reject) => {
      rs.pipe(process.stdout);
      
      rs.on('close', () => {
        process.stdout.write(state.eol);
        resolve();
      });

      rs.on('error', () => {
        reject();
      });
    });
  } catch (error) {
    handleOperationError();
    return;
  }
}
