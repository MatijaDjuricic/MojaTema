<script lang="ts" setup>
import { useProfessorSubjectForm } from '../composables/forms/useProfessorSubjectForm';
import { useUsers } from '../composables/queries/useUsers';
import { useModal } from '../composables/utils/useModal';
import { formatDate } from '../utils';
import { RoleEnum } from '../utils/enums';
import { IconFileImport } from '@tabler/icons-vue';
import { useSubjects } from '../composables/queries/useSubjects';
import {
  useProfessorSubjects,
  useCreateProfessorSubject,
  useImportProfessorSubjects,
  useUpdateProfessorSubject,
  useDeleteProfessorSubject,
} from '../composables/queries/useProfessorSubject';
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
const { data: subjects } = useSubjects();
const { data: users } = useUsers();
const { data: professorSubjects, isLoading: isLoadingProfessorSubjects } = useProfessorSubjects();
const { mutate: createProfessorSubject, isPending: isSubmitLoading } = useCreateProfessorSubject();
const { importProfessorSubjects, fileInput } = useImportProfessorSubjects();
const { mutate: updateProfessorSubject } = useUpdateProfessorSubject();
const { mutate: deleteProfessorSubject } = useDeleteProfessorSubject();
const { createProfessorSubjectRef, updateProfessorSubjectRef, handleClear, openEditModal } =  useProfessorSubjectForm();
</script>
<style src="./ProfessorSubject.module.css" module/>
<template>
  <PageLayout>
    <HeaderLayout>
      <h1>Професор - Предмет</h1>
      <div :class="$style.header_buttons">
        <Modal ref="modalRef" title="Додај професор-предмет">
          <template #open>
            <CTA title="Додај професор-предмет" size="sm" color="green" @click="() => openModal()"/>
          </template>
          <FormLayout :handle-submit="() => { createProfessorSubject(createProfessorSubjectRef), closeModal() }">
          <template #inputs>
            <label>Предмет:</label>
            <select v-model="createProfessorSubjectRef.subject_id">
              <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                {{ subject.title }}
              </option>
            </select>
            <label>Професор:</label>
            <select v-model="createProfessorSubjectRef.user_id">
              <option v-for="professor in users?.filter(u => u.role == RoleEnum.PROFESOR)" :key="professor.id" :value="professor.id">
                {{ professor.firstName }} {{ professor.lastName }}
              </option>
            </select>
          </template>
          <template #buttons>
            <CTA title="Додај професор-предмет" color="green" size="sm" type="submit" :loading="isSubmitLoading"/>
            <CTA title="Одбаци" color="red" size="sm" @click.prevent="handleClear"/>
          </template>
          </FormLayout>
        </Modal>
        <button :class="$style.upload_file_btn">
          <IconFileImport stroke={2} />
          Увези .csv или .xlsx
          <input ref="fileInput" type="file" accept=".csv, .xlsx" @change="importProfessorSubjects()"/>
        </button>
      </div>
    </HeaderLayout>
    <Loader v-if="isLoadingProfessorSubjects" type="content_loader" size="lg"/>
    <div v-else :class="$style.container">
      <table>
        <thead>
          <tr>
            <th>Број професор-предмет</th>
            <th>Предмет</th>
            <th>Професор</th>
            <th>Креирано</th>
            <th>Ажурирано</th>
            <th>Измени</th>
            <th>Избриши</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="professorSubject in professorSubjects" :key="professorSubject.id">
            <td>{{ professorSubject.id }}</td>
            <td>{{ professorSubject.subject.title }}</td>
            <td>{{ professorSubject.professor.firstName }} {{ professorSubject.professor.lastName }}</td>
            <td>{{ formatDate(new Date(professorSubject.createdAt)) }}</td>
            <td>{{ formatDate(new Date(professorSubject.updatedAt)) }}</td>
            <td>
               <Modal :ref="el => setModalRefs(professorSubject.id, el)" title="Измени предмет">
                <template #open>
                  <CTA title="Измени" size="sm" @click="() => { openEditModal(professorSubject.id, professorSubjects), openModalRefs(professorSubject.id) }"/>
                </template>
                <FormLayout :handle-submit="() => { updateProfessorSubject({ id: professorSubject.id, data: updateProfessorSubjectRef }), closeModalRefs(professorSubject.id) }">
                  <template #inputs>
                    <label>Предмет:</label>
                    <select v-model="updateProfessorSubjectRef.subject_id">
                      <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                        {{ subject.title }}
                      </option>
                    </select>
                    <label>Професор:</label>
                    <select v-model="updateProfessorSubjectRef.user_id">
                      <option v-for="professor in users?.filter(u => u.role == RoleEnum.PROFESOR)" :key="professor.id" :value="professor.id">
                        {{ professor.firstName }} {{ professor.lastName }}
                      </option>
                    </select>
                  </template>
                  <template #buttons>
                    <CTA title="Измени" color="green" size="sm" type="submit"/>
                  </template>
                </FormLayout>
              </Modal>
            </td>
            <td>
              <CTA title="Избриши" size="sm" color="red" @click="deleteProfessorSubject(professorSubject.id)"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageLayout>
</template>