/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Aceptar imágenes de cualquier origen
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
