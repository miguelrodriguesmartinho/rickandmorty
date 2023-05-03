
<script setup>
import { useAuthStore } from '@/stores/Auth'
import { onMounted, ref, computed, watch } from 'vue'

const userUpdatedMessage = ref('')
const authStore = useAuthStore()
const username = ref(authStore.loggedUser.username);
const email = ref(authStore.loggedUser.email);

const handleEditedData = () => {
    let newUser = {
        email: email.value,
        username: username.value,
    }
    authStore.editUser(newUser)
    userUpdatedMessage.value = `User ${newUser.username} (${newUser.email}) updated with success.`
}
</script>
<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center  px-6 py-8 mx-auto">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Edit Profile
                    </div>
                    <form v-if="!userUpdatedMessage" class="space-y-4 md:space-y-6" @submit.prevent="handleEditedData">
                        <div>
                            <label for="username"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username
                            </label>
                            <input type="username" name="username" id="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg :ring-primary-600 :border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark::ring-blue-500 dark::border-blue-500"
                                placeholder="username" v-model="username" required="">
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg :ring-primary-600 :border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark::ring-blue-500 dark::border-blue-500"
                                placeholder="name@company.com" v-model="email">
                        </div>
                        <button type="submit"
                            class="bg-black w-full text-white bg-primary-600 hover:bg-primary-700 :ring-4 :outline-none :ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark::ring-primary-800">Save</button>
                    </form>
                    <div class="animate-message" v-else-if="userUpdatedMessage">{{ userUpdatedMessage }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

