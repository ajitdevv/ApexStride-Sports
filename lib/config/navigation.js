export const mainNavigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/shop" },
  { label: "Checkout", href: "/checkout" },
  { label: "Account", href: "/account" },
];

export const adminNavigation = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin", exact: true }],
  },
  {
    label: "Commerce",
    items: [
      { label: "Orders", href: "/admin/orders" },
      { label: "Catalog", href: "/admin/catalog" },
      { label: "Products", href: "/admin/catalog/products" },
      { label: "Categories", href: "/admin/catalog/categories" },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Customers", href: "/admin/customers" },
      { label: "Reports", href: "/admin/reports" },
    ],
  },
];

export const accountNavigation = [
  { label: "Account", href: "/account" },
  { label: "Login", href: "/login" },
  { label: "Sign up", href: "/signup" },
];
