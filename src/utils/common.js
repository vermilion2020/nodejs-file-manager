import { setColor } from './set-color.js';

const OPERATION_ERROR = 'Operation failed';

const INVALID_INPUT = 'Invalid input';

export const handleInvalidInput = () => {
  console.log(setColor(INVALID_INPUT, 'red'));
}

export const handleOperationError = () => {
  console.log(setColor(OPERATION_ERROR, 'red'));
}

export const handleSuccessfulCreation = (type, name) => {
  console.log(setColor(`A new ${type} '${name}' has been successfully created!`, 'green'));
}

export const handleSuccessfulDeletion = (name) => {
  console.log(setColor(`The file '${name}' has been successfully deleted!`, 'green'));
}

export const handleSuccessfulRenaming = (oldName, newName) => {
  console.log(setColor(`The file '${oldName}' has been successfully renamed to '${newName}'!`, 'green'));
}

export const handleSuccessfulCopying = (result = 'copied', oldName, newDir) => {
  console.log(setColor(`The file '${oldName}' has been successfully ${result} to '${newDir}'!`, 'green'));
}

export const handleSuccessfulCompression = (oldName, type) => {
  console.log(setColor(`The file '${oldName}' has been successfully ${type}!`, 'green'));
}

export const checkName = (fileName) => {
  const forbiddenSymbols = ['/', '\\', ':', '*', '?', '"', '<', '>', '|'];
  return !(!fileName || forbiddenSymbols.some(symbol => fileName.includes(symbol)) || fileName.endsWith('.'))
}
