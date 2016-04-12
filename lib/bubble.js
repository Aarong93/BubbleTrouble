(function (root) {

  var BubbleTrouble = root.BubbleTrouble = root.BubbleTrouble || {};

  var Bubble = BubbleTrouble.Bubble = function (opts) {
    this.pos = opts.pos;
    this.vel = opts.vel;
    this.size = opts.size
    this.radius = Bubble.RADIUS[this.size];
    this.color = opts.color;
    this.game = opts.game;
  };

  Bubble.RADIUS = [0, 4, 8, 16, 32, 64];

  Bubble.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  Bubble.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.bounce();
    this.sideBounce();
  };

  Bubble.prototype.bounce = function () {
    if (this.hitBottom()) {
      this.vel[1] = this.vel[1] * -1;
    } else {
      this.vel[1] += this.game.gravity;
    }
  };

  Bubble.prototype.sideBounce = function () {
    if (this.hitSide()) {
      this.vel[0] = this.vel[0] * -1;
    }
  };

  Bubble.prototype.hitBottom = function () {
    return this.radius + this.pos[1] >= this.game.DIM_Y;
  };

  Bubble.prototype.hitSide = function () {
    return this.pos[0] - this.radius <= 0 ||
      this.radius + this.pos[0] >= this.game.DIM_X;
  };

}) (this);
