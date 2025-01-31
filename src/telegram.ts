import { init as initSDK, retrieveLaunchParams, setDebug } from '@telegram-apps/sdk-vue';
import { backButton, viewport, themeParams, miniApp, initData } from '@telegram-apps/sdk-vue';

export function initializeTelegram() {
  // Set debug mode based on URL param or dev environment
  const isDebug = retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV;
  setDebug(isDebug);

  // Initialize SDK
  initSDK();
}

export function mountTelegramComponents() {
  // Mount Telegram UI components
  backButton.mount();
  themeParams.mount();
  themeParams.bindCssVars();
  
  // Restore any initial data
  const initialData = initData.restore();
  
  // Mount viewport with error handling
  viewport.mount()
    .catch(e => {
      console.error('Viewport mounting error:', e);
    })
    .then(() => {
      viewport.bindCssVars();
    });

  miniApp.mount();
  miniApp.bindCssVars();

  return initialData;
}