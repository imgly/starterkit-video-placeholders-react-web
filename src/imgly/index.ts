/**
 * CE.SDK Placeholders Video Editor - Initialization Module
 *
 * This module demonstrates the CE.SDK placeholder feature for video editing:
 * - Enable placeholder creation for template designers (Creator role)
 * - Placeholder regions can be defined for video clips, images, and other elements
 * - Adopters can fill placeholders with their own content
 *
 * @see https://img.ly/docs/cesdk/js/features/placeholders/
 */

import CreativeEditorSDK from '@cesdk/cesdk-js';

import {
  BlurAssetSource,
  CaptionPresetsAssetSource,
  ColorPaletteAssetSource,
  CropPresetsAssetSource,
  DemoAssetSources,
  EffectsAssetSource,
  FiltersAssetSource,
  PagePresetsAssetSource,
  StickerAssetSource,
  TextComponentAssetSource,
  TypefaceAssetSource,
  TextAssetSource,
  VectorShapeAssetSource,
  UploadAssetSources
} from '@cesdk/cesdk-js/plugins';

import { AdvancedVideoEditorConfig } from './config/advanced-video-editor/plugin';
import { VideoEditorConfig } from './config/video-editor/plugin';

// ============================================================================
// Creator Editor Initialization
// ============================================================================

/**
 * Initialize the CE.SDK Placeholders Video Editor for Creator role.
 *
 * Creator mode enables:
 * - Advanced video editor configuration with full timeline control
 * - Dark theme for professional editing environment
 * - Placeholder creation features for defining template regions
 * - Inspector panel for detailed block properties
 *
 * @param cesdk - The CreativeEditorSDK instance to configure
 */
export async function initVideoCreatorEditor(cesdk: CreativeEditorSDK) {
  const { engine } = cesdk;

  // ============================================================================
  // Configuration Plugin (Advanced Video Editor)
  // ============================================================================

  await cesdk.addPlugin(new AdvancedVideoEditorConfig());

  // ============================================================================
  // Theme Configuration (Runtime API)
  // ============================================================================

  cesdk.ui.setTheme('dark');

  // ============================================================================
  // Placeholder Feature
  // ============================================================================

  // Enable placeholder features for Creator role
  // This allows creating placeholder regions that adopters can fill
  cesdk.feature.enable('ly.img.placeholder*');

  // ============================================================================
  // Inspector Panel Configuration (Runtime API)
  // ============================================================================

  // Enable the inspector feature
  cesdk.feature.enable('ly.img.inspector');

  // Position the inspector panel on the right side
  cesdk.ui.setPanelPosition('//ly.img.panel/inspector', 'right');

  // Make the inspector panel docked (not floating)
  cesdk.ui.setPanelFloating('//ly.img.panel/inspector', false);

  // ============================================================================
  // Dock Settings (Runtime API)
  // ============================================================================

  engine.editor.setSetting('dock/iconSize', 'normal');
  engine.editor.setSetting('dock/hideLabels', true);

  // ============================================================================
  // Navigation Bar Configuration (Runtime API)
  // ============================================================================

  cesdk.ui.setComponentOrder({ in: 'ly.img.navigation.bar' }, [
    // Left section
    'ly.img.documentSettings.navigationBar',
    'ly.img.undoRedo.navigationBar',

    // Center section
    'ly.img.spacer',
    'ly.img.title.navigationBar',
    'ly.img.spacer',

    // Right section
    'ly.img.zoom.navigationBar',
    'ly.img.preview.navigationBar',
    {
      id: 'ly.img.actions.navigationBar',
      children: ['ly.img.exportVideo.navigationBar']
    }
  ]);

  // ============================================================================
  // Export Actions (Runtime API)
  // ============================================================================

  cesdk.actions.register('exportDesign', async (exportOptions) => {
    const { blobs, options } = await cesdk.utils.export(exportOptions);
    await cesdk.utils.downloadFile(blobs[0], options.mimeType);
  });

  // ============================================================================
  // Upload Actions (Runtime API)
  // ============================================================================

  cesdk.actions.register('uploadFile', (file, onProgress, context) => {
    return cesdk.utils.localUpload(file, context);
  });

  // ============================================================================
  // Asset Source Plugins
  // ============================================================================

  await cesdk.addPlugin(new BlurAssetSource());
  await cesdk.addPlugin(new CaptionPresetsAssetSource());
  await cesdk.addPlugin(new ColorPaletteAssetSource());
  await cesdk.addPlugin(new CropPresetsAssetSource());

  await cesdk.addPlugin(
    new UploadAssetSources({
      include: [
        'ly.img.image.upload',
        'ly.img.video.upload',
        'ly.img.audio.upload'
      ]
    })
  );

  await cesdk.addPlugin(
    new DemoAssetSources({
      include: [
        'ly.img.templates.video.*',
        'ly.img.image.*',
        'ly.img.audio.*',
        'ly.img.video.*'
      ]
    })
  );

  await cesdk.addPlugin(new EffectsAssetSource());
  await cesdk.addPlugin(new FiltersAssetSource());

  await cesdk.addPlugin(
    new PagePresetsAssetSource({
      include: [
        'ly.img.page.presets.instagram.*',
        'ly.img.page.presets.facebook.*',
        'ly.img.page.presets.x.*',
        'ly.img.page.presets.linkedin.*',
        'ly.img.page.presets.pinterest.*',
        'ly.img.page.presets.tiktok.*',
        'ly.img.page.presets.youtube.*',
        'ly.img.page.presets.video.*'
      ]
    })
  );

  await cesdk.addPlugin(new StickerAssetSource());
  await cesdk.addPlugin(new TextAssetSource());
  await cesdk.addPlugin(new TextComponentAssetSource());
  await cesdk.addPlugin(new TypefaceAssetSource());
  await cesdk.addPlugin(new VectorShapeAssetSource());

  // ============================================================================
  // Localization
  // ============================================================================

  cesdk.i18n.setTranslations({
    en: { 'actions.export.video': 'Export Video' }
  });

  cesdk.engine.editor.setRole('Creator');
}

// ============================================================================
// Adopter Editor Initialization
// ============================================================================

/**
 * Initialize the CE.SDK Placeholders Video Editor for Adopter role.
 *
 * Adopter mode enables:
 * - Standard video editor configuration with simplified interface
 * - Light theme for content editing environment
 * - Placeholder content filling (placeholders created by Creator)
 *
 * @param cesdk - The CreativeEditorSDK instance to configure
 */
export async function initVideoAdopterEditor(cesdk: CreativeEditorSDK) {
  // ============================================================================
  // Configuration Plugin (Video Editor)
  // ============================================================================

  await cesdk.addPlugin(new VideoEditorConfig());

  // ============================================================================
  // Theme Configuration (Runtime API)
  // ============================================================================

  cesdk.ui.setTheme('light');

  // ============================================================================
  // Navigation Bar Configuration (Runtime API)
  // ============================================================================

  cesdk.ui.setComponentOrder({ in: 'ly.img.navigation.bar' }, [
    // Left section
    'ly.img.documentSettings.navigationBar',
    'ly.img.undoRedo.navigationBar',

    // Center section
    'ly.img.spacer',
    'ly.img.title.navigationBar',
    'ly.img.spacer',

    // Right section
    'ly.img.zoom.navigationBar',
    'ly.img.preview.navigationBar',
    {
      id: 'ly.img.actions.navigationBar',
      children: ['ly.img.exportVideo.navigationBar']
    }
  ]);

  // ============================================================================
  // Export Actions (Runtime API)
  // ============================================================================

  cesdk.actions.register('exportDesign', async (exportOptions) => {
    const { blobs, options } = await cesdk.utils.export(exportOptions);
    await cesdk.utils.downloadFile(blobs[0], options.mimeType);
  });

  // ============================================================================
  // Upload Actions (Runtime API)
  // ============================================================================

  cesdk.actions.register('uploadFile', (file, onProgress, context) => {
    return cesdk.utils.localUpload(file, context);
  });

  // ============================================================================
  // Asset Source Plugins
  // ============================================================================

  await cesdk.addPlugin(new BlurAssetSource());
  await cesdk.addPlugin(new CaptionPresetsAssetSource());
  await cesdk.addPlugin(new ColorPaletteAssetSource());
  await cesdk.addPlugin(new CropPresetsAssetSource());

  await cesdk.addPlugin(
    new UploadAssetSources({
      include: [
        'ly.img.image.upload',
        'ly.img.video.upload',
        'ly.img.audio.upload'
      ]
    })
  );

  await cesdk.addPlugin(
    new DemoAssetSources({
      include: [
        'ly.img.templates.video.*',
        'ly.img.image.*',
        'ly.img.audio.*',
        'ly.img.video.*'
      ]
    })
  );

  await cesdk.addPlugin(new EffectsAssetSource());
  await cesdk.addPlugin(new FiltersAssetSource());

  await cesdk.addPlugin(
    new PagePresetsAssetSource({
      include: [
        'ly.img.page.presets.instagram.*',
        'ly.img.page.presets.facebook.*',
        'ly.img.page.presets.x.*',
        'ly.img.page.presets.linkedin.*',
        'ly.img.page.presets.pinterest.*',
        'ly.img.page.presets.tiktok.*',
        'ly.img.page.presets.youtube.*',
        'ly.img.page.presets.video.*'
      ]
    })
  );

  await cesdk.addPlugin(new StickerAssetSource());
  await cesdk.addPlugin(new TextAssetSource());
  await cesdk.addPlugin(new TextComponentAssetSource());
  await cesdk.addPlugin(new TypefaceAssetSource());
  await cesdk.addPlugin(new VectorShapeAssetSource());

  // ============================================================================
  // Localization
  // ============================================================================

  cesdk.i18n.setTranslations({
    en: { 'actions.export.video': 'Export Video' }
  });

  cesdk.engine.editor.setRole('Adopter');
}
