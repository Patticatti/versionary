import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    // Here, call OpenAI API to summarize the changelog
    const summarizedChangelog = await summarizeChangelog(prompt);

    return NextResponse.json({ summarizedChangelog });
  } catch (error) {
    console.error("Error summarizing changelog:", error);
    return NextResponse.json(
      { error: "Failed to summarize changelog" },
      { status: 500 }
    );
  }
}

async function summarizeChangelog(prompt: string) {
  const url = "https://api.openai.com/v1/chat/completions"; // Updated endpoint

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Updated model
      messages: [
        // Updated format for chat completions
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1500,
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error from OpenAI API: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim(); // Updated response format
}
