<script lang="ts" setup>
import { useBlogsStore } from "~/stores/blogs";
import { useRolesStore } from "~/stores/roles";
import { useActiveComponent } from "~/stores/activeComponent";
const route = useRoute();
const useBlogs = useBlogsStore();
const useRoles = useRolesStore();
const activeComponent = useActiveComponent();
const isLoading = computed(() => {
  return useBlogs.isLoading;
});
const openNewBlog = ref(false);
const showDetails = ref(false);
const sidebarRef = ref(null);
const toggleSidebar = () => {
  sidebarRef.value.toggle();
};
onMounted(async () => {
  console.log(route.params.id);
  await useRoles.fetchRoles();
  if (route.params.id) {
    const id = Array.isArray(route.params.id)
      ? route.params.id[0]
      : route.params.id;
    useBlogs.fetchBlogsByIdChannelId(id);
  }
});
const editId = computed(() =>
  Array.isArray(route.query.id) ? route.query.id[0] : (route.query.id ?? "")
);
const channelId = computed(() =>
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
);
const sectionEdit = computed(() => route.query.edit === "true");
const search = async (searchTerm: string) => {
  useBlogs.filters.title = searchTerm;
  useBlogs.fetchBlogsByIdChannelId(
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  );
};
watch(
  () => useBlogs.isLoading,
  (loading) => {
    if (!loading) {
      openNewBlog.value = false;
    }
  }
);
</script>

<template>
  <div
    class="flex justify-center items-center min-h-dvh bg-background"
    v-if="isLoading"
  >
    <UiLoading />
  </div>
  <div class="flex">
    <div class="flex w-full flex-col min-h-dvh bg-background">
      <div v-if="!sectionEdit" class="p-3 pt-5">
        <div class="flex gap-x-3 items-center justify-between">
          <UiShearchPar
            class="mb-3 bg-background-card rounded-xl p-1"
            @search="search"
          />
          <UiButton
            :color-button="'var(--primary-color)'"
            @click="openNewBlog = true"
            >new blog</UiButton
          >
        </div>
        <TransitionGroup name="change" mode="out-in">
          <div v-if="!isLoading">
            <div
              v-for="blog in useBlogs.blogs"
              :key="blog._id"
              class="flex flex-col bg-background"
            >
              <div class="flex flex-col bg-background">
                <Blog
                  @open-details-blog="
                    (useBlogs.onBlogSelected(blog._id), (showDetails = true))
                  "
                  :blog="blog"
                />
                <!--  '~/components/blog/Detiels.vue' -->
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
      <Transition name="change">
        <ChannelEdit v-if="sectionEdit" :channel-id="editId" />
      </Transition>
    </div>
  </div>
  <Transition name="error" mode="out-in">
    <Teleport to="body">
      <UiError
        v-if="useBlogs.error"
        :error-messages="
          useBlogs.error instanceof Error
            ? useBlogs.error.message
            : useBlogs.error
        "
        @reset="useBlogs.error = null"
        @restart="useBlogs.fetchBlogsByIdChannelId(channelId)"
      ></UiError>
    </Teleport>
  </Transition>
  <UiPopup v-model:isOpen="openNewBlog">
    <BlogCreate />
  </UiPopup>
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
