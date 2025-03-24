"use server";

export const generateChangelogSummary = async (commitMessages: string) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You summarize commit messages into a JSON changelog.",
        },
        {
          role: "user",
          content: `Convert these commit messages into a JSON changelog with the schema:
{
  "date": "Month Day, Year",
  "title": "Version.LatestCommitHash",
  "changes": [
    {
      "title": "Change summary",
      "changes": ["Change 1", "Change 2", "Change 3"]
    }
  ],
  "tags": ["Tag1", "Tag2"]
}
Limit each changes array to 3 items and return only valid JSON.
Commit messages:
${commitMessages}`,
        },
      ],
      max_tokens: 500,
      temperature: 0,
    }),
  });

  const data = await response.json();
  console.log(data.choices[0].message.content);
  return data.choices[0].message.content;
};
