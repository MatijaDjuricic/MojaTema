<script lang="ts" setup>
import { IconArticle, IconEdit, IconInfoCircle } from '@tabler/icons-vue';
import { useProfileForm } from '../composables/forms/useProfileForm';
import { useReportedTopics } from '../composables/queries/useTopics';
import { useAuthStore } from '../stores/auth';
import { RoleNamesCyrillic } from '../utils/constants';
import { formatDate } from '../utils';
import { RoleEnum } from '../utils/enums';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import PageLayout from '../layouts/PageLayout.vue';
import FormLayout from '../layouts/FormLayout.vue';
import PasswordInput from '../components/common/PasswordInput.vue';
import CTA from '../components/common/CTA.vue';
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
const { data: reportedTopics } = useReportedTopics();
const authStore = useAuthStore();
const currentUser = authStore.currentUser;
</script>
<style src="./Profile.module.css" module/>
<template>
    <PageLayout>
        <HeaderLayout>
            <h1>Мој Профил</h1>
        </HeaderLayout>
        <div :class="$style.container">
            <div :class="$style.info_wrapper">
                <header>
                    <h2>Корисничке информације</h2>
                    <IconInfoCircle />
                </header>
                <p>
                    <span>Име: </span>
                    {{ currentUser.firstName }}
                </p>
                <p>
                    <span>Презиме: </span>
                    {{ currentUser.lastName }}
                </p>
                <p>
                    <span>Улога: </span>
                    {{ RoleNamesCyrillic[currentUser.role as RoleEnum] }}
                </p>
                <p>
                    <span>Измењен: </span>
                    {{ formatDate(new Date(currentUser.updatedAt)) }}
                </p>
                <p>
                    <span>Креиран: </span>
                    {{ formatDate(new Date(currentUser.createdAt)) }}
                </p>
            </div>
            <div v-if="authStore.userRole == RoleEnum.UCENIK || authStore.userRole == RoleEnum.PROFESOR"
                :class="$style.topic_wrapper"
            >
                <header>
                    <h2>Пријављене теме</h2>
                    <IconArticle />
                </header>
                <router-link v-if="reportedTopics" v-for="(topic, index) in reportedTopics"
                    :key="index"
                    :to="authStore.userRole == RoleEnum.UCENIK ? `topics?search=${topic.title.toLowerCase()}`: 'topics/reported'"
                    :class="$style.card"
                >
                    <h3>{{ topic.title }}</h3>
                    <p>({{ topic.subject.title }} - {{ topic.professor.firstName }} {{ topic.professor.lastName }})</p>
                </router-link>
                <p v-else>Нема пријављене теме</p>
            </div>
            <div :class="$style.form_wrapper">
                <FormLayout :handle-submit="handleSubmit">
                    <template #header>
                        <header>
                            <h2>Промени лозинку</h2>
                            <IconEdit />
                        </header>
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
                    </template>
                </FormLayout>
            </div>
        </div>
    </PageLayout>
</template>