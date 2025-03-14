<script lang="ts" setup>
import { onMounted } from 'vue';
import { useMenageTopic } from '../composables/useMenageTopic';
import { IconFileImport } from '@tabler/icons-vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import CTA from '../components/CTA.vue';
import FormLayout from '../layouts/FormLayout.vue';
const {
  title,
  description,
  loading,
  subjectId,
  fileInput,
  defaultSubject,
  subjects,
  handleClear,
  handleSubmit,
  handleFileUpload,
  fetchSubjects
} = useMenageTopic();
onMounted(async () => await fetchSubjects());
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
          @change="handleFileUpload"
        />
      </button>
    </HeaderLayout>
    <div :class="$style.form_wrapper">
      <FormLayout :handle-submit="handleSubmit">
        <template #inputs>
          <label>Предмет:</label>
          <select v-model="subjectId">
            <option :value="subjectId" disabled selected>{{ defaultSubject?.title || "Изабери предмет" }}</option>
            <option v-for="(subject, index) in subjects" :key="index" :value="subject.id">
              {{ subject.title }}
            </option>
          </select>
          <label>Назив:</label>
          <input v-model="title" type="text" placeholder="Унеси назив..." />
          <label>Опис:</label>
          <textarea v-model="description" placeholder="Унеси опис..."></textarea>
        </template>
        <template #buttons>
          <CTA
            title="Додај тему"
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
  </PageLayout>
</template>