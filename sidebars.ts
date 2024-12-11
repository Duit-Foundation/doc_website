import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

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
      label: 'Getting Started',
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
      label: "Core concepts",
      collapsed: true,
      items: [
        'core_concepts/actions_events',
        'core_concepts/transport_layer',
        'core_concepts/controlled_widgets',
        'core_concepts/kernel_overview',
        'core_concepts/server_side',
      ],
    },
    {
      type: 'category',
      label: "Advanced techniques",
      collapsed: true,
      items: [
              {
                type: 'category',
                label: "Components",
                collapsed: true,
                items: [
                  'advanced_tech/components/about',
                  'advanced_tech/components/app',
                  'advanced_tech/components/server',
                ],
              },
                'advanced_tech/transport_override',
        {
                        type: 'category',
                        label: "Custom widgets",
                        items: [
                            'advanced_tech/custom/about',
                          'advanced_tech/custom/server',
                          'advanced_tech/custom/app',
                        ],
                      },
        'advanced_tech/scripting',
        'advanced_tech/native',
      ],
    }
  ],
  api: [
    {type: "autogenerated", dirName: 'api'}
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
