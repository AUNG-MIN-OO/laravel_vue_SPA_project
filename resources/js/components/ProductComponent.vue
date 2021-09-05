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
                        <form @submit.prevent="isEditMode?update():store()" @keydown="product.onKeydown($event)">
                            <AlertError :form="product" :message="errorMes" />
                            <div class="form-group">
                                <label for="name">Product Name</label>
                                <input v-model="product.name" type="text" name="name" id="name" class="form-control" :class="{'is-invalid':product.errors.has('name')}">
                                <HasError :form="product" field="price" class="font-weight-bold"></HasError>
                            </div>
                            <div class="form-group">
                                <label for="price">Product Price</label>
                                <input v-model="product.price" type="text" name="price" id="price" class="form-control" :class="{'is-invalid':product.errors.has('price')}">
                                <HasError :form="product" field="price"></HasError>
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
            product : new Form({
                id : '',
                name : '',
                price : ''
            }),
            errorMes:"",

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
            this.product.clear();
            this.isEditMode = false;
            this.product.reset();
        },
        store(){
            this.product.post('/api/product')
            .then(response=>{
                //toast
                Toast.fire({
                    icon: 'success',
                    title: 'Created successfully'
                });
                this.view();
                this.product.reset();
            })
            .catch(error=> {
                this.errorMes = error.response.data.message;
            })
        },
        edit(product){
            this.product.clear();
            this.isEditMode = true;
            this.product.fill(product);
        },
        update(){
            this.product.put(`/api/product/${this.product.id}`)
            .then(response => {
                //toast
                Toast.fire({
                    icon: 'success',
                    title: 'Updated successfully'
                });
                this.view();
                this.product.reset();
            })
            .catch(error => {
                this.errorMes = error.response.data.message;
            })
        },
        del(product){
            Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/product/${product.id}`)
                        .then((response)=>{
                            this.view();
                            Swal.fire({title:'Deleted!',icon:'success'});
                        })
                        .catch(error=>console.log(error))
                }
            })
        }
    },
    created() {
        this.view();
    }
}
</script>

<style scoped>

</style>
