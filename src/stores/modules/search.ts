import type { SearchFileResponse, SearchUserResponse } from '@/apis/search/response'
import { defineStore } from 'pinia'
import { store } from '@/stores'

interface SearchState {
  keyword: string,
  searchUsers: Array<SearchUserResponse>,
  searchFiles: Array<SearchFileResponse>
}

export const useSearchStore = defineStore('search', {
  state: (): SearchState => {
    return {
      keyword: '',
      searchUsers: [],
      searchFiles: []
    }
  },
  getters: {
    getKeyword(): string {
      return this.keyword
    },
    getSearchUsers(): Array<SearchUserResponse> {
      return this.searchUsers
    },
    getSearchFiles(): Array<SearchFileResponse> {
      return this.searchFiles
    }
  },
  actions: {
    setSearchUsers(searchUsers: Array<SearchUserResponse>) {
      this.searchUsers = searchUsers
    },
    setSearchFiles(searchFiles: Array<SearchFileResponse>) {
      this.searchFiles = searchFiles
    },
    setKeyword(keyword: string) {
      this.keyword = keyword
    },
    clearKeyword() {
      this.keyword = ''
    }
  },
  persist: true
})

export const useSearchStoreWithOut = () => {
  return useSearchStore(store)
}
