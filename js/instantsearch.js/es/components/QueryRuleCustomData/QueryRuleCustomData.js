import React from 'preact-compat';
import Template from '../Template/Template';

var QueryRuleCustomData = function QueryRuleCustomData(_ref) {
  var cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      items = _ref.items;
  return React.createElement(Template, {
    templateKey: "default",
    templates: templates,
    rootProps: {
      className: cssClasses.root
    },
    data: {
      items: items
    }
  });
};

export default QueryRuleCustomData;