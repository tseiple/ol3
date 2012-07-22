goog.provide('ol.control.MouseWheelZoom');

goog.require('goog.events.MouseWheelEvent');
goog.require('goog.events.MouseWheelHandler.EventType');
goog.require('ol.MapBrowserEvent');



/**
 * @constructor
 * @extends {ol.Control}
 */
ol.control.MouseWheelZoom = function() {
  goog.base(this);
};
goog.inherits(ol.control.MouseWheelZoom, ol.Control);


/**
 * @inheritDoc
 */
ol.control.MouseWheelZoom.prototype.handleMapBrowserEvent =
    function(mapBrowserEvent) {
  if (mapBrowserEvent.type ==
      goog.events.MouseWheelHandler.EventType.MOUSEWHEEL) {
    var map = mapBrowserEvent.map;
    var mouseWheelEvent = /** @type {goog.events.MouseWheelEvent} */
        mapBrowserEvent.browserEvent;
    goog.asserts.assert(mouseWheelEvent instanceof goog.events.MouseWheelEvent);
    if (mouseWheelEvent.deltaY !== 0) {
      map.withFrozenRendering(function() {
        // FIXME compute correct center for zoom
        map.setCenter(mapBrowserEvent.getCoordinate());
        var scale = mouseWheelEvent.deltaY < 0 ? 0.5 : 2;
        map.setResolution(scale * map.getResolution());
      });
      mapBrowserEvent.preventDefault();
      mouseWheelEvent.preventDefault();
    }
  }
};
