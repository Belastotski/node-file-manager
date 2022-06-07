export class InputError extends Error {
    constructor(){
        super();
        this.message = '\nError: Invalid input\n';
    }
}
export class OperationError extends Error {
    constructor(){
        super();
        this.message = '\nOperation failed\n';
    }
}




