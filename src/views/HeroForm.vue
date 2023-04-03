<script setup>

import { ref } from 'vue'
import { useHeroStore } from "@/stores/hero"
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const heroStore = useHeroStore()

const formData = ref({
    heroName: '',
    heroImage: '',
    gender: '',
})

const rules = {
    heroName: { required },
    heroImage: { required },
    gender: { required },
}
const v$ = useVuelidate(rules, formData)


const handleAddHero = async () => {
    const result = await v$.value.$validate();
    if (result) {
        let newHero = {
            id: '',
            status: '',
            origin: {
                name: ''
            },
            location: {
                name: ''
            },
            name: formData.value.heroName,
            image: formData.value.heroImage,
            gender: formData.value.gender,
        }
        heroStore.addHero(newHero)
        alert("New Hero  " + newHero.name + " added ! check it at Characters page");
    }
    else {
        alert("Hero not added, please fill the form");
    }

}

</script>
<template>
    <div class="heroForm">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Name
                </label>
                <input v-model="formData.heroName"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
                    id="username" type="text" placeholder="Hero Name">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
                    Image
                </label>
                <input v-model="formData.heroImage"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
                    id="image" placeholder="URL">
            </div>
            <h6>Gender</h6>
            <div class="flex items-center mb-4">
                <input v-model="formData.gender" id="default-radio-1" type="radio" value="male" name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600">
                <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
            </div>
            <div class="flex items-center">
                <input checked v-model="formData.gender" id="default-radio-2" type="radio" value="female"
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600">
                <label for="default-radio-2"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
            </div>
            <div class="flex items-center justify-end">
                <button @click="handleAddHero" class="bg-blue-500  text-white font-bold py-2 px-4 rounded " type="button">
                    Create Hero
                </button>
            </div>
        </form>
    </div>
</template>


<style lang="scss" scoped>
.heroForm {
    display: flex;
    justify-content: center;
    height: 100%;

    form {
        max-height: 400px;
        margin-top: 50px;
        width: 350px;
    }
}
</style>
