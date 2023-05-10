const render_data = document.getElementById("display_data")

const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
const option = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '857dde80f8mshc893ff4bb4f7631p1c16f0jsna9987e3aeb34',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

init()
function init(){
    get_Data()
}
async function get_Data(){
    const data = await fetch(url,option)
    const response = await data.text()
    const result = JSON.parse(response)
    console.log(result.data.coins)
    rendering_data(result)
    create_chart(result)
}
function rendering_data(data){
    let html = ""
    const num_change = new Intl.NumberFormat('en-US');
    let graph_change = ""
    let color = ""
    data.data.coins.forEach((ele,index)=>{
      if(ele.change>0){
        graph_change = "up"
        color = "green"
      }
      else{
        graph_change = "down"
        color = "red"
      }
        html += ` <div id="coin_ranking"><div id="coin_name">
        <i style="margin-left: 10px; color: gray;" class="fa-regular fa-star"></i>
        <div class="number" >${index+1}</div>
        <div>
            <img style="width: 20px; cursor: pointer;" src="${ele.iconUrl}">
        </div>
        <div id="crypto_name"><a href="history.html">${ele.name}</a></div>
    </div>
   <div id="coin_details">
        <div style="color: grey;">$${num_change.format(ele.marketCap)}</div>
        <div>$${ele.price.slice(0,8)}</div>
        <div style="margin-left:17px">$${num_change.format(ele["24hVolume"])}</div>
   </div>
   <div id="coin_info">
        <div style="color: grey;">${ele.listedAt} ${ele.symbol}</div>
        <div id="${color}"><i class="fa-solid fa-arrow-${graph_change}"></i>${ele.change}%</div>
   </div>

   <div id="chartContainer_${index+1}"></div>
   </div>`
  })
  render_data.innerHTML = html
  data.data.coins.forEach((ele,index)=>{
  document.getElementById(`chartContainer_${index+1}`).style.width = '120px'
  document.getElementById(`chartContainer_${index+1}`).style.marginLeft = '-40px'
  document.getElementById(`chartContainer_${index+1}`).style.marginRight = '50px'
  document.getElementById(`chartContainer_${index+1}`).style.marginTop = '-10.5px'
 })
 clicked_data(data)
}

function clicked_data(data){
  console.log(data)

  const container = document.querySelectorAll("#coin_name #crypto_name a")

  container.forEach((ele,index) =>{
    ele.addEventListener("click",()=>{
      if(container[index].innerHTML == data.data.coins[index].name){
        window.localStorage.setItem("clicked_data",[data.data.coins[index].sparkline])
        window.localStorage.setItem("icon",[data.data.coins[index].iconUrl])
        window.localStorage.setItem("name",[data.data.coins[index].name])
        window.localStorage.setItem("data",[data.data.coins[index].rank,data.data.coins[index].price,data.data.coins[index].marketCap])
        // new_array.push(data.data.coins[index].sparkline)
        // console.log(data.data.coins[index].sparkline)
        // // For poping the elements
        // if(new_array.length>1){
        //   new_array.pop()
        // }
      }
    })
  })
  // let int_data = new_array.map(ele => parseInt(ele))
 
  console.log(container)
}

function create_chart(data){
  data.data.coins.forEach((ele, index) => {
    let graph_data = ele.sparkline.map(ele1 => parseInt(ele1));
    let chart = new CanvasJS.Chart(`chartContainer_${index + 1}`, {
      axisX: {
        lineThickness: 0,
        tickThickness: 0,
        labelFontSize: 0
      },
      axisY: {
        lineThickness: 0,
        tickThickness: 0,
        labelFontSize: 0,
        gridThickness: 0
      },
      data: [{
        type: "spline",
        markerType: "none",
        dataPoints: graph_data.map((value, index) => ({ x: index, y: value }))
      }]
    });
    chart.render();
  });

}