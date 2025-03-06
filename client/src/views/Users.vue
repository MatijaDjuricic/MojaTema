<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';
import { useModal } from '../composables/useModal';
import { useToastMessage } from '../composables/useToastMessage';
import { formatDate } from '../utils';
import { RoleEnum } from '../utils/enums';
import { RoleNamesCyrillic } from '../utils/constants';
import CTA from '../components/CTA.vue';
import Modal from '../components/Modal.vue';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import FormLayout from '../layouts/FormLayout.vue';
const { setModalRefs, openModalRefs } = useModal();
const { successMessage } = useToastMessage();
const auth = useAuthStore().currentUser;
const userStore = useUserStore();
const handleDelete = async (id: number) => {
  await userStore.deleteUser(id).finally(() => {
    successMessage(`Успешно си обрисао корисника`);
  });
}
const handleEdit = async (id: number) => {
  const user = userStore.users.find(u => u.id === id);
  if (user) {
    await userStore.updateUser(id, {
      "first_name": user.firstName,
      "last_name": user.lastName,
      "email": user.email,
      "role": user.role,
    }).finally(() => {
      successMessage(`Успешно си изменио корисника`);
    });
  }
}
onMounted(async () => await userStore.getUsers());
</script>
<style src="./Users.module.css" module/>
<template>
  <PageLayout>
    <HeaderLayout>
      <h1>Корисници</h1>
    </HeaderLayout>
    <div :class="$style.container">
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
          <tr v-for="user in userStore.users" :key="user.id">
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
                  <CTA
                    title="Измени"
                    size="sm"
                    @click="openModalRefs(user.id)"
                  />
                </template>
                <FormLayout :handle-submit="() => handleEdit(user.id)">
                  <template #inputs>
                    <label>Улога:</label>
                    <select v-model="user.role">
                      <option :value="user.role" disabled selected>{{ RoleNamesCyrillic[user.role as RoleEnum] }}</option>
                      <option v-for="(role, index) in RoleNamesCyrillic" :key="index" :value="index">
                        {{ role }}
                      </option>
                    </select>
                    <label>Име:</label>
                    <input v-model="user.firstName" type="text" placeholder="Унеси име..."/>
                    <label>Презиме:</label>
                    <input v-model="user.lastName" type="text" placeholder="Унеси презиме..."/>
                    <label>Имејл:</label>
                    <input v-model="user.email" type="text" placeholder="Унеси имејл..."/>
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
                @click="() => handleDelete(user.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageLayout>
</template>