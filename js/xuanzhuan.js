/**
 * Created by lh on 2016/9/4.
 */
window.onload=function(){
    var config = [{
        left: 0,
        top:0,
        width: 559,
        height: 414,
        zIndex: 2
    },
        {
            left: 135,
            top: -30,
            width: 636,
            height: 478,
            zIndex: 4
        },
        {
            left: 355,
            top:0,
            width: 559,
            height: 414,
            zIndex: 2
        }];
    var ul=document.getElementById("xuanzhuan");
    var div=ul.parentNode;
    var lis=ul.children;
    var left=document.getElementById("arrLeft");
    var right=document.getElementById("arrRight");
    assign();
   function assign(){
       for(var i=0;i<lis.length;i++){
               animate(lis[i],config[i],function(){
                   flag=true;
               })
           }
   }
    div.onmouseover=function(){
    animate(arrow,{"opacity":1});
    };
    div.onmouseout=function(){
        animate(arrow,{opacity:0});
    };

    right.onclick=function(){
        if (flag){
            flag=false
            config.push(config.shift());
            assign();
        }

    }
    left.onclick=function(){
        if(flag){
            flag=false;
            config.unshift(config.pop());
            assign();
        }
    }
    function animate(obj,json,fn){
        clearInterval(obj.timerId);
        obj.timerId=setInterval(function(){
            var flag=true;
            for(var key in json){
                if(key=="opacity"){
                    var leader=parseInt(getStyle(obj,key)*100)||0;
                    var target=json[key]*100;
                    var step=(target-leader)/10;
                    step=step>0?Math.ceil(step):Math.floor(step);
                    leader=leader+step;
                    obj.style[key]=leader/100;
                }else if(key=="zIndex"){
                    var leader=parseInt(getStyle(obj,key))||0;
                    var target=json[key];
                    var step=(target-leader)/10;
                    step=step>0?Math.ceil(step):Math.floor(step);
                    leader=leader+step;
                    obj.style[key]=leader;
                }else{
                    var leader=parseInt(getStyle(obj,key))||0;
                    var target=json[key];
                    var step=(target-leader)/10;
                    step=step>0?Math.ceil(step):Math.floor(step);
                    leader=leader+step;
                    obj.style[key]=leader+"px";
                }
                if(leader != target){//*
                    flag=false;    //只要有一个不相等flag为false
                }
            }
            if(flag){
                clearInterval(obj.timerId);
                if(fn){
                    fn();
                }
            }
        },15)
    }
    function getStyle(obj,attr){

        if(obj&&obj.currentStyle){
            return  obj.currentStyle[attr];
        }else {
            return  getComputedStyle(obj,null)[attr];
        }
    }
}