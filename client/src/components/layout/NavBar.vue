<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { RoleNamesCyrillic, themes } from '../../utils/constants';
import { onClickOutside } from '@vueuse/core';
import { useModal } from '../../composables/utils/useModal';
import { usePanel } from '../../composables/utils/usePanel';
import { useTheme } from '../../composables/utils/useTheme';
import ChatsPanel from '../layout/ChatsPanel.vue';
import NotificationsPanel from '../layout/NotificationsPanel.vue';
import IconButton from '../common/IconButton.vue';
import DropDown from './DropDown.vue';
import Modal from '../layout/Modal.vue';
import Logo from '../common/Logo.vue';
import CTA from '../common/CTA.vue';
import {
  IconBell,
  IconChevronDown,
  IconLogout,
  IconMenu2,
  IconMessages,
  IconMoon,
  IconSun,
  IconUserCircle
} from '@tabler/icons-vue';
const auth = useAuthStore();
const router = useRouter();
const { modalRef, openModal } = useModal();
const { theme, toggleTheme } = useTheme();
const { chatsRef, notificationsRef, openPanel } = usePanel();
const isDropdownVisible = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const handleLogout = async () => {
  await auth.logout();
  router.push('/login');
};
const toggleSideBar = () => document.body.classList.toggle("toggle_sidebar");
onClickOutside(dropdownRef, () => isDropdownVisible.value = false);
</script>
<style src="./NavBar.module.css" module/>
<template>
  <header :class="$style.nav_wrapper">
    <div :class="$style.left_side">
      <Logo />
      <IconButton @click="toggleSideBar">
        <IconMenu2 stroke={2} width="32" height="32"/>
      </IconButton>
    </div>
    <div :class="$style.right_side">
      <IconButton @click="toggleTheme">
        <IconSun v-if="theme === themes.dark" stroke={2} width="32" height="32" />
        <IconMoon v-else stroke={2} width="32" height="32" />
      </IconButton>
      <IconButton @click="openPanel('notifications')">
        <NotificationsPanel ref="notificationsRef">
          <IconBell stroke={2} width="32" height="32" />
        </NotificationsPanel>
      </IconButton>
      <IconButton @click="openPanel('chats')">
        <ChatsPanel ref="chatsRef">
          <IconMessages stroke={2} width="32" height="32" />
        </ChatsPanel>
      </IconButton>
      <div ref="dropdownRef">
        <button :class="$style.profile_btn" @click="isDropdownVisible = !isDropdownVisible">
          {{ auth.currentUser.firstName }} {{ auth.currentUser.lastName }}
          <IconChevronDown stroke={2} width="32" height="32" :class="[$style.toggle_icon, isDropdownVisible ? $style.rotated : '']"/>
        </button>
        <DropDown :visible="isDropdownVisible">
          <div :class="$style.profile_drop_wrapper">
            <IconUserCircle stroke={2} />
            <p :class="$style.username">{{ auth.currentUser.firstName }} {{ auth.currentUser.lastName }}</p>
            <p :class="$style.status">{{ RoleNamesCyrillic[auth.userRole] }}</p>
          </div>
          <router-link to="/profile">
            <li>
              <IconUserCircle stroke={2} />
              Мој Профил
            </li>
          </router-link>
          <li @click="openModal">
            <Modal ref="modalRef" title="Одјава">
              <template #open>
                <IconLogout stroke={2} color="red"/>
                Одјави се
              </template>
              <p>Да ли сте сигурни да желите да се одјавите?</p>
              <template #footer>
                <CTA title="Одјави се" color="red" size="sm" :onClick="handleLogout"/>
              </template>
            </Modal>
          </li>
        </DropDown>
      </div>
    </div>
  </header>
</template>