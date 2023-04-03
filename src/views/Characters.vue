
<script setup>
import axios from 'axios'
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useHeroStore } from "@/stores/hero"

const characters = ref([])
const filteringText = ref("")
const perPage = 12;
let page = ref(1);
const heroStore = useHeroStore()
const router = useRouter()
const filtered = ref(false)
const filterMessage = ref("")
const starTogller = ref([])
const selectedFilter = ref('')

const filters = [
  { name: "Name", value: "name" },
  { name: "Status", value: "status" },
  { name: "Species", value: "species" },
  { name: "Type", value: "type" },
  { name: "Gender", value: "gender" },
]

onMounted(() => {
  //there is better ways to set this up, ex: Api calls dedicated map file
  axios
    .get('https://rickandmortyapi.com/api/character')
    .then((response) => {
      characters.value = [...heroStore.heroes, ...response.data.results]
    })
    .catch((err) => {
      console.error(err)
    })

  starTogller.value = heroStore.favorites
})

const paginatedCharecters = computed(() =>
  characters.value.slice((page.value - 1) * perPage, page.value * perPage)
);

const nextPage = () => {
  if (page.value !== Math.ceil(characters.value.length / perPage)) {
    page.value += 1;
  }
};

const backPage = () => {
  if (page.value !== 1) {
    page.value -= 1;
  }
};

const goToPage = (numPage) => {
  page.value = numPage;
};


const selectfilter = (filterType) => {
  selectedFilter.value = filterType
}

const applyFilter = () => {
  axios
    .get(`https://rickandmortyapi.com/api/character/?${selectedFilter.value}=${filteringText.value}`)
    .then((response) => {
      characters.value = response.data.results
      filtered.value = true
      filterMessage.value = `Filtered By ${selectedFilter.value} !`
    })
    .catch((err) => {
      console.error(err)
    })
}

const goTohero = id => {
  router.push(`/characters/${id}`)
}

const favoriteHandler = () => {
  heroStore.favorites = starTogller.value
}

</script>
<template>
  <div class="px-8 filter-container">
    <div class="dropdown">
      <button class="dropbtn">Select filter</button>
      <div class="dropdown-content">
        <a v-for="filter in filters" @click="selectfilter(filter.value)">{{ filter.name }}</a>
      </div>
    </div>
    <div class="flex rounded-md ">
      <button @click="applyFilter()" type="button" class="px-4 font-medium bg-white border border-gray-200 rounded-l-lg  "
        style=" font-size: 13px;">
        Apply {{ selectedFilter }} filter
      </button>
      <input v-model="filteringText" type="text" class="px-4 font-medium bg-white border border-gray-200 rounded-r-lg">
    </div>
  </div>
  <section v-if="characters" class="CtDrW">
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div>
        <p class=" text-gray-700">
          Showing page
          {{ ' ' }}
          <span class="font-medium">{{ page }}</span>
          {{ ' ' }}
          with
          {{ ' ' }}
          <span class="font-medium">{{ paginatedCharecters.length }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ characters.length }}</span>
          {{ ' ' }}
          results
        </p>
      </div>

      <div class="inline-flex rounded-md shadow-sm" role="group">
        <button @click="backPage" type="button"
          class="px-4 font-medium  bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100">
          prev
        </button>
        <button v-for="item in Math.ceil(characters.length / perPage)" :key="item" @click="() => goToPage(item)"
          type="button" class="px-4   font-medium  bg-white border-t border-b border-gray-200">
          {{ item }}
        </button>
        <button @click="nextPage" type="button" class="px-4 font-medium  bg-white border border-gray-200 rounded-r-md ">
          next
        </button>
      </div>

    </div>

    <div class="hVhElu">
      <article v-for="(char, index) in paginatedCharecters" :key="char.id" class="bEklxv">

        <div class="fkUcVI">
          <img :src="char.image" :alt="char.image" />
        </div>

        <div class="isMAic">
          <div class="section">
            <a style="display: flex; justify-content: space-between;" rel="noopener noreferrer" target="_blank"
              class="ffGNdR">
              <h2 @click="goTohero(char.id)">{{ char.name }}</h2> <label class="star-toggle">
                <input type="checkbox" :id="char.id" :value="char.name" v-model="starTogller"
                  @change="favoriteHandler()" />
                <div class="icon">
                  <div class="star">
                    <div class="eye"></div>
                  </div>
                </div>

              </label>
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
  </section>
</template>


<style lang="scss">
.filter-container {
  display: flex;
  padding-top: 50px;
  padding-bottom: 50px;

}

.star-toggle {
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
  width: 40px;
  height: 40px;
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
      width: 40px;
      height: 40px;
      transform: translateY(var(--y)) rotate(var(--rotate)) scale(var(--scale));
      border-radius: var(--radius, 0px);
      background: var(--color, var(--color-default));
      clip-path: var(--clip, polygon(50% 0, 65% 32%, 100% 37%, 75% 63%, 80% 100%, 50% 79%, 20% 100%, 25% 63%, 0% 37%, 35% 32%));
      transition: clip-path .2s, border-radius .2s, background .2s;

      &:before,
      &:after,
      .eye {
        content: '';
        position: absolute;
        background: var(--face-color, var(--face-color-default));
        transition: background .2s, box-shadow .2s;
      }

      &:before,
      .eye {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        left: 21px;
        top: 16px;
      }

      &:after {
        width: 10px;
        height: 4px;
        border-radius: var(--face-radius, 4px 4px 0 0);
        left: 15px;
        top: 23px;
        transition: border-radius .2s;
      }

      .eye {
        left: 15px;
        transform: scaleY(var(--face-scale));

        &:before {
          content: '';
          position: absolute;
          left: -1px;
          top: 5px;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: var(--face-color-default);
          opacity: var(--face-tear-o);
          transform: translateY(var(--face-tear-y)) scaleY(var(--face-tear-s));
        }
      }
    }
  }


}

.bEklxv {
  width: 600px;
  height: 220px;
  display: flex;
  overflow: hidden;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.fkUcVI {
  flex: 2 1 0%;
  width: 100%;
}

.isMAic {
  flex: 3 1 0%;
  position: relative;
  padding: 0.75rem;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;

  .section:first-child {
    -webkit-box-pack: start;
    justify-content: flex-start;
  }

  .section {
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
  }

  a {
    color: rgb(245, 245, 245);
  }

  span {
    font-size: 16px;
    font-weight: 500;
  }

  .status {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    text-transform: capitalize;
  }

  span {
    font-size: 16px;
    font-weight: 500;
  }

  h2 {
    margin: 0px;
    padding: 0px;
  }
}


// there are best ways to do this without duplicating to much css, using better sass nesting
.status__icon {
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  background: rgb(158, 158, 158);
  border-radius: 50%;
}

.status__icon_green {
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  background: rgb(85, 204, 68);
  border-radius: 50%;
}

.status__icon_red {
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  background: rgb(214, 61, 46);
  border-radius: 50%;
}

.dropbtn {
  background-color: #f6c206;
  color: white;
  padding: 5px;
  font-size: 13px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 12px;
  width: 100px;
  height: 35px;
  font-weight: bold;
}

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
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #f6c206af;
}
</style>
