import { init as initSDK, retrieveLaunchParams, setDebug } from '@telegram-apps/sdk-vue';
import { backButton, viewport, themeParams, miniApp, initData } from '@telegram-apps/sdk-vue';

export async function initializeTelegram() {
  try {
    // if (import.meta.env.DEV) {
    //   const { setupMockEnvironment } = await import('./mockEnv');
    //   setupMockEnvironment();
    // }

    const isDebug = retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV;
    setDebug(isDebug);
    
    initSDK();
    console.log('Telegram SDK initialized successfully');
  } catch (error) {
    console.error('Telegram SDK initialization failed:', error);
    if (import.meta.env.DEV) {
      console.info('In development mode - continuing with mock environment');
    } else {
      throw error;
    }
  }
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