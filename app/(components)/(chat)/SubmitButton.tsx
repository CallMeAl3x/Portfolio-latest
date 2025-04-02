interface SubmitButtonProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
}

export function SubmitButton({ handleSubmit, userInput, setUserInput }: SubmitButtonProps) {
  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={userInput}
        name="message"
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
        className="font-roboto flex-1 border border-gray-200 p-2 text-black focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        required
        maxLength={500}
      />
      <button
        type="submit"
        className="rounded-t-tlg bg-accent px-4 py-2 text-white transition-colors hover:bg-indigo-700 disabled:bg-indigo-300"
      >
        Send
      </button>
    </form>
  );
}
