import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  experimental: {
    // CSS intégré au HTML : plus de requête qui bloque le premier affichage
    inlineCss: true
  }
};

export default withNextIntl(nextConfig);
