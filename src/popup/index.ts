import { MessageSource, MessageSubject } from '../shared/enums'; 

(() => {
    const sendMessage = (subject: MessageSubject): void => {
        chrome.tabs.query({
            active: true,
            currentWindow: true
          }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from: MessageSource.Popup, subject: subject},
                () => {}
            );
        });
    }

    window.addEventListener('DOMContentLoaded', () => {
        document.getElementById('pair-device').addEventListener('click', () => {
            sendMessage(MessageSubject.PairDevice);
        });
    });
})();
