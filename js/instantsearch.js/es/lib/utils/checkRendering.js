import getObjectType from './getObjectType';

function checkRendering(rendering, usage) {
  if (rendering === undefined || typeof rendering !== 'function') {
    throw new Error("The render function is not valid (received type ".concat(getObjectType(rendering), ").\n\n").concat(usage));
  }
}

export default checkRendering;