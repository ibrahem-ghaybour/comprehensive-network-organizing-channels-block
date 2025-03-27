<script lang="ts" setup>
import { useBlogsStore } from "~/stores/blogs";
const route = useRoute();
const useBlogs = useBlogsStore();
const isLoading = computed(() => {
  return useBlogs.isLoading;
});
onMounted(() => {
  if (route.params.id) useBlogs.fetchBlogsByIdChannelId(route.params.id);
});
const editId = computed(() => route.query.id);
const sectionEdit = computed(() => route.query.edit === "true");
</script>

<template>
  <div v-if="!isLoading" class="flex flex-col min-h-dvh bg-background">
    <div v-if="!sectionEdit" class="p-3 pt-5">
      <TransitionGroup name="change" mode="out-in">
        <div
          v-for="blog in useBlogs.blogs"
          :key="blog._id"
          class="flex flex-col bg-background"
        >
          <div class="flex flex-col bg-background">
            <Transition name="change">
              <Blog @open-edit="isOpenEdit = true" :blog="blog" />
            </Transition>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <Transition name="change">
      <ChannelEdit v-if="sectionEdit" :channel-id="editId" />
    </Transition>
    <Transition name="error" mode="out-in">
      <Teleport to="body">
        <UiError
          v-if="useChannels.error"
          :error-messages="useChannels.error"
          @reset="useChannels.error = null"
        ></UiError>
      </Teleport>
    </Transition>
  </div>
  <div class="flex justify-center items-center min-h-dvh bg-background" v-else>
    <UiLoading />
  </div>
</template>

<style scoped>
.change-enter-active,
.change-leave-active {
  transition: all 0.2s ease;
}
.change-enter-from,
.change-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.error-enter-active,
.error-leave-active {
  transition: all 0.2s ease;
}
.error-enter-from,
.error-leave-to {
  bottom: -30px;
  opacity: 0;
}
</style>
