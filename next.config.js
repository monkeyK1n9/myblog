/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
                pathname: "/monkeyK1n9/blogs/main/images/**"
            }
        ]
    }
}

module.exports = nextConfig
