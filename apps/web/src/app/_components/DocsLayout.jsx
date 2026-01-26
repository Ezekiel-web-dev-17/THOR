"use client";
import React from "react";
import Sidebar from "./Sidebar.jsx";
import Breadcrumb from "./Breadcrumb";
import NavbarLayout from "./NavbarLayout.jsx";
import Comment from "./Comment";

const DocsLayout = ({ children, tree }) => {
  return (
    <>
      <NavbarLayout />
      <div className="flex h-screen bg-background">
        <Sidebar tree={tree} className="col-resize" />
        <main className="overflow-y-auto flex-1 px-12 py-8">
          <Breadcrumb tree={tree} />
          {children}
          <Comment />
        </main>
      </div>
    </>
  );
};

export default DocsLayout;
