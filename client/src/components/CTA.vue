<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
import Loader from './Loader.vue';
import style from './CTA.module.css';
const props = defineProps<{
  title: string,
  size: 'lg' | 'sm',
  type?: 'submit',
  color?: 'green' | 'red',
  loading?: boolean,
  className?: string,
  onClick?: () => void,
}>();
defineEmits<{
  (e: 'click'): void;
}>()
const buttonClass = computed(() => {
  return [
      style.cta_button,
      {
        [style.button_lg]: props.size === 'lg',
        [style.button_sm]: props.size === 'sm',
        [style.button_green]: props.color === 'green',
        [style.button_red]: props.color === 'red',
        [style.loading_button]: props.loading,
      }
    ];
});
</script>
<template>
  <button
    :class="buttonClass"
    :disabled="props.loading"
    :type="props.type"
    @click="props.onClick"
  >
    <template v-if="props.loading">
      <Loader type="btn_loader" :size="props.size" />
    </template>
    <template v-else>
      {{ props.title }}
    </template>
  </button>
</template>