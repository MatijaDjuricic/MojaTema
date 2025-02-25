<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { IconEye, IconEyeOff } from '@tabler/icons-vue';
const props = defineProps<{
  passwordVisible?: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:passwordVisible', value: boolean): void;
}>();
const togglePasswordVisibility = () => {
  emit('update:passwordVisible', !props.passwordVisible);
};
</script>
<style src="./PasswordInput.module.css" module/>
<template>
  <div :class="$style.password_wrapper">
    <slot></slot>
    <button 
      type="button" 
      :class="$style.eye_button" 
      @click="togglePasswordVisibility" 
      aria-label="Toggle password visibility"
    >
      <IconEye v-if="props.passwordVisible" stroke={2} />
      <IconEyeOff v-else stroke={2} />
    </button>
  </div>
</template>
