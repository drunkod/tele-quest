import { init as initSDK, retrieveLaunchParams, setDebug } from '@telegram-apps/sdk-vue';
import { backButton, viewport, themeParams, miniApp, initData } from '@telegram-apps/sdk-vue';

export async function initializeTelegram() {
  // Only attempt real initialization if not in dev mode
  if (!import.meta.env.DEV) {
    try {
      const isDebug = retrieveLaunchParams().startParam === 'debug';
      setDebug(isDebug);
      initSDK();
      console.log('Telegram SDK initialized successfully');
    } catch (error) {
      console.error('Telegram SDK initialization failed:', error);
      throw error;
    }
  } else {
    console.log('Development mode - using mock environment');
  }
}

export function mountTelegramComponents() {
  // Only mount components if not in dev mode
  if (!import.meta.env.DEV) {
    try {
      backButton.mount();
      themeParams.mount();
      themeParams.bindCssVars();
      
      const initialData = initData.restore();
      
      viewport.mount()
        .then(() => {
          viewport.bindCssVars();
        })
        .catch(e => {
          console.error('Viewport mounting error:', e);
        });

      miniApp.mount();
      miniApp.bindCssVars();

      return initialData;
    } catch (error) {
      console.error('Error mounting Telegram components:', error);
      return null;
    }
  }
  return null;
}