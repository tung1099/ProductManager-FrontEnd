function showList(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/products",
        success: function (products){
            let content = '';
            for (let i = 0; i < products.length; i++) {
                content += `<tr>
        <th scope="row">${i+1}</th>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].quantity}</td>
        <td>${products[i].description}</td>
        <td><img src="${'http://localhost:8080/image/' + products[i].image}" width="100px"></td>
        <td><button type="button" class="btn btn-danger" onclick="deleteProduct(${products[i].id})">Delete</button></td>
        <td><button type="button" class="btn btn-primary" onclick="showEditForm(${products[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Edit</button></td>
    </tr>`
            }
            $("#list-product").html(content);
        }
    })
}
showList()

function showCreateForm(){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" >
                        </div>
                        <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input type="text" class="form-control" id="price">
                        </div>
                        <div class="mb-3">
                            <label for="quantity" class="form-label">Quantity</label>
                            <input type="text" class="form-control" id="quantity">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <input type="text" class="form-control" id="description">
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label">Image</label>
                            <input type="file" class="form-control" id="image">
                        </div>
                    </form>
                </div>
                        <div class="modal-footer">
                             <button type="submit" class="btn btn-primary" onclick="createProduct()">Create</button>
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>`
    $("#showModal").html(content);
}
function createProduct(){
    let name = $(`#name`).val();
    let price = $(`#price`).val();
    let quantity = $(`#quantity`).val();
    let description = $(`#description`).val();
    let image = $(`#image`);
    let productForm = new FormData();
    productForm.append('name',name);
    productForm.append('price',price);
    productForm.append('quantity',quantity);
    productForm.append('description',description);
    productForm.append('image',image.prop('files')[0]);
    $.ajax({
        type:"POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: productForm,
        url:"http://localhost:8080/products",
        success: function (){
            showList()
        }
    });
    event.preventDefault();
}
function deleteProduct(id){
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/products/delete/${id}`,
        success : function () {
            showList()
        }
    })
}
function editProduct(id){
    let name = $(`#u-name`).val()
    let price = $(`#u-price`).val()
    let quantity = $(`#u-quantity`).val()
    let description = $(`#u-description`).val()
    let image = $(`#u-image`)
    let productForm = new FormData();
    productForm.append('name',name);
    productForm.append('price',price);
    productForm.append('quantity',quantity);
    productForm.append('description',description);
    productForm.append('image',image.prop('files')[0]);
    if (image.prop('files')[0]=== undefined){
        let file = new File([""],"filename.jpg")
        productForm.append('image',file);
    } else {
        productForm.append('image',image.prop('files')[0]);
    }
    $.ajax({
        type:"POST",
        enctype: 'multipart/from-data',
        processData: false,
        contentType: false,
        data: productForm,
        url:`http://localhost:8080/products/edit/${id}`,
        success:showList
    })
    event.preventDefault();
}
function showEditForm(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="u-name" >
                        </div>
                        <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input type="text" class="form-control" id="u-price">
                        </div>
                        <div class="mb-3">
                            <label for="quantity" class="form-label">Quantity</label>
                            <input type="text" class="form-control" id="u-quantity">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <input type="text" class="form-control" id="u-description">
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label">Image</label>
                            <div id="showImg"></div>
                            <input type="file" class="form-control" id="u-image">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="editProduct(${id})" data-bs-dismiss="modal">Edit</button>
                  
                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/products/${id}`,
        success:function (product){
            $('#u-name').val(product.name)
            $('#u-price').val(product.price)
            $('#u-quantity').val(product.quantity)
            $('#u-description').val(product.description)
            let img = `<img src="http://localhost:8080/image/${product.image}" width="100">`
            $(`#showImg`).html(img)
        }
    })
}