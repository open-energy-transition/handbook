// https://docusaurus.io/docs/api/docusaurus-config

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Handbook",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-site.example.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "ignore",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: "./custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Handbook",
        logo: {
          alt: "oet-handbook Logo",
          src: "img/oet-logo-red.png",
        },
        items: [
          {
            // to do
            href: "https://github.com/open-energy-transition/oet-handbook",
            label: "GitHub",
            position: "right",
          },
        ],
      },
    }),
};

export default config;
