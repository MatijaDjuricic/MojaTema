import { ref } from 'vue';
import type ChatsPanel from '../components/ChatsPanel.vue';
import type NotificationsPanel from '../components/NotificationsPanel.vue';
export const usePanel = () => {
    const chatsRef = ref<InstanceType<typeof ChatsPanel> | null>(null);
    const notificationsRef = ref<InstanceType<typeof NotificationsPanel> | null>(null);
    const openPanel = (panelType: 'chats' | 'notifications') => {
        switch (panelType) {
            case 'chats':
                chatsRef.value && chatsRef.value.openPanel();
                break;
            case 'notifications':
                notificationsRef.value && notificationsRef.value.openPanel();
                break;
        }
    };
    return { chatsRef, notificationsRef, openPanel };
};