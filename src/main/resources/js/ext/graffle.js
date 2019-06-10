

Raphael.el.move_text = function() 
{
    var bb = this.getBBox();
    var cx = bb.x + bb.width / 2;
    var cy = bb.y + bb.height / 2;
    this.txt.attr({"x":cx,"y":cy});
    this.cur.attr({"cx":bb.x,"cy":bb.y});
    this.txtur.attr({"x":bb.x,"y":bb.y});
};

//создаем элемент текста в объекте
Raphael.fn.create_text = function( obj ) 
{
    obj.cur = this.circle( 0, 0, 10 );
    obj.cur.attr({"fill":"rgb(255,255,255)", cursor: "move", "stroke": "black", "stroke-width": "1px"});
    obj.txtur = this.text( 0, 0, obj.num_urov );
    obj.txtur.attr({"stroke": obj.attr("stroke"),"font-size":12,"stroke-width":0.1,"text-anchor":"middle",cursor: "move"});
 
     
    obj.txt = this.text( 0, 0, obj.attr("title") );
    obj.txt.attr({"stroke": obj.attr("stroke"),"font-size":12,"stroke-width":0.1,"text-anchor":"middle",cursor: "move"});
    //font-family="Times New Roman" font-size="16" font-weight="bold"
    //obj.txt.attr({"stroke": obj.attr("stroke"),"font-size":10,"stroke-width":0.2,"text-anchor":"middle",cursor: "move"});
    obj.txt.obj_id = obj.obj_id;
    obj.move_text();
   
   //font-./family
   //font-size
   //font-weight
   //font
   //stroke-opacity
   //stroke-width
   //stroke
   // stroke-linecap string [УbuttФ, УsquareФ, УroundФ]
   // stroke-linejoin string [УbevelФ, УroundФ, УmiterФ]
   // stroke-miterlimit number
   // stroke-opacity number
   // stroke-width number
   // target string used with href
   // text-anchor string [УstartФ, УmiddleФ, УendФ], default is УmiddleФ
   //this.txt.attr({"stroke": this.attr("stroke")});
};

Raphael.fn.connection = function (obj1, obj2, line, bg) {

    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox();
        /*p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }*/
    /*var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;*/
        var x1 = bb1.x + bb1.width / 2,
        y1 = bb1.y + bb1.height / 2,
        x4 = bb2.x + bb2.width / 2,
        y4 = bb2.y + bb2.height / 2;
    /*dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);*/
    //var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "L", x4.toFixed(3), y4.toFixed(3)].join(",");
    //var path = ["M", x1.toFixed(3), y1.toFixed(3), "L", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        //alert("else");
        return {
            //bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            //bg: this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};
function getColor( level )
{
var color;//  = Raphael.getColor(); 
if (level>12)
        level -= 12;
    switch (level)
    {
       case 0:  color = "rgb(255,255,255)";break;
       case 12:  color = "rgb(255,159,255)";break;
       case 11:  color = "rgb(255,159,207)";break;
       case 10:  color = "rgb(255,159,159)";break;
       case 9:  color = "rgb(255,207,159)";break;
       case 8:  color = "rgb(255,255,159)";break;
       case 7:  color = "rgb(207,255,159)";break;
       case 6:  color = "rgb(159,255,159)";break;
       case 5:  color = "rgb(159,255,159)";break;
       case 4:  color = "rgb(159,255,255)";break;
       case 3: color = "rgb(159,207,255)";break;
       case 2: color = "rgb(159,159,255)";break;
       case 1: color = "rgb(207,159,255)";break;
       default: color = "rgb(255,255,255)";break;
    }
    return color;
}    

  //глобальные переменные
  var p_arrObjRect=[];
  var p_arrObj=[];
  var connections = []; // массив св€зей  
  var el_rect_focus; //пр€моугольник дл€ выделенного элемента
   

 //функции выбора надписи элемента на схеме
    var fn_setFocusObj = function(id)
    {
       // alert('fn_setFocusObj');
   //ищем объект дл€ выделени€
      for (var i = 0; i < p_arrObj.size(); i++) 
      {
        if ( p_arrObj[i].obj_id == id )
        {
          fn_focusedObj(p_arrObj[i]);
          //var bb = p_arrObj[i].getBBox();
          //var att = {x: bb.x  - 3, y: bb.y - 3} ;
          //el_rect_focus.attr(att);  
          //el_rect_focus.show();
        }
      }
    };
    
    var fn_focusedObj = function(obj)
    {
      var bb = obj.getBBox();
      var att = {x: bb.x  - 3, y: bb.y - 3} ;
      el_rect_focus.attr(att);  
      el_rect_focus.show();
    };
   
    
Raphael.fn.fn_zoomIn = function()
{
  alert("fn_zoomIn");
  //var r = this; //холст на котором рисуем
  //r.scale(2,2);
  for ( var i = 0; i < p_arrObj.size(); i++)
  {
    p_arrObj[i].scale(2,2);

  }
}  

    
Raphael.fn.fn_tree = function( arr, arr_1, connect, pnl, isXml )
{ 
    var r = this; //холст на котором рисуем
    //функции дл€ drug and drop объекта вместе с надписью и св€з€ми
    var dragger = function ( ) 
    {
      this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
      this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
      //this.animate({"fill-opacity": .2}, 500);  
      
      //var att_1 = {x: this.ox-2, y: this.oy-2}; 
      //el_rect_focus.attr(att_1);  
      el_rect_focus.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
      el_rect_focus.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");

          
    };
       
    var  move = function (dx, dy) 
    {
      var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
      this.attr(att);
      this.move_text();
      for (var i = connections.length; i--;) 
      {
            r.connection(connections[i]);              
      }
      //двигаем и конутр выделени€
      var att_1 = this.type == "rect" ? {x: this.ox + dx - 3, y: this.oy + dy - 3} : {cx: this.ox + dx - 3, cy: this.oy + dy - 3};
      el_rect_focus.attr(att_1);    

      r.safari();     
         
    };
       
    var up = function () 
    {
      //this.animate({"fill-opacity":1}, 500); 
    };
 
    //функции выбора элемента на схеме
    var fn_def_click = function(event)
    {
      //var bb = this.getBBox();
      //var att = {x: bb.x  - 3, y: bb.y - 3} ;
      //el_rect_focus.attr(att);  
      //el_rect_focus.show();
     
      fn_focusedObj( this );
      findById(this.obj_id);
    };
    
    //функции выбора элемента на схеме по двойному клику
    var fn_def_dblclick = function(event)
    {
      var id = this.obj_id;
      loadSchemaDefForIdn( r, id ) ;

      fn_setFocusObj(id); //ищем объект дл€ выделени€
      //alert(this.obj_id);
    };
    
    //функции выбора надписи элемента на схеме
    var fn_def_txt_click = function(event)
    {
      findById(this.obj_id);
      //fn_focusedObj( this );
      fn_setFocusObj(this.obj_id);
    };
//функции выбора надписи элемента на схеме
    var fn_def_txt_dblclick = function(event)
    {
    //alert('fn_def_txt_dblclick');
    
    
    var id = this.obj_id;
    loadSchemaDefForIdn( r, id ) ;

      fn_setFocusObj(id); //ищем объект дл€ выделени€
    };
    
    
  //глобальные переменные
  var p_max_x = 2000;
  var p_max_y = 1000;  
  var p_width = 110; //ширина пр€моугольника
  var p_height = 55; //высота пр€моугольника
  var p_d_width = 30; //размер промежутка между пр€моугольниками по горизонтали
  var p_d_height = 30; //размер промежутка между пр€моугольниками по вертикали
  //необходимые переменные
  var p_numElem = 0;                  //кол-во элементов в р€ду
  var p_color = Raphael.getColor();  //цвет дл€ текущего р€да
  var p_y = p_d_height;
  var p_x = p_d_width;
  //var p_arrObjRect=[];
  //var p_arrObj=[];
  //var connections = []; // массив св€зей 
  var p_numUrov = 1; // текущий номер уровн€
          
  // все очищаем
   //r.clear();
     connections.clear();
     p_arrObjRect.clear();
     p_arrObj.clear();

el_rect_focus = this.rect(0, 0, p_width+6, p_height+6, 7);       
el_rect_focus.attr({fill: "blue", "fill-opacity": 0, stroke: "blue", cursor: "move",title:name,"stroke-width":2}); 
el_rect_focus.hide();        
//el_rect_focus.drag(move, dragger, up);          
          

        if ( arr.size() > 0 )//номер уровн€ может начитас€ не с 1
        {
            p_numUrov = arr[0].num_urov;
        }        
        p_color = getColor( p_numUrov );//Raphael.getColor();  //цвет дл€ текущего р€да
  

        for (var i = 0; i < arr.size(); i++) 
        {                     
            if (isXml == 1)     //дл€ XML варианта
            {
                p_numUrov = arr[i].num_urov;
                p_color =   getColor( p_numUrov );
                p_y = arr[i].y;
                p_x = arr[i].x;
                if (p_y+p_height+p_d_height > p_max_y ) 
                {
                      p_max_y = p_y+p_height+p_d_height;  
                }
                if (p_x+p_width+p_d_width > p_max_x ) 
                {
                      p_max_x = p_x+p_width+p_d_width;  
                }
            }
            else                //дл€ не XML варианта
            {
                if ( arr[i].num_urov != p_numUrov ) //переходим на следующий уроветь
                {                 
                    p_y = p_numUrov*p_height + p_numUrov*p_d_height +p_d_height;
                    if (p_y+p_height+p_d_height > p_max_y ) 
                    {
                        p_max_y = p_y+p_height+p_d_height;  
                    }
                    p_x = p_d_width;
                   
                    if ( p_numUrov%2 != 0 ) //дл€ не четных р€дов делаем сдвиг 
                    {                   
                        p_x = p_x + p_width/2; 
                    }                                   
                    p_numElem = 0; 
                    p_numUrov = p_numUrov + 1;
                    p_color =   getColor( p_numUrov );//Raphael.getColor();                 
                }            
                if ( p_numElem != 0 )
                {
                    p_x = p_x + p_width + p_d_width;
                    if (p_x+p_width+p_d_width > p_max_x ) 
                    {
                      p_max_x = p_x+p_width+p_d_width;  
                    }
                }
                p_numElem = p_numElem + 1;  
            }     
           
            var name = arr[i].text;
            var id = arr[i].id;
          
            var el_rect = this.rect(p_x, p_y, p_width, p_height, 7);       
            el_rect.attr({fill: p_color, "fill-opacity": 2, stroke: "black",cursor: "move",title:name,"stroke-width":1});
            el_rect.obj_id=id;
            el_rect.num_urov=p_numUrov;
            //el_rect.attr({fill: p_color, "fill-opacity": 1, stroke: "black",cursor: "move", "stroke-width":1});
            el_rect.click( fn_def_click );
            el_rect.dblclick( fn_def_dblclick );
            el_rect.drag(move, dragger, up);
            p_arrObj.push(el_rect);
            p_arrObjRect[id]=el_rect;               
        }
        //дл€ не XML варианта
        if (isXml == 0)
        {
            p_numUrov = p_numUrov + 1;
            p_y = p_numUrov*p_height + p_numUrov*p_d_height +p_d_height;
            if (p_y+p_height+p_d_height > p_max_y ) 
            {
                p_max_y = p_y+p_height+p_d_height;  
            }
                p_x = p_d_width;
                p_numElem = 0; 
                p_color =  "white";
        }       
        
        for (var i = 0; i < arr_1.size(); i++) 
        {                     
            if (isXml == 1)//дл€ XML варианта
            {
                p_numUrov = arr_1[i].num_urov;
                p_color =   getColor( p_numUrov );
                p_y = arr_1[i].y;
                p_x = arr_1[i].x;
                if (p_y+p_height+p_d_height > p_max_y ) 
                {
                      p_max_y = p_y+p_height+p_d_height;  
                }
                if (p_x+p_width+p_d_width > p_max_x ) 
                {
                      p_max_x = p_x+p_width+p_d_width;  
                }
            }
            else        //дл€ не XML варианта
            {
                if ( p_numElem != 0 )
                {
                  p_x = p_numElem*p_width + p_numElem*p_d_width +p_d_width; 
                  if (p_x+p_width+p_d_width > p_max_x ) 
                  {
                      p_max_x = p_x+p_width+p_d_width;   
                  }
                }
                p_numElem = p_numElem + 1;  
            } 
            var name = arr_1[i].text;
            var id = arr_1[i].id;
           
            var el_rect = this.rect(p_x, p_y, p_width, p_height, 2);       
            el_rect.attr({fill: p_color, "fill-opacity": 1, stroke: "black",cursor: "move",title:name,"stroke-width":1});
            el_rect.obj_id=id;
            el_rect.num_urov= '0';
            //el_rect.dblclick(function (event) 
            //{
            //  alert('dblclick');
            //  alert(this.o_id);
            //});
            el_rect.click( fn_def_click );
            el_rect.dblclick( fn_def_dblclick );
            el_rect.drag(move, dragger, up);
              
            p_arrObj.push(el_rect);
            p_arrObjRect[id]=el_rect;
               
        }



        for (var i = 0; i < p_arrObj.size(); i++) 
        {
         if ( typeof p_arrObj[i] != 'undefined' )
         {
          this.create_text( p_arrObj[i] );
          p_arrObj[i].txt.click( fn_def_txt_click );
          p_arrObj[i].txt.dblclick( fn_def_txt_dblclick );
          //p_arrObj[i].txt.drag(move, dragger, up);

         }
        }

        for (var i = 0; i < connect.size(); i++) 
        {
        var id1 = connect[i].idn_old;
        var id2 = connect[i].idn_low;
        var obj1 = p_arrObjRect[id1];
        var obj2 = p_arrObjRect[id2];

        connections.push(this.connection(obj1, obj2, "#000", "#fff"));
        
         }
         for(var i = 0; i < connections.size(); i++)
         {
            connections[i].line.toBack();
         }
        
        
          this.setSize(p_max_x,p_max_y); 
          //pnl_raphael.setHeight(p_max_y);
          //pnl_raphael.setWidth(p_max_x);

          //pnl.setHeight(p_max_y);
          //pnl.setWidth(p_max_x);
         

};



