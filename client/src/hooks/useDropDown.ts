import { useRef, useState, useEffect, useCallback } from 'react';
export const useDropdown = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    }, [setIsOpen]);
    const toggleDropdown = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, [handleClickOutside]);
    return { isOpen, toggleDropdown, dropdownRef };
};