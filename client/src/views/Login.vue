<script lang="ts" setup>
import { useLoginForm } from '../composables/useLoginForm';
import { IconEye, IconEyeOff, IconMoon, IconSun } from '@tabler/icons-vue';
import { themes } from '../utils/constants';
import { useTheme } from '../composables/useTheme';
import IconButton from '../components/IconButton.vue';
import Logo from '../components/Logo.vue';
import CTA from '../components/CTA.vue';
const {
  email,
  password,
  passwordVisible,
  loading,
  togglePasswordVisibility,
  handleSubmit
} = useLoginForm();
const { theme, toggleTheme } = useTheme();
</script>
<style src="./Login.module.css" module/>
<template>
  <main :class="$style.main_wrapper">
    <header>
      <Logo/>
      <IconButton @click="toggleTheme">
        <IconSun v-if="theme === themes.dark" stroke={2} width="32" height="32" />
        <IconMoon v-else stroke={2} width="32" height="32" />
      </IconButton>
    </header>
    <form :class="$style.login_form" @submit.prevent="handleSubmit">
      <h1>Пријави се</h1>
      <label for="email">Имејл адреса:</label>
      <input v-model="email" id="email" type="text" placeholder="Унеси имејл адресу..." />
      <label for="password">Лозинка:</label>
      <div :class="$style.password_wrapper">
        <input v-model="password" :type="passwordVisible ? 'text' : 'password'" id="password" placeholder="Унеси лозинку..." />
        <button type="button" :class="$style.eye_button" @click="togglePasswordVisibility" aria-label="Toggle password visibility">
          <IconEye v-if="passwordVisible" stroke={4} />
          <IconEyeOff v-else stroke={4} />
        </button>
      </div>
      <div :class="$style.submit_wrapper">
        <CTA title="Пријави се" :loading=loading :disabled=loading size="lg" type="submit"/>
      </div>
    </form>
  </main>
</template>