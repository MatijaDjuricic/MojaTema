import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
export const useTopicSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '' as string;
    const setSearch = useCallback((search: string) => {
        setSearchParams((params) => {
            if (search) params.set('search', search);
            else params.delete('search');
            return params;
        })
    }, [setSearchParams]);
    const clearSearch = useCallback(() => {
        setSearchParams((params) => {
            params.delete('search');
            return params;
        })
    }, [setSearchParams]);
    return { search, setSearch, clearSearch };
}