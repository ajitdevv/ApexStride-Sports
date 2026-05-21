const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrlParts = supabaseUrl ? new URL(supabaseUrl) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...(supabaseUrlParts
        ? [
            {
              protocol: supabaseUrlParts.protocol.replace(":", ""),
              hostname: supabaseUrlParts.hostname,
              port: "",
              pathname: "/storage/v1/object/public/product-media/**",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
