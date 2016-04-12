(function (root) {

  var BubbleTrouble = root.BubbleTrouble = root.BubbleTrouble || {};

  var Game = BubbleTrouble.Game = function () {
    this.DIM_X = 700;
    this.DIM_Y = 450;
    this.gravity = .025;
    this.NUM_BUBBLES = 5;
    this.bubbles = this.addBubbles();
    this.char = this.addChar();
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.bubbles.forEach(function (bubble) {
      bubble.draw(ctx);
    });
    this.char.draw(ctx);
    window.requestAnimationFrame(function() {
      this.step();
      this.draw(c);
    }.bind(this));
  };

  Game.prototype.moveObjects = function () {
    this.bubbles.forEach(function (bubble) {
      bubble.move();
    });
    this.char.move();
  };

  Game.prototype.addBubbles = function () {
    var bubbles = [];
    while (bubbles.length < this.NUM_BUBBLES) {
      var opts = {
        game: this,
        pos: this.randomPosition(),
        vel: [2, 0],
        size: Math.floor(Math.random() * (5 - 2)) + 1,
        color: "#00FF00"
      };
      var bubble = new BubbleTrouble.Bubble(opts);
      bubbles.push(bubble);
    }

    return bubbles;
  };

  Game.prototype.addChar = function () {
    return (new BubbleTrouble.Char({
        game: this,
        color: "#8B008B"
    }));
  };

  Game.prototype.step = function () {
    this.moveObjects();
  };

  Game.prototype.randomPosition = function () {
    return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
  };

}) (this);
