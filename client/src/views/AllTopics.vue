<script lang="ts" setup>
import { onMounted } from 'vue';
import { useTopicStore } from '../stores/topic';
import { useToastMessage } from '../composables/useToastMessage';
import { useModal } from '../composables/useModal';
import { formatDate } from '../utils';
import { TopicStatusEnum } from '../utils/enums';
import { TopicStatusNamesCyrillic } from '../utils/constants';
import CTA from '../components/CTA.vue';
import Modal from '../components/Modal.vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import FormLayout from '../layouts/FormLayout.vue';
const { setModalRefs, openModalRefs, closeModalRefs } = useModal();
const { successMessage } = useToastMessage();
const topicStore = useTopicStore();
const handleEdit = async (id: number) => {
  const topic = topicStore.topics.find(t => t.id === id);
  if (topic) {
    await topicStore.updateTopic(id, {
    "title": topic.title,
    "description": topic.description,
    }).finally(() => {
      successMessage(`Успешно си изменио тему`);
      closeModalRefs(id);
    });
  }
}
onMounted(async () => await topicStore.getTopics());
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
            <th>Опис</th>
            <th>Предмет</th>
            <th>Професор</th>
            <th>Статус</th>
            <th>Ученик</th>
            <th>Креирано</th>
            <th>Ажурирано</th>
            <th>Измени</th>
            <th>Избриши</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="topic in topicStore.topics" :key="topic.id">
            <td>{{ topic.id }}</td>
            <td>{{ topic.title }}</td>
            <td>{{ topic.description }}</td>
            <td>{{ topic.subject.title }}</td>
            <td>{{ topic.professor.firstName }} {{ topic.professor.lastName }}</td>
            <td>{{ TopicStatusNamesCyrillic[topic.status as TopicStatusEnum] }}</td>
            <td>{{ topic.student ? topic.student.firstName + ' ' + topic.student.lastName : '/' }}</td>
            <td>{{ formatDate(new Date(topic.createdAt)) }}</td>
            <td>{{ formatDate(new Date(topic.updatedAt)) }}</td>
            <td>
              <Modal :ref="el => setModalRefs(topic.id, el)" title="Измени тему">
                <template #open>
                  <CTA
                    title="Измени"
                    size="sm"
                    @click="openModalRefs(topic.id)"
                  />
                </template>
                <FormLayout :handle-submit="() => handleEdit(topic.id)">
                  <template #inputs>
                    <label>Статус:</label>
                    <select v-model="topic.status">
                      <option :value="topic.status" disabled selected>{{ TopicStatusNamesCyrillic[topic.status as TopicStatusEnum] }}</option>
                      <option v-for="(status, index) in TopicStatusNamesCyrillic" :key="index" :value="index">
                        {{ status }}
                      </option>
                    </select>
                    <label>Предмет:</label>
                    <input v-model="topic.subject.title" type="text" placeholder="Унеси предмет..."/>
                    <label>Наслов:</label>
                    <input v-model="topic.title" type="text" placeholder="Унеси наслов..."/>
                    <label>Опис:</label>
                    <textarea v-model="topic.description" type="text" placeholder="Унеси опис..."></textarea>
                    <label>Професор:</label>
                    <input v-model="topic.professor.firstName" type="text" placeholder="Унеси професора..."/>
                    <label>Ученик:</label>
                    <input type="text" placeholder="Унеси ученика..." :value="topic.student?.firstName"/>
                  </template>
                  <template #buttons>
                    <CTA title="Измени" color="green" size="sm" type="submit"/>
                  </template>
                </FormLayout>
              </Modal>
            </td>
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