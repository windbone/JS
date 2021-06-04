window.addEventListener('load', function () {
    // 头部用户名
    let userName = document.querySelector('.user-name');
    let uname = location.search.slice(1).split('=');
    if (uname[0] === 'username') {
        userName.innerHTML = location.search.split('=')[1];
    }

    // 头部导航栏下拉菜单
    // let navUl = document.querySelector('.header-nav');
    // navUl.addEventListener('mouseover', function (e) {
    //     e.target.nextElementSibling.style.display = 'block';
    // });
    // navUl.addEventListener('mouseout', function (e) {
    //     e.target.nextElementSibling.style.display = 'none';
    // });

    // 关闭右下角广告
    let close = document.getElementById('close-ad');
    // let ad = document.querySelector('.right-ad');
    close.onclick = function () {
        // ad.style.display = 'none';
        this.parentNode.style.display = 'none';
    }

    // 头部搜索框
    let search = document.querySelector('#top-search');
    search.onfocus = function () {
        this.style.borderColor = '#00a4ff';
        this.style.color = '#000000';
    }
    search.onblur = function () {
        this.style.borderColor = '#B1B1B1FF';
        this.style.color = '#4e4e4e';
    }

    // 登录界面
    let gB = document.querySelector('.gray-bg');
    let closeLogin = document.querySelector('.close-login');
    let eye = document.querySelector('#eye');
    let psw = document.querySelector('#psw');
    // 显示登录界面
    userName.addEventListener('click', function () {
        gB.style.display = 'block';
    });
    // 关闭登录界面
    closeLogin.addEventListener('click', function () {
        gB.style.display = 'none';
    });
    // 隐藏/显示密码
    eye.onclick = function () {
        this.flag = !this.flag;
        if(this.flag){
            psw.type = 'text';
            this.className = 'icon-eye1';
        }else {
            psw.type = 'password';
            this.className = 'icon-eye-hidden';
        }
    }

    // 拖动登录界面
    let loginMove = document.querySelector('.move');
    let loginTable = document.querySelector('.login-table');
    loginMove.addEventListener('mousedown', function (e) {
        console.log(loginTable.offsetLeft);
        let x, y;
        x = e.pageX - loginTable.offsetLeft;
        y = e.pageY - loginTable.offsetTop;
        function move(e) {
            let rightBorder = gB.offsetWidth - loginTable.offsetWidth/2;
            let bottomBorder = gB.offsetHeight - loginTable.offsetHeight;
            // console.log(e.pageX - x);
            loginTable.style.left = Math.min(rightBorder, Math.max(e.pageX - x, loginTable.offsetWidth/2)) + 'px';
            loginTable.style.top = Math.min(bottomBorder, Math.max(e.pageY - y, 0)) + 'px';
        }
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move);
        });
    });

    // 左侧边栏滚动(网页加载时先设置左侧边栏top值)
    let main1 = document.querySelector('.main1');
    let leftBarTop = main1.offsetTop;
    // console.log(leftBarTop);
    let leftBar = document.querySelector('.left-bar');
    leftBar.style.top = leftBarTop +'px';

    document.addEventListener('scroll', function () {
        console.log(leftBarTop);
        // leftBar.style.top = Math.max(0, window.pageYOffset - 300) + 'px';
        if (window.pageYOffset >= 300) {
            leftBar.style.position = 'fixed';
            leftBar.style.top = leftBarTop -300 + 'px';
        }else {
            leftBar.style.top = leftBarTop + 'px';
            leftBar.style.position = 'absolute';
        }
    });
    // 返回顶部
    let goToTop = leftBar.children[leftBar.children.length - 1];
    goToTop.addEventListener('click', function () {
        window.scroll(0,0);
    })


    // banner轮播图
    let bannerUl = document.querySelector('.focus');
    let bannerOl = document.querySelector('.banner-promo');
    let liNum = bannerUl.children.length;
    // 添加轮播图下方圆点
    for (let i = 0; i < liNum; i++) {
        let li = document.createElement('li');
        li.setAttribute('data-index', i);
        bannerOl.appendChild(li);
    }
    bannerOl.children[0].style.backgroundColor = '#ff6f00';

    let movement = bannerUl.children[0].offsetWidth;
    let num = 0;
    // 节流阀
    let promoFlag = true;
    // 下方圆点控制图片
    bannerOl.addEventListener('mouseover', function (e) {
        // console.dir(bannerUl.children[0])
        animate(bannerUl, -1 * movement * e.target.dataset.index,
            () => {
            // console.dir(e.target);
                if (e.target.nodeName === 'LI') {
                    num = Number(e.target.dataset.index);
                    liChange(bannerOl, num);
                    console.log(num);
                }
        });
    });
    // 左右侧按钮切换图片
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    prev.addEventListener('click', function () {
        if (promoFlag) {
            promoFlag = false;
            num = (num - 1 + liNum) % liNum;
            animate(bannerUl, -num * movement, ()=>{liChange(bannerOl, num); promoFlag = true;});
        }
    });
    next.addEventListener('click', function () {
        console.log(promoFlag)
        if (promoFlag) {
            promoFlag = false;
            // console.log("num:" + num);
            // console.log("liNum:" + liNum);
            num = (num + 1) % liNum;
            animate(bannerUl, -num * movement, ()=>{liChange(bannerOl, num); promoFlag = true;});
        }
    });

    // 轮播图自动播放
    let bannerPromo = setInterval(()=>{
        next.click();
    }, 5000);
})