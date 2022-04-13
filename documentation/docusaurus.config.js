// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Parallax Controller',
  tagline:
    'Core classes and controller for creating parallax scrolling effects',
  url: 'https://parallax-controller.damnthat.tv',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'jscottsmith', // Usually your GitHub org/user name.
  projectName: 'parallax-controller', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: 'YVJ9L8IGS3',
        // Public API key: it is safe to commit it
        apiKey: '59df3c62f6a1a15d23659f198810311f',
        indexName: 'parallax-controller',
        contextualSearch: true,
        externalUrlRegex: 'external\\.com|domain\\.com',
        searchParameters: {},
      },
      navbar: {
        title: 'Parallax Controller',
        logo: {
          alt: 'Joystick Emoji',
          src: 'img/joystick.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'performance',
            position: 'left',
            label: 'Performance',
          },
          {
            type: 'doc',
            docId: 'usage/basic-usage',
            position: 'left',
            label: 'Usage',
          },
          {
            type: 'doc',
            docId: 'api/index',
            position: 'left',
            label: 'API',
          },
          {
            href: 'https://github.com/jscottsmith/parallax-controller',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },

              {
                to: '/docs/performance',
                label: 'Performance',
              },

              {
                to: '/docs/usage/basic-usage',
                label: 'Usage',
              },
              {
                to: '/docs/api/',
                label: 'API',
              },
            ],
          },
          {
            title: 'Elsewhere',
            items: [
              {
                label: 'NPM',
                href: 'https://www.npmjs.com/package/parallax-controller',
              },
              {
                label: 'Github',
                href: 'https://github.com/jscottsmith/parallax-controller',
              },
              {
                label: 'Support',
                href:
                  'https://github.com/jscottsmith/parallax-controller/issues',
              },
            ],
          },
          {
            title: 'Who',
            items: [
              {
                label: 'J',
                href: 'https://github.com/jscottsmith',
              },
              {
                label: 'Damnthat.tv',
                href: 'https://damnthat.tv/',
              },
              {
                label: '@damntelevision',
                href: 'https://twitter.com/damntelevision',
              },
            ],
          },
        ],
        copyright: `It's ok 👌🏻`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
