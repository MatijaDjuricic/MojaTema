<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { IconSearch, IconX } from '@tabler/icons-vue';
const props = defineProps<{
  search: string;
  searchTopics: () => Promise<void>;
}>();
const emit = defineEmits<{
  (e: 'update:search', value: string): void;
  (e: 'clear'): void;
}>();
const searchInput = ref<HTMLInputElement | null>(null);
const search = ref<string>(props.search);
const focusSearchInput = () => {
  searchInput.value?.focus();
};
const onClear = async () => {
  search.value = '';
  emit('clear');
  await props.searchTopics();
};
watch(search, (newSearchValue) => emit('update:search', newSearchValue));
</script>
<style src='./TopicsHeader.module.css' module/>
<template>
  <header :class="$style.topic_header">
    <div :class="$style.header_wrapper">
      <h1>Теме</h1>
      <form :class="$style.search_form" @submit.prevent="searchTopics">
        <div :class="$style.input_wrapper" @click="focusSearchInput">
          <input
            v-model="search"
            :class="$style.input"
            ref="searchInput"
            placeholder="Претражи..."
          />
          <span v-if="search" :class="$style.close_btn" @click.prevent="onClear">
            <IconX stroke="2"/>
          </span>
        </div>
        <button :class="$style.search_btn" type="submit">
          <IconSearch stroke={2} width="32" height="32"/>
        </button>
      </form>
    </div>
  </header>
</template>