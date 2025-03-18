<script lang="ts" setup>
import { ref, defineExpose, onMounted, onUnmounted } from 'vue';
import { useChatAvailableUsers } from '../../composables/queries/useUsers';
import { onClickOutside } from '@vueuse/core';
import { IconMessage, IconX } from '@tabler/icons-vue';
import IconButton from '../common/IconButton.vue';
import Loader from '../common/Loader.vue';
const panel = ref<null>(null);
const isPanelOpen = ref<boolean>(false);
const { data: chatAvailableUsers, isLoading: isLoadingChatAvailableUsers } = useChatAvailableUsers();
const openPanel = async () => isPanelOpen.value = true
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
      <Loader v-if="isLoadingChatAvailableUsers" type="content_loader"/>
      <div v-else :class="$style.canvas_body">
        <div v-if="chatAvailableUsers?.length != 0" :class="$style.chats_wrapper">
          <router-link v-for="user in chatAvailableUsers" :key="user.id" :to="`/chat/${user.id}`" :class="$style.card">
            <IconMessage stroke={2} />
            <p>{{ user.firstName }} {{ user.lastName }}</p>
          </router-link>
        </div>
        <p v-else>Нема конверзација(порука)</p>
      </div>
    </div>
  </Teleport>
</template>