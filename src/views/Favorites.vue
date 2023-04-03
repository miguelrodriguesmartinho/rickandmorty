<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { useHeroStore } from "@/stores/hero"
import { useRouter } from 'vue-router'

const heroStore = useHeroStore()
const characters = ref([])
const favorites = ref([])
const router = useRouter()

const goTohero = id => {
    router.push(`/characters/${id}`)
}

onMounted(() => {
    axios
        .get('https://rickandmortyapi.com/api/character')
        .then((response) => {
            characters.value = response.data.results
            heroStore.favorites.forEach(fav => {
                const found = characters.value.find(char => char.name === fav);
                favorites.value.push(found)
            });
        })
        .catch((err) => {
            console.error(err)
        })
})

</script>
<template>
    <div class="hVhElu" v-if="favorites">
        <article v-for="(char, index) in favorites" :key="char.id" class="bEklxv">

            <div class="fkUcVI">
                <img :src="char.image" :alt="char.image" />
            </div>

            <div class="isMAic">
                <div class="section">
                    <a style="display: flex; justify-content: space-between;" rel="noopener noreferrer" target="_blank"
                        class="ffGNdR">
                        <h2 @click="goTohero(char.id)">{{ char.name }}</h2>
                    </a><span class="status"><span
                            :class='char.status === "Dead" ? "status__icon_red" : char.status === "Alive" ? "status__icon_green" : "status__icon"'>
                        </span>
                        {{ char.status }} - {{ char.species }}</span>
                </div>
                <div class="section">
                    <span class="text-gray">Last known location:</span><a href="https://rickandmortyapi.com/api/location/20"
                        rel="noopener noreferrer" target="_blank" class="ffGNdR">{{ char.origin.name }}</a>
                </div>
                <div class="section">
                    <span class="text-gray">First seen in:</span><a href="https://rickandmortyapi.com/api/episode/23"
                        rel="noopener noreferrer" target="_blank" class="ffGNdR">{{ char.location.name }}</a>
                </div>

            </div>
        </article>
    </div>
</template>


<style scoped>
.hVhElu {
    height: 100%;
    display: flex;
    align-content: flex-start;
}
</style>
