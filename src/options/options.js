/*
 * @Date: 2022-12-13 17:59:03
 * @LastEditors: xzz
 * @LastEditTime: 2023-04-15 15:50:18
 */



import { createApp } from 'vue'
import options from './index.vue'

import{ contentApi as API} from '../api/contentApi/index'
window.API = API


createApp(options).mount('#pop')