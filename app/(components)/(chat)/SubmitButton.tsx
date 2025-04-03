import { LoaderIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface SubmitButtonProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  disabled?: boolean;
}

export function SubmitButton({ handleSubmit, userInput, setUserInput, isLoading, disabled }: SubmitButtonProps) {
  const t = useTranslations("About.chatbot");
  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={userInput}
        name="message"
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={t("placeholder")}
        className="flex-1 border border-gray-200 p-2 font-poppins-reg text-black focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        required
        maxLength={500}
        disabled={isLoading || disabled}
      />
      <button
        type="submit"
        disabled={isLoading || !userInput.trim() || disabled}
        className="rounded-t-tlg bg-accent px-4 py-2 text-white transition-colors hover:bg-indigo-700 disabled:bg-indigo-300"
      >
        {!isLoading ? (
          <p className="font-poppins-reg">{t("send")}</p>
        ) : (
          <LoaderIcon size={18} className="spin transform" />
        )}
      </button>
    </form>
  );
}
