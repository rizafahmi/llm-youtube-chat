import { invoke } from './llm.js';
const port = 3456;

async function handler(request: Request): Response {
  const { url } = request;
  const { pathname, search } = new URL(url);
  console.log({ pathname, search });
  console.log(`Handling ${url}...`);
  if (pathname === "/health") {
    return new Response("OK", { status: 200 });
  } else if (pathname.startsWith("/chat")) {
    const chat = decodeURIComponent(search.substring(1));
    console.log({ chat });
    console.log('Waiting for LLM to response...');
    const result = await invoke(chat);
    return new Response(result, { status: 200 });
  } else {
    return new Response("Not found", { status: 404 });
  }
}

console.log(`HTTP server running. Access it at http://localhost:${port}/`);
Deno.serve({ port }, handler);