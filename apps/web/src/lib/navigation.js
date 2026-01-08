export const navigationItems = [
  {
    section: 'QUICK START',
    items: [
        { 
            id: 'getting-started', 
            label: 'Getting Started', 
            href: '/getting-started', 
            breadcrumb: [
                { label: 'QUICK START', href: '/getting-started' },
                { label: 'Getting Started' }
            ] 
        },
        { 
            id: 'installation', 
            label: 'Installation', 
            href: '/installation',
            breadcrumb: [
                { label: 'QUICK START', href: '/getting-started' },
                { label: 'Installation' }
            ] 
        },
    ]
  },
  {
    section: 'LEARN',
    items: [
        { 
            id: 'tutorial', 
            label: 'Tutorial: Hello World', 
            href: '/tutorial',
            breadcrumb: [
                {label: 'LEARN', href: '/tutorial'},
                {label: 'Tutorial: Hello World'}
            ]
        },
        { 
            id: 'concepts', 
            label: 'Core Concepts', 
            href: '/concepts',
            breadcrumb: [
                {label: 'LEARN', href: '/tutorial'},
                {label: 'Core Concepts'}
            ]
        },
    ]
  },
  {
    section: 'REFERENCE',
    items: [
        { 
            id: 'api-reference', 
            label: 'API Reference', 
            href: '/api-reference',
            breadcrumb: [
                { label: 'REFERENCE', href: '/api-reference' },
                { label: 'API Reference' }
            ]
        },
    ]
  }
];

// Helper function to get breadcrumb for a path
export function getBreadcrumbForPath(pathname) {
  for (const section of navigationItems) {
    for (const item of section.items) {
      if (item.href === pathname) {
        return item.breadcrumb;
      }
    }
  }
  return null;
}