// li样式改变
function liChange(obj, num) {
    for (let i = 0; i < obj.children.length; i++) {
        obj.children[i].style.backgroundColor = '#ffffff';
    }
    obj.children[num].style.backgroundColor = '#ff6f00';
}

// 向右缓慢移动
function animate(obj, movement, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        if (obj.offsetLeft === movement) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        }
        //计算步长
        let step = (movement - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
        }, 8);
}