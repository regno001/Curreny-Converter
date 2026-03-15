const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".Exchange")
const fromCurr = document.querySelector(".from select");
const toCurr =document.querySelector(".to select")


for(let select of dropdowns){
   for (currCode in countryList){
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value=currCode;
      if(select.name=== "From" && currCode==="USD"){
        newOption.selected= "selected";
      }
      else if(select.name==="To" && currCode==="INR"){
        newOption.selected= "selected";
      }
     select.append(newOption);
}
select.addEventListener("change" ,(evt)=>{
  updateFlg(evt.target);
})
}

const updateFlg = (element)=>{
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src=newSrc;
};

btn.addEventListener("click" ,async (evt)=>{
  evt.preventDefault();
  let amount = document.querySelector(".amount input")
  let amountVal =amount.value;
  console.log(amountVal);
  if(amountVal === "" || amountVal <1){
    amountVal=1;
    amount.value="1";
  }

  const URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;


  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let para = document.querySelector(".msg");
para.innerText = `${amount.value} ${fromCurr.value} = ${rate} ${toCurr.value}`

})

