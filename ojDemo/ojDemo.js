let inArray = [999999999, 1000000000, 12431412, 129441413, 141410, 3,
    999999998, 999999997, 999999996, 998244353
];
let ansArray = [-1, 999999999, 12431411, -1, 141409, -1, 999999997, -1, 999999995, -1];

function run() {
    //editor
    let editor = ace.edit("code");
    //let content = document.getElementById("textarea");
    let content = editor.getSession().getValue();
    eval(content); //solution
    for (let i = 0; i < 10; i++) {
        if (ansArray[i] !== solution(inArray[i])) {
            alert('error!');
            return;
        }
    }
    alert('right!');
}
document.getElementById("submit").addEventListener("click", run);