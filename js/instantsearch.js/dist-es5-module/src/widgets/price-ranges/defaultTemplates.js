'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  header: '',
  item: '\n    {{#from}}\n      {{^to}}\n        &ge;\n      {{/to}}\n      {{currency}}{{#helpers.formatNumber}}{{from}}{{/helpers.formatNumber}}\n    {{/from}}\n    {{#to}}\n      {{#from}}\n        -\n      {{/from}}\n      {{^from}}\n        &le;\n      {{/from}}\n      {{#helpers.formatNumber}}{{to}}{{/helpers.formatNumber}}\n    {{/to}}\n  ',
  footer: ''
};