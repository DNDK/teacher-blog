document.addEventListener("copy", (evt)=>{
    evt.preventDefault();
    evt.clipboardData.setData("text/plain", "Копирование на этом сайте запрещено");
    
})