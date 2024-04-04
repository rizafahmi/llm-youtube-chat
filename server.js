import http from 'http';

async function invoke(chat) {
  console.log(chat);
  return 'Hello from LLM';
}

async function handler(req, res) {
  const { url } = req;
  console.log(`Handling ${url}...`);
  if (url === '/health') {
    res.writeHead(200).end('OK');
  } else if (url.startsWith('/chat')) {
    const parsedUrl = new URL(`http://localhost/${url}`);
    const { search } = parsedUrl;
    const chat = decodeURIComponent(search.substring(1));
    console.log({ chat });
    console.log('Waiting for LLM to response...');
    const result = await invoke(chat);
    res.writeHead(200).end(result);
  } else {
    console.error(`${url} not found`);
    res.writeHead(404);
    res.end();
  }

}

http.createServer(handler).listen(3456);