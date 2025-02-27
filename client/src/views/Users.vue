<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import { formatDate } from '../utils';
import { RoleEnum } from '../utils/enums';
import { RoleNamesCyrillic } from '../utils/constants';
import PageLayout from '../layouts/PageLayout.vue';
import HeaderLayout from '../layouts/HeaderLayout.vue';
const userStore = useUserStore();
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
          </tr>
        </tbody>
      </table>
    </div>
  </PageLayout>
</template>