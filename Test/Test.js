< !DOCTYPE html >
    <
    html >
    <
    head >
    <
    meta http - equiv = "Content-Type"
content = "text/html;charset=UTF-8" >
    <
    title > Document < /title> <
style type = "text/css" >
    *
    {
        margin: 0;
        padding: 0;
    }
    .header {
        width: 970 px;
        height: 103 px;
        /*居中。这个语句的意思是：居中：*/
        margin: 0 auto;
    }
    .header.logo {
        float: left;
        width: 277 px;
        height: 103 px;
        background - color: red;
    }
    .header.language {
        float: right;
        width: 137 px;
        height: 49 px;
        background - color: green;
        margin - bottom: 8 px;
    }
    .header.nav {
        float: right;
        width: 679 px;
        height: 46 px;
        background - color: green;
    }

.content {
    width: 970 px;
    height: 435 px;
    /*居中，这个语句今天没讲，你照抄，就是居中：*/
    margin: 0 auto;
    margin - top: 10 px;
}
.content.banner {
        float: left;
        width: 310 px;
        height: 435 px;
        background - color: gold;
        margin - right: 10 px;
    }
    .content.rightPart {
        float: left;
        width: 650 px;
        height: 435 px;
    }
    .content.rightPart.main {
        width: 650 px;
        height: 400 px;
        margin - bottom: 10 px;
    }
    .content.rightPart.links {
        width: 650 px;
        height: 25 px;
        background - color: blue;
    }
    .content.rightPart.main.news {
        float: left;
        width: 450 px;
        height: 400 px;
    }
    .content.rightPart.main.hotpic {
        float: left;
        width: 190 px;
        height: 400 px;
        background - color: purple;
        margin - left: 10 px;
    }
    .content.rightPart.main.news.news1 {
        width: 450 px;
        height: 240 px;
        background - color: skyblue;
        margin - bottom: 10 px;
    }
    .content.rightPart.main.news.news2 {
        width: 450 px;
        height: 110 px;
        background - color: skyblue;
        margin - bottom: 10 px;
    }
    .content.rightPart.main.news.news3 {
        width: 450 px;
        height: 30 px;
        background - color: skyblue;
    }
    .footer {
        width: 970 px;
        height: 35 px;
        background - color: pink;
        /*没学，就是居中：*/
        margin: 0 auto;
        margin - top: 10 px;
    } <
    /style> < /
    head > <
    body >
    <!-- 头部 -->
    <
    div class = "header" >
    <
    div class = "logo" > logo < /div> <
div class = "language" > 语言选择 < /div> <
div class = "nav" > 导航条 < /div> < /
    div >

    <!-- 主要内容 -->
    <
    div class = "content" >
    <
    div class = "banner" > 大广告 < /div> <
div class = "rightPart" >
    <
    div class = "main" >
    <
    div class = "news" >
    <
    div class = "news1" > < /div> <
div class = "news2" > < /div> <
div class = "news3" > < /div> < /
    div > <
    div class = "hotpic" > < /div> < /
    div > <
    div class = "links" > < /div> < /
    div > <
    /div>

<!-- 页尾 -->
<
div class = "footer" > < /div> < /
    body > <
    /html>