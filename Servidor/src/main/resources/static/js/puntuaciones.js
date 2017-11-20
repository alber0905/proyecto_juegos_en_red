$(document).ready(function(){
    var htmlRet = "";
    $.ajax({
        method: "GET",
        url:"/GetPuntuaciones/",                
        contentType:"application/json",
        dataType:"json"            
        }).done(function(data){
            for(var i = 0; i<data.length; i++){
                var template = $(".jqPuntTemplate").html();
                template = template.replace("%INDEX%", i+1 + ".");
                template = template.replace("%PUNT%", data[i].punt);
                template = template.replace("%NAME%", data[i].name);
                htmlRet += template;
            }
            $(".punt_break").after(htmlRet); 
    });
});