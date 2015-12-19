"use strict";

function init(doc) {
    doc.game = new Game(document.getElementById('canvas'), 15);
    doc.game.initialize();
}

document.addEventListener('DOMContentLoaded', function () {
    init(document);
}, false);
