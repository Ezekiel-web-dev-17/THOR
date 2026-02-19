"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar.js";
import Breadcrumb from "./Breadcrumb.jsx";
import NavbarLayout from "./NavbarLayout.jsx";
import Comment from "./Comment.jsx";
import Button from "@/components/Button";
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

        <main className="relative flex-1 px-12 py-8 overflow-y-auto">
          {/* Sidebar Toggle Button */}
          <Button
            onClick={toggleSidebar}
            variant="other"
            size="small"
            className="fixed top-0 z-50 border-2 border-gray-300 shadow-md cursor-pointer left-4 rounded-xl hover:text-black"
            icon={
              sidebarVisible ? (
                <PanelLeftClose size={18} />
              ) : (
                <PanelLeftOpen size={18} />
              )
            }
          >
            {sidebarVisible ? "Hide" : "Show"}
          </Button>

          <Breadcrumb tree={tree} />
          {children}
          <Comment />
        </main>
      </div>
    </>
  );
}


export default DocsLayout