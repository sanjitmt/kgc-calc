import { createApp } from 'vue'
//theme
import "primevue/resources/themes/arya-orange/theme.css";     
//core
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.min.css";
//icons
import "primeicons/primeicons.css";

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Image from 'primevue/image';
import Tooltip from 'primevue/tooltip';
import Panel from 'primevue/panel';
import InputSwitch from 'primevue/inputswitch';
import TabMenu from 'primevue/tabmenu';
import ToggleButton from 'primevue/togglebutton';
import Slider from 'primevue/slider'
import ToastService from 'primevue/toastservice';
import Menu from 'primevue/menu';
import Toast from 'primevue/toast';

const app = createApp(App);
app.use(PrimeVue).use(router).use(ToastService);
app.component('Dropdown', Dropdown);
app.component('Checkbox', Checkbox);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Image', Image);
app.component('Panel', Panel);
app.component('InputSwitch', InputSwitch);
app.component('TabMenu', TabMenu);
app.component('ToggleButton', ToggleButton);
app.component('Slider', Slider);
app.component('Menu', Menu);
app.component('Toast',Toast);
app.directive('tooltip', Tooltip);

app.mount('#app')


