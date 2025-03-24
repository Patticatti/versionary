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
          content:
            "You are a helpful assistant that summarizes commit messages into structured JSON changelogs.",
        },
        {
          role: "user",
          content: `Generate a summarized changelog in JSON format with the following commit messages:
          
          ${commitMessages}
          
          The JSON should follow this format:
          {
            "date": "Month Day, Year",
            "title": "Version Name.Latest Commit Hash",
            "changes": [
              {
                "title": "Change summary",
                "changes": [
                  "Change 1",
                  "Change 2",
                  "Change 3"
                ]
              },
              {
                "title": "Change 2 summary",
                "changes": [
                  "Change 1",
                  "Change 2",
                  "Change 3"
                ]
              },
              {
                "title": "Additional updates",
                "changes": [
                  "Change 1",
                  "Change 2",
                  "Change 3",
                ]
              },
            ],
            "tags":["Product", "Feature"]
          }
            
          **Important:** For each change list under a change category, include a maximum of 3 changes only. 
          If there are some miscellaneous fixes and updates, put them under the title "Additional updates". Do not duplicate changes.

          Example Output:
          {
            "date": "January 17, 2025",
            "title": "2025-01-17.42f23m9",
            "changes": [
              {
                "title": "More granular control of credit grants",
                "changes": [
                  "Credit grants can now be applied to specific prices.",
                  "Credit grants can now be prioritized.",
                ]
              },
              {
                "title": "More flexibility for buy now, pay later methods",
                "changes": [
                  "Makes shipping information an optional parameter for Afterpay payments.",
                  "Makes billing country and email fields optional for Klarna payments.",
                  "Currency options now automatically converts to USD."
                ]
              },
              {
                "title": "Improved workflows for Checkout Sessions",
                "changes": [
                  "Adds support for blocking specific card brands in Checkout Sessions.",
                  "Checkout Sessions now group customer information in one field.",
                  "Checkout Sessions now persist through page reloads.",
                ]
              },
              {
                "title": "Additional updates",
                "changes": [
                  "Adds metadata field to the Products API for creating an inline default price.",
                  "Adds ability to schedule debit payments for a specific date.",
                ]
              },
                
            ],
            "tags":["Flex", "Product"]
          }

          Example 2 Output:
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

          Return **only** valid JSON. Do not include explanations or extra text.`,
        },
      ],
      max_tokens: 1200,
      temperature: 0,
    }),
  });

  const data = await response.json();
  console.log(data.choices[0].message.content);
  return data.choices[0].message.content;
};
