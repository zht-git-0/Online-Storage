let btns=document.getElementsByClassName('download')
current_url=location.pathname
current_url=current_url.slice(1,current_url.lastIndexOf('/'))
let urls={
    0:"https://cdn.akamai.steamstatic.com/client/installer/SteamSetup.exe",
    1:"https://r2.182666.xyz/%E6%A4%8D%E7%89%A9%E5%A4%A7%E6%88%98%E5%83%B5%E5%B0%B8%E6%9D%82%E4%BA%A4%E7%89%88v2.3.zip",
    2:"https://dmod.3dmgame.com/mod/Download/210193",
    3:current_url+"/src/geph-windows-setup.exe",
}
console.log(urls[3])
for(var i=0;i<btns.length;i++){
    console.log(i,btns[i],urls[i])
    btns[i].addEventListener('click',function(){
        location.href=urls[i]
    })
}
i-=1