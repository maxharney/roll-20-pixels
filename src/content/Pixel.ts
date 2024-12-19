import { PixelEventID, PixelRollState } from '../shared/enums';
import { sendDiceRoll } from './Roll20Utils';

export class Pixel {
    service: BluetoothRemoteGATTService;
    notify: BluetoothRemoteGATTCharacteristic;
    hasRolled: Boolean;
    faceValue?: Number;

    constructor(
        service: BluetoothRemoteGATTService,
        notify: BluetoothRemoteGATTCharacteristic
    ) {
        this.service = service;
        this.notify = notify;
        this.hasRolled = false;
        this.faceValue = undefined;
    }

    onPixelNotification = (e: Event): void => {
        // @ts-ignore
        const value = e.target.value;
        const eventID = value.getUint8(0);
        const rollState = value.getUint8(1);
        const faceValue = value.getUint8(2) + 1;

        if (eventID !== PixelEventID.RollState) {
            return;
        }

        if (rollState !== PixelRollState.Settled && !this.hasRolled) {
            this.hasRolled = true;
        } else if (this.hasRolled && rollState === PixelRollState.Settled) {
            this.hasRolled = false;

            sendDiceRoll(faceValue);
        }
    };
}