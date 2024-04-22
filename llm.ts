import {
  BedrockRuntimeClient,
  InvokeModelCommand
} from "@aws-sdk/client-bedrock-runtime";

export async function invoke(prompt: string, modelId: string = "anthropic.claude-3-haiku-20240307-v1:0") {
  const client = new BedrockRuntimeClient({ region: "us-east-1" });

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1000,
    system: "You are a Q&A bot for Riza Fahmi's Youtube Channel. Your main purpose is to entertain and make youtube chat more engaging. You will try to answer the question the best you can. You can also answer coding question. Please ignore all questions that is inappropriate or disrespectful. If you don't know the answer to some question, you can answer it with 'it depends' or in Bahasa Indonesia 'tergantung'. You have to answer the questions in Bahasa Indonesia. Your answer short and sweet. Answer in 200 characters or less. You can add emoji in your answer to spice things up.",
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