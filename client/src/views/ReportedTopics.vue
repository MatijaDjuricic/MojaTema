<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useTopicStore } from '../stores/topic';
import { TopicStatusNamesCyrillic } from '../utils/constants';
import { TopicStatusEnum } from '../utils/enums';
import { useToastMessage } from '../composables/useToastMessage';
import { IconTrashX } from '@tabler/icons-vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import PageLayout from '../layouts/PageLayout.vue';
import IconButton from '../components/IconButton.vue';
import Loader from '../components/Loader.vue';
import CTA from '../components/CTA.vue';
const { successMessage } = useToastMessage();
const topicStore = useTopicStore();
const loading = ref<{
    content: boolean,
    [key: number]: boolean
}>({ content: false });
const searchTopics = async () => {
  loading.value.content = true;
  await topicStore.getTopicsByProfessor().finally(() => loading.value.content = false);
}
onMounted(async () => await searchTopics());
</script>
<style src="./ReportedTopics.module.css" module/>
<template>
  <PageLayout>
    <HeaderLayout>
        <h1>Пријављене Теме</h1>
    </HeaderLayout>
    <Loader v-if="loading.content" type="content_loader"/>
    <div v-else :class="$style.reported_topics_wrapper">
        <div v-for="(topic, index) in topicStore.topics" :key="index" :class="$style.topic_item">
            <div v-if="index > 0" :class="$style.line"></div>
            <div :class="$style.title_wrapper">
                <h1>{{ topic.title }}</h1>
                <IconButton color="red" @click="() => topicStore.deleteTopic(topic.id).finally(() => {
                    successMessage(`Успешно си обрисао тему - ${topic.title}`);
                })">
                    <IconTrashX stroke={2} />
                </IconButton>
            </div>
            <p>Статус теме: {{ TopicStatusNamesCyrillic[topic.status as TopicStatusEnum] }}</p>
            <div v-if="topic.student != null" :class="$style.approved_users_wrapper">
                <p>Одобрен ученик: {{ topic.student ? topic.student.firstName + ' ' + topic.student.lastName : '/' }}</p>
                <div :class="$style.approved_users_actions">
                    <CTA
                        title="Врати на пријаву"
                        color="red"
                        size="sm"
                        :loading="loading[topic.id]"
                        @click="() => {
                            loading[topic.id] = true;
                            topicStore.updateTopicStatus(topic.id, TopicStatusEnum.SLOBODNA)
                            .finally(() => {
                                loading[topic.id] = false;
                                successMessage(`Успешно си отказао ученика за тему - ${topic.title}`);
                            });
                        }"
                    />
                    <CTA
                        v-if="topic.status === TopicStatusEnum.REZERVISANA"
                        title="Постави на чекање"
                        color="green"
                        size="sm"
                        :loading="loading[topic.id]"
                        @click="() => {
                            loading[topic.id] = true;
                            topicStore.updateTopicStatus(topic.id, TopicStatusEnum.NA_CEKANJU)
                            .finally(() => {
                                loading[topic.id] = false;
                                successMessage(`Успешно си поставио на чекање тему - ${topic.title}`);
                            });
                        }"
                    />
                    <CTA
                        v-else
                        title="Предај тему"
                        color="green"
                        size="sm"
                        :loading="loading[topic.id]"
                        @click="() => {
                            loading[topic.id] = true;
                            topicStore.updateTopicStatus(topic.id, TopicStatusEnum.REZERVISANA)
                            .finally(() => {
                                loading[topic.id] = false;
                                successMessage(`Успешно си резервисао ученика на тему - ${topic.title}`);
                            });
                        }"
                    />
                </div>
            </div>
            <p v-else>Одобрен ученик: /</p>
        </div>
    </div>
  </PageLayout>
</template>