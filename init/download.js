var btns=document.getElementsByClassName('download')
current_href=location.href
current_href=current_href.slice(0,current_href.lastIndexOf('/'))
var urls=[
    "https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe",
    "https://r2.182666.xyz/%E6%A4%8D%E7%89%A9%E5%A4%A7%E6%88%98%E5%83%B5%E5%B0%B8%E6%9D%82%E4%BA%A4%E7%89%88v2.3.zip",
    current_href+"/src/3dmmods_植物大战僵尸杂交版v2.3-全通关存档_by_小松梦幻.zip",
    current_href+"/src/geph-windows-setup.exe",
]
for (let i = 0; i < urls.length; i++) {
    console.log(urls[i])
}
for(let i=0;i<btns.length;i++){
    btns[i].addEventListener('click',function(){
        location.href=urls[i]
    })
}