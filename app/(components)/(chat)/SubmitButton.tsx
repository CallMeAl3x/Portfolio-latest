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
    <form onSubmit={handleSubmit} className="flex w-full flex-col sm:flex-row">
      <input
        type="text"
        value={userInput}
        name="message"
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={t("placeholder")}
        className="focus:ring-indigo-accent border border-gray-200 p-3 font-poppins-reg text-black focus:border-accent focus:outline-none focus:ring-1 sm:rounded-none sm:p-2 md:w-[75%]"
        required
        maxLength={500}
        disabled={isLoading || disabled}
      />
      <button
        type="submit"
        disabled={isLoading || !userInput.trim() || disabled}
        className="rounded-none bg-accent px-6 py-3 text-base text-white transition-colors hover:bg-accent/85 disabled:bg-accent/50 md:w-[25%]"
      >
        {!isLoading ? (
          <p className="font-poppins-reg">{t("send")}</p>
        ) : (
          <LoaderIcon size={20} className="spin transform" />
        )}
      </button>
    </form>
  );
}
