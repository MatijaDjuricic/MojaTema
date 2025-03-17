<script lang="ts" setup>
import { IconFileImport } from '@tabler/icons-vue';
import { useTopicQuery } from '../services/topic/useTopicQuery';
import { useSubjectQuery } from '../services/subject/useSubjectQuery';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import FormLayout from '../layouts/FormLayout.vue';
import CTA from '../components/CTA.vue';
const { professorSubjects } = useSubjectQuery();
const {
  fileInput,
  createTopicRef,
  isSubmitLoading,
  createTopic,
  handleClear,
  importTopics
} = useTopicQuery();
</script>
<style src="./CreateTopic.module.css" module/>
<template>
  <PageLayout>
    <HeaderLayout>
      <h1>Додавање теме</h1>
      <button :class="$style.upload_file_btn">
        <IconFileImport stroke={2} />
        Увези .csv или .xlsx
        <input
          ref="fileInput"
          type="file"
          accept=".csv, .xlsx"
          @change="importTopics"
        />
      </button>
    </HeaderLayout>
    <div :class="$style.form_wrapper">
      <FormLayout :handle-submit="createTopic">
        <template #inputs>
          <label>Предмет:</label>
          <select v-model="createTopicRef.subject_id">
            <option v-for="(subject, index) in professorSubjects" :key="index" :value="subject.id">
              {{ subject.title }}
            </option>
          </select>
          <label>Назив:</label>
          <input v-model="createTopicRef.title" type="text" placeholder="Унеси назив..." />
          <label>Опис:</label>
          <textarea v-model="createTopicRef.description" placeholder="Унеси опис..."></textarea>
        </template>
        <template #buttons>
          <CTA title="Додај тему" color="green" size="sm" type="submit" :loading="isSubmitLoading"/>
          <CTA title="Одбаци" color="red" size="sm" @click.prevent="handleClear"/>
        </template>
      </FormLayout>
    </div>
  </PageLayout>
</template>