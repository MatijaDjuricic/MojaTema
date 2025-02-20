<script lang="ts" setup>
import { ref, defineExpose, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import IconButton from './IconButton.vue';
import { IconX } from '@tabler/icons-vue';
const panel = ref<null>(null);
const isPanelOpen = ref<boolean>(false);
const openPanel = () => isPanelOpen.value = true;
const closePanel = () => isPanelOpen.value = false;
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closePanel();
};
defineExpose({ openPanel });
onClickOutside(panel, closePanel);
onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>
<style src="./NotificationsPanel.module.css" module/>
<template>
  <slot></slot>
  <Teleport to="#panel">
    <div v-if="isPanelOpen" :class="$style.canvas_bg" ref="panel">
      <div :class="$style.canvas_header">
        <h1 :class="$style.canvas_title">Обавештења</h1>
        <IconButton color="red" @click="closePanel()">
          <IconX stroke={2} width="32" height="32"/>
        </IconButton>
      </div>
      <div :class="$style.canvas_body">
        <p>Нема обавештења...</p>
      </div>
    </div>
  </Teleport>
</template>