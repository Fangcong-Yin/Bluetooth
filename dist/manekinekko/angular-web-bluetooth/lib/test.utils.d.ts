/// <reference types="web-bluetooth" />
export declare class FakeBluetoothDevice {
    id: string;
    name: string;
    gatt: BluetoothRemoteGATTServer;
    private listeners;
    constructor(id: string, name: string);
    addEventListener(type: string, listener: EventListener): void;
    disconnect(): void;
    clear(): void;
}
export declare class FakeBluetoothRemoteGATTServer {
    device: any;
    services: {
        [key: string]: {
            service: any;
            primary: boolean;
        };
    };
    connected: boolean;
    constructor(device: any, services: {
        [key: string]: {
            service: any;
            primary: boolean;
        };
    });
    connect(): Promise<this>;
    getPrimaryService(service: BluetoothServiceUUID): Promise<any>;
    disconnect(): void;
}
export declare class FakeBluetoothRemoteGATTService {
    device: any;
    characteristics: any;
    constructor(device: any, characteristics: any);
    getCharacteristic(characteristic: BluetoothCharacteristicUUID): Promise<any>;
}
export declare class FakeBluetoothRemoteGATTCharacteristic {
    value: DataView;
    properties: BluetoothCharacteristicProperties;
    private readonly initialValue;
    private listeners;
    constructor(properties: BluetoothCharacteristicProperties, initialValue?: DataView);
    readValue(): Promise<DataView>;
    addEventListener(type: string, listener: EventListener): void;
    changeValue(value: DataView): void;
    clear(): void;
}
