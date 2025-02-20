<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useSocketService } from '../composables/useScoketService';
import { formatDate, formatTime } from '../utils';
import { IconSend } from '@tabler/icons-vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
const route = useRoute();
const currentUser = useAuthStore().currentUser;
const receiverId = ref<number>(Number(route.params.receiverId));
const messagesEnd = ref<HTMLDivElement | null>(null);
const {
  receiverUser,
  message,
  messages,
  connectWebSocket,
  handleSendMessage,
  fetchChat,
  closeWebSocket
} = useSocketService();
watch(() => route.params.receiverId, async (newReceiverId) => {
  receiverId.value = Number(newReceiverId);
  await fetchChat(currentUser.id, receiverId.value);
  closeWebSocket();
  connectWebSocket(currentUser.id, receiverId.value);
});
watch(messages, () => {
  nextTick(() => {
    if (messagesEnd.value) {
      messagesEnd.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  });
}, { immediate: true, deep: true });
onMounted(async () => {
  await fetchChat(currentUser.id, receiverId.value);
  connectWebSocket(currentUser.id, receiverId.value);
});
onBeforeUnmount(() => closeWebSocket());
</script>
<style src="./Chat.module.css" module/>
<template>
    <PageLayout>
        <HeaderLayout>
          <h1>Поруке - {{ receiverUser?.firstName }} {{ receiverUser?.lastName }}</h1>
          <p>{{ formatDate(new Date()) }}</p>
        </HeaderLayout>
        <div :class="$style.chat_container">
            <div :class="$style.chat_wrapper">
                <div :class="$style.messages_wrapper">
                    <div v-for="(message, index) in messages" :key="index">
                        <div :class="message.senderId !== currentUser.id ? $style.message_left : $style.message_right">
                            <div :class="$style.message_box">
                              <span>
                                {{
                                  message.senderId !== currentUser.id ?
                                  `${receiverUser?.firstName} ${receiverUser?.lastName}` :
                                  `${currentUser.firstName} ${currentUser.lastName}`
                                }}
                              </span>
                              <p>{{ message.content }}</p>
                              <span :class="$style.created_at">{{ formatTime(new Date(message.timestamp * 1000)) }}</span>
                            </div>
                        </div>
                    </div>
                    <div ref="messagesEnd"></div>
                </div>
            </div>
            <form :class="$style.input_wrapper" @submit.prevent="handleSendMessage(currentUser.id, receiverId)">
              <textarea v-model="message" placeholder="Унеси поруку..."></textarea>
              <button type="submit">
                <IconSend stroke={2} width="32" height="32"/>
              </button>
            </form>
        </div>
    </PageLayout>
</template>