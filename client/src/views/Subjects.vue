<script lang="ts" setup>
import { onMounted } from 'vue';
import { useSubjectStore } from '../stores/subject';
import { formatDate } from '../utils';
import { ClassYearEnum } from '../utils/enums';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
const subjectStore = useSubjectStore();
onMounted(async () => {
  await subjectStore.getSubjects();
});
</script>
<style src="./Subjects.module.css" module/>
<template>
  <PageLayout>
    <HeaderLayout>
      <h1>Предмети</h1>
    </HeaderLayout>
    <div :class="$style.container">
      <table>
        <thead>
          <tr>
            <th>Број предмета</th>
            <th>Наслов</th>
            <th>Година</th>
            <th>Креирано</th>
            <th>Ажурирано</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in subjectStore.subjects" :key="subject.id">
            <td>{{ subject.id }}</td>
            <td>{{ subject.title }}</td>
            <td>{{ ClassYearEnum[subject.class_year_id] }}</td>
            <td>{{ formatDate(new Date(subject.createdAt)) }}</td>
            <td>{{ formatDate(new Date(subject.updatedAt)) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageLayout>
</template>