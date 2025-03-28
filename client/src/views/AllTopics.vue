<script lang="ts" setup>
import { useProfessorSubjects } from '../composables/queries/useProfessorSubject';
import { useUsers } from '../composables/queries/useUsers';
import { useTopicForm } from '../composables/forms/useTopicForm';
import { useModal } from '../composables/utils/useModal';
import {
  useCreateTopic,
  useDeleteTopic,
  useImportTopics,
  useTopics,
  useUpdateTopic,
} from '../composables/queries/useTopics';
import { formatDate } from '../utils';
import { RoleEnum, TopicStatusEnum } from '../utils/enums';
import { TopicStatusNamesCyrillic } from '../utils/constants';
import { IconFileImport } from '@tabler/icons-vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import FormLayout from '../layouts/FormLayout.vue';
import Modal from '../components/layout/Modal.vue';
import Loader from '../components/common/Loader.vue';
import CTA from '../components/common/CTA.vue';
const {
  modalRef,
  openModal,
  setModalRefs,
  openModalRefs,
  closeModalRefs,
  closeModal
} = useModal();
const { data: users } = useUsers();
const { data: topics, isLoading: isLoadingTopics } = useTopics();
const { data: professorSubjects } = useProfessorSubjects();
const { mutate: createTopic, isPending: isSubmitLoading } = useCreateTopic();
const { importTopics, fileInput } = useImportTopics();
const { mutate: updateTopic } = useUpdateTopic();
const { mutate: deleteTopic } = useDeleteTopic();
const { createTopicRef, updateTopicRef, handleClear, openEditModal } = useTopicForm();
</script>
<style scoped src="./AllTopics.module.css" module></style>
<template>
  <PageLayout>
    <HeaderLayout>
      <h1>Теме</h1>
      <div :class="$style.header_buttons">
        <Modal ref="modalRef" title="Додај тему">
          <template #open>
            <CTA title="Додај тему" size="sm" color="green" @click="() => openModal()"/>
          </template>
          <FormLayout :handle-submit="() => { createTopic(createTopicRef), closeModal() }">
            <template #inputs>
              <label>Назив:</label>
              <input v-model="createTopicRef.title" type="text" placeholder="Унеси назив..." />
              <label>Опис:</label>
              <textarea v-model="createTopicRef.description" placeholder="Унеси опис..."></textarea>
              <label>Професор-Предмет:</label>
              <select v-model="createTopicRef.professor_subject_id">
                <option v-for="professorSubject in professorSubjects" :key="professorSubject.id" :value="professorSubject.id">
                  {{ professorSubject.subject.title }} - {{ professorSubject.professor.firstName }} {{ professorSubject.professor.lastName }}
                </option>
              </select>
            </template>
            <template #buttons>
              <CTA title="Додај тему" color="green" size="sm" type="submit" :loading="isSubmitLoading"/>
              <CTA title="Одбаци" color="red" size="sm" @click.prevent="handleClear"/>
            </template>
          </FormLayout>
        </Modal>
        <button :class="$style.upload_file_btn">
          <IconFileImport stroke={2} />
          Увези .csv или .xlsx
          <input ref="fileInput" type="file" accept=".csv, .xlsx" @change="importTopics()"/>
        </button>
      </div>
    </HeaderLayout>
    <Loader v-if="isLoadingTopics" type="content_loader" size="lg"/>
    <div v-else :class="$style.container">
      <table>
        <thead>
          <tr>
            <th>Број теме</th>
            <th>Наслов</th>
            <th>Опис</th>
            <th>Професор-Предмет</th>
            <th>Статус</th>
            <th>Ученик</th>
            <th>Креирано</th>
            <th>Ажурирано</th>
            <th>Измени</th>
            <th>Избриши</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="topic in topics" :key="topic.id">
            <td>{{ topic.id }}</td>
            <td>{{ topic.title }}</td>
            <td>{{ topic.description }}</td>
            <td>{{ topic.subject.title }} - {{ topic.professor.firstName }} {{ topic.professor.lastName }}</td>
            <td>{{ TopicStatusNamesCyrillic[topic.status as TopicStatusEnum] }}</td>
            <td>{{ topic.student ? topic.student.firstName + ' ' + topic.student.lastName : '/' }}</td>
            <td>{{ formatDate(new Date(topic.createdAt)) }}</td>
            <td>{{ formatDate(new Date(topic.updatedAt)) }}</td>
            <td>
              <Modal :ref="(el: any) => setModalRefs(topic.id, el)" title="Измени тему">
                <template #open>
                  <CTA title="Измени" size="sm" @click="() => { openEditModal(topic.id, topics), openModalRefs(topic.id) }"/>
                </template>
                <FormLayout :handle-submit="() => { updateTopic({ id: topic.id, data: updateTopicRef }), closeModalRefs(topic.id) }">
                  <template #inputs>
                    <label>Наслов:</label>
                    <input v-model="updateTopicRef.title" type="text" placeholder="Унеси наслов..."/>
                    <label>Опис:</label>
                    <textarea v-model="updateTopicRef.description" type="text" placeholder="Унеси опис..."></textarea>
                    <label>Статус:</label>
                    <select v-model="updateTopicRef.status">
                      <option v-for="(status, index) in TopicStatusNamesCyrillic" :key="index" :value="index">
                        {{ status }}
                      </option>
                    </select>
                    <label>Професор-Предмет:</label>
                    <select v-model="updateTopicRef.professor_subject_id">
                      <option v-for="professorSubject in professorSubjects" :key="professorSubject.id" :value="professorSubject.id">
                        {{ professorSubject.subject.title }} {{ professorSubject.professor.firstName }} {{ professorSubject.professor.lastName }}
                      </option>
                    </select>
                    <label>Ученик:</label>
                    <select v-model="updateTopicRef.student_user_id">
                      <option v-for="student in users?.filter(u => u.role == RoleEnum.UCENIK)" :key="student.id" :value="student.id">
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
              <CTA title="Избриши" size="sm" color="red" @click="deleteTopic(topic.id)"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageLayout>
</template>