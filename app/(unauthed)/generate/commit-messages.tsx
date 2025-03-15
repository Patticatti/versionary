import { memo } from "react";

interface CommitMessagesProps {
  messages: string[] | string[][];
}

export default memo(function CommitMessages({ messages }: CommitMessagesProps) {
  return (
    <div className="mt-2 bg-gray-100 p-2 rounded">
      <p className="font-semibold">Latest Commits:</p>
      {Array.isArray(messages[0]) ? (
        (messages as string[][]).map((commitGroup, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            <ul className="list-disc ml-5 text-sm">
              {commitGroup.map((msg, idx) => (
                <li key={idx} className="mb-1">
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul className="list-disc ml-5 text-sm">
          {(messages as string[]).map((msg, idx) => (
            <li key={idx} className="mb-1">
              {msg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
