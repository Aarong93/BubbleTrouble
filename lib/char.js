(function (root) {

  var BubbleTrouble = root.BubbleTrouble = root.BubbleTrouble || {};

  var Char = BubbleTrouble.Char = function (opts) {
    this.vel = [0, 0];
    this.height = 50;
    this.width = 25;
    this.color = opts.color;
    this.game = opts.game;
    this.pos = [20, this.game.DIM_Y];
    $(window).keyup(this.stopMove.bind(this));
    $(window).keydown(this.handleMove.bind(this));
  };

  Char.prototype.stopMove = function (e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    if (e.keyCode === 37 && this.vel[0] < 0 ) {
      this.vel[0] = 0;
    } else if (e.keyCode === 39 && this.vel[0] > 0) {
      this.vel[0] = 0;
    }
  };

  Char.prototype.handleMove = function (e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    if (e.keyCode === 37) {
      this.vel[0] = -3.25;
    } else if (e.keyCode === 39) {
      this.vel[0] = 3.25;
    } else if (e.keyCode === 32) {
      this.game.shoot();
    }
  };

  Char.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // ctx.fillRect(this.pos[0], this.pos[1] - this.height, this.width, this.height);
    ctx.drawImage($("#pika")[0], this.pos[0] - 75, this.game.DIM_Y - 150, 150, 175);
  };

  Char.prototype.move = function () {
    this.updateInput();
    this.sideBounce();
    this.pos[0] += this.vel[0];
  };

  Char.prototype.updateInput = function () {

  };

  Char.prototype.sideBounce = function () {
    if (this.width + 1 + this.pos[0] >= this.game.DIM_X && this.vel[0] > 0) {
      this.vel[0] = 0;
    } else if (this.pos[0] - this.width/2 - 10 <= 0 && this.vel[0] < 0) {
      this.vel[0] = 0;
    }
  };



}) (this);
