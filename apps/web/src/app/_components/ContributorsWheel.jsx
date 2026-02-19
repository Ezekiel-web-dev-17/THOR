"use client";

import { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";

function ContributorCard({ contributor }) {
  return (
    <a
      href={`https://github.com/${contributor.github}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 transition-all duration-300 border rounded-lg min-w-xl place-self-center group border-border bg-card hover:border-primary hover:bg-card/80 hover:scale-105 hover:border-4"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://github.com/${contributor.github}.png`}
        alt={contributor.name}
        className="object-cover w-12 h-12 transition-colors border-2 rounded-full border-border group-hover:border-primary"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate transition-colors text-foreground group-hover:text-primary">
          {contributor.name}
        </h3>
        <p className="text-sm truncate text-muted-foreground">
          @{contributor.github}
        </p>
      </div>
      <FaGithub
        className="transition-colors text-muted-foreground group-hover:text-primary shrink-0"
        size={20}
      />
    </a>
  );
}

export default function ContributorsWheel({ contributors = [] }) {
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    let animationId;
    const speed = 0.25; // gentle, slow motion

    const autoScroll = () => {
      el.scrollTop += speed;

      // loop back to top when reaching the bottom
      if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
        el.scrollTop = 0;
      }

      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  if (!contributors || contributors.length === 0)
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Our Amazing Contributors</h1>
          <p className="mb-6 text-lg text-muted-foreground">
            Loading contributors from GitHub...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Our Amazing Contributors</h1>
          <p className="mb-6 text-lg text-muted-foreground">
            Special thanks to the {contributors.length} amazing{" "}
            {contributors.length === 1 ? "person" : "people"} who contributed to
            making THOR better!
          </p>
        </div>

        {/* Code Contributors */}
        {contributors.length > 0 && (
          <div className="max-w-2xl mx-auto mb-2 overflow-x-auto">
            {/* List with fade effect */}
            <div className="relative">
              {/* Top fade */}
              <div className="absolute top-0 left-0 right-0 z-10 h-20 pointer-events-none bg-gradient-to-b to-transparent from-background via-background/80"></div>

              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 z-10 h-20 pointer-events-none bg-gradient-to-t to-transparent from-background via-background/80"></div>

              {/* Contributors List */}
              <ul
                ref={listRef}
                className="h-auto py-12 mb-12 space-y-3 overflow-x-visible overflow-y-auto scrollbar-hide"
              >
                {contributors.map((contributor) => (
                  <li
                    key={contributor.github}
                    className="overflow-x-visible list-none"
                  >
                    <ContributorCard contributor={contributor} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* How to Contribute Section */}
        <div className="max-w-3xl p-8 mx-auto border rounded-lg bg-card border-border">
          <h2 className="mb-4 text-2xl font-bold">
            Want to Join Our Community?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Contributing is easy! Just follow these simple steps:
          </p>

          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="flex items-center justify-center w-6 h-6 font-semibold rounded-full shrink-0 bg-primary text-primary-foreground">
                1
              </span>
              <div>
                <strong>Fork the repository</strong> on GitHub
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex items-center justify-center w-6 h-6 font-semibold rounded-full shrink-0 bg-primary text-primary-foreground">
                2
              </span>
              <div>
                <strong>Make your changes</strong> - fix bugs, add features,
                improve docs
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex items-center justify-center w-6 h-6 font-semibold rounded-full shrink-0 bg-primary text-primary-foreground">
                3
              </span>
              <div>
                <strong>Submit a pull request</strong> - once merged, you will
                automatically appear here!
              </div>
            </li>
          </ol>

          <div className="p-4 mt-6 border rounded-lg bg-accent border-primary/20">
            <p className="text-sm">
              <strong>✨ Pro tip:</strong> Contributors are fetched
              automatically from GitHub API. You do not need to add yourself
              anywhere - just make valuable contributions!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
