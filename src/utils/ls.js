import { readdir } from "fs";
import { stderr, stdout } from "process";
import { getGlobalFromParent, checkArgs } from '../util.js';

getGlobalFromParent(process, 'workDir')
.then( async dir => {
    readdir(dir, (err,files) => {
        if (err) stderr.write(err.name);
        files.forEach(file => stdout.write(file + '\n'));
    })
}).catch (err => {
    stderr.write(err);
})
