import { resolve } from "path";
import { EOL } from "os"
import { createHash } from "crypto";
import { readFile } from "fs/promises";
import { getGlobalFromParent, checkArgs } from '../util.js';

getGlobalFromParent(process, 'workDir')
.then( async dir =>  {
    const file =  await checkArgs(process.argv[2]);
    return resolve(dir, file[0]);
}).then( file => readFile(file))
.then(fileContent => createHash('sha256')
    .update(fileContent)
    .digest('hex') )
.then(hex => process.stdout.write(hex + EOL))
.catch(err => console.log(err.message));
