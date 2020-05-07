    let input = document.getElementById("input");
    let output = document.getElementById("page");
    input.onkeyup = function() {
        output.innerText = input.value;
    }