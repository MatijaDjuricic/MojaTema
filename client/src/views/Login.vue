<script lang="ts" setup>
import { useLoginForm } from '../composables/useLoginForm';
import CTA from '../components/CTA.vue';
import Logo from '../components/Logo.vue';
import { IconEye, IconEyeOff } from '@tabler/icons-vue';
const {
  email,
  password,
  passwordVisible,
  loading,
  togglePasswordVisibility,
  handleSubmit
} = useLoginForm();
</script>
<style src="./Login.module.css" module/>
<template>
  <main :class="$style.main_wrapper">
    <div :class="$style.form_container">
      <Logo/>
      <form :class="$style.login_form" @submit.prevent="handleSubmit">
        <h1>Пријави се</h1>
        <label for="email">ИМЕЈЛ АДРЕСА:</label>
        <input v-model="email" id="email" type="text" placeholder="Унеси имејл адресу..." />
        <label for="password">ЛОЗИКА:</label>
        <div :class="$style.password_wrapper">
          <input v-model="password" :type="passwordVisible ? 'text' : 'password'" id="password" placeholder="Унеси лозинку..." />
          <button type="button" :class="$style.eye_button" @click="togglePasswordVisibility" aria-label="Toggle password visibility">
            <IconEye v-if="passwordVisible" />
            <IconEyeOff v-else />
          </button>
        </div>
        <div :class="$style.submit_wrapper">
          <CTA title="Пријави се" :loading=loading :disabled=loading size="lg" type="submit"/>
        </div>
      </form>
    </div>
  </main>
</template>