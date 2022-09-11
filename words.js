export function search(word, dictionary) {
  let excludePattern = '';
  for (let i = 0; i < word.length; i++) {
    const c = word[i]
    if(c != '?' && c != '_') {
      excludePattern += '^' + c;
    }
  }
  excludePattern = '[' + excludePattern + ']';

  // Let question marks only match new characters
  let toSearch = word.replace(/\?/g, excludePattern);

  // Let underscores match anything
  toSearch = '^' + toSearch.replace(/\_/g, '[a-z]') + '$';

  if (word.indexOf('/') >= 0) {
    toSearch = word.replace(/\//g, '');
  }

  console.log("toSearch: " + toSearch);

  let matches = [];
  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i]
    if(word.match(new RegExp(toSearch, 'i'))) {
      matches.push(word)
    }
  }

  return {
    matches,
    excludePattern,
    searchPattern: toSearch
  };
}
