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
 
           Return **only** valid JSON. Do not include explanations or extra text.`,
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
