import {join, parse } from "path";
import { stderr } from "process";
import { getGlobalFromParent } from '../util.js';


getGlobalFromParent(process, 'workDir').then( dir => {
    if (parse(dir).root !== dir)  dir = join(dir, '..');
    process.send({dir});
}).catch(err => stderr.write(err.message));

