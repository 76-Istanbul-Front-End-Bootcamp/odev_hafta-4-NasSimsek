const data = {
  USD: { EUR: 0.82, GBP: 0.74, CHF: 0.89 },
  EUR: { USD: 1.23, GBP: 0.91, CHF: 1.08 },
  GBP: { USD: 1.35, EUR: 1.1, CHF: 1.19 },
  CHF: { USD: 1.12, EUR: 0.92, GBP: 0.83 }
};


const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName) {
  for (let i = 0; i < elements.length; i++) {
    const currencyKeyDiv = document.createElement("div");

    const currencyKeyInput = document.createElement("input");

    currencyKeyInput.setAttribute("type", "radio");

    currencyKeyInput.setAttribute("name", inputName);

    currencyKeyInput.setAttribute("id", inputName + elements[i]);

    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");

    currencyKeyLabel.setAttribute("for", inputName + elements[i]);

    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);

    root.appendChild(currencyKeyDiv);
  }
}

// from icin fonksiyonu cagiralim
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to icin fonksiyonu cagiralim
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);

// calculate butonunu getirelim.
const calculateButton = document.querySelector("#calculate-button");

calculateButton.addEventListener("click", function() {
  const btnfromtar = document.querySelector(
    "input[name='currency_from']:checked"
  );
  const btntotar = document.querySelector("input[name='currency_to']:checked");
  const currencyResult = document.querySelector("#currency-result");

  if (btnfromtar || btntotar) {
    if ((btnfromtar && !btntotar) || (!btnfromtar && btntotar)) {
      if (btnfromtar) alert("Lütfen To alanı için seçim yapınız");
      else alert("Lütfen From alanı için seçim yapınız ");
    } else if (btnfromtar && btntotar && btnfromtar.value == btntotar.value) {
      alert("Lütfen farklı seçimler yapınız");
    } else {
      const fromTarget = btnfromtar.value;
      const toTarget = btntotar.value;
      const amount = document.querySelector("input[name='amount']").value;

      if (Number(amount)) {
        const currentCurrencyObject = data[fromTarget];

        const resultForOne = currentCurrencyObject[toTarget];

        const result = amount * resultForOne;

        currencyResult.innerHTML =
          amount + " " + fromTarget + " = " + result + " " + toTarget;
      } else
        currencyResult.innerHTML =
          "Lütfen Amount için geçerli bir değer(sayı) giriniz";
    }
  } else alert("Lütfen her iki alan  için de seçim yapınız");
});