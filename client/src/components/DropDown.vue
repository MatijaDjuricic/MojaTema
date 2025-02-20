<script lang="ts" setup>
import { ref, watch, defineProps } from 'vue';
const props = defineProps<{
  visible: boolean
}>();
const isVisible = ref<boolean>(props.visible);
watch(() => props.visible, (newValue) => {
  isVisible.value = newValue;
});
</script>
<style src="./DropDown.module.css" module/>
<template>
  <div v-if="isVisible" :class="$style.dropdown_menu">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>