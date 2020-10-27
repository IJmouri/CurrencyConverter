// variables

const selectFromCurrency = document.getElementById('select-from-currency');
const selectToCurrency = document.getElementById('select-to-currency');
const fromCurrencyInput = document.querySelector('#from-currency-input');
const toCurrencyValueShow = document.querySelector('#to-currency-value');
const fromCurrencyTextInput = document.querySelector('.from-currency-text-input');
const fromCurrencyText = document.querySelector('.from-currency-text');
const toCurrencyText = document.querySelector('.to-currency-text');

// event listeners


selectFromCurrency.addEventListener('change', calculateCurrency);
fromCurrencyInput.addEventListener('input', calculateCurrency);
selectToCurrency.addEventListener('change', calculateCurrency);

function showFromSelectList(){
    
    $(selectFromCurrency).ddslick({
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
    
    $(selectToCurrency).ddslick({
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

            const data = JSON.parse(request.responseText);
            const selectToCurrencyValue = selectToCurrency.value;
            const rate = data.rates[selectToCurrencyValue];

            toCurrencyValueShow.innerHTML =  (fromCurrencyInput.value * rate ).toFixed(2);
            fromCurrencyTextInput.innerHTML = fromCurrencyInput.value;
            fromCurrencyText.innerHTML = selectFromCurrency.value;
            toCurrencyText.innerHTML = selectToCurrency.value;
            
        }
    }
   
}

calculateCurrency();