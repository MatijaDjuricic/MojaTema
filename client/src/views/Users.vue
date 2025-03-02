<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import { useToastMessage } from '../composables/useToastMessage';
import { formatDate } from '../utils';
import { RoleEnum } from '../utils/enums';
import { RoleNamesCyrillic } from '../utils/constants';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
import CTA from '../components/CTA.vue';
const userStore = useUserStore();
const { successMessage } = useToastMessage();
onMounted(async () => {
  await userStore.getUsers();
});
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
              <CTA
                title="Избриши"
                size="sm"
                color="red"
                @click="() => {
                  userStore.deleteUser(user.id)
                  .finally(() => {
                  successMessage(`Успешно си обрисао корисника`);
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