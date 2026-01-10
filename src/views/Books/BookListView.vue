<template>
    <div>
        <div class="container-fluid">
            <div class="row mt-4">
                <div class="col-12 d-flex justify-content-between align-items-baseline">
                    <div>
                        <h1>
                            Book Catalog
                        </h1>
                        <p>
                            Manage your library's book collection
                        </p>
                    </div>
                    <div class="">
                        <router-link to="/book/create">
                        <BaseButton>
                                <i class="bi bi-plus-lg"></i>
                                Create Book
                            </BaseButton>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="row mt-4 g-3 align-items-center">
                <!-- col-6: Search -->
                <div class="col-12 col-md-6">
                    <div class="input-group">
                        <span class="input-group-text bg-white">
                            <i class="bi bi-search"></i>
                        </span>
                        <input type="text" class="form-control" placeholder="Search by title, author, or ISBN..." />
                    </div>
                </div>

                <!-- col-3: Filter by Category -->
                <div class="col-6 col-md-3">
                    <select class="form-select">
                        <option value="">All Categories</option>
                        <option value="1">Programming</option>
                        <option value="2">Language</option>
                    </select>
                </div>

                <!-- col-3: Filter by Status -->
                <div class="col-6 col-md-3">
                    <select class="form-select">
                        <option value="">All Statuses</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                    </select>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <BaseTable :columns="columns" :items="bookStore.books" :isLoading="isLoading">
                        <template #columns-title="item">
                            {{ item.title }}
                        </template>
                        <template #columns-status="item">
                            <p class="text-bold text-danger">
                                {{ item.status }}
                            </p>
                        </template>
                    </BaseTable>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import BaseButton from '@/components/ui/base/BaseButton.vue';
import BaseTable from '@/components/ui/base/BaseTable.vue';
import { useBookStore } from '@/stores/book';
import { onMounted, ref } from 'vue';
const bookStore = useBookStore();
const isLoading = ref(false);
const columns = ref([
    { key: 'title', label: 'Title' },
    { key: 'description', label: "Description" },
    { key: 'status', label: 'Status' },
]);
onMounted(async () => {
    try {
        isLoading.value = true;
        await bookStore.fetchAllBooks();
    } catch (err) {
        console.log(err);
    } finally {
        isLoading.value = false;
    }
})
</script>