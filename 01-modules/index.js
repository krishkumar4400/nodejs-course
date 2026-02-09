const fs = require('node:fs'); // built in module

const contents = fs.readFileSync('notes.txt', 'utf-8');
// console.log(contents);

// fs.writeFileSync('copy.txt', 'hey', 'utf-8');
// fs.appendFileSync('copy.txt', '\n\nhey', 'utf-8');

// fs.mkdirSync('games/xyz/a', { recursive: true });
// fs.rmdirSync('games');

fs.unlinkSync('copy.txt');

/**
 * when we do node index.js 
 * 
 *      node takes source code from source file(index.js) or index file then node reads its content 
 * node has internally a wrapper function node wrap up or inject entire source code inside this function then node js just execute the code by calling that wrapper function
 * means the code is running in the function and function gives extra features like exports, require, module
 * that is the reason we can use require in node js environment 
 * 
 * wrapper function has few parameteres (wrapper function is internally made by node js)
 * 
 * function wrapper(exports, require, module, __filename, __dirname) {
 *  /// source code
 * }
 * 
 * wrapper();
 * 
 * google it - node js wrapper function.
 */

// fs.Stats // we will get the suggestions.
// now the happening is vs code is aware of all the dependencies everything that is available how because @types/node is vaialable in node modues or installed

