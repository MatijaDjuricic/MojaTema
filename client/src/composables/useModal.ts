import { ref } from 'vue';
import type Modal from '../components/Modal.vue'; 
export const useModal = () => {
    const modalRef = ref<InstanceType<typeof Modal> | null>(null);
    const openModal = () => modalRef.value?.openModal();
    return { modalRef, openModal };
}