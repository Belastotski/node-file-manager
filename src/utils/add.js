import { join,parse } from "path";
import { open } from "fs/promises";
import { InputError, OperationError} from '../errors.js';
import { getGlobalFromParent, checkArgs } from '../util.js';

getGlobalFromParent(process, 'workDir')
.then( async dir =>  {
    const file =  await checkArgs(process.argv[2]);
    return [dir, ...file];
}).then( files => {
    if (parse(files[1]).base !== files[1]) throw new OperationError();
    console.log('q ',...files); 
    return join(...files);
}).then(file => open(file, 'ax'))
    .then(fl => fl.close())
    .catch(err => process.stderr.write(err.message))
