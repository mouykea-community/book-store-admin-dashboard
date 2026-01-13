import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";
export const useBookStore = defineStore('book', () => {
    const books = ref([]);
    const booksNoParam = ref([]);
    const status = ref("");
    const category_id = ref("");
    const search = ref("");
    const fetchAllBookNoParam = async () => {
        const res = await api.get('/products');
        booksNoParam.value = res.data.data ?? [];
    }
    const fetchAllBooks = async () => {
        const res = await api.get('/products', {
            params: {
                status: status.value || '',
                category_id: category_id.value || '',
                search: search.value || ''
            }
        });
        books.value = res.data.data ?? [];
    }
    const fetchCreateBook = async (payload) => {
        try {
            const res = await api.post('/products', payload, {
                headers: {
                    "Content-Type": "multipart/form-data" }
                }
            );
            return res.data.data;
        } catch(err) {
            console.log(err);
        }
    }
    return {
        status, search,
        category_id, books,
        booksNoParam,
        fetchAllBookNoParam,
        fetchAllBooks,
        fetchCreateBook,
    };
});