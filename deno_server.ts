
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs/mod.ts";
import { search } from './words.js';

const dictionary = JSON.parse(
  await Deno.readTextFile('./dictionary.json')
).dictionary;


const app = new Application();
const port: number = 8080;

const router = new Router();

router.get("/", async (ctx) => {
  ctx.response.body = await renderFileToString("./index.ejs", {
    pattern: '',
    words: [],
  });
});

router.get("/api/search", async (ctx) => {
  const pattern = ctx.request.url.searchParams.get('search-text') 
  ctx.response.body = await renderFileToString("./index.ejs", {
    pattern: pattern,
    words: search(pattern, dictionary).matches,
  });
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('running on port ', port);
await app.listen({ port });
