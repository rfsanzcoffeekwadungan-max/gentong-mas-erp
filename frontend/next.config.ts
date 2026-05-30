// frontend/next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow all hosts (needed for Replit proxy)
  // In production, lock this down to your actual domain
  experimental: {},
};

export default nextConfig;
