<template>
    <button :type="typeBtn" class="btn" :class="`btn-${variant}`" :disabled="disabled || isLoading" @click="handleClick">
        <template v-if="isLoading">
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        </template>
        <slot></slot>
    </button>
</template>
<script setup>
const props = defineProps({
    typeBtn: {
        type: String,
        default: 'button'
    },
    variant: {
        type: String,
        default: 'primary'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits(['click']);
const handleClick = () => {
    if (!props.disabled && !props.isLoading) {
        emit('click');
    }
};
</script>