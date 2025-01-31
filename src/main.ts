import { DemoAuthBasicUI, createJazzVueApp, useDemoAuth } from "jazz-vue";
import { createApp, defineComponent, h, onMounted } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import { initializeTelegram, mountTelegramComponents } from './telegram';

// Only import in development
if (import.meta.env.DEV) {
  import('./mockEnv');
}

const Jazz = createJazzVueApp();
export const { useAccount, useCoState } = Jazz;
const { JazzProvider } = Jazz;

// Initialize Telegram SDK before Vue app
initializeTelegram();

const RootComponent = defineComponent({
  name: "RootComponent",
  setup() {
    const { authMethod, state } = useDemoAuth();

    onMounted(() => {
      // Mount Telegram components after Vue component is mounted
      const initialData = mountTelegramComponents();
      
      // You can use initialData.user.id for Telegram user identification
      if (initialData?.user?.id) {
        console.log('Telegram User ID:', initialData.user.id);
      }
    });

    return () => [
      h(
        JazzProvider,
        {
          auth: authMethod.value,
          peer: "wss://cloud.jazz.tools/?key=chat-example-jazz@garden.co",
        },
        {
          default: () => h(App),
        },
      ),

      state.state !== "signedIn" &&
        h(DemoAuthBasicUI, {
          appName: "Jazz Chat",
          state,
        }),
    ];
  },
});

const app = createApp(RootComponent);

app.use(router);

// Add global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, vm, info);
};

app.mount("#app");
