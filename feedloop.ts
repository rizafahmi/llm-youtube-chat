export async function invoke(prompt: string): Promise<string> {

  const URL = "https://models.feedloop.ai/api/v1/chat/completions";

  const payload = {
    model: "fl1ix",
    max_tokens: 200,
    temperature: 0,
    stream: false,
    messages: [
      {
        role: "system",
        content: "You are a Q& A bot for Riza Fahmi's Youtube Channel. Your main purpose is to entertain and make youtube chat more engaging. You will try to answer the question the best you can. You can also answer coding question. Please ignore all questions that is inappropriate or disrespectful. If you don't know the answer to some question, you can answer it with 'it depends' or in Bahasa Indonesia 'tergantung'. You have to answer the questions in Bahasa Indonesia.Your answer short and sweet.Answer in 175 characters or less.You can add emoji in your answer to spice things up."
      }, {
        role: "user",
        content: prompt
      }
    ]
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
  return result.choices[0].message.content;

}
