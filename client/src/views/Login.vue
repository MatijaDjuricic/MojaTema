<script lang="ts" setup>
import { useLoginForm } from '../composables/forms/useLoginForm';
import { themes } from '../utils/constants';
import { useTheme } from '../composables/utils/useTheme';
import { IconMoon, IconSun } from '@tabler/icons-vue';
import IconButton from '../components/common/IconButton.vue';
import Logo from '../components/common/Logo.vue';
import CTA from '../components/common/CTA.vue';
import FormLayout from '../layouts/FormLayout.vue';
import PasswordInput from '../components/common/PasswordInput.vue';
const {
  email,
  password,
  passwordVisible,
  isSubmitLoading,
  togglePasswordVisibility,
  handleSubmit
} = useLoginForm();
const { theme, toggleTheme } = useTheme();
</script>
<style src="./Login.module.css" module/>
<template>
  <main :class="$style.login_wrapper">
    <header>
      <Logo/>
      <IconButton @click="toggleTheme">
        <IconSun v-if="theme === themes.dark" stroke={2} width="32" height="32" />
        <IconMoon v-else stroke={2} width="32" height="32" />
      </IconButton>
    </header>
    <FormLayout :handle-submit="handleSubmit">
      <template #header>
        <h1>Пријави се</h1>
      </template>
      <template #inputs>
        <label>Имејл адреса:</label>
          <input v-model="email" placeholder="Унеси имејл адресу..."/>
        <label>Лозинка:</label>
        <PasswordInput
          :password-visible="passwordVisible"
          @update:passwordVisible="togglePasswordVisibility"
        >
          <input 
            v-model="password"
            placeholder="Унеси тренутну лозинку..."
            :type="passwordVisible ? 'text' : 'password'"
          />
        </PasswordInput>
      </template>
      <template #buttons>
        <CTA title="Пријави се" :class="$style.login_button" :loading=isSubmitLoading :disabled=isSubmitLoading size="lg" type="submit"/>
      </template>
    </FormLayout>
  </main>
</template>