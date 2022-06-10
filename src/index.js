import {stdin as input, stdout as output, argv} from 'node:process';
import { homedir } from 'node:os';
import readline from 'node:readline';
import controller from '../src/controller.js';

const userArg = argv.find( el => el.match(/^--username/));
if (!userArg) {
    console.error('No username changed');
    process.exit(1);
};
global.userName = userArg.slice(11);

output.write(`Welcome to the File Manager, ${global.userName}!\n`)
global.workDir = homedir();

let rl = readline.createInterface({input,output});
const getPrompt = () => {
    rl.setPrompt('FM: ' + global.workDir + '> ');
    rl.prompt();
};

getPrompt();

rl.on('line', async (line) => {
    await controller(...line.split(' '))
    .then(console.log)
    .catch(err => { 
        console.error(err.message)
        getPrompt();
    })
    getPrompt();

});

process.on('exit',  () => output.write(`\nThank you for using File Manager, ${global.userName}!\n`)) ;

//   process.stderr.on('error', (err) => console.log(err.code));

