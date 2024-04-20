document.addEventListener("DOMContentLoaded", function() {
  var inputText = document.getElementById("inputText");
  var output = document.getElementById("output");
  var convertButton = document.getElementById("convertButton");
  var copyButton = document.getElementById("copyButton");
  var selectAllButton = document.getElementById("selectAllButton"); // تم إضافة زر تحديد النص

  inputText.addEventListener("input", function() {
    convertText();
  });

  convertButton.addEventListener("click", function() {
    convertText();
  });

  output.addEventListener("input", function() {
    copyButton.disabled = false;
  });

  copyButton.addEventListener("click", function() {
    copyToClipboard(output.innerText);
    copyButton.innerText = "تم النسخ!";
    setTimeout(function() {
      copyButton.innerText = "نسخ النص";
    }, 2000);
  });

  selectAllButton.addEventListener("click", function() {
    selectText(output);
  }); // إضافة الحدث لزر تحديد النص

  function convertText() {
    var inputTextValue = inputText.value;
    var convertedText = inputTextValue.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    output.innerHTML = convertedText;
  }

  function copyToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");

    document.body.removeChild(textarea);
  }

  function selectText(element) {
    var range, selection;
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
});
