<script lang="ts" setup>
import { onMounted } from 'vue';
import { useProfileForm } from '../composables/useProfileForm';
import { useAuthStore } from '../stores/auth';
import { RoleNamesCyrillic } from '../utils/constants';
import { useTopicStore } from '../stores/topic';
import { formatDate } from '../utils';
import { IconArticle, IconEdit, IconInfoCircle } from '@tabler/icons-vue';
import { RoleEnum } from '../utils/enums';
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
const topicStore = useTopicStore();
const authStore = useAuthStore();
const user = authStore.currentUser;
onMounted(async() => {
    if (topicStore.reported.length == 0) {
        await topicStore.getReportedTopics();
    }
})
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
                    {{ user.firstName }}
                </p>
                <p>
                    <span>Презиме: </span>
                    {{ user.lastName }}
                </p>
                <p>
                    <span>Улога: </span>
                    {{ RoleNamesCyrillic[user.role as RoleEnum] }}
                </p>
                <p>
                    <span>Измењен: </span>
                    {{ formatDate(new Date(user.updatedAt)) }}
                </p>
                <p>
                    <span>Креиран: </span>
                    {{ formatDate(new Date(user.createdAt)) }}
                </p>
            </div>
            <div :class="$style.topic_wrapper">
                <header>
                    <h2>Пријављене теме</h2>
                    <IconArticle />
                </header>
                <router-link v-if="topicStore.reported.length != 0" v-for="(topic, index) in topicStore.reported"
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
        </div>
    </PageLayout>
</template>