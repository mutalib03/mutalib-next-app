
function ExchangeRate(source , target) {
    let exchangeRate

 if (source === "USD" && target === "USD") {
     exchangeRate = 1
  } else if (source === "USD" && target === "NGN"){
    exchangeRate = 416.15
  }else if (source === "USD" && target === "EUR"){
    exchangeRate = 0.88
  }  

   if (source === "NGN" && target === "NGN") {
     exchangeRate = 1
  } else if (source === "NGN" && target === "USD"){
    exchangeRate = 0.0024
  }else if (source === "NGN" && target === "EUR"){
    exchangeRate = 0.0021
  }  

   if (source === "EUR" && target === "EUR") {
     exchangeRate = 1
  } else if (source === "EUR" && target === "USD"){
    exchangeRate = 1.14
  }else if (source === "EUR" && target === "NGN"){
    exchangeRate = 473.31
  }  

return exchangeRate
}

export default ExchangeRate

