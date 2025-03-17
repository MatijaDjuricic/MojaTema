<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps<{
    handleSubmit: () => Promise<void> | void;
}>();
</script>
<style src="./FormLayout.module.css" module/>
<template>
    <form :class="$style.form" @submit.prevent="handleSubmit">
        <slot name="header"></slot>
        <slot name="inputs"></slot>
        <div :class="$style.buttons_wrapper">
            <slot name="buttons"></slot>    
        </div>
    </form>
</template>