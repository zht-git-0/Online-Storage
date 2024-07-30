var resource_list=document.getElementsByClassName("resource-list")[0]
for(let i=0;i<config.length;i++){
    resource_list.innerHTML=resource_list.innerHTML+
        `\
        <li>\
            <h3>${config[i][0]}</h3>\
            <p class="download-p">${config[i][1]}</p>\
            <button class="download-btn"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M480-325.33 244.67-560.67l75-73.66 108 108.33v-302.67h104.66V-526l108-108.33 75 73.66L480-325.33ZM236.67-132q-43.7 0-74.19-30.48Q132-192.97 132-236.67V-372h104.67v135.33h486.66V-372h105.34v135.33q0 43.67-30.68 74.17T723.33-132H236.67Z"/></svg></button>\
        </li>\
        `
}
var btns=document.getElementsByClassName('download-btn')
//for (let i = 0; i < config.length; i++) {
//    console.log(config[i][2])
//}
for(let i=0;i<btns.length;i++){
    btns[i].addEventListener('click',function(){
        location.href=config[i][2]
    })
}

