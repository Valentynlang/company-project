import { defineStore } from "pinia"

interface Category {
  id: number;
  slug: string;
  name: string;
  count: number;
}

export const useAppStore = defineStore('app', {
  state: () => ({
    isInitHeaderDark: false,
    isMenuActive: false,
    isVideoActive: false,
    isDarkHeader: false,
    isMiniHeader: false,
    videoId: null,
    isHomeVideoPlayed: false,
    categories: [] as Category[],
  }),
  actions: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive
    },
    playHomeVideo() {
      this.isHomeVideoPlayed = true
    },
    openVideoModal(id: any) {
      this.isVideoActive = true
      this.videoId = id
    },
    closeVideoModal() {
      this.isVideoActive = false
      this.videoId = null
    },
    setDarkHeader() {
      this.isDarkHeader = true
      this.isMiniHeader = false
    },
    setInitHeader(value: boolean) {
      this.isInitHeaderDark = value
    },
    setLightHeader() {
      this.isDarkHeader = false
      this.isMiniHeader = false
    },
    setMiniHeader() {
      this.isDarkHeader = true
      this.isMiniHeader = true
    },
    getCategories(categories: any) {
      if (categories?.length && !this.categories.length) {
        categories.forEach((item: any) => {
          this.categories.push({
            id: item.id,
            slug: item.slug,
            name: item.name,
            count: item.count,
          });
        });
      }
    },
  }
})