//地區
let RegionOption = ["三民區", "仁武區", "內門區", "六龜區", "前金區", "前鎮區", "大寮區", "大樹區", "大社區", "小港區", "岡山區", "左營區", "彌陀區", "新興區", "旗山區", "旗津區", "杉林區", "林園區", "桃源區", "梓官區", "楠梓區", "橋頭區", "永安區", "湖內區", "燕巢區", "田寮區", "甲仙區", "美濃區", "苓雅區", "茂林區", "茄萣區", "路竹區", "那瑪夏區", "阿蓮區", "鳥松區", "鳳山區", "鹽埕區", "鼓山區"];
//郵遞區號
let Zip = ["807", "814", "845", "844", "801", "806", "831", "840", "815", "812", "820", "813", "827", "800", "842", "805", "846", "832", "848", "826", "811", "825", "828", "829", "824", "823", "847", "843", "802", "851", "852", "821", "849", "822", "833", "830", "803", "804"];
//定義輸入欄
let region = document.getElementById('region');
let option = "<option disabled selected>- -請選擇行政區- -</option>";
let list = [];

// 選擇到的資料儲存到此陣列
let filter = [];
// 總頁數
let totalPage = 0;
// 設定當前頁數
let currentPage = 1;
// 設定顯示的地區
let selectedPlace = "";
// 設定要顯示頁數的HTML標籤
let pageStr = "";
// 頁籤顯示
let links;
// 設定底下顯示頁數筆數
const displayPage = 5;
// 每頁顯示卡片數
const cardNumber = 6;

//顯示資料
function show_card(thisPage, finalCard) {
    //先清除卡片欄所有元素，因為使用append會累加
    let card_remove = document.querySelectorAll('.card');
    for (let i = 0; i < card_remove.length; i++) {
        document.querySelector('.attractions').removeChild(card_remove[i]);
    }
    //設定要顯示的卡片數
    let lastCardNumber = cardNumber;
    if (finalCard % lastCardNumber != 0) {
        lastCardNumber = finalCard;
    }
    // 新增卡片
    for (let i = ((thisPage - 1) * cardNumber); i < ((thisPage - 1) * cardNumber + lastCardNumber); i++) {
        let location = filter[i];
        //卡片最外圈
        let card = document.createElement('div');
        card.className = 'card';
        //圖片外層
        let picContainer = document.createElement('div');
        picContainer.className = 'img-fluid';
        //圖片標題
        let pic = document.createElement('div');
        pic.className = 'pic';
        pic.setAttribute('style', `background-image: url("${location.Picture1}")`);
        //圖片內文字
        let h3 = document.createElement('h3');
        let text_h3 = document.createTextNode(location.Name);
        h3.appendChild(text_h3);
        let place = document.createElement('p');
        let place_text = document.createTextNode(location.Add.substr(6, 3));
        place.appendChild(place_text);
        pic.appendChild(h3);
        pic.appendChild(place);
        picContainer.appendChild(pic);
        card.appendChild(picContainer);
        //詳細資料
        let content = document.createElement('div');
        content.className = 'content';
        card.appendChild(content);
        //卡片內敘述
        //營業時間
        let time_logo = document.createElement('img');
        time_logo.setAttribute('src', './assets/icons_clock.png');
        let time = document.createElement('p');
        let time_text = document.createTextNode(' ' + location.Opentime);
        time.appendChild(time_logo);
        time.appendChild(time_text);
        content.appendChild(time);
        //地址
        let addr_logo = document.createElement('img');
        addr_logo.setAttribute('src', './assets/icons_pin.png');
        let addr = document.createElement('p');
        let addr_text = document.createTextNode(' ' + location.Add);
        addr.appendChild(addr_logo);
        addr.appendChild(addr_text);
        content.appendChild(addr);
        //電話
        let tel_logo = document.createElement('img');
        tel_logo.setAttribute('src', './assets/icons_phone.png');
        let tel = document.createElement('p');
        let tel_text = document.createTextNode(' ' + location.Tel);
        tel.appendChild(tel_logo);
        tel.appendChild(tel_text);
        content.appendChild(tel);
        //收費
        let fee_logo = document.createElement('img');
        fee_logo.setAttribute('src', './assets/icons_tag.png');
        let fee = document.createElement('p');
        let fee_text = document.createTextNode(' 要收費');
        if (location.Ticketinfo == "") {
            fee_text = document.createTextNode('免費參觀');
        }
        fee.appendChild(fee_logo);
        fee.appendChild(fee_text);
        content.appendChild(fee);

        document.querySelector('.attractions').appendChild(card);
    }
}
//顯示頁數
function show_pages() {
    pageStr = "";
    pageStr += "<li><a href='#' id='prev'>< prev</a> </li>";
    for (let i = 0; i < totalPage; i++) {
        pageStr += `<li><a href='#'>${i + 1}</a></li>`
    }
    pageStr += "<li><a href='#' id='next'>next ></a> </li>";
    document.querySelector('.pages ul').innerHTML = pageStr;
    currentPage = 1;
    links = document.querySelectorAll('.pages ul a');

    //隱藏超出範圍，一樣要考量到prev與next做加減 
    if (currentPage <= displayPage) {
        for (let i = displayPage + 1; i < links.length - 1; i++) {
            links[i].style.display = "none";
        }
    }
    links[1].style.color = "#559AC8";
}
//變換往前，往後箭頭顏色。當到達最後或首頁即變色不能點擊 
function arrow_color() {
    if (currentPage == 1) {
        links[0].style.opacity = 0.5;
        links[0].style.cursor = "default";
    } else {
        links[0].style.opacity = 1;
        links[0].style.cursor = "pointer";
    }
    if (currentPage == totalPage) {
        links[totalPage + 1].style.opacity = 0.5;
        links[totalPage + 1].style.cursor = "default";
    }
    else {
        links[totalPage + 1].style.opacity = 1;
        links[totalPage + 1].style.cursor = "pointer";
    }
}
// 顯示當前頁面頁籤顏色
function page_color() {
    for (let j = 0; j < links.length; j++) {
        if (j == currentPage) {
            links[j].style.color = "#559AC8";
        } else {
            links[j].style.color = "#4A4A4A";
        }
    }
    arrow_color();
}
//改變標題以及輸入要顯示的資訊
function add_item(area, zip) {
    document.querySelector('.area h2').textContent = area;
    region.value = area;
    //移除全部元素
    filter = [];
    if (area == "全部") {
        for (let i = 0; i < Zip.length; i++) {
            for (let j = 0; j < list.data.XML_Head.Infos.Info.length; j++) {
                if (Zip[i] == list.data.XML_Head.Infos.Info[j].Zipcode) {
                    filter.push(list.data.XML_Head.Infos.Info[j]);
                }
            }
        }
    } else {
        for (let i = 0; i < list.data.XML_Head.Infos.Info.length; i++) {
            if (zip == list.data.XML_Head.Infos.Info[i].Zipcode) {
                filter.push(list.data.XML_Head.Infos.Info[i]);
            }
        }
    }
    //顯示當前頁面卡片
    let displayCard = cardNumber;
    if (filter.length < displayCard) displayCard = filter.length;
    show_card(1, displayCard);
    selectedPlace = area;
    //console.log(filter);
    if (filter.length % displayCard == 0) {
        totalPage = filter.length / displayCard;
    } else {
        totalPage = Math.ceil(filter.length / displayCard);
    }
    //console.log(totalPage);

    //顯示頁數
    show_pages();

    //變換往前，往後箭頭顏色。當到達最後或首頁即變色不能點擊 
    arrow_color();

    // 顯示當前頁面頁籤顏色
    page_color();

    let prev = links[0];
    let next = links[totalPage + 1];
    let currentCard = 0;

    //往前按鍵
    prev.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            show_card(currentPage, displayCard);
            page_color();
            arrow_color();
        }
    })

    // 往後按鍵 
    next.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentPage < totalPage) {
            currentPage++;
            if (currentPage == totalPage && filter.length < currentPage * displayCard) {
                currentCard = filter.length % displayCard;
            } else {
                currentCard = displayCard;
            }
            show_card(currentPage, currentCard);
            page_color();
            arrow_color();
        }
    })

    //點擊頁面
    for (let i = 1; i <= totalPage; i++) {
        links[i].addEventListener('click', function (e) {
            e.preventDefault();
            currentPage = i;
            if (i == totalPage && displayCard * i > filter.length) {
                currentCard = filter.length % displayCard;
            } else {
                currentCard = displayCard;
            }
            show_card(i, currentCard);
            page_color();
            arrow_color();
            //console.log(currentPage);
        })
    }
}

//地區輸入欄改變狀態時候
region.addEventListener('change', function () {
    let zip;
    if (region.value == "全部") {
        zip = "123";
        add_item(region.value, zip);
    } else {
        zip = Zip[region.selectedIndex - 2];
        add_item(region.value, zip);
    }
});

// 點擊連結換頁
let btns = document.querySelectorAll('.hotspot a');
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function (e) {
        e.preventDefault();
        region.value = btns[i].textContent;
        add_item(btns[i].textContent, btns[i].dataset.zip);
    })
}

// 箭頭向上到頂，使用遞迴寫法
function scrollToTop() {
    setTimeout(() => {
        if (document.documentElement.scrollTop > 0) {
            document.documentElement.scrollTop -= 15;
            this.scrollToTop();
        }
    }, 1);
}

// 定義向上箭頭圖示
let arrow = document.querySelector('.arrow');
arrow.addEventListener('click', function (e) {
    e.preventDefault();
    scrollToTop();
});

// 監聽滾動時候的狀態，隱藏箭頭
window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        arrow.style.display = "block";
    } else {
        arrow.style.display = "none";
    }
})

// 監聽點擊時候的狀態，每當點擊時候判斷currentPage的值進而切換顯示頁面
window.addEventListener('click', function () {
    let links = document.querySelectorAll('.pages ul a');
    // 顯示起始頁與結束頁
    let start = 0, end = 0;
    // 顯示最初的5頁
    if (currentPage <= displayPage) {
        for (let i = displayPage + 1; i < links.length - 1; i++) {
            links[i].style.display = "none";
        }
        // 前後prev與next兩元素要加到長度裡面
        if (links.length > displayPage + 2) {
            for (let i = 1; i <= displayPage; i++) {
                links[i].style.display = "block";
            }
        }
    }
    // 當前頁面剛好是5的倍數，也就是所謂邊界條件
    if (currentPage % displayPage == 0) {
        // 起始頁本身要算進去，故需要+1
        start = currentPage - (displayPage) + 1;
        end = currentPage;
    } else {
        // 非5倍數時候，需要判斷是在5的多少倍範圍內
        start = Math.floor(currentPage / displayPage) * displayPage + 1;
        end = Math.ceil(currentPage / displayPage) * displayPage;
    }
    // prev以及next要顯示出來，因此第0項與最後一項要扣除 
    for (let i = 1; i < links.length - 1; i++) {
        links[i].style.display = "none";
    }
    // 最後一頁時候，尾頁會超過總頁數故將此縮到總頁數，link需扣除prev以及next故-2
    if (end > (links.length - 2)) {
        end = links.length - 2;
    } else {
        end = end;
    }
    // 顯示供使用者按的按鈕 
    for (let j = start; j <= end; j++) {
        links[j].style.display = "block";
    }

})

// 啟動時候監聽
window.addEventListener('load', function () {
    // 地區輸入欄資訊
    option += "<option>全部</option>"
    for (let i = 0; i < RegionOption.length; i++) {
        option += "<option>" + RegionOption[i] + "</option>";
    }
    region.innerHTML = option;

    //ajax取得資料
    let xhr = new XMLHttpRequest();
    let loading = document.getElementById('loading');
    let backdrop = document.getElementById('backdrop');
    xhr.onreadystatechange = function () {
        loading.style.display = "block";
        backdrop.style.display = "block";
        if (this.readyState == 4 && this.status == 200) {
            list = JSON.parse(this.responseText);
            // 顯示全部資料
            add_item("全部", "123");
            // 讀取資料後關閉讀取圖示 
            loading.style.display = "none";
            backdrop.style.display = "none";
        }
    }
    xhr.open('GET', 'https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c', true);
    xhr.send();
})