const Form = {
  nameInput: document.querySelector("#name"),
  lastNameInput: document.querySelector("#lastname"),
  kmToGoInput: document.querySelector("#km-to-go"),
  ageInput: document.querySelector("#age"),

  submit: (e) => {
    e.preventDefault()
    const tableRow = document.querySelector("#table-row")
    const nameValue = Form.nameInput.value
    const lastNameValue = Form.lastNameInput.value
    const kmToGoValue = Number(Form.kmToGoInput.value)
    const ageValue = Number(Form.ageInput.value)

    if (isNaN(ageValue) || isNaN(kmToGoValue)) {
      alert("inserire valori numerici alla voce età e km da percorrere")
    } else {
      if (
        nameValue != "" &&
        lastNameValue != "" &&
        ageValue != "" &&
        kmToGoValue != ""
      ) {
        Output.fillHtmlTable(nameValue, lastNameValue, kmToGoValue, ageValue)
      } else {
        tableRow.innerHTML = `<td class="error-td"  colspan="5" >
        <span class="error">inserisci dati validi</span>
      </td>`

        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    }
  },

  reload: () => {
    Form.nameInput.value = ""
    Form.lastNameInput.value = ""
    Form.kmToGoInput.value = ""
    Form.ageInput.value = ""
  },
}
const form = document.querySelector("form")

const Output = {
  fillHtmlTable: (name, lastName, kmToGo, age) => {
    const nameElement = document.querySelector("#table-name")
    const lastnameElement = document.querySelector("#table-lastname")
    const kmToGoElement = document.querySelector("#table-km-to-go")
    const discountElement = document.querySelector("#table-discount")
    const priceElement = document.querySelector("#table-price")

    nameElement.innerHTML = name
    lastnameElement.innerHTML = lastName
    kmToGoElement.innerHTML = kmToGo + "km"
    discountElement.innerHTML = Utils.calculatePrice(age, kmToGo).discount
    priceElement.innerHTML = Utils.calculatePrice(age, kmToGo).price + "€"

    Form.reload()
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

form.addEventListener("submit", Form.submit)
