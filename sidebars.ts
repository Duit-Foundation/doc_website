import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    'intro',
    {
      type: 'category',
      label: 'sidebar.get_started',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        'get_started/installation',
        'get_started/add_to_app',
        'get_started/add_to_server'
      ],
    },
    {
      type: 'category',
      label: "sidebar.core_concepts",
      collapsed: true,
      link: {
        type: 'generated-index',
      },
      items: [
        'core_concepts/kernel_overview',
        'core_concepts/actions_events',
        'core_concepts/controlled_widgets',
        'core_concepts/transport_layer',
        'core_concepts/server_side',
      ],
    },
    {
      type: 'category',
      label: "sidebar.advanced_tech",
      collapsed: true,
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'category',
          label: "sidebar.components",
          collapsed: true,
          link: {
            type: 'doc',
            id: 'advanced_tech/components/about',
          },
          items: [
            'advanced_tech/components/server',
            'advanced_tech/components/app',
          ],
        },
        'advanced_tech/transport_override',
        {
          type: 'category',
          label: "sidebar.custom_widgets",
          link: {
            type: 'doc',
            id: 'advanced_tech/custom/about',
          },
          items: [
            'advanced_tech/custom/server',
            'advanced_tech/custom/app',
          ],
        },
        'advanced_tech/scripting',
        'advanced_tech/themes',
        // 'advanced_tech/native',
      ],
    },
    {
      type: "category",
      label: "sidebar.widgets",
      // link: {
      //   type: 'generated-index',
      // },
      collapsed: true,
      items: [
        {
          type: "category",
          label: "sidebar.flutter_widgets",
          collapsed: false,
          items: [
            {
              type: "autogenerated",
              dirName: "widgets/flutter",
            },
          ],
        },
        {
          type: "category",
          label: "sidebar.special_widgets",
          collapsed: false,
          link: {
            type: 'generated-index',
          },
          items: [
            {
              type: "autogenerated",
              dirName: "widgets/special",
            },
          ],
        },
      ]
    },
    {
      type: 'category',
      label: "sidebar.api",
      collapsed: true,
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'category',
          label: "sidebar.dart_api",
          link: {
            id: "dart_heading",
            type: 'doc',
          },
          items: [
            {
              type: "autogenerated",
              dirName: "api/dart_api",
            },
          ]
        },
      ],
    }
  ],
};

export default sidebars;
