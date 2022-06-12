import * as os from "os";
import { getGlobalFromParent, checkArgs } from '../util.js';
import { InputError, OperationError} from '../errors.js';


const args = {
// Get EOL (default system End-Of-Line)
EOL: () => JSON.stringify(os.EOL),
// Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
cpus: () => { 
        let str = `Amount: ${os.cpus().length + os.EOL}`;
        str += os.cpus().reduce((acc, cpu, i) => {
        return acc += `${i + 1}. model: ${cpu.model} speed: ${cpu.speed/1000}GHz ${os.EOL}`
        }, '');
        
        return str;
            } ,
// Get home directory:
homedir: () => os.homedir(),
// Get current system user name (Do not confuse with the username that is set when the application starts)
username: async () => { 
    return await getGlobalFromParent(process, 'userName');
    
},
// Get CPU architecture for which Node.js binary has compiled
architecture: () => os.arch(),
}


checkArgs(process.argv[2]).then( async arg => { 
    const command = arg[0].replace(/^--/,'');
    if(args[command]) {
        const res = await args[command]() + os.EOL;
        process.stdout.write(res);
    }
    else throw new InputError();
}).catch( err => process.stderr.write( err.message));


