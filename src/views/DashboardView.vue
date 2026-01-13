
<template>
    <div >
        <div class="container-fluid">
            <div class="row row-gap-4 mt-4">
                <div class="col-12 d-flex justify-content-between">
                    <div>
                        <h1>Dashboard Overview</h1>
                        <p> Welcome back! Here's what's happening today.</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <button type="button" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Create New Book</button>
                    </div>
                </div>
                <div class="col-4" v-for="data in listData" :key="data">
                    <BaseCard :linkTo="data.link" :title="data.title" :value="data.value" :icon="data.icon" :bg-color="data.bgColor" >
                        <template #image>
                            <h1>
                                {{ data.image }}
                            </h1>
                        </template>
                    </BaseCard>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import BaseCard from '@/components/ui/base/BaseCard.vue';
import { computed, onMounted, ref } from 'vue';
import { useBookStore } from '@/stores/book';
import { useCategoryStore } from '@/stores/category';
import BaseModal from '@/components/ui/base/BaseModal.vue';
const bookStore = useBookStore();
const categoryStore = useCategoryStore();
onMounted(async () => {
    await bookStore.fetchAllBookNoParam();
    await categoryStore.fetchAllCategoryNoParam();
    console.log("category ", categoryStore.categories);
});
const listData = ref(
    [
        {
            id: 1,
            link: '/book',
            title: "Total Books",
            value: bookStore?.booksNoParam?.length,
            image: "📘",
            bgColor: 'oklch(71.8% 0.202 349.761)'
        },
        {
            id: 2,
            link: '/category',
            title: "Categories",
            value: categoryStore?.categoriesNoParam?.length,
            image : '🗂' ,
            bgColor: 'oklch(70.7% 0.165 254.624)'
        },
        {
            id: 3,
            link: '/user',
            title: "Customer",
            value: 34,
            image : '👤',
            bgColor: 'oklch(76.5% 0.177 163.223)'
        },
        {
            id: 4,
            link: '/order',
            title: "Sold Books",
            value: 560,
            image : '🧾',
            bgColor: 'oklch(62.7% 0.265 303.9)'
        },
    ]
)
</script>
