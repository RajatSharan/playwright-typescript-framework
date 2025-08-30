export class customLogger {
    private timestamp(): string {
        return new Date().toISOString();
    }

    info(message: string, ...args: any[]) {
        console.log(`\x1b[36m[${this.timestamp()}] INFO: ${message}\x1b[0m`, ...args);   
    }

    error(message: string, ...args: any[]) {
        console.error(`\x1b[31m[${this.timestamp()}] ERROR: ${message}\x1b[0m`, ...args); 
    }

    warn(message: string, ...args: any[]) {
        console.warn(`\x1b[33m[${this.timestamp()}] WARN: ${message}\x1b[0m`, ...args); 
    }
}
