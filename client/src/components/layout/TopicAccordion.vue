<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { useUpdateTopicStatus } from '../../composables/queries/useTopics';
import { TopicStatusNamesCyrillic } from '../../utils/constants';
import { TopicStatusEnum } from '../../utils/enums';
import { IconChevronDown, IconCircleDashedX } from '@tabler/icons-vue';
import CTA from '../common/CTA.vue';
import type { Topic } from '../../types';
defineProps<{ topic: Topic, isRerotedBySelf: boolean, userId: number }>();
const { mutate: updateTopicStatus, isPending: isLoadingTopicStatus } = useUpdateTopicStatus();
const open = ref<boolean>(false);
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
              v-if="topic.student === null && !isRerotedBySelf"
              title="Пријави тему"
              size="sm"
              :loading="isLoadingTopicStatus"
              @click="updateTopicStatus({ id: topic.id, status: TopicStatusEnum.NA_CEKANJU })"
            />
            <CTA
              v-else-if="userId === topic.student?.userId"
              title="Одјави тему"
              size="sm"
              :loading="isLoadingTopicStatus"
              @click="updateTopicStatus({id: topic.id, status: TopicStatusEnum.SLOBODNA})"
            />
            <IconCircleDashedX v-else stroke={2} width="48" height="48" style="color: var(--red)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>