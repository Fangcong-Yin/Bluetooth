import { ModuleWithProviders, InjectionToken } from '@angular/core';
import { BrowserWebBluetooth } from './platform/browser';
import { ConsoleLoggerService, NoLoggerService } from './logger.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export interface AWBOptions {
    enableTracing?: boolean;
}
export declare function browserWebBluetooth(): BrowserWebBluetooth;
export declare function consoleLoggerServiceConfig(options: AWBOptions): ConsoleLoggerService | NoLoggerService;
export declare function makeMeTokenInjector(): InjectionToken<unknown>;
export declare class WebBluetoothModule {
    static forRoot(options?: AWBOptions): ModuleWithProviders<WebBluetoothModule>;
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<WebBluetoothModule, never, [typeof ɵngcc1.CommonModule], never>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<WebBluetoothModule>;
}

//# sourceMappingURL=bluetooth.module.d.ts.map