import {Colors} from 'colors';

class BitmapText {
    constructor(game, x, y, text, size, group) {
        if (!size) {
            size = 32;
        }
        this.bmpText = game.add.bitmapText(x, y, 'desyrel', text, size, group);
    }

    setText(text) {
        if (this.bmpText.text == text) {
            return;
        }
        this.bmpText.text = text;
    }
}

export default BitmapText;