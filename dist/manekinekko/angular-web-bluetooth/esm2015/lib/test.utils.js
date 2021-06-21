/*
 * Fake Web Bluetooth implementation
 * Replace real browser Bluetooth objects by a much simpler objects that implement some required functionalities
 */
export class FakeBluetoothDevice {
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
export class FakeBluetoothRemoteGATTServer {
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
export class FakeBluetoothRemoteGATTService {
    constructor(device, characteristics) {
        this.device = device;
        this.characteristics = characteristics;
        this.characteristics.service = this;
    }
    getCharacteristic(characteristic) {
        return Promise.resolve(this.characteristics[characteristic]);
    }
}
export class FakeBluetoothRemoteGATTCharacteristic {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC51dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hbmVraW5la2tvL2FuZ3VsYXItd2ViLWJsdWV0b290aC9zcmMvbGliL3Rlc3QudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsTUFBTSxPQUFPLG1CQUFtQjtJQVE5QixZQUFtQixFQUFVLEVBQVMsSUFBWTtRQUEvQixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQU4xQyxjQUFTLEdBRWI7WUFDRixzQkFBc0IsRUFBRSxFQUFFO1NBQzNCLENBQUM7SUFHRixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLFFBQXVCO1FBQ3BELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDckIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUN2QixRQUFRO1NBQ1QsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxXQUFXLEdBQUcsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFZLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBb0IsQ0FBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2Ysc0JBQXNCLEVBQUUsRUFBRTtTQUMzQixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLDZCQUE2QjtJQUd4QyxZQUFtQixNQUFNLEVBQVMsUUFBMEQ7UUFBekUsV0FBTSxHQUFOLE1BQU0sQ0FBQTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQWtEO1FBRjVGLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFHaEIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLE9BQTZCO1FBQzdDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sOEJBQThCO0lBQ3pDLFlBQW1CLE1BQU0sRUFBUyxlQUFlO1FBQTlCLFdBQU0sR0FBTixNQUFNLENBQUE7UUFBUyxvQkFBZSxHQUFmLGVBQWUsQ0FBQTtRQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVELGlCQUFpQixDQUFDLGNBQTJDO1FBQzNELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLHFDQUFxQztJQVVoRCxZQUFZLFVBQTZDLEVBQUUsWUFBdUI7UUFOMUUsY0FBUyxHQUViO1lBQ0YsMEJBQTBCLEVBQUUsRUFBRTtTQUMvQixDQUFDO1FBR0EsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDbkMsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsUUFBdUI7UUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUNyQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLFFBQVE7U0FDVCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFlO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLE1BQU0sV0FBVyxHQUFHLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBWSxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQW9CLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDZiwwQkFBMEIsRUFBRSxFQUFFO1NBQy9CLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBGYWtlIFdlYiBCbHVldG9vdGggaW1wbGVtZW50YXRpb25cclxuICogUmVwbGFjZSByZWFsIGJyb3dzZXIgQmx1ZXRvb3RoIG9iamVjdHMgYnkgYSBtdWNoIHNpbXBsZXIgb2JqZWN0cyB0aGF0IGltcGxlbWVudCBzb21lIHJlcXVpcmVkIGZ1bmN0aW9uYWxpdGllc1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBGYWtlQmx1ZXRvb3RoRGV2aWNlIHtcclxuICBnYXR0OiBCbHVldG9vdGhSZW1vdGVHQVRUU2VydmVyO1xyXG4gIHByaXZhdGUgbGlzdGVuZXJzOiB7XHJcbiAgICBba2V5IGluICdnYXR0c2VydmVyZGlzY29ubmVjdGVkJ106IEV2ZW50TGlzdGVuZXJbXVxyXG4gIH0gPSB7XHJcbiAgICBnYXR0c2VydmVyZGlzY29ubmVjdGVkOiBbXVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgfVxyXG5cclxuICBhZGRFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIpIHtcclxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW1xyXG4gICAgICAuLi50aGlzLmxpc3RlbmVyc1t0eXBlXSxcclxuICAgICAgbGlzdGVuZXJcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBkaXNjb25uZWN0KCkge1xyXG4gICAgY29uc3QgbW9ja2VkRXZlbnQgPSB7dGFyZ2V0OiB0aGlzfSBhcyB1bmtub3duO1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZC5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyKG1vY2tlZEV2ZW50IGFzIEV2ZW50KSk7XHJcbiAgfVxyXG5cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMuaWQgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLm5hbWUgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmxpc3RlbmVycyA9IHtcclxuICAgICAgZ2F0dHNlcnZlcmRpc2Nvbm5lY3RlZDogW11cclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRmFrZUJsdWV0b290aFJlbW90ZUdBVFRTZXJ2ZXIge1xyXG4gIGNvbm5lY3RlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGV2aWNlLCBwdWJsaWMgc2VydmljZXM6IHsgW2tleTogc3RyaW5nXTogeyBzZXJ2aWNlLCBwcmltYXJ5OiBib29sZWFuIH0gfSkge1xyXG4gICAgZGV2aWNlLmdhdHQgPSB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdCgpIHtcclxuICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XHJcbiAgfVxyXG5cclxuICBnZXRQcmltYXJ5U2VydmljZShzZXJ2aWNlOiBCbHVldG9vdGhTZXJ2aWNlVVVJRCkge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnNlcnZpY2VzW3NlcnZpY2VdLnNlcnZpY2UpO1xyXG4gIH1cclxuXHJcbiAgZGlzY29ubmVjdCgpIHtcclxuICAgIHRoaXMuZGV2aWNlLmRpc2Nvbm5lY3QoKTtcclxuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRmFrZUJsdWV0b290aFJlbW90ZUdBVFRTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGV2aWNlLCBwdWJsaWMgY2hhcmFjdGVyaXN0aWNzKSB7XHJcbiAgICB0aGlzLmNoYXJhY3RlcmlzdGljcy5zZXJ2aWNlID0gdGhpcztcclxuICB9XHJcblxyXG4gIGdldENoYXJhY3RlcmlzdGljKGNoYXJhY3RlcmlzdGljOiBCbHVldG9vdGhDaGFyYWN0ZXJpc3RpY1VVSUQpIHtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5jaGFyYWN0ZXJpc3RpY3NbY2hhcmFjdGVyaXN0aWNdKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGYWtlQmx1ZXRvb3RoUmVtb3RlR0FUVENoYXJhY3RlcmlzdGljIHtcclxuICB2YWx1ZTogRGF0YVZpZXc7XHJcbiAgcHJvcGVydGllczogQmx1ZXRvb3RoQ2hhcmFjdGVyaXN0aWNQcm9wZXJ0aWVzO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgaW5pdGlhbFZhbHVlOiBEYXRhVmlldztcclxuICBwcml2YXRlIGxpc3RlbmVyczoge1xyXG4gICAgW2tleSBpbiAnY2hhcmFjdGVyaXN0aWN2YWx1ZWNoYW5nZWQnXTogRXZlbnRMaXN0ZW5lcltdXHJcbiAgfSA9IHtcclxuICAgIGNoYXJhY3RlcmlzdGljdmFsdWVjaGFuZ2VkOiBbXVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BlcnRpZXM6IEJsdWV0b290aENoYXJhY3RlcmlzdGljUHJvcGVydGllcywgaW5pdGlhbFZhbHVlPzogRGF0YVZpZXcpIHtcclxuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgICB0aGlzLnZhbHVlID0gaW5pdGlhbFZhbHVlO1xyXG4gICAgdGhpcy5pbml0aWFsVmFsdWUgPSBpbml0aWFsVmFsdWU7XHJcbiAgfVxyXG5cclxuICByZWFkVmFsdWUoKSB7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyKSB7XHJcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IFtcclxuICAgICAgLi4udGhpcy5saXN0ZW5lcnNbdHlwZV0sXHJcbiAgICAgIGxpc3RlbmVyXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVmFsdWUodmFsdWU6IERhdGFWaWV3KSB7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICBjb25zdCBtb2NrZWRFdmVudCA9IHt0YXJnZXQ6IHRoaXN9IGFzIHVua25vd247XHJcbiAgICB0aGlzLmxpc3RlbmVycy5jaGFyYWN0ZXJpc3RpY3ZhbHVlY2hhbmdlZC5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyKG1vY2tlZEV2ZW50IGFzIEV2ZW50KSk7XHJcbiAgfVxyXG5cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMudmFsdWUgPSB0aGlzLmluaXRpYWxWYWx1ZTtcclxuICAgIHRoaXMubGlzdGVuZXJzID0ge1xyXG4gICAgICBjaGFyYWN0ZXJpc3RpY3ZhbHVlY2hhbmdlZDogW11cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==