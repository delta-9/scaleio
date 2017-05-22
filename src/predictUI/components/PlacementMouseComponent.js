

const { ige, IgeVelocityComponent, IgeEventingClass, IgeEntity, IgeClass, IgeMousePanComponent } = window;

/**
 * When added to a viewport, automatically adds mouse panning
 * capabilities to the viewport's camera.
 */
export var PlacementMouseComponent = IgeEventingClass.extend({
	classId: 'PlacementMouseComponent',
	componentId: 'placementMouse',

	/**
	 * @constructor
	 * @param {IgeObject} entity The object that the component is added to.
	 * @param {Object=} options The options object that was passed to the component during
	 * the call to addComponent.
	 */
	init: function (entity, options) {
		this._entity = entity;
		this._options = options;
		// Set the pan component to inactive to start with
		this._enabled = false;
		this._startThreshold = 5; // The number of pixels the mouse should move to activate a pan
	},

	/**
	 * Gets / sets the number of pixels after a mouse down that the mouse
	 * must move in order to activate a pan operation. Defaults to 5.
	 * @param val
	 * @return {*}
	 */
	startThreshold: function (val) {
		if (val !== undefined) {
			this._startThreshold = val;
			return this._entity;
		}

		return this._startThreshold;
	},

	/**
	 * Gets / sets the rectangle that the pan operation will be limited
	 * to using an IgeRect instance.
	 * @param {IgeRect=} rect
	 * @return {*}
	 */
	limit: function (rect) {
		if (rect !== undefined) {
			this._limit = rect;
			return this._entity;
		}

		return this._limit;
	},

	/**
	 * Gets / sets the enabled flag. If set to true, pan
	 * operations will be processed. If false, no panning will
	 * occur.
	 * @param {Boolean=} val
	 * @return {*}
	 */
	enabled: function (val) {
		var self = this;

		if (val !== undefined) {
			this._enabled = val;

			// Reset pan values.
			// This prevents problems if mouse pan is disabled mid-pan.
			this._panPreStart = false;
			this._panStarted  = false;

			if (this._enabled) {
				// Listen for the mouse events we need to operate a mouse pan
				// Record the mouse down position - pan pre-start
				window.ige.$('objectLayer').mouseMove(function (event) { self._mouseMove(event); });
				this._entity.mouseDown(function (event) { self._mouseDown(event); });
					// Pan the camera if the mouse is down
			var curMousePos = window.ige.$('objectLayer').mouseTilePoint();
			if (curMousePos) {
				this._entity.translateTo(
					curMousePos.x,
					curMousePos.y,
					this._entity._translate.z
				);
			}

			}
			
			return this._entity;
		}

		return this._enabled;
	},

	/**
	 * Handles the mouseDown event. Records the starting position of the
	 * camera pan and the current camera translation.
	 * @param event
	 * @private
	 */
	_mouseDown: function (event) {

		  this._enabled = false;
		
	},

	/**
	 * Handles the mouse move event. Translates the camera as the mouse
	 * moves across the screen.
	 * @param event
	 * @private
	 */
	i: 1,
	_mouseMove: function (event) {
		if (this._enabled) {
			// Pan the camera if the mouse is down
			var curMousePos = window.ige.$('objectLayer').mouseTilePoint();
			if (curMousePos) {
				this._entity.translateTo(
					curMousePos.x,
					curMousePos.y,
					this._entity._translate.z
				);
			}

			
		}
	},

	/**
	 * Handles the mouse up event. Finishes the camera translate and
	 * removes the starting pan data.
	 * @param event
	 * @private
	 */
	_mouseUp: function (event) {
		if (this._enabled) {
			
		}
	}
});

