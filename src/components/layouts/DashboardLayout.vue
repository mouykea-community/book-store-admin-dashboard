<template>
    <div class="admin-layout">
        <AppNavbar @btnToggle="btnToggleSidebar"/>
        <AppSidebar :is-expanded="isSidebarExpanded" />
        <!-- Main Content -->
        <main class="content mt-5" :class="{ 'content expanded': !isSidebarExpanded , 'content': isSidebarExpanded }">
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
import AppNavbar from '../layout/AppNavbar.vue';
import AppSidebar from '../layout/AppSidebar.vue';
const isSidebarExpanded = ref(true);
const btnToggleSidebar = () => {
    isSidebarExpanded.value = !isSidebarExpanded.value;
};
</script>


<style scoped>
.admin-layout {
    min-height: 100vh;
}

.content {
    margin-left: 250px;
    padding: 1.5rem;
    transition: margin-left 0.3s ease;
}

.content.expanded {
    margin-left: 0;
}
</style>
