import { dirname, join,resolve as pResolve, parse } from "path";
import { fileURLToPath } from 'url';
import { readdir } from "fs/promises";
import { InputError, OperationError } from "./errors.js"


export function commands(command) {
    if(command === '.exit') process.exit(0);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const dir = join(__dirname,'utils');
    let commands;
    return new Promise (async (resolve, reject) => {
        if (!commands) {
            commands = new Map();
            await readdir(dir, { withFileTypes: true })
                .then((files) => files.forEach(file => {
                    if (!file.isDirectory()){
                        commands.set(parse(file.name).name, pResolve(dir,file.name))
                    }
                    }))
                .catch(err => reject(new OperationError))
                }
        if (!commands || !commands.has(command)) reject(new InputError);
        resolve(commands.get(command))
    })
}
