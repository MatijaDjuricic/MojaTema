<script lang="ts" setup>
import { ref, defineProps, defineExpose, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { IconX } from '@tabler/icons-vue';
import IconButton from './IconButton.vue';
defineProps<{
  title: string;
}>();
const modal = ref<null>(null);
const isModalOpen = ref<boolean>(false);
const openModal = () => isModalOpen.value = true;
const closeModal = () => isModalOpen.value = false;
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeModal();
};
defineExpose({ openModal });
onClickOutside(modal, closeModal);
onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>
<style src="./Modal.module.css" module/>
<template>
  <slot name="open"></slot>
  <Teleport to="#modal">
    <div v-if="isModalOpen" :class="$style.modal_wrapper" ref="modal">
        <div :class="$style.modal_content">
          <div :class="$style.modal_header">
              <h2 :class="$style.modal_title">{{ title }}</h2>
              <IconButton color="red" @click="closeModal">
                <IconX stroke={2} width="32" height="32"/>
              </IconButton>
          </div>
          <div :class="$style.modal_body">
            <slot></slot>
          </div>
          <div :class="$style.modal_footer">
            <slot name="footer"></slot>
          </div>
        </div>
    </div>
  </Teleport>
</template>