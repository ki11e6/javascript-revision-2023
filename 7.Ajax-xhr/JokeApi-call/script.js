const joke = document.getElementById('joke');
const jokeBtn = document.getElementById('joke-btn');

function randoemJoke() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.chucknorris.io/jokes/random');

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            console.log(data.value);
            joke.textContent = data.value;
        } else {
            joke.innerHTML = `<em>Something went wrong!!!</em>`;
        }
    };
    xhr.send();
}
randoemJoke();
jokeBtn.addEventListener('click', randoemJoke);
// xhr.send();
