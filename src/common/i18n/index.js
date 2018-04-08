import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { en } from './en'; // 英文
import { zh } from './zh'; // 中文

Vue.use(VueI18n);
export default new VueI18n({
    locale: 'zh', // 设置当前显示语言
    messages: { en, zh } // 显示的文字
});