
import { model } from '../model';
import { PlacementMouseComponent } from './components/PlacementMouseComponent';
const { IgeVelocityComponent, IgeEntity, IgeClass, IgeMousePanComponent } = window;

var Cuboid = IgeEntity.extend({
	classId: 'Cuboid',
	
	init: function () {
		IgeEntity.prototype.init.call(this);
		
		this.isometric(true)
			.mouseEventsActive(true)
			.triggerPolygon('bounds3dPolygon')
			.opacity(.95)
	}
});

const objects = {
  elements: {},
  connections: {},
};
export function createObjects({ elements, connections }, textures, { objectLayer }) {
    console.log(elements);
    console.log(model);
    Object.keys(elements).forEach((elementId) => {
      const element = elements[elementId];
      const { tileWidth, tileHeight, height } = model.element[element.type].dimensions;
      if (!objects.elements[elementId]) {
        objects.elements[elementId] = new Cuboid() 
        .mount(objectLayer)
        .translateBy(0, 0, element.options.depth)
        .addComponent(PlacementMouseComponent)
        .placementMouse.enabled(true);
      }
      objects.elements[elementId]
        .id(elementId)
        .depth(element.options.depth*-1)
       
        //.texture(textures.tile)
        .bounds3d(tileWidth * 20, tileHeight * 20, height);
    });

}
