(function (root) {

  var BubbleTrouble = root.BubbleTrouble = root.BubbleTrouble || {};

  var Game = BubbleTrouble.Game = function () {
    this.restart();
  };

  Game.prototype.restart = function () {
    $(document).unbind("click");
    this.DIM_X = 700;
    this.DIM_Y = 450;
    this.gravity = 0.075;
    this.NUM_BUBBLES = Math.floor(Math.random() * (5 - 2)) + 2;
    this.addBubbles();
    this.char = this.addChar();
    this.shot = null;
    this.lost = false;
    this.score = 0;
    this.survival = $("#survival:checked").length > 0;
    $("#score").html("Popped: " + this.score);
    $("#lost-message").hide();
    $("#won-message").hide();
    $("#play-again").hide();
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.bubbles.forEach(function (bubble) {
      bubble.draw(ctx);
    });
    if (this.shot) {
      this.shot.draw(ctx);
    }
    this.char.draw(ctx);
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

    if (this.survival) {
      if (.0005 > Math.random()) {
        this.addBubble();
      }
      if (this.bubbles.length < 4) {
        this.addBubble();
      }
    }

    $("#score").html("Popped: " + this.score);
  };

  Game.prototype.addBubbles = function () {
    this.bubbles = [];
    while (this.bubbles.length < this.NUM_BUBBLES) {
      this.addBubble();
    }
  };

  Game.prototype.addBubble = function () {
    var opts = {
      game: this,
      pos: [Math.random() * 600 + 50, 100],
      vel: [-2, 0],
      size: Math.floor(Math.random() * (5 - 2)) + 2
    };
    var bubble = new BubbleTrouble.Bubble(opts);
    this.bubbles.push(bubble);
  }

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
