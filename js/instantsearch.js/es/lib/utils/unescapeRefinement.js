function unescapeRefinement(value) {
  return String(value).replace(/^\\-/, '-');
}

export default unescapeRefinement;