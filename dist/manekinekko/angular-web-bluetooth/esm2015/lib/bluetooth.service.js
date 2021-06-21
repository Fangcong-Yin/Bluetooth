import { __awaiter } from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
import { from, fromEvent, throwError } from 'rxjs';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { ConsoleLoggerService } from './logger.service';
import { BrowserWebBluetooth } from './platform/browser';
import * as i0 from "@angular/core";
import * as i1 from "./platform/browser";
import * as i2 from "./logger.service";
export class BluetoothCore {
    constructor(webBle, console) {
        this.webBle = webBle;
        this.console = console;
        this.device$ = new EventEmitter();
        this.gatt$ = new EventEmitter();
        this.characteristicValueChanges$ = new EventEmitter();
        this.gattServer = null;
    }
    getDevice$() {
        return this.device$;
    }
    getGATT$() {
        return this.gatt$;
    }
    streamValues$() {
        return this.characteristicValueChanges$.pipe(filter(value => value && value.byteLength > 0));
    }
    /**
     * Run the discovery process and read the value form the provided service and characteristic
     * @param options the ReadValueOptions
     */
    value(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.console.log('[BLE::Info] Reading value with options %o', options);
            if (typeof options.acceptAllDevices === 'undefined') {
                options.acceptAllDevices = true;
            }
            if (typeof options.optionalServices === 'undefined') {
                options.optionalServices = [options.service];
            }
            else {
                options.optionalServices = [...options.optionalServices];
            }
            this.console.log('[BLE::Info] Reading value with options %o', options);
            try {
                const device = yield this.discover({
                    acceptAllDevices: options.acceptAllDevices,
                    optionalServices: options.optionalServices
                });
                this.console.log('[BLE::Info] Device info %o', device);
                const gatt = yield this.connectDevice(device);
                this.console.log('[BLE::Info] GATT info %o', gatt);
                const primaryService = yield this.getPrimaryService(gatt, options.service);
                this.console.log('[BLE::Info] Primary Service info %o', primaryService);
                const characteristic = yield this.getCharacteristic(primaryService, options.characteristic);
                this.console.log('[BLE::Info] Characteristic info %o', characteristic);
                const value = yield characteristic.readValue();
                this.console.log('[BLE::Info] Value info %o', value);
                return value;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    value$(options) {
        return from(this.value(options));
    }
    /**
     * Run the discovery process.
     *
     * @param Options such as filters and optional services
     * @return  The GATT server for the chosen device
     */
    discover(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            options.optionalServices = options.optionalServices || ['generic_access'];
            this.console.log('[BLE::Info] Requesting devices with options %o', options);
            let device = null;
            try {
                device = yield this.webBle.requestDevice(options);
                device.addEventListener('gattserverdisconnected', this.onDeviceDisconnected.bind(this));
                if (device) {
                    this.device$.emit(device);
                }
                else {
                    this.device$.error(`[BLE::Error] Can not get the Bluetooth Remote GATT Server. Abort.`);
                }
            }
            catch (error) {
                this.console.error(error);
            }
            return device;
        });
    }
    /**
     * This handler will trigger when the client disconnets from the server.
     *
     * @param event The onDeviceDisconnected event
     */
    onDeviceDisconnected(event) {
        const disconnectedDevice = event.target;
        this.console.log('[BLE::Info] disconnected device %o', disconnectedDevice);
        this.device$.emit(null);
    }
    /**
     * Run the discovery process.
     *
     * @param Options such as filters and optional services
     * @return  Emites the value of the requested service read from the device
     */
    discover$(options) {
        return from(this.discover(options)).pipe(mergeMap((device) => this.connectDevice$(device)));
    }
    /**
     * Connect to current device.
     *
     * @return  Emites the gatt server instance of the requested device
     */
    connectDevice(device) {
        return __awaiter(this, void 0, void 0, function* () {
            if (device) {
                this.console.log('[BLE::Info] Connecting to Bluetooth Remote GATT Server of %o', device);
                try {
                    const gattServer = yield device.gatt.connect();
                    this.gattServer = gattServer;
                    this.gatt$.emit(gattServer);
                    return gattServer;
                }
                catch (error) {
                    // probably the user has canceled the discovery
                    Promise.reject(`${error.message}`);
                    this.gatt$.error(`${error.message}`);
                }
            }
            else {
                this.console.error('[BLE::Error] Was not able to connect to Bluetooth Remote GATT Server');
                this.gatt$.error(null);
            }
        });
    }
    /**
     * Connect to current device.
     *
     * @return  Emites the gatt server instance of the requested device
     */
    connectDevice$(device) {
        return from(this.connectDevice(device));
    }
    /**
     * Disconnect the current connected device
     */
    disconnectDevice() {
        if (!this.gattServer) {
            return;
        }
        this.console.log('[BLE::Info] Disconnecting from Bluetooth Device %o', this.gattServer);
        if (this.gattServer.connected) {
            this.gattServer.disconnect();
        }
        else {
            this.console.log('[BLE::Info] Bluetooth device is already disconnected');
        }
    }
    /**
     * Requests the primary service.
     *
     * @param gatt The BluetoothRemoteGATTServer sever
     * @param service The UUID of the primary service
     * @return The remote service (as a Promise)
     */
    getPrimaryService(gatt, service) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const remoteService = yield gatt.getPrimaryService(service);
                return yield Promise.resolve(remoteService);
            }
            catch (error) {
                return yield Promise.reject(`${error.message} (${service})`);
            }
        });
    }
    /**
     * Requests the primary service.
     *
     * @param gatt The BluetoothRemoteGATTServer sever
     * @param service The UUID of the primary service
     * @return The remote service (as an observable).
     */
    getPrimaryService$(gatt, service) {
        this.console.log('[BLE::Info] Getting primary service "%s" (if available) of %o', service, gatt);
        if (gatt) {
            return from(this.getPrimaryService(gatt, service));
        }
        else {
            return throwError(new Error('[BLE::Error] Was not able to connect to the Bluetooth Remote GATT Server'));
        }
    }
    /**
     * Requests a characteristic from the primary service.
     *
     * @param primaryService The primary service.
     * @param characteristic The characteristic's UUID.
     * @returns The characteristic description (as a Promise).
     */
    getCharacteristic(primaryService, characteristic) {
        return __awaiter(this, void 0, void 0, function* () {
            this.console.log('[BLE::Info] Getting Characteristic "%s" of %o', characteristic, primaryService);
            try {
                const char = yield primaryService.getCharacteristic(characteristic);
                // listen for characteristic value changes
                if (char.properties.notify) {
                    char.startNotifications().then(_ => {
                        this.console.log('[BLE::Info] Starting notifications of "%s"', characteristic);
                        char.addEventListener('characteristicvaluechanged', this.onCharacteristicChanged.bind(this));
                    }, (error) => {
                        Promise.reject(`${error.message} (${characteristic})`);
                    });
                }
                else {
                    char.addEventListener('characteristicvaluechanged', this.onCharacteristicChanged.bind(this));
                }
                return char;
            }
            catch (rejectionError) {
                Promise.reject(`${rejectionError.message} (${characteristic})`);
            }
        });
    }
    /**
     * Requests a characteristic from the primary service.
     *
     * @param primaryService The primary service.
     * @param characteristic The characteristic's UUID.
     * @returns The characteristic description (as a Observable).
     */
    getCharacteristic$(primaryService, characteristic) {
        this.console.log('[BLE::Info] Getting Characteristic "%s" of %o', characteristic, primaryService);
        return from(this.getCharacteristic(primaryService, characteristic));
    }
    /**
     * Sets the characteristic's state.
     *
     * @param service The parent service of the characteristic.
     * @param characteristic The requested characteristic
     * @param state An ArrayBuffer containing the value of the characteristic.
     * @return The primary service (useful for chaining).
     */
    setCharacteristicState(service, characteristic, state) {
        const primaryService = this.getPrimaryService$(this.gattServer, service);
        primaryService
            // tslint:disable-next-line: variable-name
            .pipe(mergeMap((_primaryService) => this.getCharacteristic$(_primaryService, characteristic)))
            // tslint:disable-next-line: no-shadowed-variable
            .subscribe((characteristic) => this.writeValue$(characteristic, state));
        return primaryService;
    }
    /**
     * Enables the specified characteristic of a given service.
     *
     * @param service The parent service of the characteristic.
     * @param characteristic The requested characteristic
     * @return The primary service (useful for chaining).
     */
    enableCharacteristic(service, characteristic, state) {
        state = state || new Uint8Array([1]);
        return this.setCharacteristicState(service, characteristic, state);
    }
    /**
     * Disables the specified characteristic of a given service.
     *
     * @param service The parent service of the characteristic.
     * @param characteristic The requested characteristic.
     * @return The primary service (useful for chaining).
     */
    disbaleCharacteristic(service, characteristic, state) {
        state = state || new Uint8Array([0]);
        return this.setCharacteristicState(service, characteristic, state);
    }
    /**
     * Dispatches new values emitted by a characteristic.
     *
     * @param event the distpatched event.
     */
    onCharacteristicChanged(event) {
        this.console.log('[BLE::Info] Dispatching new characteristic value %o', event);
        const value = event.target.value;
        this.characteristicValueChanges$.emit(value);
    }
    /**
     * Reads a value from the characteristics, as a DataView.
     *
     * @param characteristic The requested characteristic.
     * @return the DataView value (as an Observable).
     */
    readValue$(characteristic) {
        this.console.log('[BLE::Info] Reading Characteristic %o', characteristic);
        return from(characteristic
            .readValue()
            .then((data) => Promise.resolve(data), (error) => Promise.reject(`${error.message}`)));
    }
    /**
     * Writes a value into the specified characteristic.
     *
     * @param characteristic The requested characteristic.
     * @param value The value to be written (as an ArrayBuffer or Uint8Array).
     * @return an void Observable.
     */
    writeValue$(characteristic, value) {
        this.console.log('[BLE::Info] Writing Characteristic %o', characteristic);
        return from(characteristic.writeValue(value).then(_ => Promise.resolve(), (error) => Promise.reject(`${error.message}`)));
    }
    /**
     * A stream of DataView values emitted by the specified characteristic.
     *
     * @param characteristic The characteristic which value you want to observe
     * @return The stream of DataView values.
     */
    observeValue$(characteristic) {
        characteristic.startNotifications();
        const disconnected = fromEvent(characteristic.service.device, 'gattserverdisconnected');
        return fromEvent(characteristic, 'characteristicvaluechanged')
            .pipe(map((event) => event.target.value), takeUntil(disconnected));
    }
    /**
     * A utility method to convert LE to an unsigned 16-bit integer values.
     *
     * @param data The DataView binary data.
     * @param byteOffset The offset, in byte, from the start of the view where to read the data.
     * @return An unsigned 16-bit integer number.
     */
    littleEndianToUint16(data, byteOffset) {
        // tslint:disable-next-line:no-bitwise
        return (this.littleEndianToUint8(data, byteOffset + 1) << 8) + this.littleEndianToUint8(data, byteOffset);
    }
    /**
     * A utility method to convert LE to an unsigned 8-bit integer values.
     *
     * @param data The DataView binary data.
     * @param byteOffset The offset, in byte, from the start of the view where to read the data.
     * @return An unsigned 8-bit integer number.
     */
    littleEndianToUint8(data, byteOffset) {
        return data.getUint8(byteOffset);
    }
    /**
     * Sends random data (for testing purposes only).
     *
     * @return Random unsigned 8-bit integer values.
     */
    fakeNext(fakeValue) {
        if (fakeValue === undefined) {
            fakeValue = () => {
                const dv = new DataView(new ArrayBuffer(8));
                // tslint:disable-next-line:no-bitwise
                dv.setUint8(0, (Math.random() * 110) | 0);
                return dv;
            };
        }
        this.characteristicValueChanges$.emit(fakeValue());
    }
}
/** @nocollapse */ BluetoothCore.ɵprov = i0.ɵɵdefineInjectable({ factory: function BluetoothCore_Factory() { return new BluetoothCore(i0.ɵɵinject(i1.BrowserWebBluetooth), i0.ɵɵinject(i2.ConsoleLoggerService)); }, token: BluetoothCore, providedIn: "root" });
BluetoothCore.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
BluetoothCore.ctorParameters = () => [
    { type: BrowserWebBluetooth },
    { type: ConsoleLoggerService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZXRvb3RoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYW5la2luZWtrby9hbmd1bGFyLXdlYi1ibHVldG9vdGgvc3JjL2xpYi9ibHVldG9vdGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQVl6RCxNQUFNLE9BQU8sYUFBYTtJQU14QixZQUE2QixNQUEyQixFQUFtQixPQUE2QjtRQUEzRSxXQUFNLEdBQU4sTUFBTSxDQUFxQjtRQUFtQixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUV0RyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxZQUFZLEVBQTZCLENBQUM7UUFDM0QsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7UUFFaEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0csS0FBSyxDQUFDLE9BQXlCOztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUV2RSxJQUFJLE9BQU8sT0FBTyxDQUFDLGdCQUFnQixLQUFLLFdBQVcsRUFBRTtnQkFDbkQsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQzthQUNqQztZQUVELElBQUksT0FBTyxPQUFPLENBQUMsZ0JBQWdCLEtBQUssV0FBVyxFQUFFO2dCQUNuRCxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDOUM7aUJBQ0k7Z0JBQ0gsT0FBTyxDQUFDLGdCQUFnQixHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUMxRDtZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRXZFLElBQUk7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNqQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsZ0JBQWdCO29CQUMxQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsZ0JBQWdCO2lCQUMzQyxDQUFvQixDQUFDO2dCQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFdkQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFbkQsTUFBTSxjQUFjLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQStCLENBQUM7Z0JBQ3pHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUV4RSxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBc0MsQ0FBQztnQkFDakksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBRXZFLE1BQU0sS0FBSyxHQUFHLE1BQU0sY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFFckQsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELE9BQU8sS0FBSyxFQUFFO2dCQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEI7UUFDSCxDQUFDO0tBQUE7SUFFRCxNQUFNLENBQUMsT0FBeUI7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNHLFFBQVEsQ0FBQyxVQUFnQyxFQUEwQjs7WUFDdkUsT0FBTyxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFNUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUk7Z0JBQ0YsTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRXhGLElBQUksTUFBTSxFQUFFO29CQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMzQjtxQkFDSTtvQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO2lCQUN6RjthQUVGO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0gsb0JBQW9CLENBQUMsS0FBWTtRQUMvQixNQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxNQUF5QixDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsU0FBUyxDQUFDLE9BQThCO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBdUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUVEOzs7O09BSUc7SUFDRyxhQUFhLENBQUMsTUFBdUI7O1lBQ3pDLElBQUksTUFBTSxFQUFFO2dCQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDhEQUE4RCxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUV6RixJQUFJO29CQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7b0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM1QixPQUFPLFVBQVUsQ0FBQztpQkFDbkI7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsK0NBQStDO29CQUMvQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0VBQXNFLENBQUMsQ0FBQztnQkFDM0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEI7UUFDSCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0gsY0FBYyxDQUFDLE1BQXVCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEYsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzlCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1NBQzFFO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNHLGlCQUFpQixDQUFDLElBQStCLEVBQUUsT0FBNkI7O1lBQ3BGLElBQUk7Z0JBQ0YsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVELE9BQU8sTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsT0FBTyxLQUFLLEVBQUU7Z0JBQ1osT0FBTyxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sR0FBRyxDQUFDLENBQUM7YUFDOUQ7UUFDSCxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDSCxrQkFBa0IsQ0FBQyxJQUErQixFQUFFLE9BQTZCO1FBQy9FLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLCtEQUErRCxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUdqRyxJQUFJLElBQUksRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUNULElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQ3RDLENBQUM7U0FDSDthQUNJO1lBQ0gsT0FBTyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsMEVBQTBFLENBQUMsQ0FBQyxDQUFDO1NBQzFHO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNHLGlCQUFpQixDQUNyQixjQUEwQyxFQUMxQyxjQUEyQzs7WUFFM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBRWxHLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFjLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3BFLDBDQUEwQztnQkFDMUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtvQkFDMUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsRUFBRSxjQUFjLENBQUMsQ0FBQzt3QkFDL0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDL0YsQ0FBQyxFQUFFLENBQUMsS0FBbUIsRUFBRSxFQUFFO3dCQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sS0FBSyxjQUFjLEdBQUcsQ0FBQyxDQUFDO29CQUN6RCxDQUFDLENBQUMsQ0FBQztpQkFDSjtxQkFDSTtvQkFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUM5RjtnQkFDRCxPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsT0FBTyxjQUFjLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxjQUFjLENBQUMsT0FBTyxLQUFLLGNBQWMsR0FBRyxDQUFDLENBQUM7YUFDakU7UUFDSCxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDSCxrQkFBa0IsQ0FDaEIsY0FBMEMsRUFDMUMsY0FBMkM7UUFFM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRWxHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILHNCQUFzQixDQUFDLE9BQTZCLEVBQUUsY0FBMkMsRUFBRSxLQUFrQjtRQUNuSCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV6RSxjQUFjO1lBQ1osMENBQTBDO2FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUEyQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDMUgsaURBQWlEO2FBQ2hELFNBQVMsQ0FBQyxDQUFDLGNBQWlELEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFN0csT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILG9CQUFvQixDQUFDLE9BQTZCLEVBQUUsY0FBMkMsRUFBRSxLQUFXO1FBQzFHLEtBQUssR0FBRyxLQUFLLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILHFCQUFxQixDQUFDLE9BQTZCLEVBQUUsY0FBMkMsRUFBRSxLQUFXO1FBQzNHLEtBQUssR0FBRyxLQUFLLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCx1QkFBdUIsQ0FBQyxLQUFZO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFEQUFxRCxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRS9FLE1BQU0sS0FBSyxHQUFJLEtBQUssQ0FBQyxNQUE0QyxDQUFDLEtBQUssQ0FBQztRQUN4RSxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFVBQVUsQ0FBQyxjQUFpRDtRQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUUxRSxPQUFPLElBQUksQ0FDVCxjQUFjO2FBQ1gsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLENBQUMsSUFBYyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBbUIsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQ2hILENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsV0FBVyxDQUFDLGNBQWlELEVBQUUsS0FBK0I7UUFDNUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFMUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFtQixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFJLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGFBQWEsQ0FBQyxjQUFpRDtRQUM3RCxjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNwQyxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUN4RixPQUFPLFNBQVMsQ0FBQyxjQUFjLEVBQUUsNEJBQTRCLENBQUM7YUFDM0QsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUUsS0FBSyxDQUFDLE1BQTRDLENBQUMsS0FBaUIsQ0FBQyxFQUM1RixTQUFTLENBQUMsWUFBWSxDQUFDLENBQ3hCLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsb0JBQW9CLENBQUMsSUFBUyxFQUFFLFVBQWtCO1FBQ2hELHNDQUFzQztRQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsbUJBQW1CLENBQUMsSUFBUyxFQUFFLFVBQWtCO1FBQy9DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxTQUEwQjtRQUNqQyxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDM0IsU0FBUyxHQUFHLEdBQUcsRUFBRTtnQkFDZixNQUFNLEVBQUUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxzQ0FBc0M7Z0JBQ3RDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7WUExWkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBWFEsbUJBQW1CO1lBRG5CLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmcm9tLCBmcm9tRXZlbnQsIE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIG1lcmdlTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IENvbnNvbGVMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi9sb2dnZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEJyb3dzZXJXZWJCbHVldG9vdGggfSBmcm9tICcuL3BsYXRmb3JtL2Jyb3dzZXInO1xyXG5cclxudHlwZSBSZWFkVmFsdWVPcHRpb25zID0ge1xyXG4gIGFjY2VwdEFsbERldmljZXM/OiBib29sZWFuO1xyXG4gIG9wdGlvbmFsU2VydmljZXM/OiBCbHVldG9vdGhTZXJ2aWNlVVVJRFtdO1xyXG4gIGNoYXJhY3RlcmlzdGljOiBCbHVldG9vdGhDaGFyYWN0ZXJpc3RpY1VVSUQsXHJcbiAgc2VydmljZTogQmx1ZXRvb3RoU2VydmljZVVVSUQsXHJcbn07XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCbHVldG9vdGhDb3JlIHtcclxuICBwcml2YXRlIGRldmljZSQ6IEV2ZW50RW1pdHRlcjxCbHVldG9vdGhEZXZpY2U+O1xyXG4gIHByaXZhdGUgZ2F0dCQ6IEV2ZW50RW1pdHRlcjxCbHVldG9vdGhSZW1vdGVHQVRUU2VydmVyPjtcclxuICBwcml2YXRlIGNoYXJhY3RlcmlzdGljVmFsdWVDaGFuZ2VzJDogRXZlbnRFbWl0dGVyPERhdGFWaWV3PjtcclxuICBwcml2YXRlIGdhdHRTZXJ2ZXI6IEJsdWV0b290aFJlbW90ZUdBVFRTZXJ2ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgd2ViQmxlOiBCcm93c2VyV2ViQmx1ZXRvb3RoLCBwcml2YXRlIHJlYWRvbmx5IGNvbnNvbGU6IENvbnNvbGVMb2dnZXJTZXJ2aWNlKSB7XHJcblxyXG4gICAgdGhpcy5kZXZpY2UkID0gbmV3IEV2ZW50RW1pdHRlcjxCbHVldG9vdGhEZXZpY2U+KCk7XHJcbiAgICB0aGlzLmdhdHQkID0gbmV3IEV2ZW50RW1pdHRlcjxCbHVldG9vdGhSZW1vdGVHQVRUU2VydmVyPigpO1xyXG4gICAgdGhpcy5jaGFyYWN0ZXJpc3RpY1ZhbHVlQ2hhbmdlcyQgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGFWaWV3PigpO1xyXG5cclxuICAgIHRoaXMuZ2F0dFNlcnZlciA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXREZXZpY2UkKCk6IE9ic2VydmFibGU8Qmx1ZXRvb3RoRGV2aWNlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXZpY2UkO1xyXG4gIH1cclxuXHJcbiAgZ2V0R0FUVCQoKTogT2JzZXJ2YWJsZTxCbHVldG9vdGhSZW1vdGVHQVRUU2VydmVyPiB7XHJcbiAgICByZXR1cm4gdGhpcy5nYXR0JDtcclxuICB9XHJcblxyXG4gIHN0cmVhbVZhbHVlcyQoKTogT2JzZXJ2YWJsZTxEYXRhVmlldz4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyaXN0aWNWYWx1ZUNoYW5nZXMkLnBpcGUoZmlsdGVyKHZhbHVlID0+IHZhbHVlICYmIHZhbHVlLmJ5dGVMZW5ndGggPiAwKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSdW4gdGhlIGRpc2NvdmVyeSBwcm9jZXNzIGFuZCByZWFkIHRoZSB2YWx1ZSBmb3JtIHRoZSBwcm92aWRlZCBzZXJ2aWNlIGFuZCBjaGFyYWN0ZXJpc3RpY1xyXG4gICAqIEBwYXJhbSBvcHRpb25zIHRoZSBSZWFkVmFsdWVPcHRpb25zXHJcbiAgICovXHJcbiAgYXN5bmMgdmFsdWUob3B0aW9uczogUmVhZFZhbHVlT3B0aW9ucykge1xyXG4gICAgdGhpcy5jb25zb2xlLmxvZygnW0JMRTo6SW5mb10gUmVhZGluZyB2YWx1ZSB3aXRoIG9wdGlvbnMgJW8nLCBvcHRpb25zKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuYWNjZXB0QWxsRGV2aWNlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgb3B0aW9ucy5hY2NlcHRBbGxEZXZpY2VzID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMub3B0aW9uYWxTZXJ2aWNlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgb3B0aW9ucy5vcHRpb25hbFNlcnZpY2VzID0gW29wdGlvbnMuc2VydmljZV07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgb3B0aW9ucy5vcHRpb25hbFNlcnZpY2VzID0gWy4uLm9wdGlvbnMub3B0aW9uYWxTZXJ2aWNlc107XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb25zb2xlLmxvZygnW0JMRTo6SW5mb10gUmVhZGluZyB2YWx1ZSB3aXRoIG9wdGlvbnMgJW8nLCBvcHRpb25zKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkZXZpY2UgPSBhd2FpdCB0aGlzLmRpc2NvdmVyKHtcclxuICAgICAgICBhY2NlcHRBbGxEZXZpY2VzOiBvcHRpb25zLmFjY2VwdEFsbERldmljZXMsXHJcbiAgICAgICAgb3B0aW9uYWxTZXJ2aWNlczogb3B0aW9ucy5vcHRpb25hbFNlcnZpY2VzXHJcbiAgICAgIH0pIGFzIEJsdWV0b290aERldmljZTtcclxuICAgICAgdGhpcy5jb25zb2xlLmxvZygnW0JMRTo6SW5mb10gRGV2aWNlIGluZm8gJW8nLCBkZXZpY2UpO1xyXG5cclxuICAgICAgY29uc3QgZ2F0dCA9IGF3YWl0IHRoaXMuY29ubmVjdERldmljZShkZXZpY2UpO1xyXG4gICAgICB0aGlzLmNvbnNvbGUubG9nKCdbQkxFOjpJbmZvXSBHQVRUIGluZm8gJW8nLCBnYXR0KTtcclxuXHJcbiAgICAgIGNvbnN0IHByaW1hcnlTZXJ2aWNlID0gYXdhaXQgdGhpcy5nZXRQcmltYXJ5U2VydmljZShnYXR0LCBvcHRpb25zLnNlcnZpY2UpIGFzIEJsdWV0b290aFJlbW90ZUdBVFRTZXJ2aWNlO1xyXG4gICAgICB0aGlzLmNvbnNvbGUubG9nKCdbQkxFOjpJbmZvXSBQcmltYXJ5IFNlcnZpY2UgaW5mbyAlbycsIHByaW1hcnlTZXJ2aWNlKTtcclxuXHJcbiAgICAgIGNvbnN0IGNoYXJhY3RlcmlzdGljID0gYXdhaXQgdGhpcy5nZXRDaGFyYWN0ZXJpc3RpYyhwcmltYXJ5U2VydmljZSwgb3B0aW9ucy5jaGFyYWN0ZXJpc3RpYykgYXMgQmx1ZXRvb3RoUmVtb3RlR0FUVENoYXJhY3RlcmlzdGljO1xyXG4gICAgICB0aGlzLmNvbnNvbGUubG9nKCdbQkxFOjpJbmZvXSBDaGFyYWN0ZXJpc3RpYyBpbmZvICVvJywgY2hhcmFjdGVyaXN0aWMpO1xyXG5cclxuICAgICAgY29uc3QgdmFsdWUgPSBhd2FpdCBjaGFyYWN0ZXJpc3RpYy5yZWFkVmFsdWUoKTtcclxuICAgICAgdGhpcy5jb25zb2xlLmxvZygnW0JMRTo6SW5mb10gVmFsdWUgaW5mbyAlbycsIHZhbHVlKTtcclxuXHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFsdWUkKG9wdGlvbnM6IFJlYWRWYWx1ZU9wdGlvbnMpIHtcclxuICAgIHJldHVybiBmcm9tKHRoaXMudmFsdWUob3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUnVuIHRoZSBkaXNjb3ZlcnkgcHJvY2Vzcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBPcHRpb25zIHN1Y2ggYXMgZmlsdGVycyBhbmQgb3B0aW9uYWwgc2VydmljZXNcclxuICAgKiBAcmV0dXJuICBUaGUgR0FUVCBzZXJ2ZXIgZm9yIHRoZSBjaG9zZW4gZGV2aWNlXHJcbiAgICovXHJcbiAgYXN5bmMgZGlzY292ZXIob3B0aW9uczogUmVxdWVzdERldmljZU9wdGlvbnMgPSB7fSBhcyBSZXF1ZXN0RGV2aWNlT3B0aW9ucykge1xyXG4gICAgb3B0aW9ucy5vcHRpb25hbFNlcnZpY2VzID0gb3B0aW9ucy5vcHRpb25hbFNlcnZpY2VzIHx8IFsnZ2VuZXJpY19hY2Nlc3MnXTtcclxuXHJcbiAgICB0aGlzLmNvbnNvbGUubG9nKCdbQkxFOjpJbmZvXSBSZXF1ZXN0aW5nIGRldmljZXMgd2l0aCBvcHRpb25zICVvJywgb3B0aW9ucyk7XHJcblxyXG4gICAgbGV0IGRldmljZSA9IG51bGw7XHJcbiAgICB0cnkge1xyXG4gICAgICBkZXZpY2UgPSBhd2FpdCB0aGlzLndlYkJsZS5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpO1xyXG4gICAgICBkZXZpY2UuYWRkRXZlbnRMaXN0ZW5lcignZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZCcsIHRoaXMub25EZXZpY2VEaXNjb25uZWN0ZWQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICBpZiAoZGV2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5kZXZpY2UkLmVtaXQoZGV2aWNlKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmRldmljZSQuZXJyb3IoYFtCTEU6OkVycm9yXSBDYW4gbm90IGdldCB0aGUgQmx1ZXRvb3RoIFJlbW90ZSBHQVRUIFNlcnZlci4gQWJvcnQuYCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aGlzLmNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZXZpY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGhhbmRsZXIgd2lsbCB0cmlnZ2VyIHdoZW4gdGhlIGNsaWVudCBkaXNjb25uZXRzIGZyb20gdGhlIHNlcnZlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBldmVudCBUaGUgb25EZXZpY2VEaXNjb25uZWN0ZWQgZXZlbnRcclxuICAgKi9cclxuICBvbkRldmljZURpc2Nvbm5lY3RlZChldmVudDogRXZlbnQpIHtcclxuICAgIGNvbnN0IGRpc2Nvbm5lY3RlZERldmljZSA9IGV2ZW50LnRhcmdldCBhcyBCbHVldG9vdGhEZXZpY2U7XHJcbiAgICB0aGlzLmNvbnNvbGUubG9nKCdbQkxFOjpJbmZvXSBkaXNjb25uZWN0ZWQgZGV2aWNlICVvJywgZGlzY29ubmVjdGVkRGV2aWNlKTtcclxuXHJcbiAgICB0aGlzLmRldmljZSQuZW1pdChudWxsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJ1biB0aGUgZGlzY292ZXJ5IHByb2Nlc3MuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gT3B0aW9ucyBzdWNoIGFzIGZpbHRlcnMgYW5kIG9wdGlvbmFsIHNlcnZpY2VzXHJcbiAgICogQHJldHVybiAgRW1pdGVzIHRoZSB2YWx1ZSBvZiB0aGUgcmVxdWVzdGVkIHNlcnZpY2UgcmVhZCBmcm9tIHRoZSBkZXZpY2VcclxuICAgKi9cclxuICBkaXNjb3ZlciQob3B0aW9ucz86IFJlcXVlc3REZXZpY2VPcHRpb25zKTogT2JzZXJ2YWJsZTx2b2lkIHwgQmx1ZXRvb3RoUmVtb3RlR0FUVFNlcnZlcj4ge1xyXG4gICAgcmV0dXJuIGZyb20odGhpcy5kaXNjb3ZlcihvcHRpb25zKSkucGlwZShtZXJnZU1hcCgoZGV2aWNlOiBCbHVldG9vdGhEZXZpY2UpID0+IHRoaXMuY29ubmVjdERldmljZSQoZGV2aWNlKSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29ubmVjdCB0byBjdXJyZW50IGRldmljZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gIEVtaXRlcyB0aGUgZ2F0dCBzZXJ2ZXIgaW5zdGFuY2Ugb2YgdGhlIHJlcXVlc3RlZCBkZXZpY2VcclxuICAgKi9cclxuICBhc3luYyBjb25uZWN0RGV2aWNlKGRldmljZTogQmx1ZXRvb3RoRGV2aWNlKSB7XHJcbiAgICBpZiAoZGV2aWNlKSB7XHJcbiAgICAgIHRoaXMuY29uc29sZS5sb2coJ1tCTEU6OkluZm9dIENvbm5lY3RpbmcgdG8gQmx1ZXRvb3RoIFJlbW90ZSBHQVRUIFNlcnZlciBvZiAlbycsIGRldmljZSk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGdhdHRTZXJ2ZXIgPSBhd2FpdCBkZXZpY2UuZ2F0dC5jb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5nYXR0U2VydmVyID0gZ2F0dFNlcnZlcjtcclxuICAgICAgICB0aGlzLmdhdHQkLmVtaXQoZ2F0dFNlcnZlcik7XHJcbiAgICAgICAgcmV0dXJuIGdhdHRTZXJ2ZXI7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgLy8gcHJvYmFibHkgdGhlIHVzZXIgaGFzIGNhbmNlbGVkIHRoZSBkaXNjb3ZlcnlcclxuICAgICAgICBQcm9taXNlLnJlamVjdChgJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gICAgICAgIHRoaXMuZ2F0dCQuZXJyb3IoYCR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb25zb2xlLmVycm9yKCdbQkxFOjpFcnJvcl0gV2FzIG5vdCBhYmxlIHRvIGNvbm5lY3QgdG8gQmx1ZXRvb3RoIFJlbW90ZSBHQVRUIFNlcnZlcicpO1xyXG4gICAgICB0aGlzLmdhdHQkLmVycm9yKG51bGwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29ubmVjdCB0byBjdXJyZW50IGRldmljZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gIEVtaXRlcyB0aGUgZ2F0dCBzZXJ2ZXIgaW5zdGFuY2Ugb2YgdGhlIHJlcXVlc3RlZCBkZXZpY2VcclxuICAgKi9cclxuICBjb25uZWN0RGV2aWNlJChkZXZpY2U6IEJsdWV0b290aERldmljZSkge1xyXG4gICAgcmV0dXJuIGZyb20odGhpcy5jb25uZWN0RGV2aWNlKGRldmljZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzY29ubmVjdCB0aGUgY3VycmVudCBjb25uZWN0ZWQgZGV2aWNlXHJcbiAgICovXHJcbiAgZGlzY29ubmVjdERldmljZSgpIHtcclxuICAgIGlmICghdGhpcy5nYXR0U2VydmVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuY29uc29sZS5sb2coJ1tCTEU6OkluZm9dIERpc2Nvbm5lY3RpbmcgZnJvbSBCbHVldG9vdGggRGV2aWNlICVvJywgdGhpcy5nYXR0U2VydmVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5nYXR0U2VydmVyLmNvbm5lY3RlZCkge1xyXG4gICAgICB0aGlzLmdhdHRTZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb25zb2xlLmxvZygnW0JMRTo6SW5mb10gQmx1ZXRvb3RoIGRldmljZSBpcyBhbHJlYWR5IGRpc2Nvbm5lY3RlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVxdWVzdHMgdGhlIHByaW1hcnkgc2VydmljZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBnYXR0IFRoZSBCbHVldG9vdGhSZW1vdGVHQVRUU2VydmVyIHNldmVyXHJcbiAgICogQHBhcmFtIHNlcnZpY2UgVGhlIFVVSUQgb2YgdGhlIHByaW1hcnkgc2VydmljZVxyXG4gICAqIEByZXR1cm4gVGhlIHJlbW90ZSBzZXJ2aWNlIChhcyBhIFByb21pc2UpXHJcbiAgICovXHJcbiAgYXN5bmMgZ2V0UHJpbWFyeVNlcnZpY2UoZ2F0dDogQmx1ZXRvb3RoUmVtb3RlR0FUVFNlcnZlciwgc2VydmljZTogQmx1ZXRvb3RoU2VydmljZVVVSUQpOiBQcm9taXNlPEJsdWV0b290aFJlbW90ZUdBVFRTZXJ2aWNlPiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZW1vdGVTZXJ2aWNlID0gYXdhaXQgZ2F0dC5nZXRQcmltYXJ5U2VydmljZShzZXJ2aWNlKTtcclxuICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UucmVzb2x2ZShyZW1vdGVTZXJ2aWNlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5yZWplY3QoYCR7ZXJyb3IubWVzc2FnZX0gKCR7c2VydmljZX0pYCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXF1ZXN0cyB0aGUgcHJpbWFyeSBzZXJ2aWNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGdhdHQgVGhlIEJsdWV0b290aFJlbW90ZUdBVFRTZXJ2ZXIgc2V2ZXJcclxuICAgKiBAcGFyYW0gc2VydmljZSBUaGUgVVVJRCBvZiB0aGUgcHJpbWFyeSBzZXJ2aWNlXHJcbiAgICogQHJldHVybiBUaGUgcmVtb3RlIHNlcnZpY2UgKGFzIGFuIG9ic2VydmFibGUpLlxyXG4gICAqL1xyXG4gIGdldFByaW1hcnlTZXJ2aWNlJChnYXR0OiBCbHVldG9vdGhSZW1vdGVHQVRUU2VydmVyLCBzZXJ2aWNlOiBCbHVldG9vdGhTZXJ2aWNlVVVJRCk6IE9ic2VydmFibGU8Qmx1ZXRvb3RoUmVtb3RlR0FUVFNlcnZpY2U+IHtcclxuICAgIHRoaXMuY29uc29sZS5sb2coJ1tCTEU6OkluZm9dIEdldHRpbmcgcHJpbWFyeSBzZXJ2aWNlIFwiJXNcIiAoaWYgYXZhaWxhYmxlKSBvZiAlbycsIHNlcnZpY2UsIGdhdHQpO1xyXG5cclxuXHJcbiAgICBpZiAoZ2F0dCkge1xyXG4gICAgICByZXR1cm4gZnJvbShcclxuICAgICAgICB0aGlzLmdldFByaW1hcnlTZXJ2aWNlKGdhdHQsIHNlcnZpY2UpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdbQkxFOjpFcnJvcl0gV2FzIG5vdCBhYmxlIHRvIGNvbm5lY3QgdG8gdGhlIEJsdWV0b290aCBSZW1vdGUgR0FUVCBTZXJ2ZXInKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXF1ZXN0cyBhIGNoYXJhY3RlcmlzdGljIGZyb20gdGhlIHByaW1hcnkgc2VydmljZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBwcmltYXJ5U2VydmljZSBUaGUgcHJpbWFyeSBzZXJ2aWNlLlxyXG4gICAqIEBwYXJhbSBjaGFyYWN0ZXJpc3RpYyBUaGUgY2hhcmFjdGVyaXN0aWMncyBVVUlELlxyXG4gICAqIEByZXR1cm5zIFRoZSBjaGFyYWN0ZXJpc3RpYyBkZXNjcmlwdGlvbiAoYXMgYSBQcm9taXNlKS5cclxuICAgKi9cclxuICBhc3luYyBnZXRDaGFyYWN0ZXJpc3RpYyhcclxuICAgIHByaW1hcnlTZXJ2aWNlOiBCbHVldG9vdGhSZW1vdGVHQVRUU2VydmljZSxcclxuICAgIGNoYXJhY3RlcmlzdGljOiBCbHVldG9vdGhDaGFyYWN0ZXJpc3RpY1VVSURcclxuICApOiBQcm9taXNlPEJsdWV0b290aFJlbW90ZUdBVFRDaGFyYWN0ZXJpc3RpYyB8IHZvaWQ+IHtcclxuICAgIHRoaXMuY29uc29sZS5sb2coJ1tCTEU6OkluZm9dIEdldHRpbmcgQ2hhcmFjdGVyaXN0aWMgXCIlc1wiIG9mICVvJywgY2hhcmFjdGVyaXN0aWMsIHByaW1hcnlTZXJ2aWNlKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjaGFyID0gYXdhaXQgcHJpbWFyeVNlcnZpY2UuZ2V0Q2hhcmFjdGVyaXN0aWMoY2hhcmFjdGVyaXN0aWMpO1xyXG4gICAgICAvLyBsaXN0ZW4gZm9yIGNoYXJhY3RlcmlzdGljIHZhbHVlIGNoYW5nZXNcclxuICAgICAgaWYgKGNoYXIucHJvcGVydGllcy5ub3RpZnkpIHtcclxuICAgICAgICBjaGFyLnN0YXJ0Tm90aWZpY2F0aW9ucygpLnRoZW4oXyA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNvbnNvbGUubG9nKCdbQkxFOjpJbmZvXSBTdGFydGluZyBub3RpZmljYXRpb25zIG9mIFwiJXNcIicsIGNoYXJhY3RlcmlzdGljKTtcclxuICAgICAgICAgIGNoYXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhcmFjdGVyaXN0aWN2YWx1ZWNoYW5nZWQnLCB0aGlzLm9uQ2hhcmFjdGVyaXN0aWNDaGFuZ2VkLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0sIChlcnJvcjogRE9NRXhjZXB0aW9uKSA9PiB7XHJcbiAgICAgICAgICBQcm9taXNlLnJlamVjdChgJHtlcnJvci5tZXNzYWdlfSAoJHtjaGFyYWN0ZXJpc3RpY30pYCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgY2hhci5hZGRFdmVudExpc3RlbmVyKCdjaGFyYWN0ZXJpc3RpY3ZhbHVlY2hhbmdlZCcsIHRoaXMub25DaGFyYWN0ZXJpc3RpY0NoYW5nZWQuYmluZCh0aGlzKSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNoYXI7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAocmVqZWN0aW9uRXJyb3IpIHtcclxuICAgICAgUHJvbWlzZS5yZWplY3QoYCR7cmVqZWN0aW9uRXJyb3IubWVzc2FnZX0gKCR7Y2hhcmFjdGVyaXN0aWN9KWApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVxdWVzdHMgYSBjaGFyYWN0ZXJpc3RpYyBmcm9tIHRoZSBwcmltYXJ5IHNlcnZpY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcHJpbWFyeVNlcnZpY2UgVGhlIHByaW1hcnkgc2VydmljZS5cclxuICAgKiBAcGFyYW0gY2hhcmFjdGVyaXN0aWMgVGhlIGNoYXJhY3RlcmlzdGljJ3MgVVVJRC5cclxuICAgKiBAcmV0dXJucyBUaGUgY2hhcmFjdGVyaXN0aWMgZGVzY3JpcHRpb24gKGFzIGEgT2JzZXJ2YWJsZSkuXHJcbiAgICovXHJcbiAgZ2V0Q2hhcmFjdGVyaXN0aWMkKFxyXG4gICAgcHJpbWFyeVNlcnZpY2U6IEJsdWV0b290aFJlbW90ZUdBVFRTZXJ2aWNlLFxyXG4gICAgY2hhcmFjdGVyaXN0aWM6IEJsdWV0b290aENoYXJhY3RlcmlzdGljVVVJRFxyXG4gICk6IE9ic2VydmFibGU8dm9pZCB8IEJsdWV0b290aFJlbW90ZUdBVFRDaGFyYWN0ZXJpc3RpYz4ge1xyXG4gICAgdGhpcy5jb25zb2xlLmxvZygnW0JMRTo6SW5mb10gR2V0dGluZyBDaGFyYWN0ZXJpc3RpYyBcIiVzXCIgb2YgJW8nLCBjaGFyYWN0ZXJpc3RpYywgcHJpbWFyeVNlcnZpY2UpO1xyXG5cclxuICAgIHJldHVybiBmcm9tKHRoaXMuZ2V0Q2hhcmFjdGVyaXN0aWMocHJpbWFyeVNlcnZpY2UsIGNoYXJhY3RlcmlzdGljKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBjaGFyYWN0ZXJpc3RpYydzIHN0YXRlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlcnZpY2UgVGhlIHBhcmVudCBzZXJ2aWNlIG9mIHRoZSBjaGFyYWN0ZXJpc3RpYy5cclxuICAgKiBAcGFyYW0gY2hhcmFjdGVyaXN0aWMgVGhlIHJlcXVlc3RlZCBjaGFyYWN0ZXJpc3RpY1xyXG4gICAqIEBwYXJhbSBzdGF0ZSBBbiBBcnJheUJ1ZmZlciBjb250YWluaW5nIHRoZSB2YWx1ZSBvZiB0aGUgY2hhcmFjdGVyaXN0aWMuXHJcbiAgICogQHJldHVybiBUaGUgcHJpbWFyeSBzZXJ2aWNlICh1c2VmdWwgZm9yIGNoYWluaW5nKS5cclxuICAgKi9cclxuICBzZXRDaGFyYWN0ZXJpc3RpY1N0YXRlKHNlcnZpY2U6IEJsdWV0b290aFNlcnZpY2VVVUlELCBjaGFyYWN0ZXJpc3RpYzogQmx1ZXRvb3RoQ2hhcmFjdGVyaXN0aWNVVUlELCBzdGF0ZTogQXJyYXlCdWZmZXIpIHtcclxuICAgIGNvbnN0IHByaW1hcnlTZXJ2aWNlID0gdGhpcy5nZXRQcmltYXJ5U2VydmljZSQodGhpcy5nYXR0U2VydmVyLCBzZXJ2aWNlKTtcclxuXHJcbiAgICBwcmltYXJ5U2VydmljZVxyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcclxuICAgICAgLnBpcGUobWVyZ2VNYXAoKF9wcmltYXJ5U2VydmljZTogQmx1ZXRvb3RoUmVtb3RlR0FUVFNlcnZpY2UpID0+IHRoaXMuZ2V0Q2hhcmFjdGVyaXN0aWMkKF9wcmltYXJ5U2VydmljZSwgY2hhcmFjdGVyaXN0aWMpKSlcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1zaGFkb3dlZC12YXJpYWJsZVxyXG4gICAgICAuc3Vic2NyaWJlKChjaGFyYWN0ZXJpc3RpYzogQmx1ZXRvb3RoUmVtb3RlR0FUVENoYXJhY3RlcmlzdGljKSA9PiB0aGlzLndyaXRlVmFsdWUkKGNoYXJhY3RlcmlzdGljLCBzdGF0ZSkpO1xyXG5cclxuICAgIHJldHVybiBwcmltYXJ5U2VydmljZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZXMgdGhlIHNwZWNpZmllZCBjaGFyYWN0ZXJpc3RpYyBvZiBhIGdpdmVuIHNlcnZpY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc2VydmljZSBUaGUgcGFyZW50IHNlcnZpY2Ugb2YgdGhlIGNoYXJhY3RlcmlzdGljLlxyXG4gICAqIEBwYXJhbSBjaGFyYWN0ZXJpc3RpYyBUaGUgcmVxdWVzdGVkIGNoYXJhY3RlcmlzdGljXHJcbiAgICogQHJldHVybiBUaGUgcHJpbWFyeSBzZXJ2aWNlICh1c2VmdWwgZm9yIGNoYWluaW5nKS5cclxuICAgKi9cclxuICBlbmFibGVDaGFyYWN0ZXJpc3RpYyhzZXJ2aWNlOiBCbHVldG9vdGhTZXJ2aWNlVVVJRCwgY2hhcmFjdGVyaXN0aWM6IEJsdWV0b290aENoYXJhY3RlcmlzdGljVVVJRCwgc3RhdGU/OiBhbnkpIHtcclxuICAgIHN0YXRlID0gc3RhdGUgfHwgbmV3IFVpbnQ4QXJyYXkoWzFdKTtcclxuICAgIHJldHVybiB0aGlzLnNldENoYXJhY3RlcmlzdGljU3RhdGUoc2VydmljZSwgY2hhcmFjdGVyaXN0aWMsIHN0YXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc2FibGVzIHRoZSBzcGVjaWZpZWQgY2hhcmFjdGVyaXN0aWMgb2YgYSBnaXZlbiBzZXJ2aWNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlcnZpY2UgVGhlIHBhcmVudCBzZXJ2aWNlIG9mIHRoZSBjaGFyYWN0ZXJpc3RpYy5cclxuICAgKiBAcGFyYW0gY2hhcmFjdGVyaXN0aWMgVGhlIHJlcXVlc3RlZCBjaGFyYWN0ZXJpc3RpYy5cclxuICAgKiBAcmV0dXJuIFRoZSBwcmltYXJ5IHNlcnZpY2UgKHVzZWZ1bCBmb3IgY2hhaW5pbmcpLlxyXG4gICAqL1xyXG4gIGRpc2JhbGVDaGFyYWN0ZXJpc3RpYyhzZXJ2aWNlOiBCbHVldG9vdGhTZXJ2aWNlVVVJRCwgY2hhcmFjdGVyaXN0aWM6IEJsdWV0b290aENoYXJhY3RlcmlzdGljVVVJRCwgc3RhdGU/OiBhbnkpIHtcclxuICAgIHN0YXRlID0gc3RhdGUgfHwgbmV3IFVpbnQ4QXJyYXkoWzBdKTtcclxuICAgIHJldHVybiB0aGlzLnNldENoYXJhY3RlcmlzdGljU3RhdGUoc2VydmljZSwgY2hhcmFjdGVyaXN0aWMsIHN0YXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BhdGNoZXMgbmV3IHZhbHVlcyBlbWl0dGVkIGJ5IGEgY2hhcmFjdGVyaXN0aWMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZXZlbnQgdGhlIGRpc3RwYXRjaGVkIGV2ZW50LlxyXG4gICAqL1xyXG4gIG9uQ2hhcmFjdGVyaXN0aWNDaGFuZ2VkKGV2ZW50OiBFdmVudCkge1xyXG4gICAgdGhpcy5jb25zb2xlLmxvZygnW0JMRTo6SW5mb10gRGlzcGF0Y2hpbmcgbmV3IGNoYXJhY3RlcmlzdGljIHZhbHVlICVvJywgZXZlbnQpO1xyXG5cclxuICAgIGNvbnN0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBCbHVldG9vdGhSZW1vdGVHQVRUQ2hhcmFjdGVyaXN0aWMpLnZhbHVlO1xyXG4gICAgdGhpcy5jaGFyYWN0ZXJpc3RpY1ZhbHVlQ2hhbmdlcyQuZW1pdCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWFkcyBhIHZhbHVlIGZyb20gdGhlIGNoYXJhY3RlcmlzdGljcywgYXMgYSBEYXRhVmlldy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBjaGFyYWN0ZXJpc3RpYyBUaGUgcmVxdWVzdGVkIGNoYXJhY3RlcmlzdGljLlxyXG4gICAqIEByZXR1cm4gdGhlIERhdGFWaWV3IHZhbHVlIChhcyBhbiBPYnNlcnZhYmxlKS5cclxuICAgKi9cclxuICByZWFkVmFsdWUkKGNoYXJhY3RlcmlzdGljOiBCbHVldG9vdGhSZW1vdGVHQVRUQ2hhcmFjdGVyaXN0aWMpOiBPYnNlcnZhYmxlPERhdGFWaWV3PiB7XHJcbiAgICB0aGlzLmNvbnNvbGUubG9nKCdbQkxFOjpJbmZvXSBSZWFkaW5nIENoYXJhY3RlcmlzdGljICVvJywgY2hhcmFjdGVyaXN0aWMpO1xyXG5cclxuICAgIHJldHVybiBmcm9tKFxyXG4gICAgICBjaGFyYWN0ZXJpc3RpY1xyXG4gICAgICAgIC5yZWFkVmFsdWUoKVxyXG4gICAgICAgIC50aGVuKChkYXRhOiBEYXRhVmlldykgPT4gUHJvbWlzZS5yZXNvbHZlKGRhdGEpLCAoZXJyb3I6IERPTUV4Y2VwdGlvbikgPT4gUHJvbWlzZS5yZWplY3QoYCR7ZXJyb3IubWVzc2FnZX1gKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXcml0ZXMgYSB2YWx1ZSBpbnRvIHRoZSBzcGVjaWZpZWQgY2hhcmFjdGVyaXN0aWMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY2hhcmFjdGVyaXN0aWMgVGhlIHJlcXVlc3RlZCBjaGFyYWN0ZXJpc3RpYy5cclxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIGJlIHdyaXR0ZW4gKGFzIGFuIEFycmF5QnVmZmVyIG9yIFVpbnQ4QXJyYXkpLlxyXG4gICAqIEByZXR1cm4gYW4gdm9pZCBPYnNlcnZhYmxlLlxyXG4gICAqL1xyXG4gIHdyaXRlVmFsdWUkKGNoYXJhY3RlcmlzdGljOiBCbHVldG9vdGhSZW1vdGVHQVRUQ2hhcmFjdGVyaXN0aWMsIHZhbHVlOiBBcnJheUJ1ZmZlciB8IFVpbnQ4QXJyYXkpIHtcclxuICAgIHRoaXMuY29uc29sZS5sb2coJ1tCTEU6OkluZm9dIFdyaXRpbmcgQ2hhcmFjdGVyaXN0aWMgJW8nLCBjaGFyYWN0ZXJpc3RpYyk7XHJcblxyXG4gICAgcmV0dXJuIGZyb20oY2hhcmFjdGVyaXN0aWMud3JpdGVWYWx1ZSh2YWx1ZSkudGhlbihfID0+IFByb21pc2UucmVzb2x2ZSgpLCAoZXJyb3I6IERPTUV4Y2VwdGlvbikgPT4gUHJvbWlzZS5yZWplY3QoYCR7ZXJyb3IubWVzc2FnZX1gKSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBzdHJlYW0gb2YgRGF0YVZpZXcgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNwZWNpZmllZCBjaGFyYWN0ZXJpc3RpYy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBjaGFyYWN0ZXJpc3RpYyBUaGUgY2hhcmFjdGVyaXN0aWMgd2hpY2ggdmFsdWUgeW91IHdhbnQgdG8gb2JzZXJ2ZVxyXG4gICAqIEByZXR1cm4gVGhlIHN0cmVhbSBvZiBEYXRhVmlldyB2YWx1ZXMuXHJcbiAgICovXHJcbiAgb2JzZXJ2ZVZhbHVlJChjaGFyYWN0ZXJpc3RpYzogQmx1ZXRvb3RoUmVtb3RlR0FUVENoYXJhY3RlcmlzdGljKTogT2JzZXJ2YWJsZTxEYXRhVmlldz4ge1xyXG4gICAgY2hhcmFjdGVyaXN0aWMuc3RhcnROb3RpZmljYXRpb25zKCk7XHJcbiAgICBjb25zdCBkaXNjb25uZWN0ZWQgPSBmcm9tRXZlbnQoY2hhcmFjdGVyaXN0aWMuc2VydmljZS5kZXZpY2UsICdnYXR0c2VydmVyZGlzY29ubmVjdGVkJyk7XHJcbiAgICByZXR1cm4gZnJvbUV2ZW50KGNoYXJhY3RlcmlzdGljLCAnY2hhcmFjdGVyaXN0aWN2YWx1ZWNoYW5nZWQnKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKGV2ZW50OiBFdmVudCkgPT4gKGV2ZW50LnRhcmdldCBhcyBCbHVldG9vdGhSZW1vdGVHQVRUQ2hhcmFjdGVyaXN0aWMpLnZhbHVlIGFzIERhdGFWaWV3KSxcclxuICAgICAgICB0YWtlVW50aWwoZGlzY29ubmVjdGVkKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSB1dGlsaXR5IG1ldGhvZCB0byBjb252ZXJ0IExFIHRvIGFuIHVuc2lnbmVkIDE2LWJpdCBpbnRlZ2VyIHZhbHVlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBEYXRhVmlldyBiaW5hcnkgZGF0YS5cclxuICAgKiBAcGFyYW0gYnl0ZU9mZnNldCBUaGUgb2Zmc2V0LCBpbiBieXRlLCBmcm9tIHRoZSBzdGFydCBvZiB0aGUgdmlldyB3aGVyZSB0byByZWFkIHRoZSBkYXRhLlxyXG4gICAqIEByZXR1cm4gQW4gdW5zaWduZWQgMTYtYml0IGludGVnZXIgbnVtYmVyLlxyXG4gICAqL1xyXG4gIGxpdHRsZUVuZGlhblRvVWludDE2KGRhdGE6IGFueSwgYnl0ZU9mZnNldDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXHJcbiAgICByZXR1cm4gKHRoaXMubGl0dGxlRW5kaWFuVG9VaW50OChkYXRhLCBieXRlT2Zmc2V0ICsgMSkgPDwgOCkgKyB0aGlzLmxpdHRsZUVuZGlhblRvVWludDgoZGF0YSwgYnl0ZU9mZnNldCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIHV0aWxpdHkgbWV0aG9kIHRvIGNvbnZlcnQgTEUgdG8gYW4gdW5zaWduZWQgOC1iaXQgaW50ZWdlciB2YWx1ZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSBUaGUgRGF0YVZpZXcgYmluYXJ5IGRhdGEuXHJcbiAgICogQHBhcmFtIGJ5dGVPZmZzZXQgVGhlIG9mZnNldCwgaW4gYnl0ZSwgZnJvbSB0aGUgc3RhcnQgb2YgdGhlIHZpZXcgd2hlcmUgdG8gcmVhZCB0aGUgZGF0YS5cclxuICAgKiBAcmV0dXJuIEFuIHVuc2lnbmVkIDgtYml0IGludGVnZXIgbnVtYmVyLlxyXG4gICAqL1xyXG4gIGxpdHRsZUVuZGlhblRvVWludDgoZGF0YTogYW55LCBieXRlT2Zmc2V0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGRhdGEuZ2V0VWludDgoYnl0ZU9mZnNldCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZW5kcyByYW5kb20gZGF0YSAoZm9yIHRlc3RpbmcgcHVycG9zZXMgb25seSkuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIFJhbmRvbSB1bnNpZ25lZCA4LWJpdCBpbnRlZ2VyIHZhbHVlcy5cclxuICAgKi9cclxuICBmYWtlTmV4dChmYWtlVmFsdWU/OiAoKSA9PiBEYXRhVmlldykge1xyXG4gICAgaWYgKGZha2VWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZha2VWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoOCkpO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXHJcbiAgICAgICAgZHYuc2V0VWludDgoMCwgKE1hdGgucmFuZG9tKCkgKiAxMTApIHwgMCk7XHJcbiAgICAgICAgcmV0dXJuIGR2O1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hhcmFjdGVyaXN0aWNWYWx1ZUNoYW5nZXMkLmVtaXQoZmFrZVZhbHVlKCkpO1xyXG4gIH1cclxufVxyXG4iXX0=