<script lang="ts" setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faBell,
  faHeart,
  faHome,
  faStar,
  faCamera,
  faCoffee,
  faEnvelope,
  faCheck,
  faCircle,
  faGear,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faEye,
  faEyeSlash,
  faUser,
  faBell,
  faHeart,
  faHome,
  faStar,
  faCamera,
  faCoffee,
  faEnvelope,
  faCheck,
  faCircle,
  faGear,
  faChartBar
);

const icons = [
  { name: "User", icon: faUser },
  { name: "Bell", icon: faBell },
  { name: "Heart", icon: faHeart },
  { name: "Home", icon: faHome },
  { name: "Star", icon: faStar },
  { name: "Camera", icon: faCamera },
  { name: "Coffee", icon: faCoffee },
  { name: "Envelope", icon: faEnvelope },
  { name: "Check", icon: faCheck },
  { name: "Circle", icon: faCircle },
  { name: "Gear", icon: faGear },
  { name: "ChartBar", icon: faChartBar },
];
const emit = defineEmits(["selectIcon"]);
const selectedIcon = ref("");
const selectIcon = (name: string) => {
  selectedIcon.value = name;
  emit("selectIcon", name);
};
</script>

<template>
  <div class="p-4">
    <h2 class="text-sm font-semibold mb-4">SELECT ICONS</h2>

    <div class="grid grid-cols-6 gap-4">
      <button
        v-for="item in icons"
        :key="item.name"
        @click="selectIcon(item.name)"
        class="p-2 border rounded hover:bg-muted text-xl"
        :class="
          selectedIcon === item.name
            ? 'border-primary text-primary'
            : 'border-gray-300'
        "
      >
        <FontAwesomeIcon :icon="item.icon" />
      </button>
    </div>

    <p class="mt-4 text-sm">
      Selected Icon: <strong>{{ selectedIcon }}</strong>
    </p>
  </div>
</template>
