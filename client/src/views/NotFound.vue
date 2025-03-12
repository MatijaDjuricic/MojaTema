<style src="./NotFound.module.css" module/>
<template>
    <div :class="$style.container">
        <h1 :class="$style.title">Грешка 404: Страница није пронађена</h1>
        <p>Изгледа да сте дошли на страницу која не постоји. Молимо вас да се вратите на почетну страницу.</p>
        <router-link to="/" :class="$style.home_link">Почетна страница</router-link>
    </div>
</template>