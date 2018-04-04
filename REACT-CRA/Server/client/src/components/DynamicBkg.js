import React from 'react';
import ReactDOM from 'react-dom';

class ColorObj {
  constructor(colors, speed, colorIndexOffset=0) {
    this.colors = colors;

    this.colorIndex = 0 + colorIndexOffset;

    this.curColor   = this.colors[this.colorIndex];

    var prevIndex = this.getPrevColorIndex();
    this.prevColor  = this.colors[prevIndex];

    var nxtIndex = this.getNextColorIndex();
    this.nextColor  = this.colors[this.getNextColorIndex()];

    this.lerpValue = 0.0;
    this.lerpSpeed = speed;
  }

  updateColor() {
    this.curColor = this.lerpColor(this.prevColor,this.nextColor,this.lerpValue);
    this.lerpValue += this.lerpSpeed;

    //Choose next color
    if(this.lerpValue > 1.0){
      this.prevColor = this.nextColor;
      //reset lerp value
      this.lerpValue = 0.0;

      //update currentColor Index
      this.advanceColorIndex();

      this.nextColor = this.colors[this.getNextColorIndex()];
      //console.log("NextColor", this.nextColor);
    }
  }

  getNextColorIndex() {
    var nxt = this.colorIndex;
    nxt++;
    if(nxt>this.colors.length-1){ nxt=0;}
    return nxt;
  }

  getPrevColorIndex() {
    var prv = this.colorIndex;
    prv--;
    if(prv<0) prv=this.colors.length-1;
    return prv;
  }

  advanceColorIndex() {
    this.colorIndex = this.getNextColorIndex();
  }

  lerpColor(a, b, amount) {
    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
  }

  getCurrentColor() {
    return this.curColor;
  }
}

class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  add(color) {
    this.r += color.r;
    this.g += color.g;
    this.b += color.b;
    this.a += color.a;
    return this;
  }

  subtract(color) {
    this.r -= color.r;
    this.g -= color.g;
    this.b -= color.b;
    this.a -= color.a;
    return this;
  }

  addScalar(value) {
    this.r += value;
    this.g += value;
    this.b += value;
    this.a += value;
    return this;
  }

  multiplyByScalar(value) {
    this.r *= value;
    this.g *= value;
    this.b *= value;
    this.a *= value;
    return this;
  }

  clone() {
    return new Color(this.r, this.g, this.b, this.a);
  }
}

export default class DynamicBkg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: false
    };

    this._shouldBeRunning = true;


  
    this._topColorObj = new ColorObj(this.props.colors, this.props.speed, 0);
    this._btmColorObj = new ColorObj(this.props.colors, this.props.speed, 0);
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  componentDidMount() {
    window.requestAnimationFrame(this.updateCanvas);

    const ctx = this.dynamicCanvas.getContext('2d');
    ctx.canvas.width  = this.props.canvasWidth;
    ctx.canvas.height = window.innerHeight;
  }

  play() {
    this.setState({ paused: false });
  }

  pause() {
    this.setState({ paused: true });
  }

  componentWillUnmount() {
    this._shouldBeRunning = false;
  }

  updateCanvas() {
    if (this._shouldBeRunning) {
      window.requestAnimationFrame(this.updateCanvas);
    }

    if (this.state.paused) {
      return;
    }

    this._topColorObj.updateColor();
    this._btmColorObj.updateColor();

    const context = this.dynamicBKGdynamicBKG.getContext('2d');

    this.drawBackgroundGradient(this.dynamicCanvas, context);
    this.forceUpdate();
  }

  drawBackgroundGradient(canvas, context) {
    const topColor = this._topColorObj.getCurrentColor();
    const bottomColor = this._btmColorObj.getCurrentColor();

    let gradient = null;
    if (this.props.isPortrait) {
      gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    }
    else {
      gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    }
    gradient.addColorStop(0, topColor);
    gradient.addColorStop(1, bottomColor);

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    this.applyDithering(canvas, context);
  }

  applyDithering(canvas, context) {
    const width = canvas.width;
    const height = canvas.height;
    const imageDataBuffer = context.getImageData(0, 0, width, height);

    for(var i=0; i < height; i++) { // This whole loop referenced http://www.ivank.net/blogspot/dithering/dithering.html
      for(var j=0; j < width; j++) {
        for(var k=0; k < 3; k++) {
          var ci = 4 * (i * width + j) + k;
          var cc = imageDataBuffer[ci];
          var rc = (cc < 128) ? 0 : 255;
          var err = cc - rc;
          imageDataBuffer[ci] = rc;
          if (j + 1 < width) {
            imageDataBuffer[ci + 4] += (err * 7) >> 4;
          }

          if (i + 1 == height) {
            continue;
          }

          if (j > 0) {
            imageDataBuffer[ci + 4 * width - 4] += (err * 3) >> 4;
          }

          imageDataBuffer[ci + 4 * width] += (err * 5) >> 4;

          if (j + 1 < width) {
            imageDataBuffer[ci + 4 * width + 4] += (err * 1) >> 4;
          }
        }
      }
    }

    context.putImageData(imageDataBuffer, 0, 0);
  }

  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  render() {
    return(
    <div>
      <canvas className="dynamicCanvas" />
      </div>
    );
  }
}