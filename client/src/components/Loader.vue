<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps<{
  type?: 'content_loader' | 'btn_loader';
  size?: 'lg' | 'sm';
}>();
</script>
<style src="./Loader.module.css" module/>
<template>
  <div v-if="type === 'btn_loader'">
    <div :class="[$style.loader, size === 'lg' ? $style.btn_lg_loader : $style.btn_sm_loader]"></div>
  </div>
  <div v-else :class="$style.loader_wrapper">
    <div :class="[$style.loader, $style.content_loader]"></div>
  </div>
</template>