
document.addEventListener("click",e=>{
 const a=e.target.closest("[data-scroll]");
 if(a){ e.preventDefault(); document.querySelector(a.getAttribute("href"))?.scrollIntoView({behavior:"smooth"}); }
});
