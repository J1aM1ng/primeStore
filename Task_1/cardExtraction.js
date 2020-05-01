var timer = setTimeout(function() {
    console.log(1); // 3秒之后，再执行这段代码。
}, 3000);

clearTimeout(timer);