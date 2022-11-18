var defaultTemplates = {
  empty: function empty() {
    return 'No results';
  },
  item: function item(data) {
    return JSON.stringify(data, null, 2);
  }
};
export default defaultTemplates;