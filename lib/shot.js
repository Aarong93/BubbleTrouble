(function (root) {
  var BubbleTrouble = root.BubbleTrouble = root.BubbleTrouble || {};

  var Shot = BubbleTrouble.Shot = function (char, game) {
    this.char = char;
    this.pos = char.pos.slice(0);
    this.pos[0] = this.pos[0] + 5;
    this.pos[1] = this.pos[1];
    this.height = 1;
    this.width = 2;
    this.color = "#e5e500";
    this.game = game;
  };

  Shot.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
  };

  Shot.prototype.move = function () {
    if (this.pos[1] <= 0) {
      this.game.removeShot();
    } else {
      this.height += 6;
      this.pos[1] -= 6;
    }
  };

}) (this);
