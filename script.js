

 // position size section   
let risk= document.getElementById("risk")
let stop = document.getElementById("stop")
let value = document.getElementById("Value")

function positionSize () {

    let size = Number(risk.value) / 
               (Number(stop.value) * Number(value.value))

    let res = document.getElementById("sizeResult")
    res.innerText = "The Position Size =" + " " + (size)
    res.classList.add("show")


}


// risk amount section
let margin = document.getElementById("margin")
let percent= document.getElementById("percent")

function riskManagment () {

    let risk = Number(margin.value) * (Number(percent.value) / 100)
             

    let res = document.getElementById("riskResult")
    res.innerText = "The Risk Amount =" + " " + (risk) + "$"
    res.classList.add("show")

}


