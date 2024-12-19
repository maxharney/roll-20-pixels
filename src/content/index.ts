import { MessageSource, MessageSubject, PixelUUID, PixelEventID } from '../shared/enums';
import { Pixel } from './Pixel';

(() => {
    const pixelDevices: Pixel[] = [];
    const bluetoothOptions = { filters: [{ services: [PixelUUID.SERVICE] }] };

    const connectDevice = async (): Promise<Pixel> => {
        const device = await navigator.bluetooth.requestDevice(bluetoothOptions);
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(PixelUUID.SERVICE);
        const notify = await service.getCharacteristic(PixelUUID.NOTIFY_CHARACTERISTIC);

        await notify.startNotifications();

        const pixel = new Pixel(service, notify);

        notify.addEventListener('characteristicvaluechanged', pixel.onPixelNotification)

        return pixel;
    }

    // Listen for messages from the popup.
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
        if ((msg.from === MessageSource.Popup) && (msg.subject === MessageSubject.PairDevice)) {
            connectDevice().then((pixel) => {
                pixelDevices.push(pixel);
            });
        }
    });
})();