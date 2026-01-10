
<template>
    <div>
        <div class="container-fluid">
            <div class="row mt-4">
                <div class="col-12 d-flex align-items-baseline justify-content-between">
                    <h1>
                        🗂 Category Page
                    </h1>
                    <div >
                        <BaseButton class="py-2" @click="openCreateModel">
                            <i class="bi bi-plus-lg"></i>
                            Create Category
                        </BaseButton>
                    </div>
                </div>
            </div>
            <!-- <div class="row row-gap-4 align-items-center m-0 mt-4 rounded-3" style="padding-block: 30px; background-color:aliceblue;"> -->
            <div class="row row-gap-4 align-items-center mt-4" >
                <div class="col-12 col-sm-6 col-lg-8 ">
                    <div class="input-group">
                        <span class="input-group-text bg-white">
                            <i class="bi bi-search"></i>
                        </span>
                        <input type="text" class="form-control" placeholder="Search by name , description.." />
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-end">
                    <select class="form-select" v-model="categoryStore.status"
                        @change="categoryStore.fetchAllCategories">
                        <option value="">All Statuses</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                    </select>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <BaseTable :columns="columns" :items="categoryStore.categories" :isLoading="isLoading"
                    @edit="openEditModal"
                    @delete="openDeleteModal">
                    <template #columns-name="{item}">
                        <h5>{{ item.name }}</h5>
                    </template>
                    <template #columns-description="{item}">
                        <h5>{{ item.description }}</h5>
                    </template>
                    <template #columns-status="{item}">
                        <h5>{{ item.status }}</h5>
                    </template>
                    </BaseTable>
                </div>
            </div>
        </div>
        <!-- Create  -->
        <BaseModal title="🗂 Category Create" v-if="isShow">
            <template #body>
                <div class="mb-3">
                    <BaseInput id="title" label="Title *" v-model="form.title" :error="errors.title"
                        @input="validatedTitle" @blur="validatedTitle" />
                </div>
    
                <div class="mb-3">
                    <BaseInput id="description" label="Description *" v-model="form.description"
                        :error="errors.description" @input="validatedDesc" @blur="validatedDesc" />
                </div>
            </template>
            <template #footer>
                <BaseButton variant="secondary" @click="isShow = false">
                    Cancel
                </BaseButton>
                <BaseButton :isLoading="isLoading" :disabled="isLoading"
                @click="handleCreateCategory">
                    Create
                </BaseButton>
            </template>
        </BaseModal>
        <!-- Update -->
        <BaseModal title="🗂 Category Update" v-if="isShowEdit">
            <template #body>
                <div class="mt-3">
                    <BaseInput id="title" label="Title *" v-model="form.title" :error="errors.title"
                        @input="validatedTitle" @blur="validatedTitle" />
                </div>
                <div>
                    <label class="form-label mt-3">Status *</label>
                    <select class="form-select" v-model="form.status">
                        <option value="" disabled>Select Status</option>
                        <option value="active">
                            Active
                        </option>
                        <option value="inactive">
                            Inactive
                        </option>
                    </select>
                </div>
                <div class="mt-3">
                    <BaseInput id="description" label="Description *" v-model="form.description"
                        :error="errors.description" @input="validatedDesc" @blur="validatedDesc" />
                </div>
            </template>
            <template #footer>
                <BaseButton variant="secondary" @click="isShowEdit = false">
                    Cancel
                </BaseButton>
                <BaseButton :isLoading="isLoading" :disabled="isLoading"
                @click="handleUpdateCategory">
                    Update
                </BaseButton>
            </template>
        </BaseModal>
        <!-- Delete -->
        <BaseModal title="🗂 Category Delete" v-if="isShowDelete">
            <template #body>
                <p>Are you sure to delete this category?</p>
            </template>
            <template #footer>
                <BaseButton variant="secondary" @click="isShowDelete = false">
                    Cancel
                </BaseButton>
                <BaseButton variant="danger" :isLoading="isLoading" :disabled="isLoading"
                @click="handleDeleteCategory">
                    Delete
                </BaseButton>
            </template>
        </BaseModal>
    </div>
</template>
<script setup>
import BaseButton from '@/components/ui/base/BaseButton.vue';
import BaseInput from '@/components/ui/base/BaseInput.vue';
import BaseTable from '@/components/ui/base/BaseTable.vue';
import { useCategoryStore } from '@/stores/category';
import { useRequiredValidator } from '@/composables/useRequiredValidator';
const { errors, validatedField } = useRequiredValidator();
const categoryStore = useCategoryStore();
import { onMounted, ref, watch } from 'vue';
const isShow = ref(false);
const isShowEdit = ref(false);
const isLoading = ref(false);
const isShowDelete = ref(false);
const uuid = ref();
const form = ref({
    title: "",
    description: "",
    status : ""
});
const columns = ref([
    { key: 'name', label: 'Name' },
    { key: 'description' , label : "Description"},
    { key: 'status', label: 'Status' },
]);
const validatedTitle = () => validatedField("title", form.value.title, "Title is required");
const validatedDesc = () =>  validatedField("description", form.value.description, "Description is required");
const formValidated = () => {
    let isValid = true;
    if (!validatedTitle() || !validatedDesc()) {
        isValid = false;
    }
    return isValid;
}
const resetForm = () => {
    form.value.title = '';
    form.value.description = '';
}
onMounted(async () => {
    try {
        isLoading.value = true;
        await categoryStore.fetchAllCategories();
    } catch (err) {
        console.log(err)
    } finally {
        isLoading.value = false;
    }
})
const openCreateModel = () => {
    resetForm();
    isShow.value = true;
}
const handleCreateCategory = async () => {
    if (!formValidated()) {
        return;
    }
    try {
        isLoading.value = true;
        console.log("data", form.value.title , form.value.description)
        await categoryStore.createCategory({
            name: form.value.title,
            description : form.value.description
        });
    } catch(err) {
        console.log(err)
    } finally {
        isLoading.value = false;
        resetForm();
        categoryStore.fetchAllCategories();
        isShow.value = false;
    }
}

const openEditModal =async (id) => {
    isShowEdit.value = true;
    uuid.value = id;
    await categoryStore.fetchCategoryByID(uuid.value);
    console.log("uuid ", uuid.value);
    await categoryStore.category;
    form.value.title = categoryStore.category?.name;
    form.value.description = categoryStore.category?.description;
    form.value.status = categoryStore.category?.status;
}
const handleUpdateCategory = async () => {
    if (!formValidated()) {
        return;
    }
    try {
        isLoading.value = true;
        await categoryStore.updateCategory(uuid.value, {
            name: form.value.title,
            description: form.value.description,
            status: form.value.status === "active" ? 1 : 2
        });
    } catch (err) {
        console.log(err);
    } finally {
        await categoryStore.fetchAllCategories();
        isLoading.value = false;
        isShowEdit.value = false;
    }
}
const openDeleteModal = (id) => {
    isShowDelete.value = true;
    uuid.value = id;
}
const handleDeleteCategory = async () => {
    try {
        isLoading.value = true;
        await categoryStore.deleteCategory(uuid.value);
    } catch (err) {
        console.log(err);
    } finally {
        isLoading.value = false;
        await categoryStore.fetchAllCategories();
        isShowDelete.value = false;
    }
}
watch(categoryStore.status, () => {
    categoryStore.fetchAllCategories();
});
</script>