<script lang="ts" setup>
import { ref, defineExpose, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { getChatAvailableUsersAsync } from '../services/user';
import { IconMessage, IconX } from '@tabler/icons-vue';
import type { User } from '../types';
import IconButton from './IconButton.vue';
const chats = ref<User[] | undefined>([]);
const panel = ref<null>(null);
const isPanelOpen = ref<boolean>(false);
const openPanel = async() => {
  isPanelOpen.value = true;
  chats.value = await getChatAvailableUsersAsync();
}
const closePanel = () => isPanelOpen.value = false;
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closePanel();
};
defineExpose({ openPanel });
onClickOutside(panel, closePanel);
onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>
<style src="./ChatsPanel.module.css" module/>
<template>
  <slot></slot>
  <Teleport to="#panel">
    <div v-if="isPanelOpen" :class="$style.canvas_bg" ref="panel">
      <div :class="$style.canvas_header">
        <h1 :class="$style.canvas_title">Поруке</h1>
        <IconButton color="red" @click="closePanel()">
          <IconX stroke={2} width="32" height="32"/>
        </IconButton>
      </div>
      <div :class="$style.canvas_body">
        <div :class="$style.chats_wrapper">
          <div v-if="chats != undefined && chats.length > 0">
            <div v-for="chat in chats" :key="chat.id" :class="$style.card">
              <router-link :to="`/chat/${chat.id}`" :class="$style.card_body">
                <IconMessage stroke={2} />
                <p>{{ chat.firstName }} {{ chat.lastName }}</p>
              </router-link>
            </div>
          </div>
          <p v-else>Нема конверзација(порука)</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>