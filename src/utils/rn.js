import { join,parse } from "path";
import { stat, rename } from "fs/promises";
import { InputError, OperationError} from '../errors.js';
import { getGlobalFromParent, checkArgs } from '../util.js';

getGlobalFromParent(process, 'workDir')
.then( async dir =>  {
    const files =  await checkArgs(process.argv[2],process.argv[3]);
    const oldPath = join(dir, files[0]);
    const newPath = join(dir, files[1]);
    let fl = await stat(oldPath).then();
    if (!fl.isFile()) throw new OperationError();
    return { oldPath, newPath }
}).then(({oldPath, newPath }) => rename(oldPath, newPath))
.then ( (res, err) => process.exit(err || 0) )  
.catch( err => process.stderr.write(err.message)) ;