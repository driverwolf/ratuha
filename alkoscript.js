let formLeft = document.forms['fl'];
let formMid = document.forms['fm'];
let formRight = document.forms['fr'];
let addListItems = document.querySelectorAll('.textarea li');
let addListItemsValues = document.querySelectorAll('.textarea li span');
let resultList = document.querySelector('.result');
let resultListItemsValues = document.querySelectorAll('.result li span');
formMid.add.addEventListener('click', () => {
    event.preventDefault();
    for (let i = 0; i < formMid.choise.length; i++) {
        if (formMid.choise[i].checked) {
            switch (i) {
                case 0:
                    if (alko.getBeer() >= parseInt(formMid.count.value)) {
                        addListItemsValues[i].innerHTML = formMid.count.value;
                        addListItems[i].style.display = 'block';
                    } else {
                        formMid.count.value != ''
                            ? alert(`Вибачте але на складі залишилось beer ${alko.getBeer()} штук`)
                            : alert('Введіть якесь значення');
                    }
                    break;
                case 1:
                    if (alko.getWine() >= parseInt(formMid.count.value)) {
                        addListItemsValues[i].innerHTML = formMid.count.value;
                        addListItems[i].style.display = 'block';
                    } else {
                        formMid.count.value != ''
                            ? alert(`Вибачте але на складі залишилось wine ${alko.getWine()} штук`)
                            : alert('Введіть якесь значення');
                    }
                    break;
                case 2:
                    if (alko.getPepsi() >= parseInt(formMid.count.value)) {
                        addListItemsValues[i].innerHTML = formMid.count.value;
                        addListItems[i].style.display = 'block';
                    } else {
                        formMid.count.value != ''
                            ? alert(`Вибачте але на складі залишилось pepsi ${alko.getPepsi()} штук`)
                            : alert('Введіть якесь значення');
                    }
                    break;
            }
        }
    }
    formMid.buy.removeAttribute('disabled', 'disabled');
});

formMid.buy.addEventListener('click', () => {
    event.preventDefault();
    alko.setBeer(alko.getBeer() - parseInt(addListItemsValues[0].innerHTML));
    alko.setWine(alko.getWine() - parseInt(addListItemsValues[1].innerHTML));
    alko.setPepsi(alko.getPepsi() - parseInt(addListItemsValues[2].innerHTML));
    alko.setNewBalance();
    formLeft.beer.value = alko.getBeer();
    formLeft.wine.value = alko.getWine();
    formLeft.pepsi.value = alko.getPepsi();
    formLeft.balance.value = alko.getBalance();
    resultList.style.display = 'block';
    resultListItemsValues[0].innerHTML = addListItemsValues[0].innerHTML;
    resultListItemsValues[1].innerHTML = addListItemsValues[1].innerHTML;
    resultListItemsValues[2].innerHTML = addListItemsValues[2].innerHTML;
    document.querySelectorAll('.result li')[3].innerHTML = `Всього: ${alko.getTempBalance()} гривень`;
    formMid.buy.setAttribute('disabled', 'disabled');
});

let alko = (function () {
    let balance = 1000;
    const firstBeer = 100;
    const firstWine = 50;
    const firstPepsi = 80;
    let beer = 100;
    let wine = 50;
    let pepsi = 80;
    let priceBeer = 2;
    let priceWine = 2;
    let pricePepsi = 2;
    function calculateNewBalance() {
        balance = 1000 + (firstBeer - beer) * priceBeer + (firstWine - wine) * priceWine + (firstPepsi - pepsi) * pricePepsi;
    }
    function calculateTempBalance() {
        return (
            addListItemsValues[0].innerHTML * priceBeer + addListItemsValues[1].innerHTML * priceWine + addListItemsValues[2].innerHTML * pricePepsi
        );
    }
    return {
        getBalance: function () {
            return balance;
        },
        getBeer: function () {
            return beer;
        },
        getWine: function () {
            return wine;
        },
        getPepsi: function () {
            return pepsi;
        },
        getTempBalance: function () {
            return calculateTempBalance();
        },
        setNewBalance: function () {
            calculateNewBalance();
        },
        setBeer: function (newBeer) {
            beer = newBeer;
        },
        setWine: function (newWine) {
            wine = newWine;
        },
        setPepsi: function (newPepsi) {
            pepsi = newPepsi;
        },
    };
})();
formLeft.balance.value = `${alko.getBalance()}`;
formLeft.beer.value = `${alko.getBeer()}`;
formLeft.wine.value = `${alko.getWine()}`;
formLeft.pepsi.value = `${alko.getPepsi()}`;
