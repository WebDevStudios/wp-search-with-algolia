export function createInitArgs(instantSearchInstance, parent, uiState) {
  var helper = parent.getHelper();
  return {
    uiState: uiState,
    helper: helper,
    parent: parent,
    instantSearchInstance: instantSearchInstance,
    state: helper.state,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    createURL: parent.createURL,
    scopedResults: [],
    searchMetadata: {
      isSearchStalled: instantSearchInstance.status === 'stalled'
    },
    status: instantSearchInstance.status,
    error: instantSearchInstance.error
  };
}
export function createRenderArgs(instantSearchInstance, parent) {
  var results = parent.getResults();
  var helper = parent.getHelper();
  return {
    helper: helper,
    parent: parent,
    instantSearchInstance: instantSearchInstance,
    results: results,
    scopedResults: parent.getScopedResults(),
    state: results ? results._state : helper.state,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    createURL: parent.createURL,
    searchMetadata: {
      isSearchStalled: instantSearchInstance.status === 'stalled'
    },
    status: instantSearchInstance.status,
    error: instantSearchInstance.error
  };
}