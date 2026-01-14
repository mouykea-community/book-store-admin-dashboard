import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/api";

export const useAuthStore = defineStore("auth", () => {
    const PROFILE_CACHE_KEY = "profile_cache";
    const token = ref(localStorage.getItem("token"));
    const loadCachedProfile = () => {
        const raw = localStorage.getItem(PROFILE_CACHE_KEY);
        if (!raw) {
            return null;
        }
        try {
            return JSON.parse(raw);
        } catch (err) {
            return null;
        }
    };
    const profile = ref(loadCachedProfile());
    const setProfile = (data) => {
        profile.value = data ?? null;
        if (data) {
            localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(data));
        } else {
            localStorage.removeItem(PROFILE_CACHE_KEY);
        }
    };
    const login = async (payload) => {
        const res = await api.post("/auth/admin/login", payload);
        token.value = res.data.data.access_token;
        localStorage.setItem("token", token.value);
        await fetchProfile();
    };
    const fetchProfile = async () => {
        const res = await api.get('/admin/profile', {
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
            params: {
                ts: Date.now(),
            },
        });
        setProfile(res.data.data);
        console.log("profile", res.data.data);
    }
    return {
        token,
        profile,
        login,
        fetchProfile
    };
});
