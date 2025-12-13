import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // devIndicators: {
  //   appIsrStatus: false,
  //   buildActivity: false,
  // },
  
  // เพิ่มการตั้งค่าเพื่อปรับปรุงประสิทธิภาพ
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'react-icons',
    ],
  },
  
  // เปิดใช้งาน compression
  compress: true,
};

export default nextConfig;
