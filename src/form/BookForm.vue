<template>
    <form class="grid gap-3 content-start">
        <div class="d-flex gap-3">
            <BaseInput class="w-50" label="Title *" v-model="formData.title" :error="errors.title"
                @blur="validatedField('title', formData.title, 'Title is required')" />
            <div class="w-50">
                <label class=" form-label">Category *</label>
                <select class="form-select" v-model="formData.categoryId" :class="{ 'is-invalid': errors.categoryId }"
                    @change="validatedField('categoryId', formData.categoryId, 'Category is required')">
                    <option value="" disabled>Select category</option>
                    <option v-for="category in categoryStore.categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
                <div v-if="errors.categoryId" class="invalid-feedback d-block">
                    {{ errors.categoryId }}
                </div>
            </div>
        </div>
        <div class="d-flex gap-3 mt-4">
            <BaseInput class="w-50" label="Stock *" v-model="formData.stock" :error="errors.stock"
                @blur="validatedField('stock', formData.stock, 'Stock is required')" />
                <BaseInput class="w-50" label="Price *" v-model="formData.price" :error="errors.price"
                    @blur="validatedField('price', formData.price, 'Price is required')" />
        </div>
        <div>
            <label class="form-label mt-3">Thumbnail</label>
            <div v-if="thumbnailPreview || existingThumbnail" class="mb-2">
                <img :src="thumbnailPreview || existingThumbnail" alt="Thumbnail Preview"
                    style="max-width: 200px; border-radius: 4px;" />
            </div>
            <input type="file" class="form-control" @change="onThumbnailChange" />
        </div>

        <div>
            <label class="form-label mt-3">Content *</label>
            <textarea v-model="formData.content" class="form-control" rows="8" placeholder="Write content here..."
                :class="{ 'is-invalid': errors.content }"
                @blur="validatedField('content', formData.content, 'Content is required')"></textarea>
            <div v-if="errors.content" class="invalid-feedback d-block">
                {{ errors.content }}
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { useRequiredValidator } from '@/composables/useRequiredValidator'
import BaseInput from '@/components/ui/base/BaseInput.vue'
const categoryStore = useCategoryStore()
const { errors, validatedField } = useRequiredValidator();

const formData = ref({
    title: '',
    categoryId: '',
    thumbnail: '',
    content: '',
    stock: "",
    price: "",
})

const existingThumbnail = ref('')

onMounted(async () => {
    await categoryStore.fetchAllCategories();
})

const thumbnailPreview = ref('')

const onThumbnailChange = (event) => {
    const file = event.target.files?.[0] || null
    formData.value.thumbnail = file

    if (file) {
        thumbnailPreview.value = URL.createObjectURL(file)
    } else {
        thumbnailPreview.value = ''
    }
}

const validateForm = () => {
    const v1 = validatedField('title', formData.value.title, 'Title is required')
    const v2 = validatedField('categoryId', formData.value.categoryId, 'Category is required')
    const v3 = validatedField('content', formData.value.content, 'Content is required')
    const v4 = validatedField('stock', formData.value.stock, 'Stock is required')
    const v5 = validatedField('price', formData.value.price, 'Price is required')
    return v1 && v2 && v3 && v4 && v5
}

const resetForm = () => {
    formData.value.title = ''
    formData.value.categoryId = ''
    formData.value.thumbnail = null
    formData.value.content = ''
    formData.value.stock = ''
    formData.value.price = ''
    existingThumbnail.value = ''
}
// Expose methods and data to parent components supporting refs not reactive
defineExpose({ formData, validateForm, resetForm, existingThumbnail })
</script>
