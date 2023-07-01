// window.addEventListener('keydown', (e) => {
//     const insert = document.getElementById('insert');
//     insert.innerHTML = `
//     <div class="key">
//     ${e.key === ' ' ? 'Space' : e.key}
//     <small>e.key</small>
// </div>
//     <div class="key">
//     ${e.keyCode}
//     <small>e.keycode</small>
// </div>
//     <div class="key">
//     ${e.code}
//     <small>e.code</small>
// </div>
//     `;
// });

function showKeys(e) {
    const insert = document.getElementById('insert');
    //key info
    const keyCodes = {
        'e.key': e.key === ' ' ? 'Space' : e.key,
        'e.code': e.code,
        'e.keyCode': e.keyCode,
    };
    //clear
    insert.innerHTML = '';

    for (const key in keyCodes) {
        //creating elements
        const div = document.createElement('div');
        div.className = 'key';
        const small = document.createElement('small');
        //variabeles
        const keyText = document.createTextNode(key);
        const valueText = document.createTextNode(keyCodes[key]);
        //connecting elements
        small.appendChild(keyText);
        div.appendChild(valueText);
        div.appendChild(small);

        insert.appendChild(div);
    }
}

window.addEventListener('keydown', showKeys);
