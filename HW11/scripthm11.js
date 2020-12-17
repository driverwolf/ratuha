let btn = document.querySelectorAll('button');
let div = document.querySelectorAll('.info');
for (let i = 0; i < btn.length; i++) {
    div[i].addEventListener('click', () => {
        div[i].style.height = div[i].style.height == '300px' ? '200px' : '300px';
    });
    btn[i].addEventListener('click', () => {
        btn[i].parentNode.parentNode.removeChild(div[i]);
    });
}
