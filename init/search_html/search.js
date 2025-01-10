var first_page=document.getElementById("first_page")
function go_first_page(){
    let hf=location.href.split("/")
    let r=''
    for(let i=0;i<hf.length-3;i++){
        r+=hf[i]+"/"
    }
    location.href=r+"index.html"
}
first_page.addEventListener("click",function(){
    go_first_page()
})
var btn_back=document.getElementById("btn-back")
btn_back.addEventListener("click",function(){
    go_first_page()
})
const params = new URLSearchParams(window.location.search);
var nm = params.get('name');
function place_config(config){   
    //config是配置
    //console.log(config)    
    var resource_list=document.getElementsByClassName("resource-list")[0]
    var ct=document.getElementsByClassName("ct")[0]
    ct.style.display = 'none'
    for(let i=0;i<config.length;i++){
        resource_list.innerHTML=resource_list.innerHTML+
            `\
            <li class="resource-li">\
                <h3>${config[i]["name"]}</h3>\
                <p class="download-p">${config[i]["detail"]}</p>\
                <button class="download-btn"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M480-325.33 244.67-560.67l75-73.66 108 108.33v-302.67h104.66V-526l108-108.33 75 73.66L480-325.33ZM236.67-132q-43.7 0-74.19-30.48Q132-192.97 132-236.67V-372h104.67v135.33h486.66V-372h105.34v135.33q0 43.67-30.68 74.17T723.33-132H236.67Z"/></svg></button>\
            </li>\
            `
    }
    var btns=document.getElementsByClassName('download-btn')
    var resource_lis = document.querySelectorAll('.resource-li');
    resource_lis.forEach(resource_li => {
        resource_li.addEventListener('mouseenter', () => {
            resource_li.classList.remove('leave');
            resource_li.classList.add('meet');
            // 在这里添加鼠标移入时的处理代码
        });
        resource_li.addEventListener('mouseleave', () => {
            resource_li.classList.remove('meet');
            resource_li.classList.add('leave');
        });
      });
    for(let i=0;i<btns.length;i++){
        btns[i].addEventListener('click',function(){
            location.href=config[i]["url"]
        })
    }
}
var res=fetch(`https://zht-back-server.us.kg/search?name=${nm}`)
  .then(response => response.json())
  .then(data => {
    if (data["message"]!='not found')
    {place_config(data)}
    else{
        var ct=document.getElementsByClassName("ct")[0]
        ct.style.display = 'none'
        var resource_list=document.getElementsByClassName("resource-list")[0]
        resource_list.innerHTML=resource_list.innerHTML+
            `\
            <li class="resource-li">\
                <h3>Not Fount!</h3>\
                <p class="download-p"></p>\
            </li>\
            `
    }
    }
  )
  .catch(error => console.error('Error:', error));  