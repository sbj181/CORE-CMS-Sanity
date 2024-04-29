import React, { useState, useEffect } from 'react';
import './ProgressTracker.scss';

interface CheckboxProps {
    pageIndex: number;
    labelText?: string;  // optional labelText prop
    navLock?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ pageIndex, labelText, navLock }) => {
    const [isChecked, setIsChecked] = useState<boolean>(() => {
        const readPages = localStorage.getItem('readPages');
        const storedPages = readPages ? JSON.parse(readPages) : [];
        return storedPages.includes(pageIndex);
    });
    
    const handleCheck = () => {
        setIsChecked(prev => !prev);

        const storedPages = localStorage.getItem('readPages');
        const readPages = storedPages ? JSON.parse(storedPages) : [];

        if (readPages.includes(pageIndex)) {
            const newPages = readPages.filter((p: number) => p !== pageIndex);
            localStorage.setItem('readPages', JSON.stringify(newPages));
        } else {
            localStorage.setItem('readPages', JSON.stringify([...readPages, pageIndex]));
        }

        const event = new Event('readPageUpdated');
        window.dispatchEvent(event);

        const navButton = document.querySelector("[data-locked][rel='next']");
        navButton.setAttribute("data-locked", isChecked ? "true" : "false");
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setIsChecked(() => {
                const readPages = localStorage.getItem('readPages');
                const storedPages = readPages ? JSON.parse(readPages) : [];
                return storedPages.includes(pageIndex);
            });
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [pageIndex]);

    return (
        <div className="checkbox-container progressTrackerCheckbox" data-progress-tracker={navLock}>
            <input type="checkbox" id={`checkbox-${pageIndex}`} checked={isChecked} onChange={handleCheck} />
            <label htmlFor={`checkbox-${pageIndex}`}>
                {labelText || "Yes, I've read this content and want to continue on."}  {/* Use the labelText prop or the fallback text */}
            </label>
        </div>
    );
};

export default Checkbox;
