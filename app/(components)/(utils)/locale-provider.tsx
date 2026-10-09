"use client";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { createContext, useCallback, useContext, useState } from "react";

type Locale = (typeof routing.locales)[number];

const SwitchLocaleContext = createContext<(next: Locale) => Promise<void>>(async () => {});

// Changement de langue sans navigation : on charge les messages, on rend avec, et l'URL suit
// (replaceState) pour qu'un rechargement ou un lien partagé garde la langue choisie.
// Le segment [lang] du layout ne change pas, donc rien n'est remonté : position, état et animations restent.
export function LocaleProvider({
  locale: initialLocale,
  messages: initialMessages,
  children
}: {
  locale: Locale;
  messages: AbstractIntlMessages;
  children: React.ReactNode;
}) {
  const [{ locale, messages }, setState] = useState({ locale: initialLocale, messages: initialMessages });

  const switchLocale = useCallback(
    async (next: Locale) => {
      if (next === locale) return;
      const nextMessages = (await import(`../../../messages/${next}.json`)).default as AbstractIntlMessages;
      setState({ locale: next, messages: nextMessages });

      const { pathname, search, hash } = window.location;
      const path = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${next}`);
      window.history.replaceState(window.history.state, "", path + search + hash);
      document.documentElement.lang = next;
      // l'accueil porte le titre du site ; une page projet porte le nom du projet, identique dans les deux langues
      const meta = nextMessages.Metadata as Record<string, string> | undefined;
      if (path === `/${next}` && meta?.title) document.title = meta.title;
    },
    [locale]
  );

  return (
    <SwitchLocaleContext.Provider value={switchLocale}>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
        {children}
      </NextIntlClientProvider>
    </SwitchLocaleContext.Provider>
  );
}

export const useSwitchLocale = () => useContext(SwitchLocaleContext);
