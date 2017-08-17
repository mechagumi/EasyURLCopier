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

var targets = document.querySelectorAll('div.g .rc h3.r');

// googleの検索結果に対してコピーボタンを配置します
for (var i = 0; i < targets.length; i++)
{
    var targetHeading = targets[i];
    var targetAnchor = targetHeading.getElementsByTagName('a')[0];

    var block = document.createElement("div");

    // URLコピーボタン(背景画像はcssにて設定)
    var copyBtn = document.createElement("button");
    copyBtn.className = "copy-button";
//    copyBtn.src = chrome.extension.getURL('scissors.png');
    copyBtn.innerHTML = "Copy URL";
    copyBtn.addEventListener("click", function() {
	var url = targetAnchor.href;
	execCopy(url);
	console.log("Copy \"" + url + "\" to ClipBord!");
    });
    block.appendChild(copyBtn);

    // Divブロックの追加
    targetHeading.parentNode.insertBefore(block, targetHeading.nextSibling);
}
