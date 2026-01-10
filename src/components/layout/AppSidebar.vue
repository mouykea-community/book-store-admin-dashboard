<template>
    <div>
        <aside class="sidebar"  :class="{ 'sidebar closed': !isExpanded, 'sidebar': isExpanded }">
            <div class="p-3 pt-5">
                <h6 class="text-uppercase text-secondary mb-3">Admin</h6>

                <ul class="nav nav-pills flex-column gap-1">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" to="/"> <i class="bi bi-speedometer me-2"></i>Dashboard
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/category"> 🗂️Categories
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/book">📘Books
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/user"> 👥Customer
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/order">🛒 Orders
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/setting"> ⚙️ Setting
                        </RouterLink>
                    </li>

                    <!-- Logout -->
                    <li class="nav-item mt-3">
                        <a class="nav-link text-danger" href="#" > 🚪Logout</a>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
</template>
<script setup>
    defineProps({
        isExpanded: {
            type: Boolean,
            default: true
        }
    });
</script>
<style scoped >
        .sidebar {
            position: fixed;
            top: 56px;
            left: 0;
            width: 250px;
            height: calc(100vh - 56px);
            background-color: #212529;
            transition: transform 0.3s ease;
            overflow-y: auto;
        }
    
        .sidebar.closed {
            transform: translateX(-250px);
        }
    
        .nav-link {
            color: #adb5bd;
        }
    
        .nav-link.active,
        .nav-link:hover {
            color: #fff;
            background-color: #343a40;
        }
</style>