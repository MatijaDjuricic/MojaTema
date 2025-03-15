<script lang="ts" setup>
import { onMounted } from 'vue';
import { useSubjectStore } from '../stores/subject';
import { useToastMessage } from '../composables/useToastMessage';
import { useMenageSubject } from '../composables/useMenageSubject';
import { useModal } from '../composables/useModal';
import { formatDate } from '../utils';
import { ClassYearEnum } from '../utils/enums';
import { IconFileImport } from '@tabler/icons-vue';
import Modal from '../components/Modal.vue';
import CTA from '../components/CTA.vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import FormLayout from '../layouts/FormLayout.vue';
const { successMessage } = useToastMessage();
const subjectStore = useSubjectStore();
const {
  modalRef,
  openModal,
  setModalRefs,
  openModalRefs,
  closeModalRefs
} = useModal();
const {
  title,
  classYearId,
  loading,
  fileInput,
  handleFileUpload,
  handleClear,
  handleSubmit,
  handleEdit,
} = useMenageSubject();
onMounted(async () => await subjectStore.getSubjects());
</script>
<style src="./Subjects.module.css" module/>
<template>
  <PageLayout>
    <HeaderLayout>
      <h1>Предмети</h1>
      <div :class="$style.header_buttons">
        <Modal ref="modalRef" title="Додај предмет">
          <template #open>
            <CTA title="Додај предмет" size="sm" color="green" @click="() => openModal()"/>
          </template>
          <FormLayout :handle-submit="handleSubmit">
          <template #inputs>
            <label>Година:</label>
              <select v-model="classYearId">
                <option v-for="(class_year, index) in Object.keys(ClassYearEnum).filter(key => isNaN(Number(key)))"
                  :key="index" :value="index+1"
                >
                  {{ class_year }}
                </option>
              </select>
              <label>Наслов:</label>
              <input v-model="title" type="text" placeholder="Унеси наслов..."/>
            </template>
          <template #buttons>
            <CTA title="Додај предмет" color="green" size="sm" type="submit" :loading="loading"/>
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
            <th>Број предмета</th>
            <th>Наслов</th>
            <th>Година</th>
            <th>Креирано</th>
            <th>Ажурирано</th>
            <th>Измени</th>
            <th>Избриши</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subject in subjectStore.subjects" :key="subject.id">
            <td>{{ subject.id }}</td>
            <td>{{ subject.title }}</td>
            <td>{{ ClassYearEnum[subject.class_year_id] }}</td>
            <td>{{ formatDate(new Date(subject.createdAt)) }}</td>
            <td>{{ formatDate(new Date(subject.updatedAt)) }}</td>
            <td>
               <Modal :ref="el => setModalRefs(subject.id, el)" title="Измени предмет">
                <template #open>
                  <CTA
                    title="Измени"
                    size="sm"
                    @click="openModalRefs(subject.id)"
                  />
                </template>
                <FormLayout :handle-submit="() => handleEdit(subject.id).finally(() => closeModalRefs(subject.id))">
                  <template #inputs>
                    <label>Улога:</label>
                    <select v-model="subject.class_year_id">
                      <option :value="subject.class_year_id" disabled selected>{{ ClassYearEnum[subject.class_year_id] }}</option>
                      <option v-for="(class_year, index) in Object.keys(ClassYearEnum).filter(key => isNaN(Number(key)))"
                        :key="index" :value="index+1"
                      >
                        {{ class_year }}
                      </option>
                    </select>
                    <label>Наслов:</label>
                    <input v-model="subject.title" type="text" placeholder="Унеси наслов..."/>
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
                  subjectStore.deleteSubject(subject.id)
                  .finally(() => {
                    successMessage(`Успешно си обрисао предмет`);
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