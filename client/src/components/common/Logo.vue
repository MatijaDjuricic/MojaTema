<style src="./Logo.module.css" module/>
<template>
  <div :class="$style.logo_wrapper">
    <img src="/logo.png" alt="Logo" />
    <router-link to="/">
      <p>МојаТема</p>
    </router-link>
  </div>
</template>