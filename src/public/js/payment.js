const button = document.getElementById("checkout")
button.addEventListener("click",async (e)=>{
    e.preventDefault();
    const res = await fetch("/api/payment",{
        method: "POST"
    })
    const data = await res.json()
    window.location.href="https://checkout.stripe.com/c/pay/cs_test_b15ZIAht4Se2IOc7Zy11x5JswsEQ5fsUwrMdYIQQriX7nuD7ZAt9wvgA3i#fidkdWxOYHwnPyd1blpxYHZxWjA0S2Jmf1VCY2ZMU3dmQzBPRFVMPF9iTnRCV2NyQktuZzJMf0ZDRDdRXFd1R21LalBzfDxVfGZhaGpBTGYyV3BhQ081Ul9wMUY8MlAxRG9DdE0zcGljSmMwNTVwVHZ9QWFnYScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl"
})
