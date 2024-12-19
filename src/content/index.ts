import { MessageSource, MessageSubject } from '../shared/enums'; 

(() => {
    // Listen for messages from the popup.
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
        // First, validate the message's structure.
        if ((msg.from === MessageSource.Popup) && (msg.subject === MessageSubject.PairDevice)) {
            alert('Pairing device meow');

            response("");
        }
  });
})();