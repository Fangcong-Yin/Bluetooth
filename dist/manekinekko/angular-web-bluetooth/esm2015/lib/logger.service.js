import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ConsoleLoggerService {
    log(...args) {
        console.log.apply(console, args);
    }
    error(...args) {
        console.error.apply(console, args);
    }
    warn(...args) {
        console.warn.apply(console, args);
    }
}
/** @nocollapse */ ConsoleLoggerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ConsoleLoggerService_Factory() { return new ConsoleLoggerService(); }, token: ConsoleLoggerService, providedIn: "root" });
ConsoleLoggerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
export class NoLoggerService {
    log(...args) { }
    error(...args) { }
    warn(...args) { }
}
/** @nocollapse */ NoLoggerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NoLoggerService_Factory() { return new NoLoggerService(); }, token: NoLoggerService, providedIn: "root" });
NoLoggerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYW5la2luZWtrby9hbmd1bGFyLXdlYi1ibHVldG9vdGgvc3JjL2xpYi9sb2dnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVczQyxNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLEdBQUcsQ0FBQyxHQUFHLElBQUk7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELEtBQUssQ0FBQyxHQUFHLElBQUk7UUFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELElBQUksQ0FBQyxHQUFHLElBQUk7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7OztZQVpGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7QUFnQkQsTUFBTSxPQUFPLGVBQWU7SUFDMUIsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFHLENBQUM7SUFDZixLQUFLLENBQUMsR0FBRyxJQUFJLElBQUcsQ0FBQztJQUNqQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUcsQ0FBQzs7OztZQU5qQixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvZ2dlciB7XHJcbiAgbG9nKGFyZ3M6IHN0cmluZ1tdKTogdm9pZDtcclxuICBlcnJvcihhcmdzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgd2FybihhcmdzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnNvbGVMb2dnZXJTZXJ2aWNlIGltcGxlbWVudHMgTG9nZ2VyIHtcclxuICBsb2coLi4uYXJncykge1xyXG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XHJcbiAgfVxyXG4gIGVycm9yKC4uLmFyZ3MpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJncyk7XHJcbiAgfVxyXG4gIHdhcm4oLi4uYXJncykge1xyXG4gICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xyXG4gIH1cclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTm9Mb2dnZXJTZXJ2aWNlIGltcGxlbWVudHMgTG9nZ2VyIHtcclxuICBsb2coLi4uYXJncykge31cclxuICBlcnJvciguLi5hcmdzKSB7fVxyXG4gIHdhcm4oLi4uYXJncykge31cclxufVxyXG4iXX0=