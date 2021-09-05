require('./bootstrap');

window.Vue = require('vue').default;

import {Form} from 'vform';
import {
    HasError,
    AlertError,
} from 'vform/src/components/bootstrap4'
import Swal from 'sweetalert2'

window.Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})




// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component(HasError.name,HasError);
Vue.component(AlertError.name,AlertError);
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('product-component', require('./components/ProductComponent.vue').default);
Vue.component('pagination', require('laravel-vue-pagination'));

window.Form = Form;
window.Swal = Swal;

const app = new Vue({
    el: '#app',
});
