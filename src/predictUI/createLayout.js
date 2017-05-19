const { ige, IgeTexture, IgeClass, IgeEngine, IgeScene2d, IgeTileMap2d, IgeViewport, IgeMousePanComponent } = window;

export default function createLayout() {
  var layers = {};
  var state = {
    map: {
      settings: {
        isometric: true,
      }
    }
  };
  var map = {};
  var Game = null;

  var client = {
  	classId: 'Client',
	  init: function () {
      
      // Load our textures
      this.gameTextures = {};
      this.obj = [];
      // Load a game texture here
      this.gameTextures.myTexture = new IgeTexture('./tile.png');


      // Wait for our textures to load before continuing
      ige.on('texturesLoaded', function () {
        // Create the HTML canvas
        ige.createFrontBuffer(true);

        // Start the engine
        ige.start(start);

      });
    }
  };

  function start(success) {
    // Check if the engine started successfully
    if (!success) {
      return;
    }
    // Create the HTML canvas

    // Create the scene
    // Create the scene
    map.mainScene = new IgeScene2d()
      .id('mainScene');

    map.objectScene = new IgeScene2d()
      .id('objectScene')
      .mount(map.mainScene);

    map.uiScene = new IgeScene2d()
      .id('uiScene')
      .ignoreCamera(false)
      .mount(map.mainScene);

    // Create the main viewport and set the scene
    // it will "look" at as the new mainScene we just
    // created above
    map.vp1 = new IgeViewport()
      .id('vp1')
      .addComponent(IgeMousePanComponent)
      .mousePan.enabled(true)
      .autoSize(true)
      .scene(map.mainScene)
      //.drawBounds(true)
      //.drawMouse(true)
      .mount(ige);


    map.tileMap = new IgeTileMap2d()
      .id('tileMap')
      .depth(1)
      .isometricMounts(state.map.settings.isometric)
      .tileWidth(25)
      .tileHeight(25)
      .gridSize(100, 100)
      .drawGrid(true)
      .translateTo(0, -1000, 0)
      .drawMouse(true)
      .gridColor('#5d9291')

      //.drawBounds(false)
      .highlightOccupied(false)
      .mouseUp(function (event, evc, data) {
        console.log(this.id(), this.mouseToTile(), arguments);
      })
      .mount(map.mainScene);

        
  }

  function update() {
     map.tileMap
      .isometricMounts(state.map.settings.isometric);
  }

  function storeSubscribeHandler(newState) {
    state = newState;
    update();
  }

  function load() {
      var clientInstance = IgeClass.extend(client);
      var IgeGame = IgeClass.extend({
        classId: 'Game',

        init: function (App, options) {
            // Create the engine
            ige = new IgeEngine();

            if (ige.isClient) {
                ige.client = new App();
            }

            if (ige.isServer) {
                ige.server = new App(options);
            }
        }
    });
    Game = new IgeGame(clientInstance);
  }


  load();

  return {
    storeSubscribeHandler
  };
  
}
