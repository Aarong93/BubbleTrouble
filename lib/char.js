(function (root) {

  var BubbleTrouble = root.BubbleTrouble = root.BubbleTrouble || {};

  var Char = BubbleTrouble.Char = function (opts) {
    this.pos = [20, 440];
    this.vel = [0, 0];
    this.radius = 10;
    this.color = opts.color;
    this.game = opts.game;
  };

  Char.prototype.draw = function (ctx) {
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

  Char.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.updateInput();
    this.sideBounce();
  };

  Char.prototype.updateInput = function () {

  };

  Char.prototype.sideBounce = function () {
    if (this.radius + this.pos[0] >= this.game.DIM_X && this.vel[0] > 0) {
      this.vel[0] = 0;
    } else if (this.pos[0] - this.radius <= 0 && this.vel[0] < 0) {
      this.vel[0] = 0;
    }
  };



}) (this);
