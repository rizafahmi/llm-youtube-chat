import http from 'http';
import { fileURLToPath } from "url";

import {
  BedrockRuntimeClient,
  InvokeModelCommand
} from "@aws-sdk/client-bedrock-runtime";

async function invoke(prompt, modelId = "anthropic.claude-3-haiku-20240307-v1:0") {
  const client = new BedrockRuntimeClient({ region: "us-east-1" });

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1000,
    system: "You are an assistant to Riza Fahmi, a youtuber who cover topic about programming and related stuff. You will be response in Bahasa Indonesia. If you don't know the answer to the question, just say 'Maaf saya gak tau, saya orang baru disini.'. If user greet, please response back.",
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: prompt }],
      },
    ],
  };

  const command = new InvokeModelCommand({
    contentType: "application/json",
    body: JSON.stringify(payload),
    modelId,
  });
  const apiResponse = await client.send(command);

  // Decode and return the response(s)
  const decodedResponseBody = new TextDecoder().decode(apiResponse.body);

  const responseBody = JSON.parse(decodedResponseBody);
  return responseBody.content[0].text;

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