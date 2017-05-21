import { createObjects } from './createObjects';

const { IgeTexture, IgeClass, IgeEngine, IgeScene2d, IgeTileMap2d, IgeViewport, IgeEntityManager, IgeMousePanComponent, IgeTiledComponent } = window;
//window.igeRoot = '../../engine';
export default function createLayout() {
  var state = {
    scene: {
      settings: {
        isometric: true,
      },
      elements: {},
      connections: {},
    },
  };
  var textures = {};
  var scene = {};
  var elements = {};
  var connections = {};
  var Game = null;

  var client = {
  	classId: 'Client',
	  init: function () {
      // Load our textures
      textures.tile = new IgeTexture(require('../textures/tile.png'));
      // Wait for our textures to load before continuing
      window.ige.on('texturesLoaded', function () {
        // Create the HTML canvas
        window.ige.createFrontBuffer(true);

		    window.ige.viewportDepth(true);
        // Start the engine
        window.ige.start(start);
      });
    }
  };
  
  function load() {
    var clientInstance = IgeClass.extend(client);
    var IgeGame = IgeClass.extend({
      classId: 'Predict',

      init: function (App, options) {
        // Create the engine
        window.ige = new IgeEngine();
        
        if ( window.ige.isClient) {
          window.ige.client = new App();
        }

      }
    });
    Game = new IgeGame(clientInstance);
  }


  load();

  function start(success) {
    // Check if the engine started successfully
    if (!success) {
      return;
    }
    // Create the scene
					scene.mainScene = new IgeScene2d()
						.id('mainScene')
						.translateTo(0, 0, 0)
						.drawBounds(false)
						.drawBoundsData(false);

					scene.backScene = new IgeScene2d()
						.id('backScene')
						.depth(0)
						.drawBounds(false)
						.drawBoundsData(false)
						.mount(scene.mainScene);

					scene.objectLayer = new IgeTileMap2d()
						.addComponent(IgeEntityManager)
						.id('objectLayer')
						.depth(1)
					  .isometricMounts(true)
            .drawGrid(true)
            .gridSize(50, 50)
            .gridColor('#444')
						.drawBounds(false)
						.drawBoundsData(false)
						.tileWidth(20)
						.tileHeight(20)
						.mount(scene.mainScene);

					// Create the main viewport
					scene.vp1 = new IgeViewport()
						.id('vp1')
						.depth(1)
            .addComponent(IgeMousePanComponent)
            .mousePan.enabled(true)
            .autoSize(true)
						.scene(scene.mainScene)
						.drawBounds(true)
						.drawBoundsData(true)
						.mount(window.ige);

				

					// Translate the camera to the initial player position
					//scene.vp1.camera.lookAt(scene.player1);

					// Tell the camera to track our player character with some
					// tracking smoothing (set to 20)
					//scene.vp1.camera.trackTranslate(scene.player1, 20);
					
					// Set the camera to round it's translate value to avoid sub-pixel rendering
					scene.vp1.camera.trackTranslateRounding(true);

    
    update();		
  }

  function update() {
     scene.objectLayer.isometricMounts(state.scene.settings.isometric);

     createObjects(state.scene, textures, scene);
  }

  function storeSubscribeHandler(newState) {
    state = newState;
    update();
  }


  return {
    storeSubscribeHandler
  };
  
}
