<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps<{
  title: string;
  to: string;
}>();
const route = useRoute();
const closeSideBar = () => {
  document.body.classList.remove("toggle_sidebar");
};
const isActive = computed(() => {
  return route.path === props.to;
});
</script>
<style src="./NavItem.module.css" module/>
<template>
  <router-link :to="to" :class="$style.link_wrapper" @click="closeSideBar">
    <div :class="[$style.nav_item, isActive ? $style.active : $style.not_active]" :title="title">
      <slot></slot>
      <p>{{ title }}</p>
    </div>
  </router-link>
</template>