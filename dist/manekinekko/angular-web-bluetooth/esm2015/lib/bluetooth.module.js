import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BluetoothCore } from './bluetooth.service';
import { BrowserWebBluetooth } from './platform/browser';
import { ConsoleLoggerService, NoLoggerService } from './logger.service';
export function browserWebBluetooth() {
    return new BrowserWebBluetooth();
}
export function consoleLoggerServiceConfig(options) {
    if (options && options.enableTracing) {
        return new ConsoleLoggerService();
    }
    else {
        return new NoLoggerService();
    }
}
export function makeMeTokenInjector() {
    return new InjectionToken('AWBOptions');
}
export class WebBluetoothModule {
    static forRoot(options = {}) {
        return {
            ngModule: WebBluetoothModule,
            providers: [
                BluetoothCore,
                {
                    provide: BrowserWebBluetooth,
                    useFactory: browserWebBluetooth
                },
                {
                    provide: makeMeTokenInjector,
                    useValue: options
                },
                {
                    provide: ConsoleLoggerService,
                    useFactory: consoleLoggerServiceConfig,
                    deps: [makeMeTokenInjector]
                }
            ]
        };
    }
}
WebBluetoothModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZXRvb3RoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hbmVraW5la2tvL2FuZ3VsYXItd2ViLWJsdWV0b290aC9zcmMvbGliL2JsdWV0b290aC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsY0FBYyxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBTXpFLE1BQU0sVUFBVSxtQkFBbUI7SUFDakMsT0FBTyxJQUFJLG1CQUFtQixFQUFFLENBQUM7QUFDbkMsQ0FBQztBQUVELE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxPQUFtQjtJQUM1RCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsYUFBYSxFQUFFO1FBQ3BDLE9BQU8sSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0tBQ25DO1NBQU07UUFDTCxPQUFPLElBQUksZUFBZSxFQUFFLENBQUM7S0FDOUI7QUFDSCxDQUFDO0FBQ0QsTUFBTSxVQUFVLG1CQUFtQjtJQUNqQyxPQUFPLElBQUksY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFLRCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBc0IsRUFBRTtRQUNyQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1QsYUFBYTtnQkFDYjtvQkFDRSxPQUFPLEVBQUUsbUJBQW1CO29CQUM1QixVQUFVLEVBQUUsbUJBQW1CO2lCQUNoQztnQkFDRDtvQkFDRSxPQUFPLEVBQUUsbUJBQW1CO29CQUM1QixRQUFRLEVBQUUsT0FBTztpQkFDbEI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLG9CQUFvQjtvQkFDN0IsVUFBVSxFQUFFLDBCQUEwQjtvQkFDdEMsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBeEJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBCbHVldG9vdGhDb3JlIH0gZnJvbSAnLi9ibHVldG9vdGguc2VydmljZSc7XHJcbmltcG9ydCB7IEJyb3dzZXJXZWJCbHVldG9vdGggfSBmcm9tICcuL3BsYXRmb3JtL2Jyb3dzZXInO1xyXG5cclxuaW1wb3J0IHsgQ29uc29sZUxvZ2dlclNlcnZpY2UsIE5vTG9nZ2VyU2VydmljZSB9IGZyb20gJy4vbG9nZ2VyLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBV0JPcHRpb25zIHtcclxuICBlbmFibGVUcmFjaW5nPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJyb3dzZXJXZWJCbHVldG9vdGgoKSB7XHJcbiAgcmV0dXJuIG5ldyBCcm93c2VyV2ViQmx1ZXRvb3RoKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25zb2xlTG9nZ2VyU2VydmljZUNvbmZpZyhvcHRpb25zOiBBV0JPcHRpb25zKSB7XHJcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmFibGVUcmFjaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IENvbnNvbGVMb2dnZXJTZXJ2aWNlKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBuZXcgTm9Mb2dnZXJTZXJ2aWNlKCk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlTWVUb2tlbkluamVjdG9yKCkge1xyXG4gIHJldHVybiBuZXcgSW5qZWN0aW9uVG9rZW4oJ0FXQk9wdGlvbnMnKTtcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgV2ViQmx1ZXRvb3RoTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdChvcHRpb25zOiBBV0JPcHRpb25zID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFdlYkJsdWV0b290aE1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IFdlYkJsdWV0b290aE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQmx1ZXRvb3RoQ29yZSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBCcm93c2VyV2ViQmx1ZXRvb3RoLFxyXG4gICAgICAgICAgdXNlRmFjdG9yeTogYnJvd3NlcldlYkJsdWV0b290aFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogbWFrZU1lVG9rZW5JbmplY3RvcixcclxuICAgICAgICAgIHVzZVZhbHVlOiBvcHRpb25zXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBDb25zb2xlTG9nZ2VyU2VydmljZSxcclxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGNvbnNvbGVMb2dnZXJTZXJ2aWNlQ29uZmlnLFxyXG4gICAgICAgICAgZGVwczogW21ha2VNZVRva2VuSW5qZWN0b3JdXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=