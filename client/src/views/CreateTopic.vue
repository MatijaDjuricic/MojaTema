<script lang="ts" setup>
import { onMounted } from 'vue';
import { useCreateTopic } from '../composables/useCreateTopic';
import { IconFileImport } from '@tabler/icons-vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import CTA from '../components/CTA.vue';
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
} = useCreateTopic();
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
    <form :class="$style.create_form" @submit.prevent="handleSubmit">
      <label>ПРЕДМЕТ:</label>
      <select v-model="subjectId">
        <option :value="subjectId" disabled selected>{{ defaultSubject?.title || "Изабери предмет" }}</option>
        <option v-for="(subject, index) in subjects" :key="index" :value="subject.id">
          {{ subject.title }}
        </option>
      </select>
      <label>НАЗИВ:</label>
      <input v-model="title" type="text" placeholder="Унеси назив..." />
      <label>ОПИС:</label>
      <textarea v-model="description" placeholder="Унеси опис..."></textarea>
      <div :class="$style.cta_wrapper">
        <CTA
          title="Додај тему"
          color="green"
          size="sm"
          type="submit"
          :loading="loading"
        />
        <CTA
          title="Одбаци тему"
          color="red"
          size="sm"
          @click.prevent="handleClear"
        />
      </div>
    </form>
  </PageLayout>
</template>