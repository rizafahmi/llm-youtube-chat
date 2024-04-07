import {
  BedrockRuntimeClient,
  InvokeModelCommand
} from "@aws-sdk/client-bedrock-runtime";

export async function invoke(prompt: string, modelId: string = "anthropic.claude-3-haiku-20240307-v1:0") {
  const client = new BedrockRuntimeClient({ region: "us-east-1" });

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1000,
    system: "You are an assistant to Riza Fahmi, a youtuber who cover topic about programming and related stuff. You will be response in Bahasa Indonesia. Your response should be less than 22 words. If you don't know the answer to the question, just say 'Maaf saya gak tau, saya orang baru disini.'. If user greet, please response back.",
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