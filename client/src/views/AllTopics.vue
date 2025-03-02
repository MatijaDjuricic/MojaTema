<script lang="ts" setup>
import { onMounted } from 'vue';
import { useTopicStore } from '../stores/topic';
import { useToastMessage } from '../composables/useToastMessage';
import { formatDate } from '../utils';
import { TopicStatusEnum } from '../utils/enums';
import { TopicStatusNamesCyrillic } from '../utils/constants';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import CTA from '../components/CTA.vue';
const topicStore = useTopicStore();
const { successMessage } = useToastMessage();
onMounted(async () => {
  await topicStore.getTopics();
});
</script>
<style src="./AllTopics.module.css" module/>
<template>
  <PageLayout>
    <HeaderLayout>
      <h1>Теме</h1>
    </HeaderLayout>
    <div :class="$style.container">
      <table>
        <thead>
          <tr>
            <th>Број теме</th>
            <th>Наслов</th>
            <th>Предмет</th>
            <th>Професор</th>
            <th>Студент</th>
            <th>Статус</th>
            <th>Креирано</th>
            <th>Ажурирано</th>
            <th>Избриши</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="topic in topicStore.topics" :key="topic.id">
            <td>{{ topic.id }}</td>
            <td>{{ topic.title }}</td>
            <td>{{ topic.subject.title }}</td>
            <td>{{ topic.professor.firstName }} {{ topic.professor.lastName }}</td>
            <td>{{ topic.student ? topic.student.firstName + ' ' + topic.student.lastName : 'Нема' }}</td>
            <td>{{ TopicStatusNamesCyrillic[topic.status as TopicStatusEnum] }}</td>
            <td>{{ formatDate(new Date(topic.createdAt)) }}</td>
            <td>{{ formatDate(new Date(topic.updatedAt)) }}</td>
            <td>
              <CTA
                title="Избриши"
                size="sm"
                color="red"
                @click="() => {
                  topicStore.deleteTopic(topic.id)
                  .finally(() => {
                    successMessage(`Успешно си обрисао тему - ${topic.title}`);
                  });
                }"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageLayout>
</template>