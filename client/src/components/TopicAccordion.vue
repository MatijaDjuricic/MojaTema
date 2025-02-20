<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { useTopicStore } from '../stores/topic';
import { useAuthStore } from '../stores/auth';
import { TopicStatusNamesCyrillic } from '../utils/constants';
import { TopicStatusEnum } from '../utils/enums';
import { useToastMessage } from '../composables/useToastMessage';
import { IconChevronDown, IconCircleDashedX } from '@tabler/icons-vue';
import type { Topic } from '../types';
import CTA from './CTA.vue';
defineProps<{ topic: Topic }>();
const { successMessage } = useToastMessage();
const topicStore = useTopicStore();
const user = useAuthStore().currentUser;
const open = ref<boolean>(false);
const loading = ref<boolean>(false);
</script>
<style module src="./TopicAccordion.module.css" />
<template>
  <div :class="$style.container">
    <div :class="$style.header" @click="open=!open">
      <div :class="$style.header_text">
        <h1>{{ topic.title }}</h1>
        <p>({{ topic.subject.title }} - {{ topic.professor.firstName }} {{ topic.professor.lastName }})</p>
      </div>
      <button :class="[$style.toggle_btn, open ? $style.rotated : '']">
        <IconChevronDown stroke={2} width="32" height="32"/>
      </button>
    </div>
    <div :class="[$style.collapse_body, open ? $style.collapse_body_open : '']">
      <div :class="$style.topic_wrapper">
        <div :class="$style.info_container">
          <div :class="$style.info_wrapper">
            <p :class="$style.body_text">
              <span>Опис: </span>
              {{ topic.description }}
            </p>
          </div>
          <div :class="$style.professor_wrapper">
            <p>Ментор</p>
            <span>{{ topic.professor.firstName }} {{ topic.professor.lastName }}</span>
          </div>
        </div>
        <div :class="$style.reported_container">
          <div :class="$style.reported_wrapper">
            <p>
              <span>Статус теме: </span>
              {{ TopicStatusNamesCyrillic[topic.status as TopicStatusEnum] }}
            </p>
            <p>
              <span>Пријављен ученик: </span>
              {{ topic.student ? topic.student.firstName + ' ' + topic.student.lastName : '/' }}
            </p>
          </div>
          <div :class="$style.cta_wrapper">
            <CTA
              v-if="topic.student === null && !topicStore.isReportedTopic"
              title="Пријави тему"
              size="sm"
              :loading="loading"
              @click="() => {
                loading = true;
                topicStore.updateTopicStatusByStudent(topic.id, TopicStatusEnum.NA_CEKANJU)
                .finally(() => {
                  loading = false;
                  successMessage(`Успешно си пријављен на тему - ${topic.title}`);
                });
              }"
            />
            <CTA
              v-else-if="user.id === topic.student?.userId"
              title="Одјави тему"
              size="sm"
              :loading="loading"
              @click="() => {
                loading = true;
                topicStore.updateTopicStatusByStudent(topic.id, TopicStatusEnum.SLOBODNA)
                .finally(() => {
                  loading = false;
                  successMessage(`Успешно си одјављен са теме - ${topic.title}`);
                });
              }"
            />
            <IconCircleDashedX v-else stroke={2} width="48" height="48" style="color: var(--red)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>