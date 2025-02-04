import { mockTelegramEnv, isTMA } from '@telegram-apps/sdk-vue';
import type { LaunchParams } from '@telegram-apps/sdk-vue'

// It is important, to mock the environment only for development purposes.
// When building the application the import.meta.env.DEV will value become
// `false` and the code inside will be tree-shaken (removed), so you will not
// see it in your final bundle.
if (import.meta.env.DEV) {
  (async () => {
    if (await isTMA()) return;

    const mockParams: LaunchParams = {
      tgWebAppThemeParams: {
        accentTextColor: '#6ab2f2',
        bgColor: '#17212b',
        buttonColor: '#5288c1',
        buttonTextColor: '#ffffff',
        destructiveTextColor: '#ec3942',
        headerBgColor: '#17212b',
        hintColor: '#708499',
        linkColor: '#6ab3f3',
        secondaryBgColor: '#232e3c',
        sectionBgColor: '#17212b',
        sectionHeaderTextColor: '#6ab3f3',
        subtitleTextColor: '#708499',
        textColor: '#f5f5f5'
      },
      tgWebAppVersion: '8',
      tgWebAppPlatform: 'tdesktop',
      // Add mock init data
      tgWebAppData: {
        user: {
          id: 99281932,
          first_name: 'Test',
          last_name: 'User',
          username: 'testuser',
          language_code: 'en'
        },
        auth_date: Date.now(),
        hash: 'mock_hash'  // Mock hash for development
      }
    };

    mockTelegramEnv(mockParams);
    console.log('Development environment mocked successfully');
  })();
}