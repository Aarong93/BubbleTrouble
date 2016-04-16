(function (root) {

  var BubbleTrouble = root.BubbleTrouble = root.BubbleTrouble || {};

  BubbleTrouble.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.running = false;
  };

  BubbleTrouble.GameView.prototype.start = function (ctx) {
    window.requestAnimationFrame(function() {
      this.game.step();
      this.running = true;
      this.game.draw(ctx);
      if (this.game.bubbles.length === 0) {
        $("#won-message").show();
        $("#play-again").show();
        $(document).unbind("keydown");
        $(document).bind("keydown" , function(e) {
          if (e.keyCode === 83 || e.keyCode === 13) {
            e.preventDefault();
            this.game.restart();
            if (!this.running) {
              this.start(ctx);
            }
          }
        }.bind(this));
      }
      if (!this.game.lost) {
        this.start(ctx);
      } else {
        $("#lost-message").show();
        this.running = false;
        $("#play-again").show();
        $(document).unbind("keydown");
        $(document).bind("keydown", function(e) {
          if (e.keyCode === 83 || e.keyCode === 13) {
            e.preventDefault();
            this.game.restart();
            if (!this.running) {
              this.start(ctx);
            }
          }
        }.bind(this));
      }
    }.bind(this));
  };



}) (this);
