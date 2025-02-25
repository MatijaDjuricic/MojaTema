<script lang="ts" setup>
import HeaderLayout from '../layouts/HeaderLayout.vue';
import PageLayout from '../layouts/PageLayout.vue';
import CTA from '../components/CTA.vue';
import { useProfileForm } from '../composables/useProfileForm';
const {
currentPassword,
newPassword,
confirmPassword,
loading,
handleClear,
handleSubmit
} = useProfileForm();
</script>
<style src="./Profile.module.css" module/>
<template>
    <PageLayout>
        <HeaderLayout>
            <h1>Мој Профил</h1>
        </HeaderLayout>
        <form :class="$style.change_password_form" @submit.prevent="handleSubmit">
            <h1>Промени лозинку</h1>
            <label>Тренутна лозинка:</label>
            <input v-model="currentPassword" type="text" placeholder="Унеси тренутну лозинку..." />
            <label>Нова лозинка:</label>
            <input v-model="newPassword" placeholder="Унеси нову лозинку..."></input>
            <label>Понови нову лозинку:</label>
            <input v-model="confirmPassword" placeholder="Понови нову лозинку..."></input>
            <div :class="$style.cta_wrapper">
                <CTA
                title="Промени лозинку"
                color="green"
                size="sm"
                type="submit"
                :loading="loading"
                />
                <CTA
                title="Одбаци"
                color="red"
                size="sm"
                @click.prevent="handleClear"
                />
            </div>
        </form>
    </PageLayout>
</template>