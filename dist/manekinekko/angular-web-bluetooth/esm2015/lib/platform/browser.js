import { Injectable } from '@angular/core';
export class BrowserWebBluetooth {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hbmVraW5la2tvL2FuZ3VsYXItd2ViLWJsdWV0b290aC9zcmMvbGliL3BsYXRmb3JtL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNLE9BQU8sbUJBQW1CO0lBRzlCO1FBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQywyR0FBMkcsQ0FBQyxDQUFDO1NBQzlIO0lBQ0gsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUE2QjtRQUN6QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7OztZQWJGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCcm93c2VyV2ViQmx1ZXRvb3RoIHtcclxuICBwcml2YXRlIGJsZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJsZSA9IG5hdmlnYXRvci5ibHVldG9vdGg7XHJcbiAgICBpZiAoIXRoaXMuYmxlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgU21hcnQgQmx1ZXRvb3RoLiBTZWUgaHR0cDovL2Nhbml1c2UuY29tLyNzZWFyY2g9Qmx1ZXRvb3RoIGZvciBtb3JlIGRldGFpbHMuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0RGV2aWNlKG9wdGlvbnM6IFJlcXVlc3REZXZpY2VPcHRpb25zKTogUHJvbWlzZTxCbHVldG9vdGhEZXZpY2U+IHtcclxuICAgIHJldHVybiB0aGlzLmJsZS5yZXF1ZXN0RGV2aWNlKG9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG4iXX0=