<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTopicStore } from '../stores/topic';
import PageLayout from '../layouts/PageLayout.vue';
import TopicsHeader from '../components/TopicsHeader.vue';
import TopicAccordion from '../components/TopicAccordion.vue';
import Loader from '../components/Loader.vue';
const topicStore = useTopicStore();
const router = useRouter();
const route = useRoute();
const searchValue = ref<string>(route.query.search as string || '');
const loading = ref<boolean>(false);
const setSearch = (value: string) => searchValue.value = value;
const clearSearch = () => {
  searchValue.value = '';
  router.push({ query: {} });
};
const searchTopics = async () => {
  loading.value = true;
  await topicStore.getTopics(searchValue.value).finally(() => loading.value = false);
}
watch(searchValue, (newSearchValue) => router.push({ query: { search: newSearchValue } }));
onMounted(async () => await searchTopics());
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
    <Loader v-if="loading" type="content_loader"/>
    <div v-else :class="$style.topics_wrapper">
      <TopicAccordion v-for="(topic, index) in topicStore.topics" :key="index" :topic="topic"/>
    </div>
    <p v-if="loading == false && topicStore.topics.length == 0" :class="$style.no_search_results">
      Нема резултата претраге <span>"{{ searchValue }}"</span>
    </p>
  </PageLayout>
</template>