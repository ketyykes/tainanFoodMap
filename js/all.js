let allDataAry = [];
let partOfDistrctAry =[] ;
let includeService = [];
// console.log(dataJson);
let url ="json/shops_zh-tw.json";
// let url =""
fetch(url, {
    method: "GET",
    header: new Headers({
      "Content-Type": "text/json",
    }),
})
.then(function (response) {
    return response.json();
    console.log(response);
})
.then(function (result) {
    
    result.forEach((element) =>{
        allDataAry.push(element);
    })
    printMarket(result);
    processData(result);
});

let map = L.map('map', {
    center: [22.9971587, 120.2103894],
    zoom: 16
});
//宣告一個map變數指定id為'map'的標籤然後設定center經緯度和放大距離zoom
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
//從openstreetmap載入圖磚然後添加到map裡面


let greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
//new出一個icon從以下url

let markers = new L.MarkerClusterGroup().addTo(map);



  let districtAry = [];
function printMarket(data) {
    // for (let i = 0; i < data.length; i++) {
    //     if(data[i].lat==null||data[i].long==null){
    //         continue;
    //     }
    //     markers.addLayer(L.marker([data[i].lat, data[i].long], { icon: greenIcon }).bindPopup(`<h1>名稱:${data[i].name}</h1>`));
    // }



    // console.log(data[i].lat);
    // console.log(data[2].category[0]);
    // console.log(data[2].category[1]);
    // let category = new Set();
    // let categoryShop = [];
    // data.forEach(shop => {
    //     shop.category.forEach(category=>{
    //        if(categoryShop.indexOf(category)==-1){
    //            categoryShop.push(category);
    //        }
    //     })
    // })
    // console.log(categoryShop);
}

//切換按鈕顯示或消失

const getSearchType = document.querySelector('.search-type');
const getChoiceArea = document.getElementById('choice-area');
const getChoiceFood = document.getElementById('choice-food');
const getChoiceService = document.getElementById('choice-service');
const getEnterStore = document.getElementById('enter-store');
const getDataPlace = document.querySelector('.data-place');

getSearchType.addEventListener('click',function(e){
    function addDNone(){
        getChoiceArea.classList.add("d-none");
        getChoiceFood.classList.add("d-none");
        getChoiceService.classList.add("d-none");
        getEnterStore.classList.add("d-none");
    }
    if(e.target.tagName!="LABEL"&&e.target.tagName!="INPUT"){
       return;
    }
    switch (e.target.value) {
        case "district-search":{
            addDNone();
            getChoiceArea.classList.remove("d-none");
        break;
        }
        case "food-search":{
            addDNone();
            getChoiceFood.classList.remove("d-none");
            break;
        }
        case "service-search":{
            addDNone();
            getChoiceService.classList.remove("d-none");
            break;
        }
        case "store-search":{
            addDNone();
            getEnterStore.classList.remove("d-none");
            break;
        }
      }
})

function processData(data){
    let districtAry = [];
    let servicesAry =[];
    function getAllDistrictName(data){
        const afterDataSet = new Set();
        data.forEach((item)=>{
            if( afterDataSet.has(item.district)==false){
                afterDataSet.add(item.district)
            }
        })
        return Array.from(afterDataSet);
    }
    districtAry =getAllDistrictName(data);
    districtAry.forEach(function(districtName){
            getChoiceArea.innerHTML += `<option value="${districtName}">${districtName}</option>`
        })

    function getAllServices(data){
        const afterDataSet = new Set();
        data.forEach(function(el){
            if(el.services.length !==0){
                el.services.find(function(e){
                    if( afterDataSet.has(e)==false){
                        afterDataSet.add(e)
                    }
                })
            }
        })
        return Array.from(afterDataSet);
    }
    servicesAry = getAllServices(data);
    servicesAry.forEach((serviceName)=>{
        getChoiceService.innerHTML+=`<option value="${serviceName}">${serviceName}</option>`
    })

    includeService = allDataAry.filter((el)=>{
      return el.services.indexOf(servicesAry[1])!=-1;
    })
    console.log(servicesAry[1]);
    console.log(includeService);
}
getChoiceArea.addEventListener('change',renderInMap);
function renderInMap(e){
    getDataPlace.innerHTML = "";
     partOfDistrctAry = allDataAry.filter((el)=>{
         return el.district ===e.target.value
    })
    for (let i = 0; i < partOfDistrctAry.length; i++) {
        if(partOfDistrctAry[i].lat==null||partOfDistrctAry[i].long==null){
            continue;
        }
        let position =[partOfDistrctAry[i].lat, partOfDistrctAry[i].long];
        markers.addLayer(
            L.marker(position, { icon: greenIcon }).bindPopup(
                `<h1>名稱:${partOfDistrctAry[i].name}</h1>`
    
                )
            
            
            );
    }
    let pos = [partOfDistrctAry[0].lat, partOfDistrctAry[0].long];
    map.setView(pos, 16, {
        animate: true,
        duration: 1
    });
    renderInDataPlace(partOfDistrctAry);
}
function renderInDataPlace(data){
    data.forEach(function(el,idx){
        getDataPlace.innerHTML += `
        <li class="rounded-pill mt-2 px-4 py-1 d-flex flex-column align-items-center" data-num=${idx}>
            <h5 class="text-center fs-5 fw-bold text-blue-800 border-bottom border-dark p-1"><i class="fas fa-store me-1"></i>${el.name}</h5>
            <div class="text-center">
                <i class="fas fa-map-marker-alt text-danger pe-1"></i>
                <span class="text-orange-700">${el.address}</span>
                <br>
                <i class="far fa-clock text-warning"></i>
                <span class="text-orange-700">${el.open_time}</span>
            </div>
        </li>
    `
    })
}

getDataPlace.addEventListener('click',function(e){
    let getDataSetNum = e.target.dataset.num;
    let position = [partOfDistrctAry[getDataSetNum].lat, partOfDistrctAry[getDataSetNum].long];
    map.setView(position, 16, {
        animate: true,
        duration: 1
    });
    console.log(    e.target.nodeName);
    console.log(    e.target.dataset.num);

    // console.log(this);
})
