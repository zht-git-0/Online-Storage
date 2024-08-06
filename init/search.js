var search=document.getElementById("search");
var search_input=document.getElementById("search-input");
var flag=false;
search.addEventListener("click",function(){
    if(!flag){//not flag
        search_input.placeholder="搜索"
        search_input.classList.remove("x_disappear")
        search_input.classList.add("x_appear")
        search_input.style.display="block"
        search_input.focus()
    }
    flag=!flag
})
search_input.addEventListener("blur",async function(){
    search_input.classList.remove("x_appear")
    search_input.placeholder=""
    search_input.classList.add("x_disappear")
    await sleep(300)
    search_input.style.display="none"
    flag=false
})
search_input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // 检查是否按下了回车键
        document.getElementById("form").submit();
    }
});
    