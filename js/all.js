let allDataAry = [];
let partOfDistrctAry =[] ;
let includeService = [];
let seachTypeStr = '';
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


getEnterStore.children[0].addEventListener('keyup',function(e) {
    if(e.code==108){
    }
})
getEnterStore.children[1]


console.log(getDataPlace);
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
    //清除所選擇的內容且所有select添加d-none
    getDataPlace.innerHTML = "";
    getChoiceArea.value=getChoiceArea.children[0].value;
    getChoiceFood.value=getChoiceFood.children[0].value;
    getChoiceService.value=getChoiceService.children[0].value;
    getEnterStore.value='';
    addDNone();
    switch (e.target.value) {
        case "district-search":{
            seachTypeStr="district";
            getChoiceArea.classList.remove("d-none");
        break;
        }
        case "food-search":{
            seachTypeStr="category";
            getChoiceFood.classList.remove("d-none");
            break;
        }
        case "service-search":{
            seachTypeStr="services";
            getChoiceService.classList.remove("d-none");
            break;
        }
        case "store-search":{
            seachTypeStr="store";
            getEnterStore.classList.remove("d-none");
            break;
        }
      }
})

function processData(data){
    // let districtAry = [];
    // let servicesAry =[];
    // let foodAry = [];
    console.log(data);

    
    putInOption(data,getChoiceFood,'category');
    putInOption(data,getChoiceService,'services');
    putInOption(data,getChoiceArea,'district');

    // function getAllDistrictName(data){
    //     const afterDataSet = new Set();
    //     data.forEach((item)=>{

    //         if( afterDataSet.has(item.district)==false){
    //             afterDataSet.add(item.district)
    //         }
    //     })
    //     return Array.from(afterDataSet);
    // }
    // districtAry =getAllDistrictName(data);
    // districtAry.forEach(function(districtName){
    //         getChoiceArea.innerHTML += `<option value="${districtName}">${districtName}</option>`
    //     })

    // servicesAry = getAllServices(data);
    // console.log(servicesAry);
    // servicesAry.forEach((foodTypeName)=>{
    //     getChoiceService.innerHTML+=`<option value="${foodTypeName}">${foodTypeName}</option>`
    // });

    // includeService = allDataAry.filter((el)=>{
    //   return el.services.indexOf(servicesAry[1])!=-1;
    // })
    // console.log(servicesAry[1]);
    // console.log(includeService);

    // function getAllFoodType(data){
    //     const afterDataSet = new Set();
    //     data.forEach(function(el){
    //         if(el.category.length !==0){
    //             el.category.find(function(e){
    //                 if( afterDataSet.has(e)==false){
    //                     afterDataSet.add(e)
    //                 }
    //             })
    //         }
    //     })
    //     console.log(afterDataSet);
    //     return Array.from(afterDataSet);
    // }
    // foodAry= getAllFoodType(data);
    // foodAry.forEach((serviceName)=>{
    //     getChoiceFood.innerHTML+=`<option value="${serviceName}">${serviceName}</option>`
    // })

}

//從資料選出不重複的值例如區域、服務然後印製各種查詢的選單至下拉式選單
function putInOption(data,getDOM,elObj){
    const afterDataSet = new Set();
    data.forEach(function(el){
        if(Array.isArray(el[elObj])){
            el[elObj].find(function(e){
                if( afterDataSet.has(e)==false){
                    afterDataSet.add(e)
                }
            })
        }else{
            if( afterDataSet.has(el[elObj])==false){
                afterDataSet.add(el[elObj]);
            }
        }
    })
    Array.from(afterDataSet).forEach((objContentName)=>{
        getDOM.innerHTML+=`<option value="${objContentName}">${objContentName}</option>`
    })
}

//監聽按下某區或者某服務的時候的觸發事件
getChoiceArea.addEventListener('change',renderInMap);
getChoiceService.addEventListener('change',renderInMap);
getChoiceFood.addEventListener('change',renderInMap);




//將服務錨點印製到地圖上面且形成popup
function renderPopUp(){
    markers.clearLayers(); //清除先前在地圖上的標記
    for (let i = 0; i < partOfDistrctAry.length; i++) {
        if(partOfDistrctAry[i].lat==null||partOfDistrctAry[i].long==null){
            continue;
        }
        function makeNotYetSuppyly(number,placeParameterStr){
            if(partOfDistrctAry[number][placeParameterStr]==null||partOfDistrctAry[number][placeParameterStr]==""){
                partOfDistrctAry[number][placeParameterStr]='尚未提供';
            }
        }
        makeNotYetSuppyly(i,"tel")
        makeNotYetSuppyly(i,"summary")
        makeNotYetSuppyly(i,"open_time")
        
        let position =[partOfDistrctAry[i].lat, partOfDistrctAry[i].long];
        markers.addLayer(
            L.marker(position, { icon: greenIcon }).bindPopup(
                `<div class="card border-0">
                    <div class="card-body">
                    <h5 class="card-title"><i class="fas fa-store me-1 text-blue-800"></i>${partOfDistrctAry[i].name}</h5>
                        <div class="info-responsive">
                            <p class="mt-1">
                            <i class="fas fa-info-circle pe-1 text-blue-800"></i>${partOfDistrctAry[i].summary}
                            </p>
                        </div>
                        <p class="mt-1">
                            <i class="fas fa-map-marker-alt text-danger pe-1"></i>
                            ${partOfDistrctAry[i].address}
                        </p>
                        <p class="mt-1">
                            <i class="fas fa-phone pe-1">
                            </i>${partOfDistrctAry[i].tel}
                        </p>
                        <p class="mt-1">
                            <i class="far fa-clock text-warning pe-1">
                            </i>
                            ${partOfDistrctAry[i].open_time}
                        </p>
                        ${partOfDistrctAry[i].services.length!=0 ?
                            `<p class="mt-1">
                                <i class="fas fa-concierge-bell text-yellow-400 pe-1"></i>${ partOfDistrctAry[i].services.map((el)=>`${el}`)}
                            </p>`:''
                        }
                        ${partOfDistrctAry[i].category.length!=0 ?
                            `<p class="mt-1">
                            <i class="fas fa-tag text-teal-400 pe-1"></i>${ partOfDistrctAry[i].category.map((el)=>`${el}`)}
                            </p>`:''
                        }
                    </div>
                </div>`,{maxWidth: 280}
            )
        )
    }
    //移動到第零筆資料位置
    
    for(let i=0; i < partOfDistrctAry.length; i++){
            if(partOfDistrctAry[i].lat==null){
                continue;
            }else{
                let pos = [partOfDistrctAry[i].lat, partOfDistrctAry[i].long];
                map.setView(pos, 16, {
                    animate: true,
                    duration: 1
                });
                break;
            }
            
    }
    
}



//將對應的服務或區域過濾出來組成陣列是partOfDistrctAry
function filterAfterAddEvent(elObj,e){
    if(elObj=='services'){
        partOfDistrctAry =allDataAry.filter((el)=>{
            let findServices =  el[elObj].find(el=>{
                return el===e.target.value;
            })
            return findServices;
       })  
    }else if(elObj=='district'){
        partOfDistrctAry = allDataAry.filter((el)=>{
            return el[elObj] ===e.target.value
       })
    }else if(elObj=='category'){
        // console.log(category);
        partOfDistrctAry =allDataAry.filter((el)=>{
            let findServices =  el[elObj].find(el=>{
                return el===e.target.value;
            })
            return findServices;
       })  
    }

}



//監聽事件觸發某區域、服務或是美食類型所做的事情
function renderInMap(e){
    getDataPlace.innerHTML = "";
    filterAfterAddEvent(seachTypeStr,e); //得到區域的陣列
    console.log(partOfDistrctAry);
    // filterAfterAddEvent("services",e);
    // console.log(partOfDistrctAry,"district");
    renderPopUp();
    renderInDataPlace(partOfDistrctAry,seachTypeStr);
}
//將區域標記印製在ul上面
function renderInDataPlace(data,searchType){
    data.forEach(function(el,idx){
        if(el.open_time==false){el.open_time="尚未提供"};
        getDataPlace.innerHTML += `
        <li class="rounded mt-2 px-2 py-2 d-flex flex-column align-items-center" data-num=${idx}>
            <h5 class="text-center fs-5 fw-bold text-blue-800 border-bottom border-dark p-1"><i class="fas fa-store me-1"></i>${el.name}</h5>
            <div class="text-center">
                <i class="fas fa-map-marker-alt text-danger pe-1"></i>
                <span class="text-orange-700">${el.address}</span>
                <br>
                <i class="far fa-clock text-warning"></i>
                <span class="text-orange-700">${el.open_time}</span>
                ${searchType=="services" ?
                    `<br><i class="fas fa-concierge-bell text-yellow-400 pe-1"></i>${el.services}`:''
                }
                ${searchType=="category" ?
                `<br><i class="fas fa-tag text-teal-400 pe-1"></i>${el.category}` :'' 
                }
            </div>
        </li>
    `
    })
}

//當ul印製出的內容被點選時地圖移向該錨點
getDataPlace.addEventListener('click',function(e){
    if(e.target.nodeName=="UL"){return}
    let getDataSetNum = e.target.dataset.num;
    let position = [partOfDistrctAry[getDataSetNum].lat, partOfDistrctAry[getDataSetNum].long];
    map.setView(position, 16, {
        animate: true,
        duration: 1
    });
})
