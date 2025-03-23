<script lang="ts" setup>
interface IconMapping {
  name: string;
  icon: any;
}
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
  faComments
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
  faChartBar,
  faComments
);
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
});
const icons: IconMapping[] = [
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
  { name: "Comments", icon: faComments },
];
const selectedIcon = computed(() => {
  return icons.find((icon) => icon.name === props.icon) || { icon: faComments };
});

</script>

<template>
  <span v-if="selectedIcon" class="mt-4 text-sm">
    <FontAwesomeIcon :icon="selectedIcon.icon" />
  </span>
</template>
