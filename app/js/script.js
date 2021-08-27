
const bill = document.getElementById("bill-total");
const customTip = document.getElementById("custom-tip");
const people = document.getElementById("number-of-people");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("tip-total");
const btnReset = document.getElementById("btnReset");
const calculatorForm = document.getElementById("tip-calculator");

let tipObj = {}

function displayTip(tipAmt, totalAmt) {
    if (tipAmt > 0) {
        tipAmount.value = tipAmt;
        totalAmount.value = totalAmt;
    }
}

function calculateTip(obj) {
    let tipPer = 0;
    let totalPer = 0;
    let totalTip = 0;
    if (Object.keys(obj).length == 3) {
        totalTip = obj.bill * obj.tipPercent;
        tipPer = totalTip / obj.noOfPeople;
        totalPer = (parseFloat(obj.bill) + parseFloat(totalTip)) / obj.noOfPeople;
    }
    tipPer = parseFloat(tipPer).toFixed(2);
    totalPer = parseFloat(totalPer).toFixed(2);
    displayTip(tipPer, totalPer);
}

bill.addEventListener('input', event => {
    btnReset.disabled = false;
    tipObj.bill = bill.value;
    calculateTip(tipObj);
})

people.addEventListener('input', event => {
    btnReset.disabled = false;
    tipObj.noOfPeople = people.value;
    calculateTip(tipObj);
})

document.querySelectorAll('.selector__value').forEach(item => {
    item.addEventListener('change', event => {
        btnReset.disabled = false;
        tipObj.tipPercent = item.value / 100;
        calculateTip(tipObj);
    })
  })

customTip.addEventListener('input', event => {
    btnReset.disabled = false;
    document.querySelectorAll('.selector__value').forEach(item => {
        item.checked = false;
    })
    tipObj.tipPercent = customTip.value / 100;
    calculateTip(tipObj);
})

btnReset.addEventListener('click', event => {
    calculatorForm.reset();
    tipObj = {}
    btnReset.disabled = true;
})






