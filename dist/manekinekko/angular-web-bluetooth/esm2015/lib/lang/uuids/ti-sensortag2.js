// http://processors.wiki.ti.com/images/a/a8/BLE_SensorTag_GATT_Server.pdf
// prettier-ignore
export const TiTag = {
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
export const TI_SENSORAG_SERVICES = Object.keys(TiTag).map(ɵ0);
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGktc2Vuc29ydGFnMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21hbmVraW5la2tvL2FuZ3VsYXItd2ViLWJsdWV0b290aC9zcmMvbGliL2xhbmcvdXVpZHMvdGktc2Vuc29ydGFnMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFFMUUsa0JBQWtCO0FBQ2xCLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRztJQUVuQixrQkFBa0IsRUFBRztRQUNuQixPQUFPLEVBQW1CLHNDQUFzQztRQUNoRSxTQUFTLEVBQWlCLHNDQUFzQztRQUNoRSxZQUFZLEVBQWMsc0NBQXNDO1FBQ2hFLGFBQWEsRUFBYSxzQ0FBc0M7UUFDaEUsWUFBWSxFQUFjLHNDQUFzQztRQUNoRSxZQUFZLEVBQWMsc0NBQXNDO1FBQ2hFLFlBQVksRUFBYyxzQ0FBc0M7UUFDaEUsWUFBWSxFQUFjLHNDQUFzQztRQUNoRSxTQUFTLEVBQWlCLHNDQUFzQztRQUNoRSxNQUFNLEVBQW9CLHNDQUFzQztLQUNqRTtJQUVELE9BQU8sRUFBRztRQUNSLE9BQU8sRUFBbUIsc0NBQXNDO1FBQ2hFLEtBQUssRUFBcUIsc0NBQXNDO0tBQ2pFO0lBRUQsV0FBVyxFQUFHO1FBQ1osT0FBTyxFQUFtQixzQ0FBc0M7UUFDaEUsSUFBSSxFQUFzQixzQ0FBc0M7UUFDaEUsYUFBYSxFQUFhLHNDQUFzQztRQUNoRSxNQUFNLEVBQW9CLHNDQUFzQztLQUNqRTtJQUVELFFBQVEsRUFBRztRQUNULE9BQU8sRUFBbUIsc0NBQXNDO1FBQ2hFLElBQUksRUFBc0Isc0NBQXNDO1FBQ2hFLGFBQWEsRUFBYSxzQ0FBc0M7UUFDaEUsTUFBTSxFQUFvQixzQ0FBc0M7S0FDakU7SUFFRCxTQUFTLEVBQUc7UUFDVixPQUFPLEVBQW1CLHNDQUFzQztRQUNoRSxJQUFJLEVBQXNCLHNDQUFzQztRQUNoRSxhQUFhLEVBQWEsc0NBQXNDO1FBQ2hFLE1BQU0sRUFBb0Isc0NBQXNDO0tBQ2pFO0lBRUQsd0NBQXdDO0lBQ3hDLG9CQUFvQjtJQUNwQixzRUFBc0U7SUFDdEUsc0VBQXNFO0lBQ3RFLHNFQUFzRTtJQUN0RSxxRUFBcUU7SUFDckUsS0FBSztJQUVMLHdDQUF3QztJQUN4QyxtQkFBbUI7SUFDbkIsc0VBQXNFO0lBQ3RFLHNFQUFzRTtJQUN0RSxzRUFBc0U7SUFDdEUscUVBQXFFO0lBQ3JFLEtBQUs7SUFFTCx3Q0FBd0M7SUFDeEMsZ0JBQWdCO0lBQ2hCLHNFQUFzRTtJQUN0RSxzRUFBc0U7SUFDdEUsc0VBQXNFO0lBQ3RFLHFFQUFxRTtJQUNyRSxLQUFLO0lBRUwsUUFBUSxFQUFHO1FBQ1QsT0FBTyxFQUFtQixzQ0FBc0M7UUFDaEUsSUFBSSxFQUFzQixzQ0FBc0M7UUFDaEUsYUFBYSxFQUFhLHNDQUFzQztRQUNoRSxNQUFNLEVBQW9CLHNDQUFzQztLQUNqRTtJQUVELEtBQUssRUFBRztRQUNOLE9BQU8sRUFBbUIsc0NBQXNDO1FBQ2hFLElBQUksRUFBc0Isc0NBQXNDO1FBQ2hFLGFBQWEsRUFBYSxzQ0FBc0M7UUFDaEUsTUFBTSxFQUFvQixzQ0FBc0M7S0FDakU7SUFFRCxRQUFRLEVBQUc7UUFDVCxPQUFPLEVBQW1CLHNDQUFzQztRQUNoRSxLQUFLLEVBQXFCLHNDQUFzQztLQUNqRTtJQUVELFlBQVksRUFBRztRQUNiLE9BQU8sRUFBbUIsc0NBQXNDO1FBQ2hFLElBQUksRUFBc0Isc0NBQXNDO1FBQ2hFLE9BQU8sRUFBbUIsc0NBQXNDO1FBQ2hFLFNBQVMsRUFBaUIsc0NBQXNDO0tBQ2pFO0lBRUQsT0FBTyxFQUFHO1FBQ1IsT0FBTyxFQUFtQixzQ0FBc0M7UUFDaEUsdUJBQXVCLEVBQUcsc0NBQXNDO1FBQ2hFLHNCQUFzQixFQUFJLHNDQUFzQztRQUNoRSxrQkFBa0IsRUFBUSxzQ0FBc0M7S0FDakU7SUFFRCxHQUFHLEVBQUc7UUFDSixPQUFPLEVBQW1CLHNDQUFzQztRQUNoRSxZQUFZLEVBQWMsc0NBQXNDO1FBQ2hFLG1CQUFtQixFQUFPLHNDQUFzQztRQUNoRSxXQUFXLEVBQWUsc0NBQXNDO1FBQ2hFLFlBQVksRUFBYyxzQ0FBc0M7S0FDakU7SUFFRCxFQUFFLEVBQUc7UUFDSCxPQUFPLEVBQW1CLHNDQUFzQztRQUNoRSxJQUFJLEVBQXNCLHNDQUFzQztRQUNoRSxNQUFNLEVBQW9CLHNDQUFzQztLQUNqRTtDQUNGLENBQUM7V0FFeUQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTztBQUFwRixNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBMkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHA6Ly9wcm9jZXNzb3JzLndpa2kudGkuY29tL2ltYWdlcy9hL2E4L0JMRV9TZW5zb3JUYWdfR0FUVF9TZXJ2ZXIucGRmXHJcblxyXG4vLyBwcmV0dGllci1pZ25vcmVcclxuZXhwb3J0IGNvbnN0IFRpVGFnID0ge1xyXG5cclxuICBERVZJQ0VfSU5GT1JNQVRJT04gOiB7XHJcbiAgICBTRVJWSUNFIDogICAgICAgICAgICAgICAgICdmMDAwMTgwYS0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgU1lTVEVNX0lEIDogICAgICAgICAgICAgICAnZjAwMDJhMjMtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIE1PREVMX05VTUJFUiA6ICAgICAgICAgICAgJ2YwMDAyYTI0LTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBTRVJJQUxfTlVNQkVSIDogICAgICAgICAgICdmMDAwMmEyNS0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgRklSTVdBUkVfUkVWIDogICAgICAgICAgICAnZjAwMDJhMjYtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIEhBUkRXQVJFX1JFViA6ICAgICAgICAgICAgJ2YwMDAyYTI3LTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBTT0ZUV0FSRV9SRVYgOiAgICAgICAgICAgICdmMDAwMmEyOC0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgTUFOSUZBQ1RVUkVSIDogICAgICAgICAgICAnZjAwMDJhMjktMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIElFRUUxMTA3MyA6ICAgICAgICAgICAgICAgJ2YwMDAyYTJhLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBQTlBfSUQgOiAgICAgICAgICAgICAgICAgICdmMDAwMmE1MC0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnXHJcbiAgfSxcclxuXHJcbiAgQkFUVEVSWSA6IHtcclxuICAgIFNFUlZJQ0UgOiAgICAgICAgICAgICAgICAgJ2YwMDAxODBmLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBMRVZFTCA6ICAgICAgICAgICAgICAgICAgICdmMDAwMmExOS0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnXHJcbiAgfSxcclxuXHJcbiAgVEVNUEVSQVRVUkUgOiB7XHJcbiAgICBTRVJWSUNFIDogICAgICAgICAgICAgICAgICdmMDAwYWEwMC0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgREFUQSA6ICAgICAgICAgICAgICAgICAgICAnZjAwMGFhMDEtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIENPTkZJR1VSQVRJT04gOiAgICAgICAgICAgJ2YwMDBhYTAyLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBQRVJJT0QgOiAgICAgICAgICAgICAgICAgICdmMDAwYWEwMy0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnXHJcbiAgfSxcclxuXHJcbiAgSFVNSURJVFkgOiB7XHJcbiAgICBTRVJWSUNFIDogICAgICAgICAgICAgICAgICdmMDAwYWEyMC0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgREFUQSA6ICAgICAgICAgICAgICAgICAgICAnZjAwMGFhMjEtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIENPTkZJR1VSQVRJT04gOiAgICAgICAgICAgJ2YwMDBhYTIyLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBQRVJJT0QgOiAgICAgICAgICAgICAgICAgICdmMDAwYWEyMy0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnXHJcbiAgfSxcclxuXHJcbiAgQkFST01FVEVSIDoge1xyXG4gICAgU0VSVklDRSA6ICAgICAgICAgICAgICAgICAnZjAwMGFhNDAtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIERBVEEgOiAgICAgICAgICAgICAgICAgICAgJ2YwMDBhYTQxLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBDT05GSUdVUkFUSU9OIDogICAgICAgICAgICdmMDAwYWE0Mi0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgUEVSSU9EIDogICAgICAgICAgICAgICAgICAnZjAwMGFhNDQtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJ1xyXG4gIH0sXHJcblxyXG4gIC8vIHNlcnZpY2Ugbm90IGF2YWlsYWJsZSBpbiBtb2RlbCBDQzI2NTBcclxuICAvLyBBQ0NFTEVST01FVEVSIDoge1xyXG4gIC8vICAgU0VSVklDRSA6ICAgICAgICAgICAgICAgICAnZjAwMGFhMTAtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAvLyAgIERBVEEgOiAgICAgICAgICAgICAgICAgICAgJ2YwMDBhYTExLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgLy8gICBDT05GSUdVUkFUSU9OIDogICAgICAgICAgICdmMDAwYWExMi0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gIC8vICAgUEVSSU9EIDogICAgICAgICAgICAgICAgICAnZjAwMGFhMTMtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJ1xyXG4gIC8vIH0sXHJcblxyXG4gIC8vIHNlcnZpY2Ugbm90IGF2YWlsYWJsZSBpbiBtb2RlbCBDQzI2NTBcclxuICAvLyBNQUdORVRPTUVURVIgOiB7XHJcbiAgLy8gICBTRVJWSUNFIDogICAgICAgICAgICAgICAgICdmMDAwYWEzMC0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gIC8vICAgREFUQSA6ICAgICAgICAgICAgICAgICAgICAnZjAwMGFhMzEtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAvLyAgIENPTkZJR1VSQVRJT04gOiAgICAgICAgICAgJ2YwMDBhYTMyLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgLy8gICBQRVJJT0QgOiAgICAgICAgICAgICAgICAgICdmMDAwYWEzMy0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnXHJcbiAgLy8gfSxcclxuXHJcbiAgLy8gc2VydmljZSBub3QgYXZhaWxhYmxlIGluIG1vZGVsIENDMjY1MFxyXG4gIC8vIEdZUk9TQ09QRSA6IHtcclxuICAvLyAgIFNFUlZJQ0UgOiAgICAgICAgICAgICAgICAgJ2YwMDBhYTUwLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgLy8gICBEQVRBIDogICAgICAgICAgICAgICAgICAgICdmMDAwYWE1MS0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gIC8vICAgQ09ORklHVVJBVElPTiA6ICAgICAgICAgICAnZjAwMGFhNTItMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAvLyAgIFBFUklPRCA6ICAgICAgICAgICAgICAgICAgJ2YwMDBhYTUzLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCdcclxuICAvLyB9LFxyXG5cclxuICBNT1ZFTUVOVCA6IHtcclxuICAgIFNFUlZJQ0UgOiAgICAgICAgICAgICAgICAgJ2YwMDBhYTgwLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBEQVRBIDogICAgICAgICAgICAgICAgICAgICdmMDAwYWE4MS0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgQ09ORklHVVJBVElPTiA6ICAgICAgICAgICAnZjAwMGFhODItMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIFBFUklPRCA6ICAgICAgICAgICAgICAgICAgJ2YwMDBhYTgzLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCdcclxuICB9LFxyXG5cclxuICBMSUdIVCA6IHtcclxuICAgIFNFUlZJQ0UgOiAgICAgICAgICAgICAgICAgJ2YwMDBhYTcwLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBEQVRBIDogICAgICAgICAgICAgICAgICAgICdmMDAwYWE3MS0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgQ09ORklHVVJBVElPTiA6ICAgICAgICAgICAnZjAwMGFhNzItMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIFBFUklPRCA6ICAgICAgICAgICAgICAgICAgJ2YwMDBhYTczLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCdcclxuICB9LFxyXG5cclxuICBLRVlQUkVTUyA6IHtcclxuICAgIFNFUlZJQ0UgOiAgICAgICAgICAgICAgICAgJ2YwMDBmZmUwLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBTVEFURSA6ICAgICAgICAgICAgICAgICAgICdmMDAwZmZlMS0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnXHJcbiAgfSxcclxuXHJcbiAgX19SRUdJU1RFUl9fIDoge1xyXG4gICAgU0VSVklDRSA6ICAgICAgICAgICAgICAgICAnZjAwMGFjMDAtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIERBVEEgOiAgICAgICAgICAgICAgICAgICAgJ2YwMDBhYzAxLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBBRERSRVNTIDogICAgICAgICAgICAgICAgICdmMDAwYWMwMi0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgREVWSUNFX0lEIDogICAgICAgICAgICAgICAnZjAwMGFjMDMtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJ1xyXG4gIH0sXHJcblxyXG4gIENPTlRST0wgOiB7XHJcbiAgICBTRVJWSUNFIDogICAgICAgICAgICAgICAgICdmMDAwY2NjMC0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgQ1VSUkVOVF9VU0VEX1BBUkFNRVRFUlMgOiAnZjAwMGNjYzEtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIFJFUVVFU1RfTkVXX1BBUkFNRVRFUlMgOiAgJ2YwMDBjY2MyLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBESVNDT05ORUNUX1JFUVVFU1QgOiAgICAgICdmMDAwY2NjMy0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnXHJcbiAgfSxcclxuXHJcbiAgT0FEIDoge1xyXG4gICAgU0VSVklDRSA6ICAgICAgICAgICAgICAgICAnZjAwMGZmYzAtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIElNQUdFX05PVElGWSA6ICAgICAgICAgICAgJ2YwMDBmZmMxLTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBJTUFHRV9CTE9DS19SRVFVRVNUIDogICAgICdmMDAwZmZjMi0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgSU1BR0VfQ09VTlQgOiAgICAgICAgICAgICAnZjAwMGZmYzMtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJyxcclxuICAgIElNQUdFX1NUQVRVUyA6ICAgICAgICAgICAgJ2YwMDBmZmM0LTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCdcclxuICB9LFxyXG5cclxuICBJTyA6IHtcclxuICAgIFNFUlZJQ0UgOiAgICAgICAgICAgICAgICAgJ2YwMDBhYTY0LTA0NTEtNDAwMC1iMDAwLTAwMDAwMDAwMDAwMCcsXHJcbiAgICBEQVRBIDogICAgICAgICAgICAgICAgICAgICdmMDAwYWE2NS0wNDUxLTQwMDAtYjAwMC0wMDAwMDAwMDAwMDAnLFxyXG4gICAgQ09ORklHIDogICAgICAgICAgICAgICAgICAnZjAwMGFhNjYtMDQ1MS00MDAwLWIwMDAtMDAwMDAwMDAwMDAwJ1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBUSV9TRU5TT1JBR19TRVJWSUNFUyA9IE9iamVjdC5rZXlzKFRpVGFnKS5tYXAoa2V5ID0+IFRpVGFnW2tleV0uU0VSVklDRSk7XHJcbiJdfQ==