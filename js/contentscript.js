// 任意の文字列をクリップボードにコピーする関数
function execCopy(string) {
    var temp = document.createElement('textarea');
    temp.value = string;
    temp.selectionStart = 0;
    temp.selectionEnd = temp.value.length;
    var s = temp.style;
    s.position = 'fixed';
    s.left = '-100%';

    document.body.appendChild(temp);
    temp.focus();
    var result = document.execCommand('copy');
    temp.blur();
    document.body.removeChild(temp);

    return result;
}

// googleの検索結果に対してコピーボタンを配置します
$(".rc h3.r").each(function() {
    var targetBlk = this;
    var elm = document.createElement("button");
    elm.innerHTML = "Copy URL";
    elm.style.marginLeft = "20px";
    elm.addEventListener("click", function() {
	var url = targetBlk.getElementsByTagName('a')[0].href;
	execCopy(url);
	console.log("Copy \"" + url + "\" to ClipBord!");
    });
    this.appendChild(elm);
});
