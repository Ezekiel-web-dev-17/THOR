"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/lib/navigation';

const Sidebar = () => {

  const pathname = usePathname();

  return (
    <aside className="w-56 bg-muted border-r border-border overflow-y-auto py-6 px-4">
        <nav>
          {navigationItems.map((section) => (
            <div key={section.section}>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2 mt-6">
                {section.section}
              </div>
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`block px-3 py-2 rounded transition-colors ${
                      isActive
                        ? 'border-l-primary text-foreground font-semibold'
                        : 'border-l-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
    </aside>
  )
}

export default Sidebar