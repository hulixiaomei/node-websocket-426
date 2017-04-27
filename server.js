/**
 * Created by Administrator on 2017/4/26.
 */
var webSocketServer=require("ws").Server;//得到socket服务
var wss=new webSocketServer({port:4567});//建立端口号

//发送信息
function fasong(state,obj){
    wss.clients.forEach(function (client){
        if(state==1){
            client.send(obj.name+":    "+obj.neirong);
        }
        if(state==0){
            client.send(obj.name+"退出了");
        }
    })
}

var clientLength=1;
wss.on("connection",function(ws){
    var user;
    console.info("恭喜建立连接");
    ws.send("当前连接人数"+clientLength+"人");
    clientLength+=1;
    ws.on("message",function(req,flags){
        var shuju=eval("("+req+")");
        console.log(shuju);
        if(shuju.name!=""){
            user=shuju;
            fasong(1,shuju);
        }
    })
    ws.on("close",function(close){
        console.log("进入close");
        clientLength-=1;
        try{
            console.log(user.name);
            fasong(0,user);
        }catch(e){
            console.info("页面刷新了");
        }
    });
})