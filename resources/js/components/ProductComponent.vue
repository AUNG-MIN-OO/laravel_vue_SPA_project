<template>
    <div class="container my-5">
        <div class="row">
            <!--            search form-->
            <div class="col-8">
                <div class="row justify-content-between my-4">
                    <div class="col-3">
                        <button class="btn btn-primary" @click="create"><i class="fas fa-plus-circle"></i> Create</button>
                    </div>
                    <div class="col-5">
                        <form class="w-100" @submit.prevent="view">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="search" v-model="search">
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!--            search formend-->
        </div>
        <div class="row">
            <!--            show -->
            <div class="col-8">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="product in products.data" :key="product.id">
                        <td>{{product.id}}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" @click="edit(product)"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-danger btn-sm" @click="del(product)"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="float-right">
                    <pagination :data="products" @pagination-change-page="view"></pagination>
                </div>
            </div>
            <!--            show end-->
            <!--            edit or create form-->
            <div class="col-4">
                <div class="card">
                    <h3 class="card-header text-center">{{isEditMode?'Edit':'Create'}}</h3>
                    <div class="card-body">
                        <form @submit.prevent="isEditMode?update():store()">
                            <div class="form-group">
                                <label for="name">Product Name</label>
                                <input v-model="product.name" type="text" name="name" id="name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="price">Product Price</label>
                                <input v-model="product.price" type="text" name="price" id="price" class="form-control">
                            </div>
                            <button class="btn btn-primary float-right btn-lg" type="submit"><i class="fas fa-plus-circle"></i>
                                {{ isEditMode?'Update':'Create' }}</button>
                        </form>
                    </div>
                </div>
            </div>
            <!--            edit or create form end-->
        </div>
    </div>
</template>

<script>
export default {
    name:'ProductComponent',
    data(){
        return{
            isEditMode : false,
            search:"",
            products: {},
            product : {
                name : '',
                price : ''
            }
        }
    },
    methods:{
        view(page=1){
            axios.get(`/api/product?page=${page}&search=${this.search}`)
                .then((response)=>{
                    this.products = response.data;
                })
                .catch(error => console.log(error))
        },
        create(){
            this.isEditMode = false;
            this.product = {
                id : '',
                name : '',
                price : ''
            }
        },
        store(){
            axios.post('/api/product', this.product)
            .then((response)=>{
                this.view();
                this.product = {
                    id : '',
                    name : '',
                    price : ''
                }
            })
            .catch(error=>console.log('error'))
        },
        edit(product){
            this.isEditMode = true;
            this.product.id = product.id;
            this.product.name = product.name;
            this.product.price = product.price;
        },
        update(){
            axios.put(`/api/product/${this.product.id}`, this.product)
            .then(response => {
                this.view();
                this.product.id = "";
                this.product.name = "";
                this.product.price = "";
            })
            .catch(error=>console.log(error))
        },
        del(product){
            if(!confirm('Are you sure to delete?')){
                return  ;
            }
            axios.delete(`/api/product/${product.id}`)
            .then((response)=>{
                this.view();
            })
            .catch(error=>console.log(error))
        }
    },
    created() {
        this.view();
    }
}
</script>

<style scoped>

</style>
