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

let rl = readline.createInterface({input,output});
const getPrompt = (dir) => {
    global.workDir = dir;
    rl.setPrompt('FM: ' + global.workDir + '> ');
    rl.prompt();
};

getPrompt(homedir());

try {
rl.on('line', (line) => {
    controller(...line.split(' ').filter(el => el !== '')).then(( path => {
        console.log();
        getPrompt(path || global.workDir)
    } ));
    });
} catch (err) {
    console.log(err.message);
}


// process.stderr.on('data' , err => console.log('-----------------' + err));
process.on('exit',  () => output.write(`\nThank you for using File Manager, ${global.userName}!\n`)) ;

//   process.stderr.on('error', (err) => console.log(err.code));

