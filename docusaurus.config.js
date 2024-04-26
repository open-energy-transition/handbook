const organizationName = "open-energy-transition";
const projectName = "handbook";

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Handbook",
  favicon: "img/favicon.ico",

  url: `https://${organizationName}.github.io`,
  baseUrl: `/${projectName}/`,

  organizationName: "Open Energy Transition",
  projectName: "Handbook",

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
          routeBasePath: "/docs",
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/open-energy-transition/handbook/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        language: "en",
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/oet-logo-red.png",
      navbar: {
        title: "Handbook",
        logo: {
          alt: "oet-handbook Logo",
          src: "img/oet-logo-red.png",
        },
        items: [
          { to: "/docs", label: "Home", position: "left" },
          {
            href: "https://github.com/open-energy-transition/handbook",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Home",
            items: [
              {
                label: "handbook",
                to: "/docs",
              },
            ],
          },
          {
            title: "Community",
            items: [
              // {
              //   label: "Stack Overflow",
              //   href: "https://stackoverflow.com/questions/tagged/docusaurus",
              // },
              {
                label: "Discord",
                href: "https://discord.gg/HY4DpT2x",
              },
              // {
              //   label: "Twitter",
              //   href: "https://twitter.com/docusaurus",
              // },
            ],
          },
          {
            title: "More",
            items: [
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "GitHub",
                href: "https://github.com/open-energy-transition/handbook",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} handbook, OET. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
