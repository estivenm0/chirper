<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { useForm, Head, router, usePage } from '@inertiajs/vue3';
import Chirp from '@/Components/Chirps/Chirp.vue';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';
import { ref } from 'vue';



const form = useForm({
    message: '',
});


defineProps<{
    chirps: App.Models.Chirp[]
}>
();

const chirpss = ref(usePage().props.chirps);

onMounted(() => {
    Echo.join(`chirps`)
            .here((users) => {
                // console.log(users);
            })
            .joining((user) => {
                // console.log(user);
            })
            .leaving((user) => {
                // console.log(user);
            })
            .listen('ChirpCreated', (event) => {
                chirpss.value = [event.chirp, ...chirpss.value];
            });
})

onUnmounted(() => {
    Echo.leave(`chirps`);
})

</script>
 
<template>
    <Head title="Chirps" />
 
    <AuthenticatedLayout>
        <div class="max-w-2xl p-4 mx-auto sm:p-6 lg:p-8">
            <form @submit.prevent="form.post(route('chirps.store'), { onSuccess: () => {form.reset()} })">
                <textarea
                    v-model="form.message"
                    placeholder="What's on your mind?"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
                <InputError :message="form.errors.message" class="mt-2" />
                <PrimaryButton class="mt-4">Chirp</PrimaryButton>
            </form>
            <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                

                <div id="toast-success" v-if="form.recentlySuccessful"
        class="absolute flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 top-2 right-2"
        role="alert">
        <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="sr-only">Check icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">chirp Created successfully.</div>
    </div>




                    <!-- <p  class="text-sm text-gray-600">Saved.</p> -->
                </Transition>
            <div class="mt-6 bg-white divide-y rounded-lg shadow-sm">
                <Chirp
                    v-for="chirp in chirpss"
                    :key="chirp.id"
                    :chirp="chirp"
                />
            </div>
        </div>
    </AuthenticatedLayout>
</template>