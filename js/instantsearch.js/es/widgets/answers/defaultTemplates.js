var defaultTemplates = {
  header: '',
  loader: '',
  item: function item(_item) {
    return JSON.stringify(_item);
  }
};
export default defaultTemplates;