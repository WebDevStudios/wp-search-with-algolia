var defaultTemplates = {
  empty: 'No results',
  showPreviousText: 'Show previous results',
  showMoreText: 'Show more results',
  item: function item(data) {
    return JSON.stringify(data, null, 2);
  }
};
export default defaultTemplates;