let addBtn = document.querySelector('.add_btn');
let todos = [];
let tBody = document.querySelector('tbody');
let editChange = document.querySelector('tfoot tr td input');
let tFoot = document.querySelector('tfoot');
let TdsInTfoot = document.querySelectorAll('tfoot tr td');
let empty = new RegExp(/^\s*$/);
addBtn.addEventListener('click', (event) => {
    let input = document.querySelector('.add_input');
    if (empty.test(input.value)) return;
    let todo = {
        index: todos.length + 1,
        name: input.value,
        check: false,
        status: 'IN PROGRESS',
    };
    todos.push(todo);
    drawRow(todo);
    input.value = '';
});
function drawRow(rowDate) {
    let tr = document.createElement('tr');
    for (let i = 0; i < 6; i++) {
        let td = document.createElement('td');
        switch (i) {
            case 0:
                td.innerHTML = rowDate.index;
                break;
            case 1:
                td.innerHTML = rowDate.name;
                break;
            case 3:
                td.innerHTML = rowDate.status;
                break;
            case 2:
                let checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.addEventListener('click', checkRow);
                td.append(checkbox);
                break;
            case 4:
                let edit = document.createElement('button');
                edit.innerHTML = 'EDIT';
                edit.addEventListener('click', editRow);
                td.append(edit);
                break;
            case 5:
                let button = document.createElement('button');
                button.innerHTML = 'DELETE';
                button.setAttribute('disabled', 'disabled');
                button.addEventListener('click', deleteRow);
                td.append(button);
                break;
        }
        tr.append(td);
    }
    tBody.append(tr);
}

function checkRow(event) {
    let currentTr = event.target.parentNode.parentNode;
    if (currentTr.children[3].innerHTML === 'IN PROGRESS') {
        currentTr.children[3].innerHTML = 'DONE';
        currentTr.children[5].children[0].removeAttribute('disabled', 'disabled');
    } else {
        currentTr.children[3].innerHTML = 'IN PROGRESS';
        currentTr.children[5].children[0].setAttribute('disabled', 'disabled');
    }
}

function deleteRow(event) {
    currentTr = event.target.parentNode.parentNode;
    index = currentTr.children[0].innerHTML;
    todos.splice(index - 1, 1);
    currentTr.parentNode.removeChild(currentTr);
}

function editRow(event) {
    let currentTr = event.target.parentNode.parentNode;
    editChange.value = currentTr.children[1].innerHTML;
    let saveBtn = document.createElement('button');
    saveBtn.innerHTML = 'SAVE';
    TdsInTfoot[4].append(saveBtn);
    tFoot.style.display = 'table-row-group';
    saveBtn.addEventListener('click', () => {
        currentTr.children[1].innerHTML = editChange.value;
        TdsInTfoot[4].removeChild(saveBtn);
        tFoot.style.display = 'none';
    });
}
