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
          content: `
          Convert these commits into a summarized JSON changelog with the schema:
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
            Limit each changes array to 3 items and return only valid JSON. The changes should 
            be understandable with enough context and reflect a summary of all the changes which occured.

          **Important:** For each change list under a change category, include a maximum of 3 changes only. 
          If there are some miscellaneous fixes and updates, put them under the title "Additional updates". Do not duplicate changes.

          Example Output:
          {
            "date": "February 7, 2025",
            "title": "2025-02-07.2h92s8",
            "changes": [
              {
                "title": "Audio and Dialogue Updates",
                "changes": [
                  "Implemented audio log features and playback controls",
                  "Enhanced dialogue start and script execution",
                  "Optimized pause/play functionality for audio logs"
                ]
              },
              {
                "title": "Gameplay and Level Updates",
                "changes": [
                  "Enabled Level 3 teleport and lever attack integration",
                  "Added electrical components and completed floor 2 design",
                  "Updated lever prefabs, sliding doors, and integrated additional audio logs"
                ]
              },
              {
                "title": "Puzzle and UI Improvements",
                "changes": [
                  "Completed keycode puzzle with improved reliability",
                  "Enhanced health and mana UI and fixed player idle sprite",
                  "Readded static player inventory and integrated working inventory system"
                ]
              },
              {
                "title": "Miscellaneous and Final Fixes",
                "changes": [
                  "Readded all assets and committed changes",
                  "Added new level and saved scene progress",
                  "Optimized jump physics and finalized initial commit"
                ]
              }
            ],
            "tags": ["Audio", "Gameplay", "UI", "Fixes"]
        }

      Commit messages:
${commitMessages}`,
        },
      ],
      max_tokens: 700,
      temperature: 0,
    }),
  });

  const data = await response.json();
  console.log(data.choices[0].message.content);
  return data.choices[0].message.content;
};
