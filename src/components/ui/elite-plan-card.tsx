"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "framer-motion";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface ElitePlanCardProps extends HTMLMotionProps<"div"> {
  title: string;
  subtitle: string;
  description: string;
  highlights?: string[];
  ctaUrl: string;
}

export const GlassRoomCard = React.forwardRef<
  HTMLDivElement,
  ElitePlanCardProps
>(
  (
    {
      className,
      title,
      subtitle,
      description,
      highlights = [],
      ctaUrl,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "relative w-full overflow-hidden rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-8 sm:p-12 text-white",
          className
        )}
        {...props}
      >
        <p className="text-xs uppercase tracking-widest text-white/70 mb-2">
          {subtitle}
        </p>
        <h3 className="text-4xl font-serif mb-4 drop-shadow-md">{title}</h3>
        <p className="text-sm leading-relaxed text-white/90 mb-8 drop-shadow-sm">
          {description}
        </p>

        {/* Highlights */}
        {highlights.length > 0 && (
          <ul className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-white/90">
            {highlights.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 py-2 border-b border-white/20"
              >
                <span className="text-white bg-white/20 p-1 rounded-full">✓</span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center px-6 py-4 bg-white text-[#1b2230] hover:bg-white/90 rounded-full text-sm uppercase tracking-widest font-bold transition-all shadow-lg hover:shadow-xl"
          >
            Check Availability
          </a>
        </div>
      </motion.div>
    );
  }
);

GlassRoomCard.displayName = "GlassRoomCard";
