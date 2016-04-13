(function (root) {

  var BubbleTrouble = root.BubbleTrouble = root.BubbleTrouble || {};

  var Game = BubbleTrouble.Game = function () {
    this.restart();
  };

  Game.prototype.restart = function () {
    this.DIM_X = 700;
    this.DIM_Y = 450;
    this.gravity = 0.025;
    this.NUM_BUBBLES = 3;
    this.bubbles = this.addBubbles();
    this.char = this.addChar();
    this.shot = null;
    this.lost = false;
    $("#lost-message").hide();
    $("#won-message").hide();
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.bubbles.forEach(function (bubble) {
      bubble.draw(ctx);
    });
    this.char.draw(ctx);
    if (this.shot) {
      this.shot.draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    this.bubbles.forEach(function (bubble) {
      bubble.move();
      if (this.shot && bubble.collided(this.shot)) {
        bubble.pop();
        this.shot = null;
      }
      if (bubble.collided(this.char)) {
        this.lost = true;
      }
    }.bind(this));
    this.char.move();
    if (this.shot) {
      this.shot.move();
    }
  };

  Game.prototype.addBubbles = function () {
    var bubbles = [];
    while (bubbles.length < this.NUM_BUBBLES) {
      var opts = {
        game: this,
        pos: [bubbles.length * 200 + 200, 100],
        vel: [-2, 0],
        size: 5
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
    return this.moveObjects();
  };

  Game.prototype.randomPosition = function () {
    return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
  };

  Game.prototype.shoot = function () {
    if (!this.shot) {
      this.shot = new BubbleTrouble.Shot(this.char, this);
    }
  };

  Game.prototype.removeShot = function () {
    this.shot = null;
  };

}) (this);
