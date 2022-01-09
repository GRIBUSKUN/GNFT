class layer {
  constructor(json, img) {
    this.frames = json.frames;
    this.img = img;
    this.animation = [];
    for (let i = 0; i < this.frames.length; i++) {
      let pos = this.frames[i].frame;
      let img = this.img.get(pos.x, pos.y, pos.w, pos.h);
      this.animation.push(img);
    }
  }
  show() {
    image(this.animation[frameCount % this.animation.length], 0, 0);
  }
}