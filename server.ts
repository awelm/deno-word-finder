import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { search } from "./search.js";

const dictionary = (await Deno.readTextFile("/usr/share/dict/words")).split(
  "\n"
);

const app = new Application();
const port = 8080;

const router = new Router();

function renderHtml(pattern, words) {
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
          For example, go?????e would return:
          <ul>
              <li>GOADLIKE</li>
              <li>GOATLIKE</li>
              <li>GOBSHITE</li>
              <li>GOLDSIZE</li>
          </ul>
          <br />
          And go_____e would return:
          <ul>
              <li>GOADLIKE</li>
              <li>GOATLIKE</li>
              <li>GOBSHITE</li>
              <li>GOETHITE</li>
              <li>GOLDSIZE</li>
              <li>GONGLIKE</li>
              <li>GONOCYTE</li>
              <li>GONOPORE</li>
              <li>GOODSIRE</li>
              <li>GOODTIME</li>
              <li>GOODWIFE</li>
          </ul>
      </p>
  </body>
</html>
`;
}

router.get("/", async (ctx) => {
  ctx.response.body = renderHtml("", []);
});

router.get("/api/search", async (ctx) => {
  const pattern = ctx.request.url.searchParams.get("search-text");
  ctx.response.body = renderHtml(pattern, search(pattern, dictionary));
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Listening at http://localhost:" + port);
await app.listen({ port });
