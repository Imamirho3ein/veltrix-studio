"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/portfolio";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { cn } from "@/lib/utils";

type FilterKey = "all" | ProjectCategory;

export function PortfolioExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<FilterKey>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((project) => project.category === active);

  return (
    <div>
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="فیلتر پروژه‌ها"
      >
        {projectCategories.map((category) => {
          const isActive = active === category.key;
          return (
            <button
              key={category.key}
              type="button"
              onClick={() => setActive(category.key as FilterKey)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[0.8rem] transition-all duration-300",
                isActive
                  ? "border-transparent bg-[linear-gradient(135deg,#6f4e37,#b08968)] text-[#FFF9F0] shadow-[0_10px_30px_-14px_rgba(176, 137, 104,0.9)]"
                  : "border-white/10 bg-white/[0.025] text-fog-400 hover:border-white/20 hover:text-white",
              )}
            >
              {category.label}
              {category.key === "all" ? (
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 font-latin text-[0.6rem]">
                  {projects.length}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full"
            >
              <PortfolioCard
                project={project}
                loading={active === "all" && index < 3 ? "eager" : "lazy"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} پروژه نمایش داده می‌شود.
      </p>
    </div>
  );
}
