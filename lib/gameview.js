(function (root) {

  var BubbleTrouble = root.BubbleTrouble = root.BubbleTrouble || {};

  BubbleTrouble.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
  };

  BubbleTrouble.GameView.prototype.start = function () {
    window.requestAnimationFrame(function() {
      this.game.step();
      this.game.draw(c);
    }.bind(this));
  };

}) (this);
