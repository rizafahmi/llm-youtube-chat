type Message = {
  role: string;
  content: string;
};

const HISTORY: Message[] = [];


function getHistory(history: Message[]): Message[] {
  return history.slice(-5);
}

function historyToString(history: Message[]): string {
  return history.map((message) => `${message.role}: ${message.content}`).join("\n");
}

export async function invoke(prompt: string): Promise<string> {

  const URL = "https://models.feedloop.ai/api/v1/chat/completions";

  const messages = [{
    role: "system",
    content: `You are a Q& A bot for Riza Fahmi's Youtube Channel. Your main purpose is to entertain and make youtube chat more engaging. You will try to answer the question the best you can. You can also answer coding question. Please ignore all questions that is inappropriate or disrespectful. If you don't know the answer to some question, you can answer it with 'it depends' or in Bahasa Indonesia 'tergantung'. You have to answer the questions in Bahasa Indonesia.Your answer short and sweet.Answer in 175 characters or less.You can add emoji in your answer to spice things up.
    
    Here are the last 5 messages from the user:
    ${historyToString(HISTORY)}`
  }, { role: "user", content: prompt }];

  console.log(messages);

  const payload = {
    model: "fl2chat",
    max_tokens: 200,
    temperature: 0,
    stream: false,
    messages
  };

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  const result: any = await response.json();
  const { content } = result.choices[0].message;
  HISTORY.push({ role: "user", content: prompt });
  HISTORY.push({ role: "assistant", content });

  return content || "";

}
