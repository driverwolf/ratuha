let div = document.querySelector('.content');
let btn = document.querySelector('button');
let img = document.createElement('img');
img.setAttribute('alt', 'DOG');

if (localStorage.getItem('url')) {
    img.setAttribute('src', localStorage.getItem('url'));
} else {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then((res) => res.json())
        .then((res) => {
            img.setAttribute('src', `${res.message}`);
        })
        .catch((err) => console.error(err));
}
div.append(img);

btn.addEventListener('click', () => {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then((res) => res.json())
        .then((res) => {
            img.setAttribute('src', `${res.message}`);
            localStorage.setItem('url', `${res.message}`);
        })
        .catch((err) => console.error(err));
    div.append(img);
});
