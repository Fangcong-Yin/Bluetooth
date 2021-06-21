import * as ɵngcc0 from '@angular/core';
export interface Logger {
    log(args: string[]): void;
    error(args: string[]): void;
    warn(args: string[]): void;
}
export declare class ConsoleLoggerService implements Logger {
    log(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ConsoleLoggerService, never>;
}
export declare class NoLoggerService implements Logger {
    log(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NoLoggerService, never>;
}

//# sourceMappingURL=logger.service.d.ts.map