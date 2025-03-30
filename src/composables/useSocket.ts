import { useNuxtApp } from "#app";
import { ref, onMounted, onUnmounted } from "vue";

export function useSocket() {
  const { $socket } = useNuxtApp();
  const isConnected = ref(false);

  if (!$socket) {
    console.error("⚠️ WebSocket instance not found in Nuxt app!");
    return { isConnected, sendMessage: () => {}, onEvent: () => {}, offEvent: () => {} };
  }

  const sendMessage = (event: string, data: any) => {
    if (!isConnected.value) {
      console.error("❌ WebSocket not connected. Cannot send event:", event);
      return;
    }
    console.log(`📤 Sending Event: ${event}`, data);
    $socket.emit(event, data);
  };

  const onEvent = (event: string, callback: (data: any) => void) => {
    console.log(`👂 Listening for event: ${event}`);
    $socket.on(event, callback);
  };
// commentCreated
  const offEvent = (event: string) => {
    console.log(`🚫 Removing listener for event: ${event}`);
    $socket.off(event);
  };

  onMounted(() => {
    $socket.on("connect", () => {
      isConnected.value = true;
      console.log("✅ WebSocket connected!");
    });

    $socket.on("disconnect", () => {
      isConnected.value = false;
      console.warn("❌ WebSocket disconnected!");
    });

    $socket.on("connect_error", (err) => {
      console.error("⚠️ WebSocket Connection Error:", err.message);
    });
  });

  onUnmounted(() => {
    console.log("🛑 Cleaning up WebSocket listeners...");
    $socket.off();
  });

  return { isConnected, sendMessage, onEvent, offEvent };
}
