"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Breadcrumb from "./Breadcrumb";
import NavbarLayout from "./NavbarLayout.jsx";
import Comment from "./Comment";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const DocsLayout = ({ children, tree }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <NavbarLayout />
      <div className="flex h-screen bg-background">
        {/* Sidebar with conditional rendering */}
        {sidebarVisible && <Sidebar tree={tree} className="col-resize" />}

        <main className="overflow-y-auto relative flex-1 px-12 py-8">
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="flex fixed left-4 top-20 z-50 gap-2 items-center px-3 py-2 rounded-lg border shadow-md transition-colors bg-card border-border hover:bg-muted/80"
            aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
          >
            {sidebarVisible ? (
              <>
                <PanelLeftClose size={18} />
                <span className="text-sm font-medium">Hide</span>
              </>
            ) : (
              <>
                <PanelLeftOpen size={18} />
                <span className="text-sm font-medium">Show</span>
              </>
            )}
          </button>

          <Breadcrumb tree={tree} />
          {children}
          <Comment />
        </main>
      </div>
    </>
  );
};

export default DocsLayout;
