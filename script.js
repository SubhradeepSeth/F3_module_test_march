
let menudata = [];
async function fetchData() {
    try {
              const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
              const data = await response.json();
              menudata = [...data];
              renderTable(menudata);

          localStorage.setItem("user",JSON.stringify(data));
       
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderTable(menuData) {
    let tableBody = document.querySelector("#item");
    menudata.forEach((item) => {
        if (item.price_change_percentage_24h < 0) {
            tableBody.innerHTML += `
        <tr>
        <td><img src="${item.image}"width="20px"></td>
        <td>${item.name}</td>
        <td>${item.symbol}</td>
        <td>$${item.current_price}</td>
        <td>$${item.total_volume}</td>
        <td class="text-color1">${item.price_change_percentage_24h}%</td>
        <td>$${item.market_cap}</td>
        </tr>
        `
        }
        else {
            tableBody.innerHTML += `
        <tr>
        <td><img src="${item.image}"width="20px"></td>
        <td>${item.name}</td>
        <td>${item.symbol}</td>
        <td>$${item.current_price}</td>
        <td>$${item.total_volume}</td>
        <td class="text-color">${item.price_change_percentage_24h}%</td>
        <td>$${item.market_cap}</td>
        </tr>
        `
        }
    })
}
let search1=document.querySelector("#search-items");
search1.addEventListener("input",function(){
    filterData();
})
function filterData(){
    let searchInput=document.querySelector("#search-items").value.toLowerCase();
    let rows=document.querySelectorAll("#item>tr");
    rows.forEach((item)=>{
        let name=item.getElementsByTagName("td")[1].innerText.toLowerCase();
        let symbol=item.getElementsByTagName("td")[2].innerText.toLowerCase();
        if(name.includes(searchInput)||symbol.includes(searchInput)){
            item.style.display="";
        }
        else{
            item.style.display="none";
        }
    });
}
function sortData(column){
    let tbody=document.querySelector("#item");
    let row1=Array.from(tbody.getElementsByTagName('tr'));
    row1.sort((a,b)=>{
        if(column==="marketCap"){
           let avalue=parseFloat(a.getElementsByTagName("td")[6].innerText.replace("$",""));
           let bvalue=parseFloat(b.getElementsByTagName("td")[6].innerText.replace("$",""));
           return bvalue-avalue;
        }
        else{
            let avalue=parseFloat(a.getElementsByTagName("td")[5].innerText.replace("%",""));
           let bvalue=parseFloat(b.getElementsByTagName("td")[5].innerText.replace("%",""));
           return bvalue-avalue;
        }
    });
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
      row1.forEach(row => tbody.appendChild(row));
    
}
fetchData();