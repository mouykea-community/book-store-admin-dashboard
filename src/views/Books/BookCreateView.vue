<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 mt-4">
                <h1>📘 Book Create</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12 mt-4">
                <BookForm ref="bookFormRef"></BookForm>
            </div>
            <div class="col-12 mt-4 d-flex justify-content-between align-content-between">
                <router-link to="/book">
                    <BaseButton variant="secondary" type-btn="outline">
                        <i class="bi bi-arrow-left"></i> Back to books
                    </BaseButton>
                </router-link>
                <BaseButton @click="handleCreateBook" :isLoading="isLoading" :disabled="isLoading">
                    <i class="bi bi-send-fill"></i> Publish book
                </BaseButton>
            </div>
        </div>
    </div>
</template>
<script setup>
import BaseButton from '@/components/ui/base/BaseButton.vue';
import BookForm from '@/form/BookForm.vue';
import { useBookStore } from '@/stores/book';
const bookStore = useBookStore();
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const bookFormRef = ref(null);
const isLoading = ref(false);
const router = useRouter();
const handleCreateBook = async () => {
    const formRef = bookFormRef.value;
    const book = formRef.formData.value;

    // console.log("Category:", book?.categoryId);
    // console.log("Thumbnail file:", book.thumbnail);
    // console.log("Thumbnail name:", book.thumbnail?.name);

    if (!formRef.validateForm()) {
        return;
    }

    try {
        isLoading.value = true;

        const formData = new FormData();
        formData.append('title', book.title);
        formData.append('category_id', book.categoryId);
        formData.append('price', book.price);
        formData.append('stock', book.stock);
        formData.append('status', 1);
        formData.append('description', book.content);

        // ⬇️ VERY IMPORTANT: send the actual file
        if (book.thumbnail) {
            formData.append('image_url', book?.value.thumbnail); // 'image' = field name in backend
        }

        await bookStore.fetchCreateBook(formData);
    } catch (err) {
        console.log(err);
    } finally {
        isLoading.value = false;
        router.push('/book');
    }
};

</script>