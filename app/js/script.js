
const bill = document.getElementById("bill-total");
const customTip = document.getElementById("custom-tip");
const people = document.getElementById("number-of-people");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("tip-total");
const btnReset = document.getElementById("btnReset");
const calculatorForm = document.getElementById("tip-calculator");
const errorMessage = document.getElementById("invalid-message")

let tipObj = {}

function displayTip(tipAmt, totalAmt) {
    if (tipObj.bill == 0) {
        tipAmount.innerText = "$0.00";
        totalAmount.innerText = "$0.00";
    } else if (tipAmt > 0) {
        tipAmount.innerText = "$" + tipAmt;
        totalAmount.innerText = "$" + totalAmt;
    }
}

function inputCheck(input) {
    if (input.length > 20) {
        return "";
    }
    return input.replace(/(-|\+)/, "");
}

function enableResetBtn() {
    if (btnReset.disabled) {
        btnReset.disabled = false;
    }
}

function calculateTip(obj) {
    let tipPer = 0;
    let totalPer = 0;
    let totalTip = 0;
    if (Object.keys(obj).length == 3 && obj.noOfPeople > 0) {
        totalTip = obj.bill * obj.tipPercent;
        tipPer = totalTip / obj.noOfPeople;
        totalPer = (parseFloat(obj.bill) + parseFloat(totalTip)) / obj.noOfPeople;
    }
    tipPer = parseFloat(tipPer).toFixed(2);
    totalPer = parseFloat(totalPer).toFixed(2);
    displayTip(tipPer, totalPer);
}

bill.addEventListener('input', event => {
    
    bill.value = inputCheck(bill.value); //resets if invalid input is detected
    if (bill.value < 0) {
        bill.value = Math.abs(bill.value); //prevents negative numbers
    }    
    enableResetBtn();
    tipObj.bill = bill.value;
    calculateTip(tipObj);
})

people.addEventListener('input', event => {
    if (!people.checkValidity() || people.value == 0) {
        errorMessage.innerText = "Can't be that number"        
    } else {
        errorMessage.innerText = ""
        enableResetBtn();
        tipObj.noOfPeople = people.value;
        calculateTip(tipObj);
    }    
})

document.querySelectorAll('.selector__value').forEach(item => {
    item.addEventListener('change', event => {
        enableResetBtn();        
        tipObj.tipPercent = item.value / 100;
        calculateTip(tipObj);
    })
  })

customTip.addEventListener('input', event => {
    customTip.value = inputCheck(customTip.value); //resets if invalid input detected
    if (customTip.value < 0) {
        customTip.value = Math.abs(customTip.value); //prevents negative numbers
    }      
    enableResetBtn();
    document.querySelectorAll('.selector__value').forEach(item => {
        item.checked = false;
    })
    if (customTip.value <= 100) { //prevents over 100%
        tipObj.tipPercent = customTip.value / 100;
        calculateTip(tipObj);
    }
})

btnReset.addEventListener('click', event => {
    calculatorForm.reset();    
    tipObj = {}
    tipAmount.innerText = "$0.00";
    totalAmount.innerText = "$0.00";
    errorMessage.innerText = ""
    btnReset.disabled = true;
})






