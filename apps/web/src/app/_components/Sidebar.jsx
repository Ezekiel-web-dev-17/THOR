"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';

const Sidebar = ({ tree }) => {
  const pathname = usePathname();

  // Recursive component to render tree
  const TreeItem = ({ item, level = 0 }) => {
    if (item.type === 'folder') {
      return (
        <div key={item.name} style={{ marginLeft: `${level * 16}px` }}>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2 mt-6">
            {item.name}
          </div>
          <div className="ml-4">
            {item.children.map((child) => (
              <TreeItem 
                key={child.name || child.path} 
                item={child} 
                level={level + 1}
              />
            ))}
          </div>
        </div>
      );
    }
    
    if (item.type === 'file') {
      const isActive = pathname === `/docs${item.route}`;
      return (
        <Link
          key={item.name}
          href={`/docs${item.route}`}
          className={`block px-3 py-2 rounded transition-colors border-l-2 ${
            isActive
              ? 'border-l-primary text-foreground font-semibold'
              : 'border-l-transparent text-muted-foreground hover:text-foreground'
          }`}
          style={{ marginLeft: `${level * 16}px` }}
        >
          {item.name}
        </Link>
      );
    }
    
    return null;
  }

  if (!tree || tree.length === 0) {
    return (
      <aside className="w-56 bg-muted border-r border-border overflow-y-auto py-6 px-4">
        <div className="text-red-500">No tree data available</div>
        <div className="text-sm text-gray-500">Check your getDocsTree function</div>
      </aside>
    );
  }

  return (
    <aside className="w-56 bg-muted border-r border-border overflow-y-auto py-6 px-4">
      <nav>
        {tree.map((item) => (
          <TreeItem key={item.name} item={item} level={0} />
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar