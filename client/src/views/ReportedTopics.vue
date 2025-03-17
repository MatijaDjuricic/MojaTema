<script lang="ts" setup>
import { useTopicQuery } from '../services/topic/useTopicQuery';
import { TopicStatusNamesCyrillic } from '../utils/constants';
import { TopicStatusEnum } from '../utils/enums';
import { IconTrashX } from '@tabler/icons-vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import PageLayout from '../layouts/PageLayout.vue';
import IconButton from '../components/IconButton.vue';
import Loader from '../components/Loader.vue';
import CTA from '../components/CTA.vue';
const {
    professorTopics,
    isLoadingProfessorTopics,
    isLoadingTopicStatus,
    updateTopicStatus,
    deleteTopic,
} = useTopicQuery();
</script>
<style src="./ReportedTopics.module.css" module/>
<template>
  <PageLayout>
    <HeaderLayout>
        <h1>Пријављене Теме</h1>
    </HeaderLayout>
    <Loader v-if="isLoadingProfessorTopics" type="content_loader"/>
    <div v-else :class="$style.reported_topics_wrapper">
        <div v-for="(topic, index) in professorTopics" :key="index" :class="$style.topic_item">
            <div v-if="index > 0" :class="$style.line"></div>
            <div :class="$style.title_wrapper">
                <h1>{{ topic.title }}</h1>
                <IconButton color="red" @click="deleteTopic(topic.id)">
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
                        :loading="isLoadingTopicStatus"
                        @click="updateTopicStatus({id: topic.id, status: TopicStatusEnum.SLOBODNA})"
                    />
                    <CTA
                        v-if="topic.status === TopicStatusEnum.REZERVISANA"
                        title="Постави на чекање"
                        color="green"
                        size="sm"
                        :loading="isLoadingTopicStatus"
                        @click="updateTopicStatus({id: topic.id, status: TopicStatusEnum.NA_CEKANJU})"
                    />
                    <CTA
                        v-else
                        title="Предај тему"
                        color="green"
                        size="sm"
                        :loading="isLoadingTopicStatus"
                        @click="updateTopicStatus({id: topic.id, status: TopicStatusEnum.REZERVISANA})"
                    />
                </div>
            </div>
            <p v-else>Одобрен ученик: /</p>
        </div>
    </div>
  </PageLayout>
</template>