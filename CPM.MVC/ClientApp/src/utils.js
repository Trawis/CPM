export const apiURL = "http://localhost:50280";

export function mapToSelectbox(options, label, value) {
    if (Array.isArray(options)) {
        return options.map(option => ({
            ...option,
            value: option[value],
            label: option[label]
        }))
    } else {
        return {
            ...options,
            value: options[value],
            label: options[label]
        }
    }

};

export function mapFromSelectbox(options, label, value) {
    if (Array.isArray(options)) {
        return options.map(option => ({
            ...option,
            [value]: option.value,
            [label]: option.label
        }))
    } else {
        return {
            ...options,
            value: options[value],
            label: options[label]
        }
    }
};