import './module.js';

import './scss/index.scss'

console.log("Work!");

console.log('asdasd');

async function start() {
    return await Promise.resolve('async working');
    
}

start().then(console.log);
