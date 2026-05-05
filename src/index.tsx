/**
 * CE.SDK Video Placeholders Editor Starterkit - React Entry Point
 *
 * Demonstrates the CE.SDK placeholder feature for video template creation.
 * Placeholders allow template creators to define editable regions that
 * adopters can fill with their own content in a video editing context.
 *
 * @see https://img.ly/docs/cesdk/js/features/placeholders/
 */

import type { Configuration } from '@cesdk/cesdk-js';
import { createRoot } from 'react-dom/client';

import App from './app/App';
import { resolveAssetPath } from './resolveAssetPath';

// ============================================================================
// Configuration
// ============================================================================

const config: Configuration = {
  // Unique user identifier for analytics (customize for your app)
  userId: 'starterkit-video-placeholders-editor-user'

  // Local assets (uncomment and set path for self-hosted assets)
  // baseURL: `/assets/`,

  // License key (required for production)
  // license: 'YOUR_LICENSE_KEY',
};

// ============================================================================
// Scene URL
// ============================================================================

/**
 * Demo scene URL for the placeholders video editor.
 */
const SCENE_URL = resolveAssetPath('/cases/placeholders-video/example.scene');

// ============================================================================
// Initialize React Application
// ============================================================================

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);
root.render(<App config={config} sceneUrl={SCENE_URL} />);
