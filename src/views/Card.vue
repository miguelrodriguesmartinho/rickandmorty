<script setup>
import { ref, computed, watch, defineEmits } from 'vue'
import { useFavoritesStore } from '@/stores/Favorite'

const props = defineProps(['repoData', 'checked'])
const isChecked = ref(props.checked)
const repoStore = useFavoritesStore()

const emit = defineEmits(['checkbox-changed'])

const navigationHandler = (urlToGo) => {
    window.open(urlToGo);
}

const localTime = computed(() => {
    let date = new Date(props.repoData.created_at);

    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    return date.toLocaleString('en-US', options);
})

const logo = computed(() => {
    return `/src/assets/${props.repoData.language}.png`
})

const favoriteHandler = (repoData) => {

    let repoToStore = {
        id: repoData.id,
        name: repoData.name,
        language: repoData.language,
        full_name: repoData.full_name,
        description: repoData.description,
        owner: {
            avatar_url: repoData.owner.avatar_url,
            login: repoData.owner.login,
            html_url: repoData.owner.html_url
        },
    }
    const found = repoStore.favorites.some(repo => repo.id === repoData.id);

    if (!found) {
        repoStore.addRepo(repoToStore)
        localStorage.setItem("favorites", JSON.stringify(repoStore.favorites));
    }
    else {
        repoStore.removeRepo(repoToStore)
        const favoritesLocal = JSON.parse(localStorage.getItem("favorites"))
        const withRemovedItem = favoritesLocal.filter((obj) => obj.id !== repoToStore.id)
        localStorage.setItem('favorites', JSON.stringify(withRemovedItem));
    }

}

const handleChange = (boxId, boxValue) => {
    emit('checkbox-changed', boxId, boxValue)
}

</script>
<template>
    <div class="max-w-sm w-full lg:max-w-full h-full">
        <label class="star-toggle">
            <input type="checkbox" :id="repoData.id" :value="repoData.id" v-model="isChecked"
                @change="favoriteHandler(repoData), handleChange(repoData.id, isChecked)" />
            <div class="icon">
                <div class="star">
                    <div class="eye"></div>
                </div>
            </div>
        </label>
        <div @click="navigationHandler(repoData.owner.html_url)"
            class="cursor-pointer overflow-auto border h-full border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mb-8">
                <div class="text-sm text-gray-600 flex items-center">
                    <img :src="logo" alt="My Image" style="width: 25px; height: 25px; margin-right: 10px;">
                    {{ repoData.language }}
                </div>
                <div class="text-gray-900 font-bold text-xl mb-2">{{ repoData.full_name }}</div>

                <p class="text-gray-500 dark:text-gray-400">{{ repoData.description }}</p>
            </div>
            <div class="flex items-center">
                <img class="w-10 h-10 rounded-full mr-4" :src="repoData.owner.avatar_url" alt="Avatar of Jonathan Reinink">
                <div class="text-sm">
                    <p class="text-gray-900 leading-none">{{ repoData.owner.login }}</p>
                    <p class="text-gray-600">{{ localTime }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.star-toggle {
    position: absolute;
    right: 5px;
    top: 5px;
    --color-default: #7E7E86;
    --face-color-default: #1A1A20;
    --color-active: #F6C206;
    --face-color-active: #845901;
    --hole: #09090C;
    --hole-inner: #121218;
    --y: 0px;
    --scale: 1;
    --rotate: 0deg;
    --hole-scale: 0;
    --face-scale: 1;
    --face-tear-o: 0;
    --face-tear-y: -6px;
    --face-tear-s: 1;
    --toggle-y: 0px;

    display: block;
    cursor: pointer;
    transform: translateY(var(--toggle-y)) translateZ(0);

    &:active {
        --icon-s: .95;
    }

    input {
        display: none;

        &:checked {
            &+.icon {
                --color: var(--color-active);
                --face-color: var(--face-color-active);
                --face-radius: 0 0 4px 4px;
            }
        }
    }

    .icon {
        .star {
            width: 20px;
            height: 20px;
            transform: translateY(var(--y)) rotate(var(--rotate)) scale(var(--scale));
            border-radius: var(--radius, 0px);
            background: var(--color, var(--color-default));
            clip-path: var(--clip, polygon(50% 0, 65% 32%, 100% 37%, 75% 63%, 80% 100%, 50% 79%, 20% 100%, 25% 63%, 0% 37%, 35% 32%));
            transition: clip-path .2s, border-radius .2s, background .2s;
        }
    }
}
</style>
