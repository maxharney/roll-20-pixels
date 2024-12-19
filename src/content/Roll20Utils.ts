export const sendDiceRoll = (faceValue: number): void => {
    const chat = document.getElementById("textchat-input");
    const txt = chat.getElementsByTagName("textarea")[0];
    const btn = chat.getElementsByTagName("button")[0];

    const oldValue = txt.value;

    txt.value = "Rolled " + faceValue;
    btn.click();
    txt.value = oldValue;
}