let stored_data = window.localStorage.getItem("clicked_data")
let stored_data_1 = window.localStorage.getItem("data")

let dataArray = stored_data.split(",");
let integerArray = dataArray.map((element) => parseInt(element));
console.log(integerArray);

let dataArray_1 = stored_data_1.split(",");
let integerArray_1 = dataArray_1.map((element) => parseInt(element));
console.log(integerArray_1);

let chart = new CanvasJS.Chart("graph", {
    title: {
        text: "Price(past 1 Days) in INR",
        fontSize : 18,
        fontFamily : 'Roboto',
        fontColor: "white",
      },
      axisX: {
        lineColor: "grey",
        tickColor: "grey",
    },
    axisY: {
        lineColor: "grey",
        tickColor: "grey",
        gridThickness: 0
    },
  data: [{
    type: "spline",
    markerType: "none",
    color : "yellow",
    dataPoints: integerArray.map((ele,index) => ({x:index, y:ele}))
  }],
});
chart.options.backgroundColor = "black";
chart.render()

render_data()
function render_data(){
    let html = ""
    html += ` <div id="first_section">
    <img src="${window.localStorage.getItem("icon")}">
    <div class="coin_name">${window.localStorage.getItem("name")}</div>
    <div id="coin_details">
        <div>Rank: ${integerArray_1[0]}</div>
        <div>Current Price: <i class="fa-solid fa-indian-rupee-sign"></i> ${integerArray_1[1]}</div>
        <div>Market Cap: <i class="fa-solid fa-indian-rupee-sign"></i> ${integerArray_1[2]} M</div>
    </div>`

    document.getElementById("first_section").innerHTML = html
}
  


