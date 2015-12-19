"use strict";

function Game(canvas, cellSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cellSize = cellSize;
    this.grid = new Grid(canvas.width / cellSize, canvas.height / cellSize);
}

Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var s = this.cellSize;

    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'grey';

    for (var x = 0; x < this.grid.width; ++x) {
        for (var y = 0; y < this.grid.height; ++y) {
            this.ctx.strokeRect(x * s, y * s, s, s);

            if (this.grid.get(x, y)) {
                this.ctx.fillRect(x * s, y * s, s, s);
            }
        }
    }
};

Game.prototype.handleClick = function (event) {
    var mouseX = event.clientX - this.canvas.offsetLeft;
    var mouseY = event.clientY - this.canvas.offsetTop;

    var x = parseInt(mouseX / this.cellSize);
    var y = parseInt(mouseY / this.cellSize);

    if (x < this.grid.width && y < this.grid.height) {
        this.grid.toggle(x, y);
    }

    this.draw();
};

Game.prototype.initialize = function () {
    console.log("Game initialized.");

    this.canvas.addEventListener('click', this.handleClick.bind(this), false);
    this.draw();
};

Game.prototype.start = function () {
    console.log("Game started.");

    var logic = new Logic();

    clearInterval(this.interval);
    this.interval = window.setInterval(function () {
        this.grid = logic.update(this.grid);
        this.draw();
    }.bind(this), 1000);
};

Game.prototype.stop = function () {
    console.log("Game stopped.");
    clearInterval(this.interval);
};

Game.prototype.reset = function () {
    this.stop();
    this.grid.clear();
    this.draw();
};