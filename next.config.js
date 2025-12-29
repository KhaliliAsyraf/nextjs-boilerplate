/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://app:3000/api/:path*', // Docker networking
            },
        ];
    },
};

module.exports = nextConfig;
