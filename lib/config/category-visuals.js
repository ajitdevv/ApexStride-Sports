function normalizeCategoryName(value) {
  return typeof value === "string" ? value.trim() : "";
}

const defaultCategoryVisual = {
  cardEyebrow: "Category spotlight",
  cardBackgroundClass: "from-[#eef4ff] via-white to-[#d8e7ff]",
  heroBackgroundClass: "from-[#0f1e37] via-[#0b1730] to-[#09111f]",
  heroPanelBackgroundClass: "from-white/16 via-white/10 to-white/6",
  highlights: ["Premium selection", "Athlete-ready picks", "Faster discovery"],
};

const categoryVisuals = {
  recovery: {
    cardEyebrow: "Recovery focus",
    cardBackgroundClass: "from-[#ebf4ff] via-[#f8fbff] to-[#d7e8ff]",
    heroBackgroundClass: "from-[#10223f] via-[#0b1730] to-[#070f1d]",
    heroPanelBackgroundClass: "from-sky-400/18 via-white/10 to-transparent",
    description: "Recovery essentials built to help athletes reset faster between hard sessions.",
    heroTitle: "Recovery gear that keeps the next session within reach.",
    heroDescription:
      "Browse foam rollers, mobility tools, and recovery accessories curated to help your training routine bounce back faster.",
    highlights: ["Muscle reset", "Routine recovery", "Post-session support"],
  },
  hydration: {
    cardEyebrow: "Hydration focus",
    cardBackgroundClass: "from-[#e7fbff] via-[#f7ffff] to-[#d6f3ff]",
    heroBackgroundClass: "from-[#0b2740] via-[#0a1b31] to-[#08101e]",
    heroPanelBackgroundClass: "from-cyan-300/18 via-white/10 to-transparent",
    description: "Hydration picks designed to keep every session cleaner, lighter, and easier to manage.",
    heroTitle: "Hydration essentials made for long sessions and faster movement.",
    heroDescription:
      "Explore bottles, shakers, and training-day hydration gear chosen for athletes who want dependable utility with a premium feel.",
    highlights: ["Training hydration", "Daily carry", "Clean utility"],
  },
  "training-support": {
    cardEyebrow: "Training support",
    cardBackgroundClass: "from-[#efeaff] via-[#faf8ff] to-[#ddd7ff]",
    heroBackgroundClass: "from-[#1a1d4b] via-[#13173a] to-[#0a0f23]",
    heroPanelBackgroundClass: "from-indigo-300/18 via-white/10 to-transparent",
    description: "Training support tools that help sessions feel more structured, confident, and repeatable.",
    heroTitle: "Training support gear that helps every session feel dialed in.",
    heroDescription:
      "Shop straps, support accessories, and training-day tools selected to make lifting, conditioning, and preparation easier to repeat.",
    highlights: ["Session support", "Stronger prep", "Reliable training"],
  },
};

export function getCategoryVisualMetadata(slug, name = "") {
  const normalizedName = normalizeCategoryName(name) || "Category";
  const matchingVisual = typeof slug === "string" ? categoryVisuals[slug] : null;
  const visual = matchingVisual ?? defaultCategoryVisual;

  return {
    cardEyebrow: visual.cardEyebrow,
    cardBackgroundClass: visual.cardBackgroundClass,
    heroBackgroundClass: visual.heroBackgroundClass,
    heroPanelBackgroundClass: visual.heroPanelBackgroundClass,
    description: visual.description ?? `${normalizedName} essentials curated for a smoother premium storefront journey.`,
    heroTitle: visual.heroTitle ?? `${normalizedName} essentials built for focused sessions.`,
    heroDescription:
      visual.heroDescription ?? `Browse ${normalizedName.toLowerCase()} products selected to make product discovery faster and easier.`,
    highlights: visual.highlights ?? defaultCategoryVisual.highlights,
  };
}
