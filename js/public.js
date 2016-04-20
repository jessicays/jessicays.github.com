//封装shake()
function shake(obj,attr,fn){

    if( typeof obj.pos === 'undefined' ) obj.pos = getStyle( obj, attr );
    var arr = [-20,20,-18,18,-16,16,-14,14,-12,12,-10,10,-8,8,-6,6,-4,4,-2,2,0];
    var i=0;

    clearInterval(obj.shake);
    obj.shake = setInterval(function(){

        obj.style[attr] = obj.pos +arr[i++] + "px";

        if(i==arr.length){
            clearInterval(obj.shake);
            if(typeof fn === "function")fn();
        }

    },30)
    
}

//封装getZero()
function getZero(n){

    return n<10?"0"+n:""+n;

}

//封装doMove()
function doMove(obj,attr,speed,target,fn){

    var iCur  = getStyle( obj, attr );
    speed = iCur < target ? Math.abs( speed ) : -Math.abs( speed );
    
    clearInterval(obj.domove);
    obj.domove = setInterval(function(){

        iCur = getStyle(obj,attr) + speed;

        if(iCur>=target&&speed>0||iCur<=target&&speed<0){
            iCur = target;  
        }

        obj.style[attr] = iCur + "px";

        if(iCur==target){
            clearInterval(obj.domove);  
            if(typeof fn === "function")fn();
        }
        
    },20)
}

//封装getStyle()
function getStyle(obj,attr){
    return parseFloat( obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr] )||0;
}

//fadeInOut()
function fadeInOut(obj,speed,start,target,fn){
    clearInterval(obj.timer);
    var opa = start;
    obj.timer = setInterval(function(){

        opa=opa+speed;

        obj.style.opacity = opa/100;
        obj.style.filter = "alpha(opacity="+ opa +")";

        if(opa==target){
            clearInterval(obj.timer);
            if(typeof fn === "function")fn();
        }

},20);

}


