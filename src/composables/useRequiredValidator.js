import { reactive } from "vue";

export function useRequiredValidator() {

    const errors = reactive({});

    const validatedField = (field, value, message) => {
        errors[field] = value ? "" : message;
        return !errors[field];
    };

    return { errors, validatedField };
}