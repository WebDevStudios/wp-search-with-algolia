import { createHighlightComponent } from '@algolia/ui-components-highlight-vdom';
import { createElement, Fragment } from 'preact';
export var InternalHighlight = createHighlightComponent({
  createElement: createElement,
  Fragment: Fragment
});