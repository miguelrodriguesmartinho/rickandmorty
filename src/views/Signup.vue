
<script setup>

import { ref } from 'vue'
import { useAuthStore } from '@/stores/Auth'

const email = ref('');
const password = ref('');
const username = ref('');

const errorMessage = ref('');
const userCreatedMessage = ref('')
const authStore = useAuthStore()

const handleSubmit = () => {
    try {
        let newUser = {
            email: email.value,
            username: username.value,
            password: password.value,
        }
        authStore.addUser(newUser)
        userCreatedMessage.value = `User ${newUser.username} (${newUser.email}) created with success.`
    } catch (error) {
        errorMessage.value = error.message;
    }
}
</script>
<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center  px-6 py-8 mx-auto">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign Up
                    </div>
                    <form v-if="!userCreatedMessage && !errorMessage" class="space-y-4 md:space-y-6"
                        @submit.prevent="handleSubmit">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg :ring-primary-600 :border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark::ring-blue-500 dark::border-blue-500"
                                placeholder="name@company.com" v-model="email" required="">
                        </div>
                        <div>
                            <label for="username"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username
                            </label>
                            <input type="username" name="username" id="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg :ring-primary-600 :border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark::ring-blue-500 dark::border-blue-500"
                                placeholder="username" v-model="username" required="">
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg :ring-primary-600 :border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark::ring-blue-500 dark::border-blue-500"
                                required="" v-model="password">
                        </div>
                        <button type="submit"
                            class="bg-black w-full text-white bg-primary-600 hover:bg-primary-700 :ring-4 :outline-none :ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark::ring-primary-800">Sign
                            up</button>
                    </form>
                    <div v-else-if="userCreatedMessage && !errorMessage">
                        {{ userCreatedMessage }}
                        <router-link to="/login" class="animate-message">
                            Login
                        </router-link>
                    </div>
                    <div style="display:flex" v-else>
                        <div style="margin-right:5px">{{ errorMessage }}</div>
                        <router-link to="/login" class="animate-message">
                            Login.
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

