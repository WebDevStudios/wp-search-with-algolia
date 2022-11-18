var defaultTemplates = {
  empty: function empty() {
    return 'No results';
  },
  showPreviousText: function showPreviousText() {
    return 'Show previous results';
  },
  showMoreText: function showMoreText() {
    return 'Show more results';
  },
  item: function item(data) {
    return JSON.stringify(data, null, 2);
  }
};
export default defaultTemplates;