import http from 'http';

async function handler(req, res) {
  const { url } = req;
  console.log(`Handling ${url}...`);
  if (url === '/health') {
    res.writeHead(200).end('OK');
  } else {
    console.error(`${url} not found`);
    res.writeHead(404);
    res.end();
  }

}

http.createServer(handler).listen(3456);