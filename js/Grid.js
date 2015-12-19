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

Grid.prototype.set = function (x, y, v) {
    this.data[x][y] = v;
};

Grid.prototype.toggle = function (x, y) {
    this.data[x][y] = this.data[x][y] ? 0 : 1;
};