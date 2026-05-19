export const siteConfig = {
  name: "ApexStride Sports",
  description:
    "Premium sports accessories for athletes who want elevated design, dependable performance, and a cleaner shopping experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: "support@apexstride.example",
  hero: {
    eyebrow: "Training, recovery, and hydration essentials",
    title: "Shop premium sports accessories built for every session.",
    description:
      "ApexStride Sports helps athletes move from discovery to checkout faster with premium essentials, cleaner product browsing, and a sharper shopping experience.",
    primaryCta: {
      label: "Shop now",
      href: "/shop",
    },
    secondaryCta: {
      label: "View your account",
      href: "/account",
    },
  },
  metrics: [
    {
      label: "Core categories",
      value: "3",
      detail: "Recovery, hydration, and training support give shoppers faster entry into the right gear.",
    },
    {
      label: "Storefront data",
      value: "Live",
      detail: "Catalog, account, and order data stay connected through the commerce backend.",
    },
    {
      label: "Shopping standard",
      value: "Premium",
      detail: "Design, utility, and usability stay focused on a polished athlete-first buying experience.",
    },
  ],
};
