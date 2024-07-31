let side = document.getElementById('side')
side.style.display = 'none'
let memu_button = document.getElementById('btn-side')
var placeholder = document.getElementById('placeholder');
//显示菜单
memu_button.addEventListener('click', function() {
    if (side.style.display === 'none') {
        side.style.display = 'block'
        side.style.animationName ='move_right'
        memu_button.style.display = 'none'
    }
})
//关闭菜单
var close_button = document.getElementById('close-menu')
close_button.addEventListener('click', async function() {
    if (side.style.display !== 'none'){
        side.style.animationName = 'move_left'
        await sleep()
        side.style.display = 'none'
        memu_button.style.display = 'block'
    }
})
var about_button =document.getElementById("li1")
about_button.addEventListener('click', function() {
    alert("qq:1125671299")
})
var git_button =document.getElementById("li2")
git_button.addEventListener('click', function() {
    window.open("https://github.com/zht-git-0/Online-Storage/")
})
//side.style.display = 'none'