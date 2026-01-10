<template>
    <!-- Modern App Navbar -->
    <nav class="navbar navbar-dark bg-dark px-4 py-2 fixed-top m-0">
        <div class="container-fluid">

            <!-- LEFT -->
            <div class="d-flex align-items-center gap-3">

                <!-- Sidebar Toggle -->
                <button class="btn btn-outline-light me-3" @click="$emit('btnToggle')">
                    <i class="bi bi-list"></i>
                </button>

                <!-- Logo -->
                <div class="d-flex align-items-center gap-2">
                    <div class="bg-primary text-white rounded d-flex align-items-center justify-content-center"
                        style="width:36px;height:36px">
                        <i class="bi bi-grid fs-5"></i>
                    </div>

                    <span class="fw-semibold fs-5 text-white">
                        Book Store
                    </span>
                </div>

            </div>

            <!-- RIGHT -->
            <div class="d-flex align-items-center gap-3">

                <!-- User Info -->
                <div class="text-end d-none d-md-block">
                    <div class="fw-semibold text-white">
                        {{ authStore.profile?.first_name }} {{ authStore.profile?.last_name }}
                    </div>
                    <small class="text-white">{{ authStore.profile?.email }}</small>
                </div>

                <!-- Avatar Dropdown -->
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-decoration-none" data-bs-toggle="dropdown">
                        <img :src="authStore.profile?.profile_image" class="rounded-circle border object-fit-cover" width="40"
                            height="40" />
                    </a>

                    <ul class="dropdown-menu dropdown-menu-end shadow-sm mt-2">
                        <li>
                            <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                                <i class="bi bi-person"></i> Profile
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item d-flex align-items-center gap-2" href="#">
                                <i class="bi bi-gear"></i> Settings
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item text-danger d-flex align-items-center gap-2" href="#">
                                <i class="bi bi-box-arrow-right"></i> Logout
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    </nav>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
const authStore = useAuthStore();
onMounted(async () => {
    await authStore.fetchProfile();
})
</script>
