const button = document.getElementById("checkout")
button.addEventListener("click",async (e)=>{
    e.preventDefault();
    const res = await fetch("/api/payment",{
        method: "POST"
    })
    let data = await res.json()
    
    window.location.href= data.url
})
