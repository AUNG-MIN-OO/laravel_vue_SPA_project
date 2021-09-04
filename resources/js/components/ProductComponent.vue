<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-8">
                <div class="row justify-content-between my-4">
                    <div class="col-3">
                        <button class="btn btn-primary"><i class="fas fa-plus-circle"></i> Create</button>
                    </div>
                    <div class="col-5">
                        <form class="w-100">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="search">
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-primary"><i class="fas fa-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
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
                    <tr>
                        <td>1</td>
                        <td>Test</td>
                        <td>100</td>
                        <td>
                            <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    </tr>
                    <tr >
                        <td>1</td>
                        <td>Test</td>
                        <td>100</td>
                        <td>
                            <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-4">
                <div class="card">
                    <h3 class="card-header text-center">Create</h3>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <label for="name">Product Name</label>
                                <input type="text" name="name" id="name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="price">Product Price</label>
                                <input type="text" name="price" id="price" class="form-control">
                            </div>
                            <button class="btn btn-primary float-right btn-lg"><i class="fas fa-plus-circle"></i> Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
