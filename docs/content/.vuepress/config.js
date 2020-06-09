module.exports = {
    title: 'ipymonaco',
    description: 'A Jupyter widget that renders the Microsoft\'s Monaco text editor inline within the notebook.',
    base: '/ipymonaco/', // Comment if in dev mode
    head: [['link', { rel: 'icon', href: '/favicon-16x16.png' }]],
    // serviceWorker: true,
    themeConfig: {
        algolia: {
            apiKey: '17ba387ade07159035fd0f86a4080cbf',
            indexName: 'ipymonaco'
        },
        
        repo: 'https://github.com/sodennis/ipymonaco',
        editLinks: false,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
            {
                text: 'User Guide',
                link: '/guide/install',
            }
        ],
        sidebarDepth: 5,
        sidebar: [
            {
                title: 'User Guide',
                collapsable: false,
                children: [
                    '/guide/install',
                    '/guide/uninstall'
                ],
            },
        ],
    },
    markdown: {
        lineNumbers: false,
    },
};
