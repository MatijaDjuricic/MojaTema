<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useModal } from '../composables/useModal';
import { RoleEnum } from '../utils/enums';
import { usePanel } from '../composables/usePanel';
import { useTheme } from '../composables/useTheme';
import { themes } from '../utils/constants';
import ChatsPanel from './ChatsPanel.vue';
import NotificationsPanel from './NotificationsPanel.vue';
import NavItem from './NavItem.vue';
import Modal from './Modal.vue';
import CTA from './CTA.vue';
import {
    IconArticle,
    IconBell,
    IconCirclePlus,
    IconHome,
    IconLogout,
    IconMessages,
    IconMoon,
    IconSun,
    IconUserCircle
} from '@tabler/icons-vue';
const router = useRouter();
const auth = useAuthStore();
const { modalRef, openModal } = useModal();
const { chatsRef, notificationsRef, openPanel } = usePanel();
const { theme, toggleTheme } = useTheme();
const handleLogout = async () => {
  await auth.logout();
  router.push('/login');
};
</script>
<style src="./SideBar.module.css" module/>
<template>
    <aside id="sideBar" :class="$style.sidebar_container">
        <main :class="$style.main_wrapper">
            <div :class="$style.nav_items">
                <NavItem title="Почетна" to="/">
                    <IconHome stroke={2} />
                </NavItem>
                <NavItem v-if="auth.userRole == RoleEnum.UCENIK" title="Теме" to="/topics">
                    <IconArticle stroke={2} />
                </NavItem>
                <NavItem v-if="auth.userRole == RoleEnum.PROFESOR" title="Пријављене Теме" to="/topics/reported">
                    <IconArticle stroke={2} />
                </NavItem>
                <NavItem v-if="auth.userRole == RoleEnum.PROFESOR" title="Додај Тему" to="/topics/create">
                    <IconCirclePlus stroke={2} />
                </NavItem>
                <NavItem title="Мој Профил" to="/profile">
                    <IconUserCircle stroke={2} />
                </NavItem>
            </div>
            <div :class="$style.nav_buttons">
                <button @click="toggleTheme">
                    <IconSun v-if="theme === themes.dark" stroke={2} width="32" height="32" />
                    <IconMoon v-else stroke={2} width="32" height="32" />
                    Промени тему
                </button>
                <button @click="openPanel('chats')">
                    <ChatsPanel ref="chatsRef">
                        <IconMessages stroke={2} width="32" height="32" />
                    </ChatsPanel>
                    Поруке
                </button>
                <button @click="openPanel('notifications')">
                    <NotificationsPanel ref="notificationsRef">
                        <IconBell stroke={2} width="32" height="32" />
                    </NotificationsPanel>
                    Обавештења
                </button>
                <Modal ref="modalRef" title="Одјава">
                    <template #open>
                        <button @click="openModal">
                            <IconLogout stroke={2} width="32" height="32" color="red"/>
                            Одјави се
                        </button>
                    </template>
                    <p>Да ли сте сигурни да желите да се одјавите?</p>
                    <template #footer>
                        <CTA title="Одјави се" color="red" size="sm" :onClick="handleLogout"/>
                    </template>
                </Modal>
            </div>
        </main>
    </aside>
</template>