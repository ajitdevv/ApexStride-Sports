export const siteConfig = {
  name: "ApexStride Sports",
  description:
    "Premium sports accessories for athletes who want elevated design, dependable performance, and a cleaner shopping experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: "support@apexstride.example",
  hero: {
    eyebrow: "Premium training, recovery, and hydration gear",
    title: "Gear every session with premium accessories built for repeat performance.",
    description:
      "ApexStride Sports brings together premium sports essentials, stronger digital merchandising, and a cleaner account journey so athletes can discover the right gear faster.",
    primaryCta: {
      label: "Shop the catalog",
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
      detail: "Recovery, hydration, and training support are live as the first storefront lanes.",
    },
    {
      label: "Catalog foundation",
      value: "Supabase",
      detail: "Storefront data is structured on top of the active backend schema and seed model.",
    },
    {
      label: "Brand promise",
      value: "Premium",
      detail: "Design, utility, and usability are aligned around a more elevated sports-commerce feel.",
    },
  ],
};
