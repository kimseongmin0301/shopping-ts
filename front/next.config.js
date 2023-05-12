/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/:any*',
                destination: '/:any*',
            },
        ];
    },
}

module.exports = nextConfig
