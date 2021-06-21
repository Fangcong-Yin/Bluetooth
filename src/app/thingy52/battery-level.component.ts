import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BluetoothCore, BrowserWebBluetooth, ConsoleLoggerService } from '@manekinekko/angular-web-bluetooth';
import { exit } from 'process';
import { consoleLoggerServiceConfig } from 'projects/manekinekko/angular-web-bluetooth/src/public_api';
import { Subscription } from 'rxjs';
import { BleService } from '../ble.service';

export const bleCore = (b: BrowserWebBluetooth, l: ConsoleLoggerService) => new BluetoothCore(b, l);
export const bleService = (b: BluetoothCore) => new BleService(b);
declare var require: any;

// make sure we get a singleton instance of each service
const PROVIDERS = [{
  provide: BluetoothCore,
  useFactory: bleCore,
  deps: [BrowserWebBluetooth, ConsoleLoggerService]
}, {
  provide: BleService,
  useFactory: bleService,
  deps: [BluetoothCore]
}];
/*
const noble = require('noble');
const nextTick = require('next-tick');

// Create a Linking object
const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner({'noble': noble});
*/
const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();
@Component({
  selector: 'ble-battery-level',
  template: `
    <span data-testid="value">{{ value || "000" }}<sup>%</sup></span>
    <mat-progress-spinner
        [color]="color"
        [mode]="mode"
        diameter="250"
        strokeWidth="2"
        [value]="value || 100">
    </mat-progress-spinner>
    <mat-icon>battery_charging_full</mat-icon>
  `,
  styles: [`
  :host {
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-align: center;
  }
  span {
    font-size: 5em;
    position: absolute;
    top: 222px;
    width: 120px;
    display: block;
    text-align: center;
  }
  sup {
    font-size: 24px;
  }
  mat-progress-spinner {
    top: 90px;
    left: 5px;
  }
  mat-icon {
    position: absolute;
    bottom: 255px;
    font-size: 38px;
  }
  `],
  providers: PROVIDERS
})
export class BatteryLevelComponent implements OnInit, OnDestroy {
  value = null;
  mode = 'determinate';
  color = 'primary';
  valuesSubscription: Subscription;
  streamSubscription: Subscription;
  deviceSubscription: Subscription;

  get device() {
    /*
    scanner.onadvertisement = (ad) => {
      console.log(JSON.stringify(ad, null, '  '));
    };
    
    // Start scanning
    scanner.startScan().then(() => {
      console.log('Started to scan.')  ;
    }).catch((error) => {
      console.error(error);
    });*/
    return this.service.getDevice();
  }

  constructor(
    public service: BleService,
    public snackBar: MatSnackBar,
    public console: ConsoleLoggerService) {

    service.config({
      decoder: (value: DataView) =>
      value.getInt8(0),
      service: 'battery_service',
      characteristic: 'battery_level'
    });
  }

  ngOnInit() {
    // Set an Event handler for becons

    /*
    noble.on('stateChange', function (state) {
      if (state === 'poweredOn') {
        noble.startScanning();
      } else {
        noble.stopScanning();
      }
    });
    
    noble.on('discover', function (peripheral) {
      console.log(`peripheral discovered (${peripheral.id} with address <${peripheral.address}, ${peripheral.addressType}>, connectable ${peripheral.connectable}, RSSI ${peripheral.rssi}:`);
      console.log('\thello my local name is:');
      console.log(`\t\t${peripheral.advertisement.localName}`);
      console.log('\tcan I interest you in any of the following advertised services:');
      console.log(`\t\t${JSON.stringify(peripheral.advertisement.serviceUuids)}`);
    
      const serviceData = peripheral.advertisement.serviceData;
      if (serviceData && serviceData.length) {
        console.log('\there is my service data:');
        for (const i in serviceData) {
          console.log(`\t\t${JSON.stringify(serviceData[i].uuid)}: ${JSON.stringify(serviceData[i].data.toString('hex'))}`);
        }
      }
      if (peripheral.advertisement.manufacturerData) {
        console.log('\there is my manufacturer data:');
        console.log(`\t\t${JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex'))}`);
      }
      if (peripheral.advertisement.txPowerLevel !== undefined) {
        console.log('\tmy TX power level is:');
        console.log(`\t\t${peripheral.advertisement.txPowerLevel}`);
      }
    
      console.log();
    });
    */
    this.getDeviceStatus();

    this.streamSubscription = this.service.stream()
      .subscribe((value: number) => {
        this.updateValue(value);
      }, error => this.hasError(error));

  }

  getMethods = (obj) => {
    let properties = new Set()
    let currentObj = obj
    do {
      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()]
  }
  getDeviceStatus() {
    this.deviceSubscription = this.service.getDevice()
      .subscribe(device => {
        if (device) {
          this.color = 'warn';
          this.mode = 'indeterminate';
          this.value = null;
          console.log("this is my device",device);
          console.log("device name:",device.name);
          console.log("device id:",device.id);
        } else {
          // device not connected or disconnected
          this.value = null;
          this.mode = 'determinate';
          this.color = 'primary';
        }
      }, this.hasError.bind(this));
  }

  requestValue() {
    this.valuesSubscription = this.service.value()
      .subscribe((value) => {
        console.log(value),
        this.updateValue(value)}
        , error => this.hasError(error));
  }

  updateValue(value) {
    this.console.log('Reading battery level %d', value);
    this.value = value;
    this.mode = 'determinate';
  }

  disconnect() {
    this.service.disconnectDevice();
    this.deviceSubscription.unsubscribe();
    this.valuesSubscription.unsubscribe();
  }

  hasError(error: string) {
    this.snackBar.open(error, 'Close');
  }

  ngOnDestroy() {
    this.valuesSubscription?.unsubscribe();
    this.deviceSubscription?.unsubscribe();
    this.streamSubscription?.unsubscribe();
  }
}

