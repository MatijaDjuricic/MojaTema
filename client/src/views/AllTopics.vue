<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTopicStore } from '../stores/topic';
import { useUserStore } from '../stores/user';
import { useSubjectStore } from '../stores/subject';
import { useToastMessage } from '../composables/useToastMessage';
import { useModal } from '../composables/useModal';
import { useCreateTopic } from '../composables/useCreateTopic';
import { formatDate } from '../utils';
import { TopicStatusEnum } from '../utils/enums';
import { TopicStatusNamesCyrillic } from '../utils/constants';
import { IconFileImport } from '@tabler/icons-vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import FormLayout from '../layouts/FormLayout.vue';
import Modal from '../components/Modal.vue';
import CTA from '../components/CTA.vue';
const topicStore = useTopicStore();
const userStore = useUserStore();
const subjectStore = useSubjectStore();
const { successMessage } = useToastMessage();
const {
  modalRef,
  openModal, 
  setModalRefs,
  openModalRefs,
  closeModalRefs
} = useModal();
const {
  title,
  description,
  loading,
  subjectId,
  fileInput,
  handleClear,
  handleSubmit,
  handleFileUpload,
} = useCreateTopic();
const studentId = ref<number | null>(null);
const handleEdit = async (id: number) => {
  const topic = topicStore.topics.find(t => t.id === id);
  if (topic) {
    await topicStore.updateTopic(id, {
      "title": topic.title,
      "description": topic.description,
      "status": Number(topic.status),
      "subject_id": topic.subject.id,
      "professor_id": topic.professor.userId,
      "student_user_id": studentId.value
    }).finally(() => {
      successMessage(`Успешно си изменио тему`);
      closeModalRefs(id);
    });
  }
}
onMounted(async () => {
  await topicStore.getTopics();
  await userStore.getUsers();
  await subjectStore.getSubjects();
});
</script>
<style src="./AllTopics.module.css" module/>
<template>
  <PageLayout>
    <HeaderLayout>
      <h1>Теме</h1>
      <div :class="$style.header_buttons">
        <Modal ref="modalRef" title="Додај тему">
          <template #open>
          <CTA title="Додај тему" size="sm" color="green" @click="() => openModal()"/>
          </template>
          <FormLayout :handle-submit="handleSubmit">
          <template #inputs>
            <label>Предмет:</label>
            <select v-model="subjectId">
              <option :value="subjectId = subjectStore.defaultSubject.id" disabled>{{ subjectStore.defaultSubject.title }}</option>
              <option v-for="subject in subjectStore.subjects" :key="subject.id" :value="subject.id">
                {{ subject.title }}
              </option>
            </select>
            <label>Назив:</label>
            <input v-model="title" type="text" placeholder="Унеси назив..." />
            <label>Опис:</label>
            <textarea v-model="description" placeholder="Унеси опис..."></textarea>
          </template>
          <template #buttons>
            <CTA title="Додај тему" color="green" size="sm" type="submit" :loading="loading"/>
            <CTA title="Одбаци" color="red" size="sm" @click.prevent="handleClear"/>
          </template>
          </FormLayout>
        </Modal>
        <button :class="$style.upload_file_btn">
          <IconFileImport stroke={2} />
          Увези .csv или .xlsx
          <input ref="fileInput" type="file" accept=".csv, .xlsx" @change="handleFileUpload"/>
        </button>
      </div>
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
                  <CTA title="Измени" size="sm" @click="openModalRefs(topic.id)"/>
                </template>
                <FormLayout :handle-submit="() => handleEdit(topic.id)">
                  <template #inputs>
                    <label>Наслов:</label>
                    <input v-model="topic.title" type="text" placeholder="Унеси наслов..."/>
                    <label>Опис:</label>
                    <textarea v-model="topic.description" type="text" placeholder="Унеси опис..."></textarea>
                    <label>Статус:</label>
                    <select v-model="topic.status">
                      <option v-for="(status, index) in TopicStatusNamesCyrillic" :key="index" :value="index">
                        {{ status }}
                      </option>
                    </select>
                    <label>Предмет:</label>
                    <select v-model="topic.subject.id">
                      <option v-for="subject in subjectStore.subjects" :key="subject.id" :value="subject.id">
                        {{ subject.title }}
                      </option>
                    </select>
                    <label>Професор:</label>
                    <select v-model="topic.professor.userId">
                      <option v-for="professor in userStore.getProfessors" :key="professor.id" :value="professor.id">
                        {{ professor.firstName }} {{ professor.lastName }}
                      </option>
                    </select>
                    <label>Ученик:</label>
                    <select v-model="studentId">
                      <option v-if="topic.student" :value="topic.student.userId" disabled>
                        {{ topic.student.firstName }} {{ topic.student.lastName }}
                      </option>
                      <option v-else :value="null" disabled>Изабери ученика</option>
                      <option v-for="student in userStore.getStudents" :key="student.id" :value="student.id">
                        {{ student.firstName }} {{ student.lastName }}
                      </option>
                      <option :value="null">Уклони ученика</option>
                    </select>
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