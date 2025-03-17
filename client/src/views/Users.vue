<script lang="ts" setup>
import { useAuthStore } from '../stores/auth';
import { useUserQuery } from '../services/user/useUserQuery';
import { useModal } from '../composables/useModal';
import { formatDate } from '../utils';
import { RoleEnum } from '../utils/enums';
import { RoleNamesCyrillic } from '../utils/constants';
import { IconFileImport } from '@tabler/icons-vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import FormLayout from '../layouts/FormLayout.vue';
import Modal from '../components/Modal.vue';
import Loader from '../components/Loader.vue';
import CTA from '../components/CTA.vue';
const auth = useAuthStore().currentUser;
const {
  modalRef,
  openModal,
  closeModal,
  setModalRefs,
  openModalRefs,
  closeModalRefs
} = useModal();
const {
  users,
  createUserRef,
  updateUserRef,
  isLoadingUsers,
  isSubmitLoading,
  fileInput,
  openEditModal,
  handleClear,
  createUser,
  importUsers,
  updateUser,
  deleteUser,
} = useUserQuery();
</script>
<style src="./Users.module.css" module/>
<template>
  <PageLayout>
    <HeaderLayout>
      <h1>Корисници</h1>
      <div :class="$style.header_buttons">
        <Modal ref="modalRef" title="Додај корисника">
          <template #open>
            <CTA title="Додај корисника" size="sm" color="green" @click="() => openModal()"/>
          </template>
          <FormLayout :handle-submit="() => { createUser(), closeModal() }">
          <template #inputs>
            <label>Име:</label>
            <input v-model="createUserRef.first_name" type="text" placeholder="Унеси име..." />
            <label>Презиме:</label>
            <input v-model="createUserRef.last_name" placeholder="Унеси презиме..."/>
            <label>Имејл:</label>
            <input v-model="createUserRef.email" placeholder="Унеси имејл..."/>
            <label>Улога:</label>
            <select v-model="createUserRef.role">
              <option v-for="(role, index) in RoleNamesCyrillic" :key="index" :value="index">
                {{ role }}
              </option>
            </select>
          </template>
          <template #buttons>
            <CTA title="Додај корисника" color="green" size="sm" type="submit" :loading="isSubmitLoading"/>
            <CTA title="Одбаци" color="red" size="sm" @click.prevent="handleClear"/>
          </template>
          </FormLayout>
        </Modal>
        <button :class="$style.upload_file_btn">
          <IconFileImport stroke={2} />
          Увези .csv или .xlsx
          <input ref="fileInput" type="file" accept=".csv, .xlsx" @change="importUsers"/>
        </button>
      </div>
    </HeaderLayout>
    <Loader v-if="isLoadingUsers" type="content_loader" size="lg"/>
    <div v-else :class="$style.container">
      <table>
        <thead>
          <tr>
            <th>Број корисника</th>
            <th>Име</th>
            <th>Презиме</th>
            <th>Имејл</th>
            <th>Улога</th>
            <th>Креирано</th>
            <th>Ажурирано</th>
            <th>Измени</th>
            <th>Избриши</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ RoleNamesCyrillic[user.role as RoleEnum] }}</td>
            <td>{{ formatDate(new Date(user.createdAt)) }}</td>
            <td>{{ formatDate(new Date(user.updatedAt)) }}</td>
            <td>
              <Modal v-if="auth.id != user.id" :ref="el => setModalRefs(user.id, el)" title="Измени корисника">
                <template #open>
                  <CTA title="Измени" size="sm" @click="() => { openEditModal(user.id), openModalRefs(user.id) }"/>
                </template>
                <FormLayout :handle-submit="() => { updateUser(user.id), closeModalRefs(user.id) }">
                  <template #inputs>
                    <label>Улога:</label>
                    <select v-model="updateUserRef.role">
                      <option :value="user.role" disabled selected>{{ RoleNamesCyrillic[user.role as RoleEnum] }}</option>
                      <option v-for="(role, index) in RoleNamesCyrillic" :key="index" :value="index">
                        {{ role }}
                      </option>
                    </select>
                    <label>Име:</label>
                    <input v-model="updateUserRef.first_name" type="text" placeholder="Унеси име..."/>
                    <label>Презиме:</label>
                    <input v-model="updateUserRef.last_name" type="text" placeholder="Унеси презиме..."/>
                    <label>Имејл:</label>
                    <input v-model="updateUserRef.email" type="text" placeholder="Унеси имејл..."/>
                  </template>
                  <template #buttons>
                    <CTA title="Измени" color="green" size="sm" type="submit"/>
                  </template>
                </FormLayout>
              </Modal>
            </td>
            <td>
              <CTA
                v-if="auth.id != user.id"
                title="Избриши"
                size="sm"
                color="red"
                @click="deleteUser(user.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageLayout>
</template>