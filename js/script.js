const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const nameInput = document.querySelector("#name")
  const lastNameInput = document.querySelector("#lastname")
  const kmToGoInput = document.querySelector("#km-to-go")
  const ageInput = document.querySelector("#age")
  const nameValue = nameInput.value
  const lastNameValue = lastNameInput.value
  const kmToGoValue = Number(kmToGoInput.value)
  const ageValue = Number(ageInput.value)

  Output.fillHtmlTable(nameValue, lastNameValue, kmToGoValue, ageValue)
})

const Output = {
  fillHtmlTable: (name, lastName, kmToGo, age) => {
    const nameElement = document.querySelector("#table-name")
    const lastnameElement = document.querySelector("#table-lastname")
    const kmToGoElement = document.querySelector("#table-km-to-go")
    const discountElement = document.querySelector("#table-discount")
    const priceElement = document.querySelector("#table-price")

    nameElement.innerHTML = name
    lastnameElement.innerHTML = lastName
    kmToGoElement.innerHTML = kmToGo
    discountElement.innerHTML = Utils.calculatePrice(age, kmToGo).discount
    priceElement.innerHTML = Utils.calculatePrice(age, kmToGo).price
  },
}

const Utils = {
  calculatePrice: (ageInitial, kmToGo) => {
    const priceToKm = 0.21
    let discount = 0

    let price = priceToKm * kmToGo

    if (ageInitial == 1) {
      discount = 20
    } else if (ageInitial == 3) {
      discount = 40
    }

    if (discount != 0) {
      const valueToBeDiscounted = price * (discount / 100)
      price = (price - valueToBeDiscounted).toFixed(2)
      discount += "%"
    } else {
      discount = "-"
    }

    return { price, discount }
  },
}
