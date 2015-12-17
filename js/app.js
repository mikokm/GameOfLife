"use strict";

function Grid(width, height) {
    this.width = width;
    this.height = height;

    this.data = new Array(width);
    for (var i = 0; i < this.data.length; ++i) {
        this.data[i] = new Array(height).fill(0);
    }
}

Grid.prototype.clear = function () {
    this.data.forEach(function (e) {
        e.fill(0);
    });
};

Grid.prototype.get = function (x, y) {
    return this.data[x][y];
};

Grid.prototype.set = function (x, y) {
    this.data[x][y] = !this.data[x][y];
};

Grid.prototype.update = function () {
    return true;
};

function Game(canvas, cellSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cellSize = cellSize;
    this.grid = new Grid(canvas.width / cellSize, canvas.height / cellSize);
}

Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var s = this.cellSize;

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'grey';

    for (var i = 0; i < this.grid.width; ++i) {
        for (var j = 0; j < this.grid.height; ++j) {
            ctx.strokeRect(i * s, j * s, s, s);

            if (this.grid.get(i, j)) {
                ctx.fillRect(i * s, j * s, s, s);
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
        this.grid.set(x, y);
    }

    this.update();
};

Game.prototype.initialize = function () {
    console.log("Game started.");

    this.canvas.addEventListener('click', this.handleClick.bind(this), false);
    this.update();
};

Game.prototype.update = function() {
    this.draw(this.ctx);
};

Game.prototype.start = function () {
    this.interval = window.setInterval(function () {
        this.grid.update() || clearInterval(this.interval);
        this.update();
    }.bind(this), 1000 / 30);
};

Game.prototype.reset = function () {
    this.grid.clear();
    this.draw();
};

function init(root) {
    console.log("Loaded");

    root.game = new Game(document.getElementById('canvas'), 15);
    root.game.initialize();
}

document.addEventListener('DOMContentLoaded', function () {
    init(this);
}, false);
