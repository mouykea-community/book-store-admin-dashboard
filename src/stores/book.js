import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";
export const useBookStore = defineStore('book', () => {
    const books = ref([]);
    const fetchAllBooks = async () => {
        const res = await api.get('/products');
        books.value = res.data.data;
    }

    return { books, fetchAllBooks };
});