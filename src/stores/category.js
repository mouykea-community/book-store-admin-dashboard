import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";
export const useCategoryStore = defineStore(('category'), () => {
    const categories = ref();
    const category = ref();
    const status = ref();
    const fetchAllCategories = async () => {
        const res = await api.get('/categories', {
            params: {
                status : status.value || ''
            }
        });
        categories.value = res.data.data;
    }
    const createCategory = async (payload) => {
        const res = await api.post('/categories', payload);
        return res.data;
    }
    const fetchCategoryByID = async (id) => {
        const res = await api.get(`/categories/${id}`);
        category.value = res.data.data;
    }
    const updateCategory = async (id , payload) => {
        const res = await api.put(`/categories/${id}`, payload);
        return res.data;
    }
    const deleteCategory = async (id) => {
        const res = await api.delete(`/categories/${id}`);
        return res.data;
    }
    return {
        categories, category, status ,  fetchAllCategories, createCategory,
        fetchCategoryByID,
        updateCategory,
        deleteCategory,
     }
});