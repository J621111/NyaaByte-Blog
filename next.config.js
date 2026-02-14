const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const config = {
  // 基础配置
  reactStrictMode: true,
  poweredByHeader: false, // 关闭 X-Powered-By 头部

  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // 支持的页面扩展名

  // 静态导出配置
  output: 'export',

  // 图片配置 (使用 next/image)
  images: {
    dangerouslyAllowSVG: true, // 允许 SVG 格式图片
    unoptimized: true, // 禁用图片优化
    contentDispositionType: 'attachment', // 设置内容处置类型为 attachment
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // 设置内容安全策略
    // 使用 remotePatterns 字段来指定允许远程图片的域名
    remotePatterns: [
      {
        protocol: 'http',
        port: '1337',
        hostname: 'localhost',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
      { hostname: 'localhost' },
      { hostname: '127.0.0.1' },
      { hostname: 'www.nyaabyte.com' },
      { hostname: 'raw.githubusercontent.com' },
    ],
  },
};

// 导出配置
module.exports = withMDX(config);