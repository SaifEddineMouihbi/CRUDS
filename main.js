let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'create';
let tmp;


// get the total amount
function getTotalAmount(){
    if(price.value != ''){
        let productAmount = (+price.value + +taxes.value + +ads.value) 
        - +discount.value;
        total.innerHTML = productAmount;
        total.style.backgroundColor = 'green';
    }else {
        total.style.backgroundColor = 'red';
        total.innerHTML = '0';
    }
    
}

// Create the product object
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else {
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if(title.value != '' && price.value != '' && taxes.value != '' && ads.value != '' && discount.value != '' && newPro.count < 100 && category.value != ''){
        if(mood === 'create'){
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                dataPro.push(newPro);
            }
            }else{
            dataPro.push(newPro);
            }
        }else{
            dataPro[tmp]=newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            
        }
        clearData();
    }


    // save data to localStorage
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

// clear data from input fields
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read data 
function showData(){
    getTotalAmount();
    let table = '';
    for(let i = 0; i < dataPro.length; i++)
    {
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <th><button onclick = "updateData(${i})" id="update">update</button></th>
            <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
        </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `<button onclick = "deleteAll()">Delete All (${dataPro.length})</button>`
    }else {
        btnDelete.innerHTML = '';
    }
}
showData();

// delete data 
function deleteData(i){
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// delete all data
function deleteAll(){
    dataPro.splice(0);
    localStorage.clear();
    showData();
}

//Update the data
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotalAmount();
    category.value = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

//Search

let SearchMood = "title";
function SearchMoodBtnClick(id){

    let Search = document.getElementById('search');
    if(id == "searchTitle"){
        SearchMood = "title";
    }else {
        SearchMood = "category";
    }
    Search.focus();
    Search.value = '';
    Search.placeholder = 'Search by '+ SearchMood;
}

function searchData(value){
    let table = '';
    for(let i=0; i< dataPro.length; i++){
        if(SearchMood == "title"){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <th><button onclick = "updateData(${i})" id="update">update</button></th>
                    <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
                </tr>
                `;
            }
        }else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <th><button onclick = "updateData(${i})" id="update">update</button></th>
                    <th><button onclick="deleteData(${i})" id="delete">delete</button></th>
                </tr>
                `;
            }
        }
        showData();
    }
    document.getElementById('tbody').innerHTML = table;
    
}