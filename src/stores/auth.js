import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/api";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(localStorage.getItem("token"));
    const profile = ref();
    const login = async (payload) => {
        const res = await api.post("/auth/admin/login", payload);
        token.value = res.data.data.access_token;
        localStorage.setItem("token", token.value);
        await fetchProfile();
    };
    const fetchProfile = async () => {
        const res = await api.get('/admin/profile');
        profile.value =  res.data.data;
        console.log("profile", res.data.data);
    }
    return {
        token,
        profile,
        login,
        fetchProfile
    };
});
