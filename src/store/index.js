import { defineStore } from "pinia";

export const Store = defineStore('storeData', {
    state: () => {
        return {
            msg: '使用pinia'
        }
    },
    getters: {},
    actions: {},
})