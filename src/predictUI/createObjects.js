
import { model } from '../model';

const { IgeVelocityComponent, IgeEntity, IgeClass } = window;

var Cuboid = IgeEntity.extend({
	classId: 'Cuboid',
	
	init: function (mouseMoveFunc, mouseOutFunc) {
		IgeEntity.prototype.init.call(this);
		
		this.isometric(true)
			.mouseMove(mouseMoveFunc)
			.mouseOut(mouseOutFunc)
			.mouseEventsActive(true)
			.triggerPolygon('bounds3dPolygon')
			.opacity(1)
	}
});

const objects = {
  elements: {},
  connections: {},
};
export function createObjects({ elements, connections }, textures, { objectLayer }) {
    var overArr = [];
    var x;
    var mouseOverFunc = function () {
      overArr.pushUnique(this);
    };
    
    var mouseOutFunc = function () {
      overArr.pull(this);
        
      // Turn off highlight since we've moved off the entity
      this.highlight(false);
    };
    var tileX = 5;
    var tileY = 5;
    console.log(elements);
    console.log(model);
    Object.keys(elements).forEach((elementId) => {
      if (!objects.elements[elementId]) {
        objects.elements[elementId] = new Cuboid(mouseOverFunc, mouseOutFunc);
      }
      const element = elements[elementId];
      const { tileWidth, tileHeight } = model.element[element.type].dimensions;
      objects.elements[elementId]
        .id(elementId)
        .depth(1)
        .mount(objectLayer)
        //.texture(textures.tile)
        .translateToTile(tileX, tileY)
        .bounds3d(tileWidth * 20, tileHeight * 20, 40);
        tileX += 4;
        tileY += 4;
    });

}
