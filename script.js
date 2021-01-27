async function getMovieInfo(titleMovie) {
    return new Promise((resolve, reject) => {
        fetch(`http://www.omdbapi.com/?apikey=80cd4a4e&t=${titleMovie}`)
            .then((res) => res.json())
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}

function draw(count, obj) {
    let table = document.createElement('table');
    let i = 0;
    for (const info in obj) {
        if (i === count) return table;
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        td1.innerHTML = info;
        if (Array.isArray(obj[info])) {
            for (const ob of obj[info]) {
                for (const item in ob) {
                    td2.innerHTML += ob[item] + ' ';
                    console.log(ob[item]);
                }
                td2.innerHTML += '<br>';
            }
            tr.append(td1);
            tr.append(td2);
            table.append(tr);
            continue;
        }
        td2.innerHTML = obj[info];
        tr.append(td1);
        tr.append(td2);
        table.append(tr);
        i++;
    }
    return table;
}
function biuld(obj) {
    document.body.append(draw(5, obj));
    let wind = document.createElement('div');
    let btn = document.createElement('button');
    let close = document.createElement('button');
    btn.innerHTML = 'More Details';
    document.body.append(btn);
    btn.addEventListener('click', () => {
        wind.className = 'wind';
        document.body.style.background = 'rgb(117, 100, 100)';
        wind.append(draw(Object.keys(obj).length, obj));
        document.body.append(wind);
        close.innerHTML = 'Close';
        wind.append(close);
    });
    close.addEventListener('click', () => {
        wind.innerHTML = '';
        wind.parentNode.removeChild(wind);
        document.body.style.background = 'white';
    });
}
async function main(titleMovie) {
    let movie = await getMovieInfo(titleMovie);
    biuld(movie);
}

main('Guardians of the Galaxy Vol. 2');
