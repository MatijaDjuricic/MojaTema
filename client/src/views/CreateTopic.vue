<script lang="ts" setup>
import { useTopicForm } from '../composables/forms/useTopicForm';
import { useCreateTopic, useImportTopics } from '../composables/queries/useTopics';
import { useProfessorSubjectByProfessorId } from '../composables/queries/useProfessorSubject';
import { IconFileImport } from '@tabler/icons-vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import FormLayout from '../layouts/FormLayout.vue';
import CTA from '../components/common/CTA.vue';
const { data: professorSubjects } = useProfessorSubjectByProfessorId();
const { mutate: createTopic, isPending: isSubmitLoading } = useCreateTopic();
const { importTopics, fileInput } = useImportTopics();
const { createTopicRef, handleClear } = useTopicForm();
</script>
<style src="./CreateTopic.module.css" module/>
<template>
  <PageLayout>
    <HeaderLayout>
      <h1>Додавање теме</h1>
      <button :class="$style.upload_file_btn">
        <IconFileImport stroke={2} />
        Увези .csv или .xlsx
        <input ref="fileInput" type="file" accept=".csv, .xlsx" @change="importTopics()"/>
      </button>
    </HeaderLayout>
    <div :class="$style.form_wrapper">
      <FormLayout :handle-submit="() => createTopic(createTopicRef)">
        <template #inputs>
          <label>Професор-Предмет:</label>
            <select v-model="createTopicRef.professor_subject_id">
              <option v-for="professorSubject in professorSubjects" :key="professorSubject.id" :value="professorSubject.id">
                {{ professorSubject.subject.title }} - {{ professorSubject.professor.firstName }} {{ professorSubject.professor.lastName }}
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