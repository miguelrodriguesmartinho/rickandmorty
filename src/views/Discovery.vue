<script setup>
import { onMounted, ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { fetchData, fetchDataByFilter } from "@/services/GitHubApi.js";
import Card from './Card.vue';
import { useFavoritesStore } from '@/stores/Favorite'

const repoStore = useFavoritesStore()
const vue = ref(false)
const typescript = ref(false)
const javascript = ref(false)
const go = ref(false)
const css = ref(false)
const node = ref(false)
const vueData = ref([])
const typescriptData = ref([])
const javascriptData = ref([])
const goData = ref([])
const cssData = ref([])
const nodeData = ref([])
const starTogglerTest = ref([])

const vueHandler = async () => {
    vue.value = !vue.value
    if (!vue.value) {
        localStorage.removeItem('vue', vue.value)
    } else {
        localStorage.setItem('vue', vue.value)
    }

    if (vueData.value.length === 0) {
        vueData.value = await fetchData('vue')
    }
}
const typescriptHandler = async () => {
    typescript.value = !typescript.value
    if (!typescript.value) {
        localStorage.removeItem('typescript', typescript.value)
    } else {
        localStorage.setItem('typescript', typescript.value)
    }

    if (typescriptData.value.length === 0) {
        typescriptData.value = await fetchData('typescript')
    }
}
const javascriptHandler = async () => {
    javascript.value = !javascript.value
    if (!javascript.value) {
        localStorage.removeItem('javascript', javascript.value)
    } else {
        localStorage.setItem('javascript', javascript.value)
    }
    if (javascriptData.value.length === 0) {
        javascriptData.value = await fetchData('javascript')
    }
}
const goHandler = async () => {
    go.value = !go.value

    if (!go.value) {
        localStorage.removeItem('go', go.value)
    } else {
        localStorage.setItem('go', go.value)
    }
    if (goData.value.length === 0) {
        goData.value = await fetchData('go')
    }
}
const cssHandler = async () => {
    css.value = !css.value

    if (!css.value) {
        localStorage.removeItem('css', css.value)
    } else {
        localStorage.setItem('css', css.value)
    }
    if (cssData.value.length === 0) {
        cssData.value = await fetchData('css')
    }
}
const nodeHandler = async () => {
    node.value = !node.value

    if (!node.value) {
        localStorage.removeItem('node', node.value)
    } else {
        localStorage.setItem('node', node.value)
    }
    if (nodeData.value.length === 0) {
        nodeData.value = await fetchData('node')
    }
}

const sort = async (language, filter) => {

    switch (language) {
        case 'vue':
            vueData.value = await fetchDataByFilter(language, filter)
            break;
        case 'typescript':
            typescriptData.value = await fetchDataByFilter(language, filter)
            break;
        case 'javascript':

            javascriptData.value = await fetchDataByFilter(language, filter)
            break;
        case 'go':
            goData.value = await fetchDataByFilter(language, filter)
            break;
        case 'css':
            cssData.value = await fetchDataByFilter(language, filter)
            break;
        case 'node':
            nodeData.value = await fetchDataByFilter(language, filter)
            break;
    }

}

const updateCheckboxState = (repoId, newVal) => {
    const repo = repoStore.favorites.find((repo) => repo.id === repoId);
    if (repo) {
        repo.checked = newVal;
    }
};

const isChecked = (repoId) => {
    const repo = repoStore.favorites.find((repo) => repo.id === repoId);
    return repo ? repo.checked : false;
};



onMounted(() => {
    // on mounted set favorites store with local settings
    const localStoreData = JSON.parse(localStorage.getItem("favorites"))
    if (localStoreData) {
        localStoreData.forEach(fav => {
            repoStore.addRepo(fav)
        });
    }
    // Retrieve the values from localStorage
    const vueValue = localStorage.getItem('vue');
    const typescriptValue = localStorage.getItem('typescript');
    const javascriptValue = localStorage.getItem('javascript');
    const goValue = localStorage.getItem('go');
    const cssValue = localStorage.getItem('css');
    const nodeValue = localStorage.getItem('node');
    // Set the values to the refs
    if (vueValue !== null) {
        vue.value = vueValue === 'true';
        const fetchDataAsync = async () => {
            if (vueData.value.length === 0) {
                vueData.value = await fetchData('vue');
            }
        };
        fetchDataAsync();
    }
    if (typescriptValue !== null) {
        typescript.value = typescriptValue === 'true';
        const fetchDataAsync = async () => {
            if (typescriptData.value.length === 0) {
                typescriptData.value = await fetchData('typescript');
            }
        };
        fetchDataAsync();
    }
    if (javascriptValue !== null) {
        javascript.value = javascriptValue === 'true';
        const fetchDataAsync = async () => {
            if (javascriptData.value.length === 0) {
                javascriptData.value = await fetchData('javascriptValue');
            }
        };
        fetchDataAsync();
    }

    if (goValue !== null) {
        go.value = goValue === 'true';
        const fetchDataAsync = async () => {
            if (goData.value.length === 0) {
                goData.value = await fetchData('go');
            }
        };
        fetchDataAsync();
    }

    if (cssValue !== null) {
        css.value = cssValue === 'true';
        const fetchDataAsync = async () => {
            if (cssData.value.length === 0) {
                cssData.value = await fetchData('css');
            }
        };
        fetchDataAsync();
    }

    if (nodeValue !== null) {
        node.value = nodeValue === 'true';
        const fetchDataAsync = async () => {
            if (nodeData.value.length === 0) {
                nodeData.value = await fetchData('node');
            }
        };
        fetchDataAsync();
    }
})

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'
</script>

<template>
    <div class="px-6 py-8">
        <div class="mb-8 Bookmark">
            <div class=" mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
                My Bookmarks
            </div>
            <swiper v-if="repoStore.favorites.length" :slidesPerView="3" :spaceBetween="30" :pagination="{
                    clickable: true
                }" class="mySwiper my-8">
                <swiper-slide v-for="(repo, index) in repoStore.favorites" :key="index">
                    <Card @checkbox-changed="updateCheckboxState" :repo-data="repo" :checked="isChecked(repo.id)" />
                </swiper-slide>
            </swiper>
        </div>
        <div class="topicsContainer my-8">
            <div class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">
                Toogle topics to show
            </div>
            <button @click="vueHandler" :class="vue ? 'bg-gray-400' : 'bg-gray-100'"
                class="text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                Vue
            </button>

            <button @click="typescriptHandler" :class="typescript ? 'bg-indigo-400' : 'bg-indigo-100'"
                class="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                Typescript
            </button>

            <button @click="javascriptHandler" :class="javascript ? 'bg-pink-400' : 'bg-pink-100'"
                class="text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                Javascript
            </button>

            <button @click="goHandler" :class="go ? 'bg-red-400' : 'bg-red-100'"
                class="text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                Go
            </button>

            <button @click="cssHandler" :class="css ? 'bg-green-400' : 'bg-green-100'"
                class="text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                Css
            </button>

            <button @click="nodeHandler" :class="node ? 'bg-purple-400' : 'bg-purple-100'"
                class="text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                Node
            </button>
        </div>
        <div class="carouselsContainer">
            <div v-if="vue">
                <div class="flex">
                    <div class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
                        Top Vue
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn"><svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd" />
                            </svg></button>
                        <div class="dropdown-content">
                            <div @click="sort('vue', 'stars')">Sort by stars</div>
                            <div @click="sort('vue', 'forks')">Sort by forks</div>
                            <div @click="sort('vue', 'help-wanted-issues')">Sort by help wanted issues</div>
                            <div @click="sort('vue', 'updated')">Sort by updated</div>
                        </div>
                    </div>
                </div>
                <div v-if="!vueData.length" role="status" style="position: absolute; left: 50%;">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <div v-else-if="vueData">
                    <swiper :slidesPerView="3" :spaceBetween="25" class="mySwiper my-8">
                        <swiper-slide v-for="(repo, index) in vueData" :key="index">
                            <Card @checkbox-changed="updateCheckboxState" :checked="isChecked(repo.id)" :repo-data="repo" />
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div v-if="typescript">
                <div class="flex">
                    <div class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
                        Top Typescript
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn"><svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd" />
                            </svg></button>

                        <div class="dropdown-content">
                            <div @click="sort('typescript', 'stars')">Sort by stars</div>
                            <div @click="sort('typescript', 'forks')">Sort by forks</div>
                            <div @click="sort('typescript', 'help-wanted-issues')">Sort by help wanted issues</div>
                            <div @click="sort('typescript', 'updated')">Sort by updated</div>
                        </div>
                    </div>
                </div>
                <div v-if="!typescriptData.length" role="status" style="position: absolute; left: 50%;">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <swiper v-else-if="typescriptData" :slidesPerView="3" :spaceBetween="25" class="mySwiper my-8">
                    <swiper-slide v-for="(repo, index) in typescriptData" :key="index">
                        <Card @checkbox-changed="updateCheckboxState" :checked="isChecked(repo.id)" :repo-data="repo" />
                    </swiper-slide>
                </swiper>
            </div>
            <div v-if="javascript">
                <div class="flex">
                    <div class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
                        Top Javascript
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn"><svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd" />
                            </svg></button>
                        <div class="dropdown-content">
                            <div @click="sort('javascript', 'stars')">Sort by stars</div>
                            <div @click="sort('javascript', 'forks')">Sort by forks</div>
                            <div @click="sort('javascript', 'help-wanted-issues')">Sort by help wanted issues</div>
                            <div @click="sort('javascript', 'updated')">Sort by updated</div>
                        </div>
                    </div>
                </div>
                <div v-if="!javascriptData.length" role="status" style="position: absolute; left: 50%;">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <swiper v-else-if="javascriptData" :slidesPerView="3" :spaceBetween="25" class="mySwiper my-8">
                    <swiper-slide v-for="(repo, index) in javascriptData" :key="index">
                        <Card @checkbox-changed="updateCheckboxState" :checked="isChecked(repo.id)" :repo-data="repo" />
                    </swiper-slide>
                </swiper>
            </div>
            <div v-if="go">
                <div class="flex">
                    <div class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
                        Top Go
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn"><svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd" />
                            </svg></button>
                        <div class="dropdown-content">
                            <div @click="sort('go', 'stars')">Sort by stars</div>
                            <div @click="sort('go', 'forks')">Sort by forks</div>
                            <div @click="sort('go', 'help-wanted-issues')">Sort by help wanted issues</div>
                            <div @click="sort('go', 'updated')">Sort by updated</div>
                        </div>
                    </div>
                </div>
                <div v-if="!goData.length" role="status" style="position: absolute; left: 50%;">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <swiper v-else-if="goData" :slidesPerView="3" :spaceBetween="25" class="mySwiper my-8">
                    <swiper-slide v-for="(repo, index) in goData" :key="index">
                        <Card @checkbox-changed="updateCheckboxState" :checked="isChecked(repo.id)" :repo-data="repo" />
                    </swiper-slide>
                </swiper>
            </div>
            <div v-if="css">
                <div class="flex">
                    <div class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
                        Top Css
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn"><svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd" />
                            </svg></button>
                        <div class="dropdown-content">
                            <div @click="sort('css', 'stars')">Sort by stars</div>
                            <div @click="sort('css', 'forks')">Sort by forks</div>
                            <div @click="sort('css', 'help-wanted-issues')">Sort by help wanted issues</div>
                            <div @click="sort('css', 'updated')">Sort by updated</div>
                        </div>
                    </div>
                </div>
                <div v-if="!cssData.length" role="status" style="position: absolute; left: 50%;">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <swiper v-else-if="cssData" :slidesPerView="3" :spaceBetween="25" class="mySwiper my-8">
                    <swiper-slide v-for="(repo, index) in cssData" :key="index">
                        <Card @checkbox-changed="updateCheckboxState" :checked="isChecked(repo.id)" :repo-data="repo" />
                    </swiper-slide>
                </swiper>
            </div>
            <div v-if="node">
                <div class="flex">
                    <div class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
                        Top Node
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn"><svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd" />
                            </svg></button>
                        <div class="dropdown-content">
                            <div @click="sort('node', 'stars')">Sort by stars</div>
                            <div @click="sort('node', 'forks')">Sort by forks</div>
                            <div @click="sort('node', 'help-wanted-issues')">Sort by help wanted issues</div>
                            <div @click="sort('node', 'updated')">Sort by updated</div>
                        </div>
                    </div>
                </div>
                <div v-if="!nodeData.length" role="status" style="position: absolute; left: 50%;">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <swiper v-else-if="nodeData" :slidesPerView="3" :spaceBetween="25" class="mySwiper my-8">
                    <swiper-slide v-for="(repo, index) in nodeData" :key="index">
                        <Card @checkbox-changed="updateCheckboxState" :checked="isChecked(repo.id)" :repo-data="repo" />
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.topicsContainer {
    button {
        &:hover {
            opacity: 0.7;
        }
    }
}

.mySwiper {
    width: 100%;
    height: 300px;
}

.carouselsContainer {
    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;

        a {
            cursor: pointer;
        }

        position: absolute;
        z-index: 2;
    }

    .dropdown-content div {
        cursor: pointer;
        color: black;
        padding: 4px 16px;
        text-decoration: none;
        display: block;
        font-size: 13px;
        font-weight: bold;
    }

    .dropdown-content div:hover {
        background-color: #f1f1f1
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }
}
</style>
