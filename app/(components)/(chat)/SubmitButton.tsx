import { LoaderIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 disabled:bg-indigo-300"
    >
      {!pending ? "Send" : <LoaderIcon size={18} className="spin transform" />}
    </button>
  );
}
