/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ['fakestoreapi.com','dummyimage.com'],
    // }
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'fakestoreapi.com',
          },
          {
            protocol: 'https',
            hostname: 'dummyimage.com',
          },
        ],
      },
};

export default nextConfig;
