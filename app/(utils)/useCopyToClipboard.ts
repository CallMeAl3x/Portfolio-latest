import { useTranslations } from "next-intl";
import { toast } from "sonner";

// Hook personnalisé pour la gestion du clic
export const useCopyToClipboard = (text: string, type: "email" | "phone" = "phone") => {
  const t = useTranslations("Clipboard");
  const handleCopy = (() => {
    let clickData = { count: 0, lastTime: 0 };

    return () => {
      // Copie le texte
      const textToCopy = text;
      navigator.clipboard.writeText(textToCopy);

      const currentTime = Date.now();

      if (currentTime - clickData.lastTime > 2000) {
        clickData = { count: 0, lastTime: 0 };
      }

      clickData.count++;
      clickData.lastTime = currentTime;

      const label = t(type);

      if (clickData.count === 1) {
        toast.success(label);
      } else if (clickData.count === 2) {
        toast.info(t("twice"));
      } else if (clickData.count === 3) {
        toast.warning(t("thrice"));
      } else if (clickData.count >= 4) {
        toast.error(t("enough"));
      }
    };
  })();

  return handleCopy;
};
