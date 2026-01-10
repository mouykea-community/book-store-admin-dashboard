<template>
    <div class="card border rounded h-100 position-relative">
        <router-link to="" class="text-decoration-none text-dark h-100 d-flex flex-column">
            <img src="https://dpcpa.com/app/uploads/2015/01/thumbnail-default.jpg" alt="Thumbnail" class="card-img-top object-fit-cover" style="height: 180px;" />
            <div class="card-body d-flex flex-column p-3">
                <h5 class="card-title fw-bold text-truncate line-clamp-2">
                    {{ title }}
                </h5>
                <p class="card-text text-muted text-justify mb-3 text-truncate line-clamp-2">
                    {{ description }}
                </p>
                <div class="mt-auto d-flex justify-content-between align-items-center gap-2">
                    <p>In stock : {{ stock }}</p>
                    <p class="d-block p-2 fw-bold rounded-2  text-success bg-secondary-subtle"> price :{{ price }}$</p>
                </div>
            </div>
        </router-link>
        <div class="p-1 bg-success text-light rounded-2 position-absolute" style="top: 5px; right: 5px; font-size: 12px;">
            {{ category }} category
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    // thumbnail: String,
    title: String,
    description: String,
    price: String,
    stock : String ,
    category: String
});
</script>