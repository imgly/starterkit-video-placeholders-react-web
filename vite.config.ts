import react from '@vitejs/plugin-react';
import { defineConfig, type PluginOption } from 'vite';

export default defineConfig({
  plugins: [react() as PluginOption],
  resolve: {
    // Prevent duplicate React instances in production builds
    // This is critical when using @cesdk/cesdk-js/react component
    dedupe: ['react', 'react-dom']
  }
});
