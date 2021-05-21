var url ="../json/shops_zh-tw.json";
// var url ="https://opengov.tainan.gov.tw:443/OpenApi/api/service/Get/bb7ba3ff-1974-4400-9a41-2aa803045550";
// let viewData =[];
fetch(url, {
    method: "GET",
    mode: "cors",
    header: new Headers({
      "Content-Type": "text/json",
    }),
})
.then(function (response) {
    return response.json();
    console.log(response);
})
.then(function (result) {
    console.log(result);
    printMarket(result);

});




var map = L.map('map', {
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

var markers = new L.MarkerClusterGroup().addTo(map);


function printMarket(data) {
    for (let i = 0; i < data.length; i++) {
        if(data[i].lat==null||data[i].long==null){
            continue;
        }
        markers.addLayer(L.marker([data[i].lat, data[i].long], { icon: greenIcon }).bindPopup(`<h1>名稱:${data[i].name}</h1>`));
    }
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

var firstTabEl = document.querySelector('#nav-tab');
  var firstTab = new bootstrap.Tab(firstTabEl);




