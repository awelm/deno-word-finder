export function search(pattern, dictionary) {
  let excludeRegex = '';
  // Create regex pattern that excludes characters already present in word
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i]
    if(c != '?' && c != '_') {
      excludeRegex += '^' + c;
    }
  }
  excludeRegex = '[' + excludeRegex + ']';

  // Let question marks only match characters not already present in word
  let searchPattern = pattern.replace(/\?/g, excludeRegex);

  // Let underscores match anything
  searchPattern = '^' + searchPattern.replace(/\_/g, '[a-z]') + '$';

  if (pattern.indexOf('/') >= 0) {
    searchPattern = word.replace(/\//g, '');
  }

  console.log("searchPattern: " + searchPattern);

  let matches = [];
  // Find all words in dictionary that match pattern
  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i];
    if(word.match(new RegExp(searchPattern))) {
      matches.push(word)
    }
  }

  return matches;
}
