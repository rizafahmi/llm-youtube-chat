import { invoke } from "./llm.js";

Bun.serve({
  async fetch(req: Request) {
    console.log(req);
    const { url } = req;
    console.log(`Handling ${url}...`);
    const parsedUrl = new URL(url);
    const { pathname, search } = parsedUrl;

    if (pathname === "/health") {
      return new Response("OK");
    } else if (pathname.startsWith("/chat")) {
      const chat = decodeURIComponent(search.substring(1));
      console.log({ chat });
      console.log('Waiting for LLM to response...');
      const result = await invoke(chat);
      return new Response(result);
    } else {
      return new Response("Not found", { status: 404 });
    }

  },
  port: 3456
});
