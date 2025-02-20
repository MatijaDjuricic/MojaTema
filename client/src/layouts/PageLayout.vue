<script lang="ts" setup>
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';
</script>
<style src="./PageLayout.module.css" module/>
<template>
    <NavBar />
    <SideBar />
    <main id='mainWrapper' :class=$style.main_wrapper>
        <slot></slot>
    </main>
</template>