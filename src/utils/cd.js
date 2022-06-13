import { resolve } from "path";
import { stderr } from "process";
import { stat } from "fs";
import { InputError } from '../errors.js';
import { getGlobalFromParent, checkArgs } from '../util.js';


    getGlobalFromParent(process, 'workDir')
        .then( async dir =>  {
            const newDir =  await checkArgs(process.argv[2]);
            return [dir, ...newDir];
        })
        .then(dirs => {
            let dir = resolve(...dirs);
            stat(dir, (err, stat) => {
                if (err || stat.isFile()) { 
                    stderr.write(err?.message || 'Invalid input')
                    process.exit(1); 
                }
                process.send({dir});
                
            });
    }).catch(err => {
        stderr.write(err.message)
    })
    

    


