let side = document.getElementById('side')
side.style.display = 'none'
let memu_button = document.getElementById('btn-side')
memu_button.addEventListener('click', function() {
    if (side.style.display === 'none') {
        side.style.display = 'block'
        memu_button.style.display = 'none'
    }
})
let close_button = document.getElementById('close-menu')
close_button.addEventListener('click', function() {
    if (side.style.display !== 'none'){
        side.style.display = 'none'
        memu_button.style.display = 'block'
    }
})
let about_button =document.getElementById("li1")
about_button.addEventListener('click', function() {
    alert("qq:1125671299")
})
let git_button =document.getElementById("li2")
git_button.addEventListener('click', function() {
    location.href = "https://github.com/zht-git-0/Online-Storage/"
})
//side.style.display = 'none'