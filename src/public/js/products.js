



async function addToCart(productId,cartId) {
  let response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: "POST",
    body: JSON.stringify({ quantity: 1 }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result = await response.json();
  console.log(result);
}

