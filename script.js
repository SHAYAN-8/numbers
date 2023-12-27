document.addEventListener("DOMContentLoaded", function () {
    const copyableItems = document.querySelectorAll(".copyable");

    copyableItems.forEach(item => {
        item.addEventListener("click", function () {
            const textToCopy = this.innerText;
            copyToClipboard(textToCopy);
            this.classList.add("copied");
            this.style.backgroundColor = "#c6f6d5";
            saveToLocalStorage(textToCopy, "#c6f6d5");
        });
    });

    function copyToClipboard(text) {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
    }

    function saveToLocalStorage(text, backgroundColor) {
        const savedItems = JSON.parse(localStorage.getItem("copiedItems")) || [];
        savedItems.push({ text, backgroundColor });
        localStorage.setItem("copiedItems", JSON.stringify(savedItems));
    }

    function applyStoredStyles() {
        const savedItems = JSON.parse(localStorage.getItem("copiedItems")) || [];
        savedItems.forEach(savedItem => {
            const item = Array.from(copyableItems).find(copyable => copyable.innerText === savedItem.text);
            if (item) {
                item.classList.add("copied");
                item.style.backgroundColor = savedItem.backgroundColor;
            }
        });
    }

    applyStoredStyles();
});
