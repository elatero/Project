class Option {
  constructor (height, width, bg, fontSize, textAlign) {
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
    this.createElement();
  }

  createElement() {
    let el = document.createElement('div');
    document.body.appendChild(el);

    let param = `height: ${this.height}px; width: ${this.width}px; background-color: ${this.bg}; font-size: ${this.fontSize}px; text-align: ${this.textAlign}`;

    el.style.cssText = param;
  }
}

const item = new Option(300, 300, "blue", 14, "center");