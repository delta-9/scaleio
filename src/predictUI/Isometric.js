

// A simple isometric generator tile renderer
export default {



  addLayer: function(canvas, map, touchable = false) {
    var tileImages = [];
    var loadedImages = 0;
    var totalImages = map.tiles.length;
    var context = canvas.getContext("2d");
    
    return new Promise((resolve, reject) => {
      // Load all the images before we run the app
      var cb = function() {
        loadedImages += 1;
        if(loadedImages >= totalImages) {
          var layer = drawLayer(map, canvas, context, tileImages, touchable);
          resolve(layer);
        }
      };
      for (var i = 0; i < map.tiles.length; i++) {
        tileImages[i] = new Image();
        tileImages[i].onload = cb;
        tileImages[i].src = map.tiles[i];
      }
    });
  }
};

function drawLayer(map, canvas, context, tileImages, touchable) {
    var Xtiles = map.map.length;
    var Ytiles = map.map[0].length;
    var selectedTileX = -1;
    var selectedTileY = -1;
    var showCoordinates = false;

    
    function run() {
      window.addEventListener('resize', function(){
        redrawTiles();
      });
      window.addEventListener('mousemove', function(e) {
        var pageX = e.pageX - map.tileColumnOffset / 2 - map.originX;
        var pageY = e.pageY - map.tileRowOffset / 2 - map.originY;
        var tileX = Math.round(pageX / map.tileColumnOffset - pageY / map.tileRowOffset);
        var tileY = Math.round(pageX / map.tileColumnOffset + pageY / map.tileRowOffset);

        selectedTileX = tileX;
        selectedTileY = tileY;
        redrawTiles();
      });
      updateCanvasSize();
      redrawTiles();
    }


    function updateCanvasSize() {
      var width = Xtiles * map.tileColumnOffset;
      var height = Ytiles * map.tileRowOffset;

      context.canvas.width  = width + map.tileColumnOffset + map.tileColumnOffset * 4;
      context.canvas.height = height + map.tileRowOffset * 2 + map.tileRowOffset * 4;

      map.originX = width / 2 - Xtiles * map.tileColumnOffset / 2 + map.tileColumnOffset * 4;
      map.originY = height / 2 + map.tileRowOffset * 4;
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    function redrawTiles() {
      for(var Xi = (Xtiles - 1); Xi >= 0; Xi--) {
        for(var Yi = 0; Yi < Ytiles; Yi++) {
          drawTile(Xi, Yi);
        }
      }
      if (touchable && isCursorOnMap()) {
        drawDiamond(selectedTileX, selectedTileY, 'yellow');
      }
      if(touchable && showCoordinates && isCursorOnMap()) {
        context.fillStyle = 'black';
        var idx = map.map[selectedTileX][selectedTileY];
        context.font = '13pt Arial';
        context.fillText(map.tiles[idx].replace("/assets/tiles/",""), 500, 500);
      }
    }

    function isCursorOnMap() {
      return (selectedTileX >= 0 && selectedTileX < Xtiles &&
              selectedTileY >= 0 && selectedTileY < Ytiles);
    }

    function drawTile(Xi, Yi) {
      var offX = Xi * map.tileColumnOffset / 2 + Yi * map.tileColumnOffset / 2 + map.originX;
      var offY = Yi * map.tileRowOffset / 2 - Xi * map.tileRowOffset / 2 + map.originY;

      var imageIndex = map.map[Xi][Yi];
      if (tileImages[imageIndex]) {
        context.drawImage(tileImages[imageIndex], offX, offY);
      }
      if(showCoordinates) {
        context.fillStyle = 'orange';
        context.fillText(Xi + ", " + Yi, offX +map.tileColumnOffset/2 - 9, offY + map.tileRowOffset/2 + 3);
      }
    }

    function drawDiamond(Xi, Yi, color) {
      var offX = Xi * map.tileColumnOffset / 2 + Yi * map.tileColumnOffset / 2 + map.originX;
      var offY = Yi * map.tileRowOffset / 2 - Xi * map.tileRowOffset / 2 + map.originY;

      drawLine(offX, offY + map.tileRowOffset / 2, offX + map.tileColumnOffset / 2, offY, color);
      drawLine(offX + map.tileColumnOffset / 2, offY, offX + map.tileColumnOffset, offY + map.tileRowOffset / 2, color);
      drawLine(offX + map.tileColumnOffset, offY + map.tileRowOffset / 2, offX + map.tileColumnOffset / 2, offY + map.tileRowOffset, color);
      drawLine(offX + map.tileColumnOffset / 2, offY + map.tileRowOffset, offX, offY + map.tileRowOffset / 2, color);
    }

    function drawLine(x1, y1, x2, y2, color) {
      color = typeof color !== 'undefined' ? color : 'white';
      context.strokeStyle = color;
      context.beginPath();
      context.lineWidth = 1;
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    }

    return {
      Xtiles,
      Ytiles,
      touchable,
      map,
      run,
      updateCanvasSize,
      drawLine,
      drawDiamond,
      drawTile,
      redrawTiles,
      isCursorOnMap,
    }

  }