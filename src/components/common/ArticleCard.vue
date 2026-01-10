<template>
    <div class="card border rounded h-100">
        <router-link to="" class="text-decoration-none text-dark h-100 d-flex flex-column">
            <img :src="thumbnail" alt="Thumbnail" class="card-img-top object-fit-cover"
                style="height: 180px;" />
            <div class="card-body d-flex flex-column p-3">
                <h5 class="card-title fw-bold text-truncate line-clamp-2">
                    {{ title }}
                </h5>
                <p class="card-text text-muted text-justify mb-3 text-truncate line-clamp-2">
                    {{ content }}
                </p>
                <div class="mt-auto d-flex align-items-center gap-2">
                    <img :src="avatar" alt="Avatar" class="rounded-circle" width="24" height="24" />
                    <span class="small text-secondary fw-medium text-truncate line-clamp-2">
                        {{ author }}
                    </span>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script setup>
const props = defineProps({
    thumbnail: String,
    title: String,
    content: String,
    avatar: String,
    author: String
});
</script>