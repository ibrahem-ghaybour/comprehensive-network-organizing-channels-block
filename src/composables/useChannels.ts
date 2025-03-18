// import { ref } from "vue";
// import type { Ref } from "vue";

// export const useChannels = () => {
//     const channels: Ref<string[]> = ref([]);
//     const isLoading = ref(false);
//     const error = ref<string | null>(null);

//     // Fetch all available channels
//     async function fetchChannels(){
//         isLoading.value = true;
//         error.value = null;

//         try {
//             channels.value = await $fetch('/api/channels');
//         } catch (err: any) {
//             error.value = err.message || 'Failed to fetch channels';
//             console.error('Error fetching channels:', err);
//         } finally {
//             isLoading.value = false;
//         }
//     }



//     return { channels };
// };