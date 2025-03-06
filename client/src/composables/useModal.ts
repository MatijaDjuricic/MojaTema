import { ref } from 'vue';
import type { Ref, ComponentPublicInstance } from 'vue';
interface IUseModal {
    modalRef: Ref<ModalInstance | null>,
    openModal: () => void,
    closeModal: () => void,
    setModalRefs: (id: number, el: any) => void,
    openModalRefs: (id: number) => void,
    closeModalRefs: (id: number) => void,
};
type ModalInstance = ComponentPublicInstance<{
    openModal: () => void,
    closeModal: () => void,
}>;
export const useModal = (): IUseModal => {
    const modalRef = ref<ModalInstance | null>(null);
    const modalRefs = ref<Record<number, ModalInstance | null>>({});
    const openModal = () => modalRef.value?.openModal();
    const closeModal = () => modalRef.value?.closeModal();
    const setModalRefs = (id: number, el: ModalInstance | null) => {
        modalRefs.value[id] = el;
    };
    const openModalRefs = (id: number) => {
        const modal = modalRefs.value[id];
        if (modal) modal.openModal();
    };
    const closeModalRefs = (id: number) => {
        const modal = modalRefs.value[id];
        if (modal) modal.closeModal();
    }
    return {
        modalRef,
        openModal,
        closeModal,
        setModalRefs,
        openModalRefs,
        closeModalRefs
    };
};