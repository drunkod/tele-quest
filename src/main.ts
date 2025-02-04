import { DemoAuthBasicUI, createJazzVueApp, useDemoAuth } from "jazz-vue";
import { createApp, defineComponent, h, onMounted } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import { initializeTelegram, mountTelegramComponents } from './telegram';

// Initialize mock environment in development
if (import.meta.env.DEV) {
  await import('./mockEnv');
}

const Jazz = createJazzVueApp();
export const { useAccount, useCoState } = Jazz;
const { JazzProvider } = Jazz;

await initializeTelegram();

const RootComponent = defineComponent({
  name: "RootComponent",
  setup() {
    const { authMethod, state } = useDemoAuth();

    onMounted(() => {
      try {
        const initialData = mountTelegramComponents();
        if (initialData?.user?.id) {
          console.log('Telegram User ID:', initialData.user.id);
        }
      } catch (error) {
        console.warn('Error mounting Telegram components:', error);
      }
    });

    return () => [
      h(JazzProvider, {
        auth: authMethod.value,
        peer: "wss://cloud.jazz.tools/?key=chat-example-jazz@garden.co",
      }, {
        default: () => h(App),
      }),
      state.state !== "signedIn" && h(DemoAuthBasicUI, {
        appName: "Jazz Chat",
        state,
      }),
    ];
  },
});

const app = createApp(RootComponent);
app.use(router);

app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err);
  // Add any error reporting logic here
};

app.mount("#app");
