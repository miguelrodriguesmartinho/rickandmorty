import { defineStore } from 'pinia'

export const useHeroStore = defineStore('heroStoreId', {
  state: () => ({
    heroes: [],
    favorites: []
  }),

  actions: {
    addHero(hero) {
      this.heroes.push(hero)
    }
  }
})
