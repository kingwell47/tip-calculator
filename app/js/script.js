
const bill = document.getElementById("bill-total");
const customTip = document.getElementById("custom-tip");
const people = document.getElementById("number-of-people");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("tip-total");
const btnReset = document.getElementById("btnReset");
const calculatorForm = document.getElementById("tip-calculator");

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

function errorHandler(input, message) {
    let parentElem = input.parentElement;
    let errorSpan = parentElem.querySelector('.error_message');

    errorSpan.innerText = message;
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
    //Check if input is valid
    if (!bill.checkValidity() || bill.value.length > 15) {
        errorHandler(bill, 'Sorry, invalid bill amount');
    } else {
        errorHandler(bill, '');
        enableResetBtn();
        tipObj.bill = bill.value;
        calculateTip(tipObj);
    }

})

people.addEventListener('input', event => {
    if (!people.checkValidity() || people.value == 0 || people.value.length > 15) {
        errorHandler(people, "Can't be that number")        
    } else {
        errorHandler(people, "");
        enableResetBtn();
        tipObj.noOfPeople = people.value;
        calculateTip(tipObj);
    }    
})

document.querySelectorAll('.selector__value').forEach(item => {
    item.addEventListener('change', event => {
        enableResetBtn();        
        tipObj.tipPercent = item.value / 100;
        customTip.value = "";
        errorHandler(customTip, "");
        calculateTip(tipObj);
    })
  })

customTip.addEventListener('input', event => {
    document.querySelectorAll('.selector__value').forEach(item => {
        item.checked = false;
    })
    if (!customTip.checkValidity || customTip.value.length > 5) {
        errorHandler(customTip, "Invalid amount");
    } else {
        errorHandler(customTip, "");
        enableResetBtn();
        tipObj.tipPercent = customTip.value / 100;
        calculateTip(tipObj);
        }
    }
)

btnReset.addEventListener('click', event => {
    calculatorForm.reset();    
    tipObj = {}
    tipAmount.innerText = "$0.00";
    totalAmount.innerText = "$0.00";
    errorHandler(bill, "");
    errorHandler(people, "");
    errorHandler(customTip, "");
    btnReset.disabled = true;
})






