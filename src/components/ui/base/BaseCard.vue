<!-- src/components/BaseCard.vue -->
<template>
    <div>
        <router-link :to="linkTo" class="text-decoration-none text-dark h-100 d-flex flex-column">
            <div class="card shadow-sm border-0 h-100 base-card p-4" :style="`background-color : ${bgColor}`">
                <div class="card-body d-flex align-items-center justify-content-between">
                    <!-- Content -->
                    <div>
                        <h6 class="text-light mb-1">{{ title }}</h6>
                        <h3 class="fw-bold mb-0" :class="`text-${color}-emphasis`">{{ value }}</h3>
                    </div>
                    <div>
                        <slot name="image">

                        </slot>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    value: [String, Number],
    icon: String,
    iconBg: {
        type: String,
        default: "bg-primary",
    },
    color: {
        type: String,
        default : "primary"
    },
    bgColor: {
        type: String,
        default : 'light'
    },
    linkTo : String
});
</script>

<style scoped>
.base-card {
    transition: transform 0.2s ease;
}

.base-card:hover {
    transform: translateY(-5px);
}

.icon-box {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}

.icon-box svg {
    width: 22px;
    height: 22px;
}
</style>
