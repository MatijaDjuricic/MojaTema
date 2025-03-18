<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import style from './IconButton.module.css';
const props = defineProps<{
  color?: string,
  onClick?: () => void;
}>();
const buttonClass = computed(() => {
  return [
    style.icon_button,
    {
      [style.button_green]: props.color === 'green',
      [style.button_red]: props.color === 'red',
    }
  ];
});
</script>
<template>
  <button :class="buttonClass" @click="onClick">
    <slot></slot>
  </button>
</template>