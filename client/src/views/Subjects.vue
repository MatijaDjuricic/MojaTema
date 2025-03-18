<script lang="ts" setup>
import { useSubjectForm } from '../composables/forms/useSubjectForm';
import { useModal } from '../composables/utils/useModal';
import { formatDate } from '../utils';
import { ClassYearEnum } from '../utils/enums';
import { IconFileImport } from '@tabler/icons-vue';
import {
  useSubjects,
  useCreateSubject,
  useImportSubjects,
  useUpdateSubject,
  useDeleteSubject
} from '../composables/queries/useSubjects';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import FormLayout from '../layouts/FormLayout.vue';
import Modal from '../components/layout/Modal.vue';
import Loader from '../components/common/Loader.vue';
import CTA from '../components/common/CTA.vue';
const {
  modalRef,
  openModal,
  closeModal,
  setModalRefs,
  openModalRefs,
  closeModalRefs
} = useModal();
const { data: subjects, isLoading: isLoadingSubjects } = useSubjects();
const { mutate: createSubject, isPending: isSubmitLoading } = useCreateSubject();
const { importSubjects, fileInput } = useImportSubjects();
const { mutate: updateSubject } = useUpdateSubject();
const { mutate: deleteSubject } = useDeleteSubject();
const { createSubjectRef, updateSubjectRef, handleClear, openEditModal } = useSubjectForm();
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
          <FormLayout :handle-submit="() => { createSubject(createSubjectRef), closeModal() }">
          <template #inputs>
            <label>Година:</label>
              <select v-model="createSubjectRef.class_year_id">
                <option v-for="(class_year, index) in Object.keys(ClassYearEnum).filter(key => isNaN(Number(key)))"
                  :key="index" :value="index+1"
                >
                  {{ class_year }}
                </option>
              </select>
              <label>Наслов:</label>
              <input v-model="createSubjectRef.title" type="text" placeholder="Унеси наслов..."/>
            </template>
          <template #buttons>
            <CTA title="Додај предмет" color="green" size="sm" type="submit" :loading="isSubmitLoading"/>
            <CTA title="Одбаци" color="red" size="sm" @click.prevent="handleClear"/>
          </template>
          </FormLayout>
        </Modal>
        <button :class="$style.upload_file_btn">
          <IconFileImport stroke={2} />
          Увези .csv или .xlsx
          <input ref="fileInput" type="file" accept=".csv, .xlsx" @change="importSubjects()"/>
        </button>
      </div>
    </HeaderLayout>
    <Loader v-if="isLoadingSubjects" type="content_loader" size="lg"/>
    <div v-else :class="$style.container">
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
          <tr v-for="subject in subjects" :key="subject.id">
            <td>{{ subject.id }}</td>
            <td>{{ subject.title }}</td>
            <td>{{ ClassYearEnum[subject.class_year_id] }}</td>
            <td>{{ formatDate(new Date(subject.createdAt)) }}</td>
            <td>{{ formatDate(new Date(subject.updatedAt)) }}</td>
            <td>
               <Modal :ref="el => setModalRefs(subject.id, el)" title="Измени предмет">
                <template #open>
                  <CTA title="Измени" size="sm" @click="() => { openEditModal(subject.id, subjects), openModalRefs(subject.id) }"/>
                </template>
                <FormLayout :handle-submit="() => { updateSubject({ id: subject.id, data: updateSubjectRef }), closeModalRefs(subject.id) }">
                  <template #inputs>
                    <label>Улога:</label>
                    <select v-model="updateSubjectRef.class_year_id">
                      <option v-for="(class_year, index) in Object.keys(ClassYearEnum).filter(key => isNaN(Number(key)))"
                        :key="index" :value="index+1"
                      >
                        {{ class_year }}
                      </option>
                    </select>
                    <label>Наслов:</label>
                    <input v-model="updateSubjectRef.title" type="text" placeholder="Унеси наслов..."/>
                  </template>
                  <template #buttons>
                    <CTA title="Измени" color="green" size="sm" type="submit"/>
                  </template>
                </FormLayout>
              </Modal>
            </td>
            <td>
              <CTA title="Избриши" size="sm" color="red" @click="deleteSubject(subject.id)"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageLayout>
</template>