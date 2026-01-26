"use client";

import { usePathname } from "next/navigation";
import { getBreadcrumbForPath } from "@/lib/navigation";
import { MdChevronRight } from "react-icons/md";
import Link from "next/link";

export default function Breadcrumb({ tree }) {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumbForPath(pathname, tree);

  if (!breadcrumb || breadcrumb.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 items-center mb-6 text-xs sm:flex-row sm:text-sm">
      {breadcrumb.map((crumb, index) => {
        const isLast = index === breadcrumb.length - 1;

        return (
          <div key={index} className="flex gap-2 items-center">
            {isLast ? (
              <span className="font-semibold text-foreground">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="font-semibold transition-colors text-primary hover:text-accent-foreground"
              >
                {crumb.label}
              </Link>
            )}

            {!isLast && (
              <MdChevronRight className="text-muted-foreground" size={18} />
            )}
          </div>
        );
      })}
    </div>
  );
}
