let editor = ace.edit("code");

theme = "clouds";
editor.session.setMode("ace/mode/javascript");
editor.setFontSize(18);

editor.setReadOnly(false);

editor.setOption("wrap", "free");

ace.require("ace/ext/language_tools");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});
// 实现嵌入代码编辑器