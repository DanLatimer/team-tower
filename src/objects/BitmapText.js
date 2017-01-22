import {Colors} from 'colors';

class BitmapText {
	constructor(game, x, y, text, group) {
    	this.bmpText = game.add.bitmapText(x, y, 'desyrel', text, 32, group);
	}

	setText(text) {
		if (this.bmpText.text == text) {
			return;
		}
		this.bmpText.text = text;
	}
}

export default BitmapText;