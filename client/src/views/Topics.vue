<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { getTopicsAsync } from '../api/requests/topic';
import { isReportedTopicBySelf } from '../utils';
import PageLayout from '../layouts/PageLayout.vue';
import TopicsHeader from '../components/layout/TopicsHeader.vue';
import TopicAccordion from '../components/layout/TopicAccordion.vue';
import Loader from '../components/common/Loader.vue';
const router = useRouter();
const route = useRoute();
const user = useAuthStore().currentUser;
const searchValue = ref<string>(route.query.search as string || '');
const { data: topics, isLoading, refetch } = useQuery({
  queryKey: ['topics', searchValue.value],
  queryFn: () => getTopicsAsync(searchValue.value)
});
const setSearch = (value: string) => searchValue.value = value;
const clearSearch = () => {
  searchValue.value = '';
  router.push({ query: {} });
};
watch(searchValue, (newSearchValue) => router.push({ query: { search: newSearchValue } }));
</script>
<style src="./Topics.module.css" module/>
<template>
  <PageLayout>
    <TopicsHeader
      :search="searchValue"
      :searchTopics="() => refetch()"
      @update:search="setSearch"
      @clear="clearSearch"
    />
    <Loader v-if="isLoading" type="content_loader"/>
    <div v-else :class="$style.topics_wrapper">
      <TopicAccordion :userId=user.id :isRerotedBySelf="isReportedTopicBySelf(topics, user.id)"
        :topics="topics" v-for="(topic, index) in topics" :key="index" :topic="topic"/>
    </div>
    <p v-if="!isLoading && topics?.length == 0" :class="$style.no_search_results">
      Нема резултата претраге <span>"{{ searchValue }}"</span>
    </p>
  </PageLayout>
</template>