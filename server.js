import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { search } from "./search.js";
import { renderHtml } from "./render.js";

const dictionary = (await Deno.readTextFile("/usr/share/dict/words")).split(
  "\n"
);

const app = new Application();
const port = 8080;

const router = new Router();

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
