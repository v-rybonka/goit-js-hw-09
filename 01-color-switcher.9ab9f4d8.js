const t=document.body,e=document.querySelector("button[data-start]"),a=document.querySelector("button[data-stop]");let n=0;e.addEventListener("click",(function(){if(e.classList.contains(".is-active"))return;n=setInterval((()=>{t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.classList.add(".is-active")})),a.addEventListener("click",(function(){clearInterval(n),e.classList.remove(".is-active")}));
//# sourceMappingURL=01-color-switcher.9ab9f4d8.js.map