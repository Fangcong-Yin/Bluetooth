(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@manekinekko/angular-web-bluetooth', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.manekinekko = global.manekinekko || {}, global.manekinekko['angular-web-bluetooth'] = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common));
}(this, (function (exports, i0, rxjs, operators, common) { 'use strict';

    var BrowserWebBluetooth = /** @class */ (function () {
        function BrowserWebBluetooth() {
            this.ble = navigator.bluetooth;
            if (!this.ble) {
                throw new Error('Your browser does not support Smart Bluetooth. See http://caniuse.com/#search=Bluetooth for more details.');
            }
        }
        BrowserWebBluetooth.prototype.requestDevice = function (options) {
            return this.ble.requestDevice(options);
        };
        return BrowserWebBluetooth;
    }());
    BrowserWebBluetooth.decorators = [
        { type: i0.Injectable }
    ];
    /** @nocollapse */
    BrowserWebBluetooth.ctorParameters = function () { return []; };

    var ServerWebBluetooth = /** @class */ (function () {
        function ServerWebBluetooth() {
        }
        ServerWebBluetooth.instance = function () {
            // mocked object for now
            return {};
        };
        return ServerWebBluetooth;
    }());
    ServerWebBluetooth.decorators = [
        { type: i0.Injectable }
    ];

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var ConsoleLoggerService = /** @class */ (function () {
        function ConsoleLoggerService() {
        }
        ConsoleLoggerService.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log.apply(console, args);
        };
        ConsoleLoggerService.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.error.apply(console, args);
        };
        ConsoleLoggerService.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn.apply(console, args);
        };
        return ConsoleLoggerService;
    }());
    /** @nocollapse */ ConsoleLoggerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ConsoleLoggerService_Factory() { return new ConsoleLoggerService(); }, token: ConsoleLoggerService, providedIn: "root" });
    ConsoleLoggerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    var NoLoggerService = /** @class */ (function () {
        function NoLoggerService() {
        }
        NoLoggerService.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        NoLoggerService.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        NoLoggerService.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        return NoLoggerService;
    }());
    /** @nocollapse */ NoLoggerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NoLoggerService_Factory() { return new NoLoggerService(); }, token: NoLoggerService, providedIn: "root" });
    NoLoggerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];

    var BluetoothCore = /** @class */ (function () {
        function BluetoothCore(webBle, console) {
            this.webBle = webBle;
            this.console = console;
            this.device$ = new i0.EventEmitter();
            this.gatt$ = new i0.EventEmitter();
            this.characteristicValueChanges$ = new i0.EventEmitter();
            this.gattServer = null;
        }
        BluetoothCore.prototype.getDevice$ = function () {
            return this.device$;
        };
        BluetoothCore.prototype.getGATT$ = function () {
            return this.gatt$;
        };
        BluetoothCore.prototype.streamValues$ = function () {
            return this.characteristicValueChanges$.pipe(operators.filter(function (value) { return value && value.byteLength > 0; }));
        };
        /**
         * Run the discovery process and read the value form the provided service and characteristic
         * @param options the ReadValueOptions
         */
        BluetoothCore.prototype.value = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var device, gatt, primaryService, characteristic, value, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.console.log('[BLE::Info] Reading value with options %o', options);
                            if (typeof options.acceptAllDevices === 'undefined') {
                                options.acceptAllDevices = true;
                            }
                            if (typeof options.optionalServices === 'undefined') {
                                options.optionalServices = [options.service];
                            }
                            else {
                                options.optionalServices = __spread(options.optionalServices);
                            }
                            this.console.log('[BLE::Info] Reading value with options %o', options);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, , 8]);
                            return [4 /*yield*/, this.discover({
                                    acceptAllDevices: options.acceptAllDevices,
                                    optionalServices: options.optionalServices
                                })];
                        case 2:
                            device = _a.sent();
                            this.console.log('[BLE::Info] Device info %o', device);
                            return [4 /*yield*/, this.connectDevice(device)];
                        case 3:
                            gatt = _a.sent();
                            this.console.log('[BLE::Info] GATT info %o', gatt);
                            return [4 /*yield*/, this.getPrimaryService(gatt, options.service)];
                        case 4:
                            primaryService = _a.sent();
                            this.console.log('[BLE::Info] Primary Service info %o', primaryService);
                            return [4 /*yield*/, this.getCharacteristic(primaryService, options.characteristic)];
                        case 5:
                            characteristic = _a.sent();
                            this.console.log('[BLE::Info] Characteristic info %o', characteristic);
                            return [4 /*yield*/, characteristic.readValue()];
                        case 6:
                            value = _a.sent();
                            this.console.log('[BLE::Info] Value info %o', value);
                            return [2 /*return*/, value];
                        case 7:
                            error_1 = _a.sent();
                            throw new Error(error_1);
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        BluetoothCore.prototype.value$ = function (options) {
            return rxjs.from(this.value(options));
        };
        /**
         * Run the discovery process.
         *
         * @param Options such as filters and optional services
         * @return  The GATT server for the chosen device
         */
        BluetoothCore.prototype.discover = function (options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var device, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options.optionalServices = options.optionalServices || ['generic_access'];
                            this.console.log('[BLE::Info] Requesting devices with options %o', options);
                            device = null;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.webBle.requestDevice(options)];
                        case 2:
                            device = _a.sent();
                            device.addEventListener('gattserverdisconnected', this.onDeviceDisconnected.bind(this));
                            if (device) {
                                this.device$.emit(device);
                            }
                            else {
                                this.device$.error("[BLE::Error] Can not get the Bluetooth Remote GATT Server. Abort.");
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            this.console.error(error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/, device];
                    }
                });
            });
        };
        /**
         * This handler will trigger when the client disconnets from the server.
         *
         * @param event The onDeviceDisconnected event
         */
        BluetoothCore.prototype.onDeviceDisconnected = function (event) {
            var disconnectedDevice = event.target;
            this.console.log('[BLE::Info] disconnected device %o', disconnectedDevice);
            this.device$.emit(null);
        };
        /**
         * Run the discovery process.
         *
         * @param Options such as filters and optional services
         * @return  Emites the value of the requested service read from the device
         */
        BluetoothCore.prototype.discover$ = function (options) {
            var _this = this;
            return rxjs.from(this.discover(options)).pipe(operators.mergeMap(function (device) { return _this.connectDevice$(device); }));
        };
        /**
         * Connect to current device.
         *
         * @return  Emites the gatt server instance of the requested device
         */
        BluetoothCore.prototype.connectDevice = function (device) {
            return __awaiter(this, void 0, void 0, function () {
                var gattServer, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!device) return [3 /*break*/, 5];
                            this.console.log('[BLE::Info] Connecting to Bluetooth Remote GATT Server of %o', device);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, device.gatt.connect()];
                        case 2:
                            gattServer = _a.sent();
                            this.gattServer = gattServer;
                            this.gatt$.emit(gattServer);
                            return [2 /*return*/, gattServer];
                        case 3:
                            error_3 = _a.sent();
                            // probably the user has canceled the discovery
                            Promise.reject("" + error_3.message);
                            this.gatt$.error("" + error_3.message);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            this.console.error('[BLE::Error] Was not able to connect to Bluetooth Remote GATT Server');
                            this.gatt$.error(null);
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Connect to current device.
         *
         * @return  Emites the gatt server instance of the requested device
         */
        BluetoothCore.prototype.connectDevice$ = function (device) {
            return rxjs.from(this.connectDevice(device));
        };
        /**
         * Disconnect the current connected device
         */
        BluetoothCore.prototype.disconnectDevice = function () {
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
        };
        /**
         * Requests the primary service.
         *
         * @param gatt The BluetoothRemoteGATTServer sever
         * @param service The UUID of the primary service
         * @return The remote service (as a Promise)
         */
        BluetoothCore.prototype.getPrimaryService = function (gatt, service) {
            return __awaiter(this, void 0, void 0, function () {
                var remoteService, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 5]);
                            return [4 /*yield*/, gatt.getPrimaryService(service)];
                        case 1:
                            remoteService = _a.sent();
                            return [4 /*yield*/, Promise.resolve(remoteService)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_4 = _a.sent();
                            return [4 /*yield*/, Promise.reject(error_4.message + " (" + service + ")")];
                        case 4: return [2 /*return*/, _a.sent()];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Requests the primary service.
         *
         * @param gatt The BluetoothRemoteGATTServer sever
         * @param service The UUID of the primary service
         * @return The remote service (as an observable).
         */
        BluetoothCore.prototype.getPrimaryService$ = function (gatt, service) {
            this.console.log('[BLE::Info] Getting primary service "%s" (if available) of %o', service, gatt);
            if (gatt) {
                return rxjs.from(this.getPrimaryService(gatt, service));
            }
            else {
                return rxjs.throwError(new Error('[BLE::Error] Was not able to connect to the Bluetooth Remote GATT Server'));
            }
        };
        /**
         * Requests a characteristic from the primary service.
         *
         * @param primaryService The primary service.
         * @param characteristic The characteristic's UUID.
         * @returns The characteristic description (as a Promise).
         */
        BluetoothCore.prototype.getCharacteristic = function (primaryService, characteristic) {
            return __awaiter(this, void 0, void 0, function () {
                var char_1, rejectionError_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.console.log('[BLE::Info] Getting Characteristic "%s" of %o', characteristic, primaryService);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, primaryService.getCharacteristic(characteristic)];
                        case 2:
                            char_1 = _a.sent();
                            // listen for characteristic value changes
                            if (char_1.properties.notify) {
                                char_1.startNotifications().then(function (_) {
                                    _this.console.log('[BLE::Info] Starting notifications of "%s"', characteristic);
                                    char_1.addEventListener('characteristicvaluechanged', _this.onCharacteristicChanged.bind(_this));
                                }, function (error) {
                                    Promise.reject(error.message + " (" + characteristic + ")");
                                });
                            }
                            else {
                                char_1.addEventListener('characteristicvaluechanged', this.onCharacteristicChanged.bind(this));
                            }
                            return [2 /*return*/, char_1];
                        case 3:
                            rejectionError_1 = _a.sent();
                            Promise.reject(rejectionError_1.message + " (" + characteristic + ")");
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Requests a characteristic from the primary service.
         *
         * @param primaryService The primary service.
         * @param characteristic The characteristic's UUID.
         * @returns The characteristic description (as a Observable).
         */
        BluetoothCore.prototype.getCharacteristic$ = function (primaryService, characteristic) {
            this.console.log('[BLE::Info] Getting Characteristic "%s" of %o', characteristic, primaryService);
            return rxjs.from(this.getCharacteristic(primaryService, characteristic));
        };
        /**
         * Sets the characteristic's state.
         *
         * @param service The parent service of the characteristic.
         * @param characteristic The requested characteristic
         * @param state An ArrayBuffer containing the value of the characteristic.
         * @return The primary service (useful for chaining).
         */
        BluetoothCore.prototype.setCharacteristicState = function (service, characteristic, state) {
            var _this = this;
            var primaryService = this.getPrimaryService$(this.gattServer, service);
            primaryService
                // tslint:disable-next-line: variable-name
                .pipe(operators.mergeMap(function (_primaryService) { return _this.getCharacteristic$(_primaryService, characteristic); }))
                // tslint:disable-next-line: no-shadowed-variable
                .subscribe(function (characteristic) { return _this.writeValue$(characteristic, state); });
            return primaryService;
        };
        /**
         * Enables the specified characteristic of a given service.
         *
         * @param service The parent service of the characteristic.
         * @param characteristic The requested characteristic
         * @return The primary service (useful for chaining).
         */
        BluetoothCore.prototype.enableCharacteristic = function (service, characteristic, state) {
            state = state || new Uint8Array([1]);
            return this.setCharacteristicState(service, characteristic, state);
        };
        /**
         * Disables the specified characteristic of a given service.
         *
         * @param service The parent service of the characteristic.
         * @param characteristic The requested characteristic.
         * @return The primary service (useful for chaining).
         */
        BluetoothCore.prototype.disbaleCharacteristic = function (service, characteristic, state) {
            state = state || new Uint8Array([0]);
            return this.setCharacteristicState(service, characteristic, state);
        };
        /**
         * Dispatches new values emitted by a characteristic.
         *
         * @param event the distpatched event.
         */
        BluetoothCore.prototype.onCharacteristicChanged = function (event) {
            this.console.log('[BLE::Info] Dispatching new characteristic value %o', event);
            var value = event.target.value;
            this.characteristicValueChanges$.emit(value);
        };
        /**
         * Reads a value from the characteristics, as a DataView.
         *
         * @param characteristic The requested characteristic.
         * @return the DataView value (as an Observable).
         */
        BluetoothCore.prototype.readValue$ = function (characteristic) {
            this.console.log('[BLE::Info] Reading Characteristic %o', characteristic);
            return rxjs.from(characteristic
                .readValue()
                .then(function (data) { return Promise.resolve(data); }, function (error) { return Promise.reject("" + error.message); }));
        };
        /**
         * Writes a value into the specified characteristic.
         *
         * @param characteristic The requested characteristic.
         * @param value The value to be written (as an ArrayBuffer or Uint8Array).
         * @return an void Observable.
         */
        BluetoothCore.prototype.writeValue$ = function (characteristic, value) {
            this.console.log('[BLE::Info] Writing Characteristic %o', characteristic);
            return rxjs.from(characteristic.writeValue(value).then(function (_) { return Promise.resolve(); }, function (error) { return Promise.reject("" + error.message); }));
        };
        /**
         * A stream of DataView values emitted by the specified characteristic.
         *
         * @param characteristic The characteristic which value you want to observe
         * @return The stream of DataView values.
         */
        BluetoothCore.prototype.observeValue$ = function (characteristic) {
            characteristic.startNotifications();
            var disconnected = rxjs.fromEvent(characteristic.service.device, 'gattserverdisconnected');
            return rxjs.fromEvent(characteristic, 'characteristicvaluechanged')
                .pipe(operators.map(function (event) { return event.target.value; }), operators.takeUntil(disconnected));
        };
        /**
         * A utility method to convert LE to an unsigned 16-bit integer values.
         *
         * @param data The DataView binary data.
         * @param byteOffset The offset, in byte, from the start of the view where to read the data.
         * @return An unsigned 16-bit integer number.
         */
        BluetoothCore.prototype.littleEndianToUint16 = function (data, byteOffset) {
            // tslint:disable-next-line:no-bitwise
            return (this.littleEndianToUint8(data, byteOffset + 1) << 8) + this.littleEndianToUint8(data, byteOffset);
        };
        /**
         * A utility method to convert LE to an unsigned 8-bit integer values.
         *
         * @param data The DataView binary data.
         * @param byteOffset The offset, in byte, from the start of the view where to read the data.
         * @return An unsigned 8-bit integer number.
         */
        BluetoothCore.prototype.littleEndianToUint8 = function (data, byteOffset) {
            return data.getUint8(byteOffset);
        };
        /**
         * Sends random data (for testing purposes only).
         *
         * @return Random unsigned 8-bit integer values.
         */
        BluetoothCore.prototype.fakeNext = function (fakeValue) {
            if (fakeValue === undefined) {
                fakeValue = function () {
                    var dv = new DataView(new ArrayBuffer(8));
                    // tslint:disable-next-line:no-bitwise
                    dv.setUint8(0, (Math.random() * 110) | 0);
                    return dv;
                };
            }
            this.characteristicValueChanges$.emit(fakeValue());
        };
        return BluetoothCore;
    }());
    /** @nocollapse */ BluetoothCore.ɵprov = i0.ɵɵdefineInjectable({ factory: function BluetoothCore_Factory() { return new BluetoothCore(i0.ɵɵinject(BrowserWebBluetooth), i0.ɵɵinject(ConsoleLoggerService)); }, token: BluetoothCore, providedIn: "root" });
    BluetoothCore.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    BluetoothCore.ctorParameters = function () { return [
        { type: BrowserWebBluetooth },
        { type: ConsoleLoggerService }
    ]; };

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
        return new i0.InjectionToken('AWBOptions');
    }
    var WebBluetoothModule = /** @class */ (function () {
        function WebBluetoothModule() {
        }
        WebBluetoothModule.forRoot = function (options) {
            if (options === void 0) { options = {}; }
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
        };
        return WebBluetoothModule;
    }());
    WebBluetoothModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [common.CommonModule]
                },] }
    ];

    // http://processors.wiki.ti.com/images/a/a8/BLE_SensorTag_GATT_Server.pdf
    // prettier-ignore
    var TiTag = {
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
    var ɵ0 = function (key) { return TiTag[key].SERVICE; };
    var TI_SENSORAG_SERVICES = Object.keys(TiTag).map(ɵ0);

    /*
     * Fake Web Bluetooth implementation
     * Replace real browser Bluetooth objects by a much simpler objects that implement some required functionalities
     */
    var FakeBluetoothDevice = /** @class */ (function () {
        function FakeBluetoothDevice(id, name) {
            this.id = id;
            this.name = name;
            this.listeners = {
                gattserverdisconnected: []
            };
        }
        FakeBluetoothDevice.prototype.addEventListener = function (type, listener) {
            this.listeners[type] = __spread(this.listeners[type], [
                listener
            ]);
        };
        FakeBluetoothDevice.prototype.disconnect = function () {
            var mockedEvent = { target: this };
            this.listeners.gattserverdisconnected.forEach(function (listener) { return listener(mockedEvent); });
        };
        FakeBluetoothDevice.prototype.clear = function () {
            this.id = undefined;
            this.name = undefined;
            this.listeners = {
                gattserverdisconnected: []
            };
        };
        return FakeBluetoothDevice;
    }());
    var FakeBluetoothRemoteGATTServer = /** @class */ (function () {
        function FakeBluetoothRemoteGATTServer(device, services) {
            this.device = device;
            this.services = services;
            this.connected = false;
            device.gatt = this;
        }
        FakeBluetoothRemoteGATTServer.prototype.connect = function () {
            this.connected = true;
            return Promise.resolve(this);
        };
        FakeBluetoothRemoteGATTServer.prototype.getPrimaryService = function (service) {
            return Promise.resolve(this.services[service].service);
        };
        FakeBluetoothRemoteGATTServer.prototype.disconnect = function () {
            this.device.disconnect();
            this.connected = false;
        };
        return FakeBluetoothRemoteGATTServer;
    }());
    var FakeBluetoothRemoteGATTService = /** @class */ (function () {
        function FakeBluetoothRemoteGATTService(device, characteristics) {
            this.device = device;
            this.characteristics = characteristics;
            this.characteristics.service = this;
        }
        FakeBluetoothRemoteGATTService.prototype.getCharacteristic = function (characteristic) {
            return Promise.resolve(this.characteristics[characteristic]);
        };
        return FakeBluetoothRemoteGATTService;
    }());
    var FakeBluetoothRemoteGATTCharacteristic = /** @class */ (function () {
        function FakeBluetoothRemoteGATTCharacteristic(properties, initialValue) {
            this.listeners = {
                characteristicvaluechanged: []
            };
            this.properties = properties;
            this.value = initialValue;
            this.initialValue = initialValue;
        }
        FakeBluetoothRemoteGATTCharacteristic.prototype.readValue = function () {
            return Promise.resolve(this.value);
        };
        FakeBluetoothRemoteGATTCharacteristic.prototype.addEventListener = function (type, listener) {
            this.listeners[type] = __spread(this.listeners[type], [
                listener
            ]);
        };
        FakeBluetoothRemoteGATTCharacteristic.prototype.changeValue = function (value) {
            this.value = value;
            var mockedEvent = { target: this };
            this.listeners.characteristicvaluechanged.forEach(function (listener) { return listener(mockedEvent); });
        };
        FakeBluetoothRemoteGATTCharacteristic.prototype.clear = function () {
            this.value = this.initialValue;
            this.listeners = {
                characteristicvaluechanged: []
            };
        };
        return FakeBluetoothRemoteGATTCharacteristic;
    }());

    /*
     * Public API Surface of angular-web-bluetooth
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BluetoothCore = BluetoothCore;
    exports.BrowserWebBluetooth = BrowserWebBluetooth;
    exports.ConsoleLoggerService = ConsoleLoggerService;
    exports.FakeBluetoothDevice = FakeBluetoothDevice;
    exports.FakeBluetoothRemoteGATTCharacteristic = FakeBluetoothRemoteGATTCharacteristic;
    exports.FakeBluetoothRemoteGATTServer = FakeBluetoothRemoteGATTServer;
    exports.FakeBluetoothRemoteGATTService = FakeBluetoothRemoteGATTService;
    exports.NoLoggerService = NoLoggerService;
    exports.ServerWebBluetooth = ServerWebBluetooth;
    exports.TI_SENSORAG_SERVICES = TI_SENSORAG_SERVICES;
    exports.TiTag = TiTag;
    exports.WebBluetoothModule = WebBluetoothModule;
    exports.browserWebBluetooth = browserWebBluetooth;
    exports.consoleLoggerServiceConfig = consoleLoggerServiceConfig;
    exports.makeMeTokenInjector = makeMeTokenInjector;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=manekinekko-angular-web-bluetooth.umd.js.map
