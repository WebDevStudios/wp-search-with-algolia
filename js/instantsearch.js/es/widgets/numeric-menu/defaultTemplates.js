var defaultTemplates = {
  item: "<label class=\"{{cssClasses.label}}\">\n  <input type=\"radio\" class=\"{{cssClasses.radio}}\" name=\"{{attribute}}\"{{#isRefined}} checked{{/isRefined}} />\n  <span class=\"{{cssClasses.labelText}}\">{{label}}</span>\n</label>"
};
export default defaultTemplates;