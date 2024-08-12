/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-international', 'international-types'],
    output: 'standalone',
    env: {
        version: "0.0.2-beta"
    }
};

export default nextConfig;
