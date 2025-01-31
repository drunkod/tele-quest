import { mockTelegramEnv } from '@telegram-apps/sdk-vue';

export function setupMockEnvironment() {
  mockTelegramEnv({
    initDataRaw: JSON.stringify({
      query_id: 'test_query',
      user: {
        id: 123456789,
        first_name: 'Test',
        last_name: 'User',
        username: 'testuser',
        language_code: 'en'
      },
      auth_date: Date.now()
    })
  });
}