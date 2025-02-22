<script lang="ts" setup>
import { ref, defineExpose, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { IconMessage, IconX } from '@tabler/icons-vue';
import { useUserStore } from '../stores/user';
import IconButton from './IconButton.vue';
const userStore = useUserStore();
const panel = ref<null>(null);
const isPanelOpen = ref<boolean>(false);
const openPanel = async () => {
  isPanelOpen.value = true;
  await userStore.getChatAvailableUsers();
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
          <div v-if="userStore.chatAvailableUsers.length != 0">
            <div v-for="user in userStore.chatAvailableUsers" :key="user.id" :class="$style.card">
              <router-link :to="`/chat/${user.id}`" :class="$style.card_body">
                <IconMessage stroke={2} />
                <p>{{ user.firstName }} {{ user.lastName }}</p>
              </router-link>
            </div>
          </div>
          <p v-else>Нема конверзација(порука)</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>