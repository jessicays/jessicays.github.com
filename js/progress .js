//进度条ID
var numid = "loginnum";
var totaljidu=0;
var time=null;
var tatolnum=0;
function aa(loadingnum2,num) {
    if(totaljidu>=tatolnum)
    {
        clearInterval(time);
        return;
    }
    if (loadingnum2 < num) {
       clearInterval(time);
       time= setInterval(function () {

            loadingnum2++;
            totaljidu=loadingnum2;

            if (loadingnum2>=tatolnum)
            {
                document.getElementById(numid).innerHTML = "100%";
                
                setTimeout(function(){
                     document.getElementById(numid).innerHTML = "加载完毕";
                     overload();
                },300)  
            }
            else
            {
                document.getElementById(numid).innerHTML = loadingnum2 + "%";
            }
            
            if(loadingnum2>=num)
           {
                clearInterval(time);
                return;
            }


        }, 10)
    }
}
//图片预加载
function loadImages(sources, callback) {
    var count = 0,
    images = {},
    imgNum = 0;
    for (src in sources) {
        imgNum++;
    }
    //数组长度
    var listlength=sources.length;
    //完成数量
    var loadingnum=0;
    var nextloadingnum=0;
    //完成一个加载数量
   var unum= parseInt(100/listlength);

   tatolnum=unum*listlength;
   //alert(unum);
   var timer=null;
    for (src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            
            nextloadingnum += unum;

            if (nextloadingnum <= tatolnum) {
                
                aa(loadingnum, nextloadingnum);

                line.style.width = 2.5*loadingnum + "px";
            }
            else {
                aa(loadingnum, tatolnum);
                callback(images);

                return ;
            }
        
            if (++count >= imgNum) {
            
                callback(images);
               
            }

            loadingnum=nextloadingnum;

        }

        images[src].src = sources[src];




    }
}

loadImages([
        
        "images/1.png",
        "images/2.png",
        "images/3.png",
        "images/4.png",
        "images/5.png",
        "images/6.png",
        "images/7.png",
        "images/8.png",
        "images/banner01.jpg",
        "images/cell.png",
        "images/id.png",
        "images/mac.png",
        "images/pad.png",
        "images/about_img2.jpg",
        "images/about_pic.jpg",
       "images/c_bg.jpg",
],
function() {
    //回调方法
 
});

function overload(){
    
    //loadDiv.style.display = "none";
    fadeInOut(loadDiv,-5,100,0,function(){
        loadDiv.style.display = "none";
    });

    
}