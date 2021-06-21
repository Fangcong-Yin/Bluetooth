import { Injectable, ɵɵdefineInjectable, EventEmitter, ɵɵinject, InjectionToken, NgModule } from '@angular/core';
import { __awaiter } from 'tslib';
import { from, throwError, fromEvent } from 'rxjs';
import { filter, mergeMap, map, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

class BrowserWebBluetooth {
    constructor() {
        this.ble = navigator.bluetooth;
        if (!this.ble) {
            throw new Error('Your browser does not support Smart Bluetooth. See http://caniuse.com/#search=Bluetooth for more details.');
        }
    }
    requestDevice(options) {
        return this.ble.requestDevice(options);
    }
}
BrowserWebBluetooth.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BrowserWebBluetooth.ctorParameters = () => [];

class ServerWebBluetooth {
    static instance() {
        // mocked object for now
        return {};
    }
}
ServerWebBluetooth.decorators = [
    { type: Injectable }
];

class ConsoleLoggerService {
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
/** @nocollapse */ ConsoleLoggerService.ɵprov = ɵɵdefineInjectable({ factory: function ConsoleLoggerService_Factory() { return new ConsoleLoggerService(); }, token: ConsoleLoggerService, providedIn: "root" });
ConsoleLoggerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
class NoLoggerService {
    log(...args) { }
    error(...args) { }
    warn(...args) { }
}
/** @nocollapse */ NoLoggerService.ɵprov = ɵɵdefineInjectable({ factory: function NoLoggerService_Factory() { return new NoLoggerService(); }, token: NoLoggerService, providedIn: "root" });
NoLoggerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];

class BluetoothCore {
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
/** @nocollapse */ BluetoothCore.ɵprov = ɵɵdefineInjectable({ factory: function BluetoothCore_Factory() { return new BluetoothCore(ɵɵinject(BrowserWebBluetooth), ɵɵinject(ConsoleLoggerService)); }, token: BluetoothCore, providedIn: "root" });
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

function browserWebBluetooth() {
    return new BrowserWebBluetooth();
}
function consoleLoggerServiceConfig(options) {
    if (options && options.enableTracing) {
        return new ConsoleLoggerService();
    }
    else {
        return new NoLoggerService();
    }
}
function makeMeTokenInjector() {
    return new InjectionToken('AWBOptions');
}
class WebBluetoothModule {
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

// http://processors.wiki.ti.com/images/a/a8/BLE_SensorTag_GATT_Server.pdf
// prettier-ignore
const TiTag = {
    DEVICE_INFORMATION: {
        SERVICE: 'f000180a-0451-4000-b000-000000000000',
        SYSTEM_ID: 'f0002a23-0451-4000-b000-000000000000',
        MODEL_NUMBER: 'f0002a24-0451-4000-b000-000000000000',
        SERIAL_NUMBER: 'f0002a25-0451-4000-b000-000000000000',
        FIRMWARE_REV: 'f0002a26-0451-4000-b000-000000000000',
        HARDWARE_REV: 'f0002a27-0451-4000-b000-000000000000',
        SOFTWARE_REV: 'f0002a28-0451-4000-b000-000000000000',
        MANIFACTURER: 'f0002a29-0451-4000-b000-000000000000',
        IEEE11073: 'f0002a2a-0451-4000-b000-000000000000',
        PNP_ID: 'f0002a50-0451-4000-b000-000000000000'
    },
    BATTERY: {
        SERVICE: 'f000180f-0451-4000-b000-000000000000',
        LEVEL: 'f0002a19-0451-4000-b000-000000000000'
    },
    TEMPERATURE: {
        SERVICE: 'f000aa00-0451-4000-b000-000000000000',
        DATA: 'f000aa01-0451-4000-b000-000000000000',
        CONFIGURATION: 'f000aa02-0451-4000-b000-000000000000',
        PERIOD: 'f000aa03-0451-4000-b000-000000000000'
    },
    HUMIDITY: {
        SERVICE: 'f000aa20-0451-4000-b000-000000000000',
        DATA: 'f000aa21-0451-4000-b000-000000000000',
        CONFIGURATION: 'f000aa22-0451-4000-b000-000000000000',
        PERIOD: 'f000aa23-0451-4000-b000-000000000000'
    },
    BAROMETER: {
        SERVICE: 'f000aa40-0451-4000-b000-000000000000',
        DATA: 'f000aa41-0451-4000-b000-000000000000',
        CONFIGURATION: 'f000aa42-0451-4000-b000-000000000000',
        PERIOD: 'f000aa44-0451-4000-b000-000000000000'
    },
    // service not available in model CC2650
    // ACCELEROMETER : {
    //   SERVICE :                 'f000aa10-0451-4000-b000-000000000000',
    //   DATA :                    'f000aa11-0451-4000-b000-000000000000',
    //   CONFIGURATION :           'f000aa12-0451-4000-b000-000000000000',
    //   PERIOD :                  'f000aa13-0451-4000-b000-000000000000'
    // },
    // service not available in model CC2650
    // MAGNETOMETER : {
    //   SERVICE :                 'f000aa30-0451-4000-b000-000000000000',
    //   DATA :                    'f000aa31-0451-4000-b000-000000000000',
    //   CONFIGURATION :           'f000aa32-0451-4000-b000-000000000000',
    //   PERIOD :                  'f000aa33-0451-4000-b000-000000000000'
    // },
    // service not available in model CC2650
    // GYROSCOPE : {
    //   SERVICE :                 'f000aa50-0451-4000-b000-000000000000',
    //   DATA :                    'f000aa51-0451-4000-b000-000000000000',
    //   CONFIGURATION :           'f000aa52-0451-4000-b000-000000000000',
    //   PERIOD :                  'f000aa53-0451-4000-b000-000000000000'
    // },
    MOVEMENT: {
        SERVICE: 'f000aa80-0451-4000-b000-000000000000',
        DATA: 'f000aa81-0451-4000-b000-000000000000',
        CONFIGURATION: 'f000aa82-0451-4000-b000-000000000000',
        PERIOD: 'f000aa83-0451-4000-b000-000000000000'
    },
    LIGHT: {
        SERVICE: 'f000aa70-0451-4000-b000-000000000000',
        DATA: 'f000aa71-0451-4000-b000-000000000000',
        CONFIGURATION: 'f000aa72-0451-4000-b000-000000000000',
        PERIOD: 'f000aa73-0451-4000-b000-000000000000'
    },
    KEYPRESS: {
        SERVICE: 'f000ffe0-0451-4000-b000-000000000000',
        STATE: 'f000ffe1-0451-4000-b000-000000000000'
    },
    __REGISTER__: {
        SERVICE: 'f000ac00-0451-4000-b000-000000000000',
        DATA: 'f000ac01-0451-4000-b000-000000000000',
        ADDRESS: 'f000ac02-0451-4000-b000-000000000000',
        DEVICE_ID: 'f000ac03-0451-4000-b000-000000000000'
    },
    CONTROL: {
        SERVICE: 'f000ccc0-0451-4000-b000-000000000000',
        CURRENT_USED_PARAMETERS: 'f000ccc1-0451-4000-b000-000000000000',
        REQUEST_NEW_PARAMETERS: 'f000ccc2-0451-4000-b000-000000000000',
        DISCONNECT_REQUEST: 'f000ccc3-0451-4000-b000-000000000000'
    },
    OAD: {
        SERVICE: 'f000ffc0-0451-4000-b000-000000000000',
        IMAGE_NOTIFY: 'f000ffc1-0451-4000-b000-000000000000',
        IMAGE_BLOCK_REQUEST: 'f000ffc2-0451-4000-b000-000000000000',
        IMAGE_COUNT: 'f000ffc3-0451-4000-b000-000000000000',
        IMAGE_STATUS: 'f000ffc4-0451-4000-b000-000000000000'
    },
    IO: {
        SERVICE: 'f000aa64-0451-4000-b000-000000000000',
        DATA: 'f000aa65-0451-4000-b000-000000000000',
        CONFIG: 'f000aa66-0451-4000-b000-000000000000'
    }
};
const ɵ0 = key => TiTag[key].SERVICE;
const TI_SENSORAG_SERVICES = Object.keys(TiTag).map(ɵ0);

/*
 * Fake Web Bluetooth implementation
 * Replace real browser Bluetooth objects by a much simpler objects that implement some required functionalities
 */
class FakeBluetoothDevice {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.listeners = {
            gattserverdisconnected: []
        };
    }
    addEventListener(type, listener) {
        this.listeners[type] = [
            ...this.listeners[type],
            listener
        ];
    }
    disconnect() {
        const mockedEvent = { target: this };
        this.listeners.gattserverdisconnected.forEach(listener => listener(mockedEvent));
    }
    clear() {
        this.id = undefined;
        this.name = undefined;
        this.listeners = {
            gattserverdisconnected: []
        };
    }
}
class FakeBluetoothRemoteGATTServer {
    constructor(device, services) {
        this.device = device;
        this.services = services;
        this.connected = false;
        device.gatt = this;
    }
    connect() {
        this.connected = true;
        return Promise.resolve(this);
    }
    getPrimaryService(service) {
        return Promise.resolve(this.services[service].service);
    }
    disconnect() {
        this.device.disconnect();
        this.connected = false;
    }
}
class FakeBluetoothRemoteGATTService {
    constructor(device, characteristics) {
        this.device = device;
        this.characteristics = characteristics;
        this.characteristics.service = this;
    }
    getCharacteristic(characteristic) {
        return Promise.resolve(this.characteristics[characteristic]);
    }
}
class FakeBluetoothRemoteGATTCharacteristic {
    constructor(properties, initialValue) {
        this.listeners = {
            characteristicvaluechanged: []
        };
        this.properties = properties;
        this.value = initialValue;
        this.initialValue = initialValue;
    }
    readValue() {
        return Promise.resolve(this.value);
    }
    addEventListener(type, listener) {
        this.listeners[type] = [
            ...this.listeners[type],
            listener
        ];
    }
    changeValue(value) {
        this.value = value;
        const mockedEvent = { target: this };
        this.listeners.characteristicvaluechanged.forEach(listener => listener(mockedEvent));
    }
    clear() {
        this.value = this.initialValue;
        this.listeners = {
            characteristicvaluechanged: []
        };
    }
}

/*
 * Public API Surface of angular-web-bluetooth
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BluetoothCore, BrowserWebBluetooth, ConsoleLoggerService, FakeBluetoothDevice, FakeBluetoothRemoteGATTCharacteristic, FakeBluetoothRemoteGATTServer, FakeBluetoothRemoteGATTService, NoLoggerService, ServerWebBluetooth, TI_SENSORAG_SERVICES, TiTag, WebBluetoothModule, browserWebBluetooth, consoleLoggerServiceConfig, makeMeTokenInjector, ɵ0 };
//# sourceMappingURL=manekinekko-angular-web-bluetooth.js.map
