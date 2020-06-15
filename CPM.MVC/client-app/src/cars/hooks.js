import { useState } from 'react';

export const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle
    }
};

export const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        e.preventDefault();
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    };
};