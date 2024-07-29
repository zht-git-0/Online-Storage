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
//side.style.display = 'none'