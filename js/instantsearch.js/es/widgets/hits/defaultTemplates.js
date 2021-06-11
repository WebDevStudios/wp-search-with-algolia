export default {
  empty: 'No results',
  item: function item(data) {
    return JSON.stringify(data, null, 2);
  }
};