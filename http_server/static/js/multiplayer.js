let join_button = document.querySelector("#join");
join_button.onclick = join;


let create_button = document.querySelector("#create");
create_button.onclick = create;

let gameID = document.querySelector("#gameID");

function join() {
    window.location.href = `/join?gameID=${gameID.value}`;
}

async function create() {
    try {
        fetch('/create', {
            method: 'POST'
        })
        .then((response) => response.text())
        .then((text) => window.location.href = `/join?gameID=${text}`);
    } catch (error) {
        console.error('Error creating game:', error);
    }
}