// variables

let selectFromCurrency = document.getElementById('select-from-currency');
let selectToCurrency = document.getElementById('select-to-currency');
let fromCurrencyInput = document.querySelector('#from-currency-input');
let toCurrencyValueShow = document.querySelector('#to-currency-value');
let fromCurrencyTextInput = document.querySelector('.from-currency-text-input');
let fromCurrencyText = document.querySelector('.from-currency-text');
let toCurrencyText = document.querySelector('.to-currency-text');

// event listeners


selectFromCurrency.addEventListener('change', calculateCurrency);
fromCurrencyInput.addEventListener('input', calculateCurrency);
selectToCurrency.addEventListener('change', calculateCurrency);

function showFromSelectList(){
    
    $('#select-from-currency').ddslick({
        width:'100%',
        maxHeight: "300px",
        imagePosition: 'left',
        // selectText: 'select country',
        onSelected: function(selectedData){
            calculateCurrency();
        }
    });

}
function showToSelectList(){
    
    $('#select-to-currency').ddslick({
        width:'100%',
        imagePosition: 'left',
        maxHeight: "300px",
        // selectText: 'select country',
        onSelected: function(selectedData){
            calculateCurrency();
        }
    });

}

showFromSelectList();
showToSelectList();

// calculate currency

function calculateCurrency() {
    
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.exchangerate-api.com/v4/latest/' + selectFromCurrency.value, true);
    request.send();

    request.onreadystatechange = function handleRequest() {
        if (request.readyState === 4 && request.status === 200) {

            let data = JSON.parse(request.responseText);
            let selectToCurrencyValue = selectToCurrency.value;
            let rate = data.rates[selectToCurrencyValue];

            toCurrencyValueShow.innerHTML =  (fromCurrencyInput.value * rate ).toFixed(2);
            fromCurrencyTextInput.innerHTML = fromCurrencyInput.value;
            fromCurrencyText.innerHTML = selectFromCurrency.value;
            toCurrencyText.innerHTML = selectToCurrency.value;
            
        }
    }
   
}

calculateCurrency();