<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTopicQuery } from '../services/topic/useTopicQuery';
import PageLayout from '../layouts/PageLayout.vue';
import TopicsHeader from '../components/TopicsHeader.vue';
import TopicAccordion from '../components/TopicAccordion.vue';
import Loader from '../components/Loader.vue';
const router = useRouter();
const route = useRoute();
const { topics, isLoadingTopics, searchValue } = useTopicQuery();
const search = ref<string>(route.query.search as string || '');
const setSearch = (value: string) => search.value = value;
const clearSearch = () => {
  searchValue.value = '';
  router.push({ query: {} });
};
const searchTopics = () => searchValue.value = search.value;
watch(search, (newSearchValue) => router.push({ query: { search: newSearchValue } }));
onMounted(() => searchTopics());
</script>
<style src="./Topics.module.css" module/>
<template>
  <PageLayout>
    <TopicsHeader
      :search="searchValue"
      :searchTopics="searchTopics"
      @update:search="setSearch"
      @clear="clearSearch"
    />
    <Loader v-if="isLoadingTopics" type="content_loader"/>
    <div v-else :class="$style.topics_wrapper">
      <TopicAccordion v-for="(topic, index) in topics" :key="index" :topic="topic"/>
    </div>
    <p v-if="!isLoadingTopics && topics?.length === 0" :class="$style.no_search_results">
      Нема резултата претраге <span>"{{ searchValue }}"</span>
    </p>
  </PageLayout>
</template>