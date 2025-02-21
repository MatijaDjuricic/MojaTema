import { ref, onMounted, type Ref } from 'vue';
import { useLocalStorage } from './useLocalStorage';
import { themes } from '../utils/constants';
interface IUseTheme {
    theme: Ref<string>,
    toggleTheme: () => void
}
export const useTheme = (): IUseTheme => {
    const { get } = useLocalStorage();
    const theme = ref<string>(themes.light);
    onMounted(() => {
        const savedTheme: string | null = get('theme');
        if (savedTheme) {
            theme.value = savedTheme;
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            theme.value = themes.light;
            document.documentElement.setAttribute('data-theme', themes.light);
        }
    });
    const toggleTheme = () => {
        const newTheme: string = theme.value === themes.light ? themes.dark : themes.light;
        theme.value = newTheme;
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
    return {
        theme,
        toggleTheme
    };
};