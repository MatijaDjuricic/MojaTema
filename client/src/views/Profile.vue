<script lang="ts" setup>
import { useProfileForm } from '../composables/useProfileForm';
import { useAuthStore } from '../stores/auth';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import PageLayout from '../layouts/PageLayout.vue';
import FormLayout from '../layouts/FormLayout.vue';
import PasswordInput from '../components/PasswordInput.vue';
import CTA from '../components/CTA.vue';
const {
    currentPassword,
    newPassword,
    confirmPassword,
    loading,
    passwordVisible,
    togglePasswordVisibility,
    handleClear,
    handleSubmit
} = useProfileForm();
const user = useAuthStore().currentUser;
</script>
<style src="./Profile.module.css" module/>
<template>
    <PageLayout>
        <HeaderLayout>
            <h1>Мој Профил</h1>
        </HeaderLayout>
        <div :class="$style.info_wrapper">
            <p>Ime: {{ user.firstName }}</p>
            <p>Prezime: {{ user.lastName }}</p>
            <p>Uloga: {{ user.role }}</p>
            <p>Izmenjen: {{ user.updatedAt }}</p>
            <p>Kreiran: {{ user.createdAt }}</p>
        </div>
        <div :class="$style.form_wrapper">
            <FormLayout :handle-submit="handleSubmit">
                <template #header>
                    <h1>Промени лозинку</h1>
                </template>
                <template #inputs>
                    <label>Тренутна лозинка:</label>
                    <PasswordInput 
                        :password-visible="passwordVisible"
                        @update:passwordVisible="togglePasswordVisibility"
                    >
                        <input 
                            v-model="currentPassword"
                            placeholder="Унеси тренутну лозинку..."
                            :type="passwordVisible ? 'text' : 'password'"
                        />
                    </PasswordInput>
                    <label>Нова лозинка:</label>
                    <PasswordInput
                        :password-visible="passwordVisible" 
                        @update:passwordVisible="togglePasswordVisibility"
                    >
                        <input 
                            v-model="newPassword"
                            placeholder="Унеси нову лозинку..."
                            :type="passwordVisible ? 'text' : 'password'"
                        />
                    </PasswordInput>
                    <label>Понови нову лозинку:</label>
                    <PasswordInput
                        :password-visible="passwordVisible"
                        @update:passwordVisible="togglePasswordVisibility"
                    >
                        <input 
                            v-model="confirmPassword"
                            placeholder="Понови нову лозинку..."
                            :type="passwordVisible ? 'text' : 'password'"
                        />
                    </PasswordInput>
                </template>
                <template #buttons>
                    <CTA
                        title="Одбаци"
                        color="red"
                        size="sm"
                        @click.prevent="handleClear"
                    />
                    <CTA  
                        title="Промени лозинку"
                        color="green"
                        size="sm"
                        type="submit"
                        :loading="loading"
                    />
                </template>
            </FormLayout>
        </div>
    </PageLayout>
</template>
