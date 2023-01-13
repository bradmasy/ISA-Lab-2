
let responseArea = document.getElementById("number-responses");
console.log(responseArea);
const submitButton = document.getElementById("submit");

console.log("JavaScript Linked");

let id = 0;

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    let message = document.getElementById("chatbot-input").value;
    console.log(message);
    let post = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    }
    fetch("/chatbot", post)
        .then(response => {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            console.log(data);

            $("#number-responses").append(
                `<div class="content">
                <div class="inner">
                    <i>${data.text}</i> 
                    <button class="remove" type="button">
                        Remove
                    </button>
                </div>
            </div>`);

            $(document).on('click', '.remove', function () {
                $(this).parent().remove();
            });
        })
});


