import { toast } from "sonner";

// Hook personnalisé pour la gestion du clic
export const useCopyToClipboard = (text: string, type: "email" | "phone" = "phone") => {
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

      const label =
        type === "email"
          ? "L'adresse email a été copiée dans le presse-papier"
          : "Le numéro de téléphone a été copié dans le presse-papier";

      if (clickData.count === 1) {
        toast.success(label);
      } else if (clickData.count === 2) {
        toast.info("Tu as cliqué deux fois, continue comme ça !");
      } else if (clickData.count === 3) {
        toast.warning("Tu vas user ton curseur à force de cliquer !");
      } else if (clickData.count >= 4) {
        toast.error("C'est bon, laisse moi tranquille maintenant !");
      }
    };
  })();

  return handleCopy;
};
