import { assign } from 'min-dash';

import TextUtil from 'diagram-js/lib/util/Text';

var DEFAULT_FONT_SIZE = 12;
var LINE_HEIGHT_RATIO = 1.2;


export default function TextRenderer(config) {

  var defaultStyle = assign({
    fontFamily: 'sans-serif',
    fontSize: DEFAULT_FONT_SIZE,
    fontWeight: 'normal',
    lineHeight: LINE_HEIGHT_RATIO
  }, config && config.defaultStyle || {});

  var fontSize = parseInt(defaultStyle.fontSize, 10) - 1;

  var externalStyle = assign({}, defaultStyle, {
    fontSize: fontSize
  }, config && config.externalStyle || {});

  var textUtil = new TextUtil({
    style: defaultStyle
  });

  /**
   * Get the new bounds of an externally rendered,
   * layouted label.
   *
   * @param  {Bounds} bounds
   * @param  {String} text
   *
   * @return {Bounds}
   */
  this.getLayoutedBounds = function(bounds, text) {

    var layoutedDimensions = textUtil.getDimensions(text, {
      box: {
        width: 90,
        height: 30,
        x: bounds.width / 2 + bounds.x,
        y: bounds.height / 2 + bounds.y
      },
      style: externalStyle
    });

    // resize label shape to fit label text
    return {
      x: Math.round(bounds.x + bounds.width / 2 - layoutedDimensions.width / 2),
      y: Math.round(bounds.y),
      width: Math.ceil(layoutedDimensions.width),
      height: Math.ceil(layoutedDimensions.height)
    };

  };

  this.getTextAnnotationLayoutedBounds = function(bounds, text) {
    // debugger
    
    var layoutedDimensions = textUtil.getDimensions(text, {
      box: { width: bounds.width },
      style: assign(defaultStyle, {
        paddingTop: '7px',
        paddingBottom: '7px',
        paddingLeft: '5px',
        paddingRight: '5px',
      })
    });

    return {
      x: bounds.x,
      y: bounds.y,
      width: Math.ceil(layoutedDimensions.width),
      height: Math.ceil(layoutedDimensions.height)
    };
  };

  /**
   * Create a layouted text element.
   *
   * @param {String} text
   * @param {Object} [options]
   *
   * @return {SVGElement} rendered text
   */
  this.createText = function(text, options) {
    return textUtil.createText(text, options || {});
  };

  /**
   * Get default text style.
   */
  this.getDefaultStyle = function() {
    return defaultStyle;
  };

  /**
   * Get the external text style.
   */
  this.getExternalStyle = function() {
    return externalStyle;
  };

}

TextRenderer.$inject = [
  'config.textRenderer'
];