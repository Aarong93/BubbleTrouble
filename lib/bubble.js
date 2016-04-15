(function (root) {

  var BubbleTrouble = root.BubbleTrouble = root.BubbleTrouble || {};

  var Bubble = BubbleTrouble.Bubble = function (opts) {
    this.pos = opts.pos;
    this.vel = opts.vel;
    this.size = opts.size;
    this.radius = Bubble.RADIUS[this.size];
    this.color = Bubble.COLOR[this.size - 1];
    this.game = opts.game;
  };

  Bubble.RADIUS = [0, 12, 16, 32, 48];

  Bubble.COLOR = ["#F7F516", "#00E4F0", "#10E329", "#E31010", "#F200FF"];

  Bubble.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    // actual circle position
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    //
    // ctx.fill();

    ctx.drawImage(
      $("#pokeball")[0],
      this.pos[0] - this.radius,
      this.pos[1] - this.radius,
      this.radius * 2,
      this.radius * 2
    );

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
    return (this.pos[0] - this.radius <= 0 ||
      this.radius + this.pos[0] >= this.game.DIM_X);
  };

  Bubble.prototype.pop = function () {
    var bubbles = this.game.bubbles;
    this.game.score++;
    for (var i = 0; i < bubbles.length; i++) {
      if (bubbles[i] === this) {
        bubbles.splice(i, 1);
        break;
      }
    }
    if (this.size > 1) {
      var opts1 = {
        game: this.game,
        pos: [this.pos[0] + 3, this.pos[1] - 3],
        vel: [2, -2],
        size: this.size - 1,
        color: "#00FF00"
      };
      var child1 = new Bubble(opts1);
      var opts2 = {
        game: this.game,
        pos: [this.pos[0] - 3, this.pos[1] - 3],
        vel: [-2, -2],
        size: this.size - 1,
      };
      var child2 = new Bubble(opts2);
      this.game.bubbles.push(child1);
      this.game.bubbles.push(child2);
    }
  };

  Bubble.prototype.collided = function (otherObj) {
    if (otherObj.width) {
      return this.circleRectangleCollided(otherObj);
    } else if (otherObj.radius) {

    }
  };

  Bubble.prototype.circleRectangleCollided = function (rectObj) {
    var circleDistance = {};

    circleDistance.x = Math.abs(this.pos[0] - rectObj.pos[0] + 1);
    circleDistance.y = Math.abs(this.pos[1] - (this.game.DIM_Y - rectObj.height/2));

    if (circleDistance.x > (rectObj.width/2 + this.radius)) { return false; }
    if (circleDistance.y > (rectObj.height/2 + this.radius)) { return false; }

    if (circleDistance.x <= (rectObj.width/2)) { return true; }
    if (circleDistance.y <= (rectObj.height/2)) { return true; }

    cornerDistance_sq = Math.pow((circleDistance.x - rectObj.width/2), 2) +
      Math.pow(circleDistance.y - rectObj.height/2, 2);

    return (cornerDistance_sq <= Math.pow(this.radius, 2));
  };

}) (this);
