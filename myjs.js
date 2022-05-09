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
        <td><button onclick="deleteProduct(${products[i].id})">Delete</button></td>
        <td><button type="button" onclick="showEditForm(${products[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
    </tr>`
            }
            $("#list-product").html(content);
        }
    })
}
showList()

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

