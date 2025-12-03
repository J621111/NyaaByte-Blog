const { withContentlayer } = require ('next-contentlayer');

/** @type {import('next').NextConfig} */
const config = {
  // 基础配置
  reactStrictMode: true,
  poweredByHeader: false, // 关闭 X-Powered-By 头部

  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // 支持的页面扩展名

  // 静态导出配置
  output: 'export',
  distDir: 'dist',

  // 图片配置 (使用 next/image)
  images: {
    unoptimized: true, // 禁用图片优化
    domains: ["cdn.jsdelivr.net"], // 允许加载的外部域名
    // 使用 remotePatterns 字段来指定允许远程图片的域名
    remotePatterns: [
      { hostname: 'localhost' },
      { hostname: '127.0.0.1' },
      { hostname: 'www.nyaabyte.com' }, 
    ],
  },
};

// 导出配置
// 将 Contentlayer 包装器应用于 Next.js 配置
module.exports = withContentlayer(config);