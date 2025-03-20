import { NextApiRequest, NextApiResponse } from "next";

const openaiApiCall = async (prompt: string) => {

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
      temperature: 0.5,
    }),
  });

  const data = await response.json();
  return data.choices[0].text.trim();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;

  try {
    const summarizedChangelog = await openaiApiCall(prompt);
    res.status(200).json({ summarizedChangelog });
  } catch (error) {
    res.status(500).json({ error: "Error summarizing changelog." });
  }
}
