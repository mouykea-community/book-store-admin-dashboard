<template>
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
        <div class="col-12 col-sm-10 col-md-6 col-lg-4">
            <div class="card shadow border-0">
                <div class="card-body p-4">

                    <!-- Title -->
                    <h4 class="text-center mb-4 fw-bold">Login</h4>

                    <!-- Email -->
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" v-model="state.form.email" class="form-control" placeholder="Enter your email" />
                    </div>

                    <!-- Password -->
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" v-model="state.form.password" class="form-control" placeholder="Enter your password" />
                    </div>

                    <!-- Remember + Forgot -->
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="remember" />
                            <label class="form-check-label" for="remember">
                                Remember me
                            </label>
                        </div>
                        <a href="#" class="text-decoration-none small">
                            Forgot password?
                        </a>
                    </div>

                    <!-- Button -->
                    <div class="d-grid">
                        <BaseButton  typeBtn="submit" :isLoading="isLoading"
                            @click="handleLogin">
                            Login
                        </BaseButton>
                    </div>

                    <!-- Register -->
                    <p class="text-center mt-3 mb-0 small">
                        Don’t have an account?
                        <a href="#" class="text-decoration-none fw-semibold">
                            Register
                        </a>
                    </p>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import BaseButton from '@/components/ui/base/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const route = useRouter();
const authStore = useAuthStore();
const isLoading = ref(false);
const state = reactive(
    {
        form: {
            email: '',
            password: ''
        }
    });
const handleLogin = async () => {
    isLoading.value = true;
    try {
        await authStore.login(
            {
                email: state.form.email,
                password: state.form.password
            }
        );
        console.log(state.form.email, state.form.password);
        console.log("token",authStore.token);
        route.push('/');
    } catch (error) {
        console.error('Login failed:', error);
    }finally
    {
        isLoading.value = false;
    }
}
</script>