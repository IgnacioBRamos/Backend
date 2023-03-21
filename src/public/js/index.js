
const socket = io()

socket.emit("message","Hola, me estoy comunicando con web socket")
socket.on("message2",data=>{
    console.log(data)
})




const productos = document.getElementsByClassName("productos")[0];

socket.on("productAdded",data=>{
    console.log(data)
    data.forEach(element => {
        let productCard = document.createElement("div")
        productCard.innerHTML=`
            <h2>${element.title}</h2>
            <p>${element.description}</p>
            <h5>${element.code}</h5>
            <h6>Precio ARS$${element.price}</h6>        
        `
        productos.append(productCard)
    });
})