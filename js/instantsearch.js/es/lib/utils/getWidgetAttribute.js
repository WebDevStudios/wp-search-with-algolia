export function getWidgetAttribute(widget, initOptions) {
  try {
    // assume the type to be the correct one, but throw a nice error if it isn't the case
    var _getWidgetRenderState = widget.getWidgetRenderState(initOptions),
        widgetParams = _getWidgetRenderState.widgetParams;

    var attribute = 'attribute' in widgetParams ? widgetParams.attribute : widgetParams.attributes[0];
    if (typeof attribute !== 'string') throw new Error();
    return attribute;
  } catch (e) {
    throw new Error("Could not find the attribute of the widget:\n\n".concat(JSON.stringify(widget), "\n\nPlease check whether the widget's getWidgetRenderState returns widgetParams.attribute correctly."));
  }
}