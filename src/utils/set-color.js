export const setColor = (text, colorName) => {

  const colors = {
    red: '31',
    green: '32',
    yellow: '33',
    blue: '34',
    magenta: '35',
    cyan: '36',  
  }

  if (!colors[colorName]) {
    return text;
  }

  return `\x1b[${colors[colorName]}m${text}\x1b[0m`;
}



