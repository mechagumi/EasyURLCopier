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

// コピー完了ポップアップ
var popup = document.createElement("div");
var popupStyle = popup.style;
popup.id = "copy-URL-popup";
popupStyle.opacity = '0';
document.body.appendChild(popup);

// googleの検索結果に相当するh3タグ群を取得します
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

    (function() {
	var url = targetAnchor.href;
	copyBtn.addEventListener("click", function() {
	    console.log(url);
	    execCopy(url);
	    ShowPopup(url);
	});
    })();
    
    block.appendChild(copyBtn);

    // Divブロックの追加
    targetHeading.parentNode.insertBefore(block, targetHeading.nextSibling);
}

var close_timer;

// コピー完了後のポップアップ表示関数
function ShowPopup(url) {
    clearTimeout(close_timer);
    console.log("Copy \"" + url + "\" to ClipBord!");
    popup.innerHTML = "Copy \"" + url + "\" to ClipBord!";
    popupStyle.opacity = '1';

    // 2秒後にポップアップを閉じる
    close_timer = setTimeout(function() {
	popupStyle.opacity = '0';
    }, 2000);
}
