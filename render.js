export function renderHtml(pattern, words) {
    let searchResultsContent = "";
    if (words.length > 0) {
      let wordList = "";
      for (const word of words) {
        wordList += `<li>${word}</li>`;
      }
      searchResultsContent = `
        <p id="search-result-count" data-count="${words.length}">Words found: ${words.length}</p>
        <ul id="search-result" name="search-results"> 
          ${wordList}
        </ul>
      `;
    }
  
    return `<html>
    <head>
        <title>Deno Word Finder</title>
        <meta name="version" content="1.0">
    </head>
    <body>
        <h1>Deno Word Finder</h1>
  
        <form id="perform-search" name="perform-search" method="get" action="/api/search">
            <label for="search-text">Search text:</label>
            <input id="search-text" name="search-text" type="text" value="${pattern}" />
            <input type="submit" />
        </form>
  
        ${searchResultsContent}
  
        <h2>Instructions</h2>
  
        <p>
            Enter a word using _ and ? as needed for unknown characters. Using ? means to include letters that aren't already used (you can think of it as a "Wheel of Fortune" placeholder). Using _ will find words that contain any character (whether it's currently "revealed" or not).
            <br />
            <br />
            For example, d__d would return:
            <ul>
                <li>dand</li>
                <li>daud</li>
                <li>dead</li>
                <li>deed</li>
                <li>dird</li>
                <li>dodd</li>
                <li>dowd</li>
                <li>duad</li>
                <li>dyad</li>
            </ul>
            <br />
            And go?d would return:
            <ul>
                <li>goad</li>
                <li>gold</li>
            </ul>
        </p>
    </body>
  </html>
  `;
  }