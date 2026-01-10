<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 mt-4">
                <h1>Book Create</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12 mt-4">
                <BookForm></BookForm>
            </div>
            <div class="col-12 mt-4 d-flex justify-content-between align-content-between">
                <router-link to="/book">
                    <BaseButton variant="secondary" type-btn="outline">
                        Back to book-list
                    </BaseButton>
                </router-link>
                <BaseButton>
                    Publish
                </BaseButton>
            </div>
        </div>
    </div>
</template>
<script setup>
import BaseButton from '@/components/ui/base/BaseButton.vue';
import BaseInput from '@/components/ui/base/BaseInput.vue';
import BookForm from '@/form/BookForm.vue';

</script>