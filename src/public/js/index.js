const socket = io()

socket.emit("message","Hola, me estoy comunicando con web socket")
socket.on("message2",data=>{
    console.log(data)
})




const productos = document.getElementById("productos")




socket.on("productAdded",data=>{
            let productCard = document.createElement("div")
            productCard.innerHTML=`
                <img src=${data.thumbnails} alt="">
                <h1>ID:${data.id}</h1>
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                <h5>${data.code}</h5>
                <h6>Precio ARS$${data.price}</h6>        
            `
            productos.appendChild(productCard)
        
})