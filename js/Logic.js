"use strict";

function Logic() {
}

Logic.prototype.neighbours = function (grid, x, y) {
    var n = 0;

    for (var i = Math.max(x - 1, 0); i <= Math.min(x + 1, grid.width - 1); ++i) {
        for (var j = Math.max(y - 1, 0); j <= Math.min(y + 1, grid.height - 1); ++j) {
            n += grid.get(i, j);
        }
    }

    return n - grid.get(x, y);
};

Logic.prototype.update = function (grid) {
    var newGrid = new Grid(grid.width, grid.height);

    for (var x = 0; x < grid.width; ++x) {
        for (var y = 0; y < grid.height; ++y) {
            this.updateCell(newGrid, grid, x, y);
        }
    }

    return newGrid;
};

Logic.prototype.updateCell = function (newGrid, oldGrid, x, y) {
    var n = this.neighbours(oldGrid, x, y);
    var v = oldGrid.get(x, y);

    if (n < 2) v = 0;
    if (n == 3) v = 1;
    if (n > 3) v = 0;

    newGrid.set(x, y, v);
};
