Raphael.fn.getObjColor = function( level )
{
 var color;
 var lvl = level;
 while(lvl>12) lvl -= 12;
 switch (lvl)
   {
      case 0:   color = "rgb(255,255,255)";break;
      case 1:   color = "rgb(207,159,255)";break;
      case 2:   color = "rgb(159,159,255)";break;
      case 3:   color = "rgb(159,207,255)";break;
      case 4:   color = "rgb(159,255,255)";break;
      case 5:   color = "rgb(159,255,207)";break;
      case 6:   color = "rgb(159,255,159)";break;
      case 7:   color = "rgb(207,255,159)";break;
      case 8:   color = "rgb(255,255,159)";break;
      case 9:   color = "rgb(255,207,159)";break;
      case 10:  color = "rgb(255,159,159)";break;
      case 11:  color = "rgb(255,159,207)";break;
      case 12:  color = "rgb(255,159,255)";break;
      default:  color = "rgb(255,255,255)";break;
    }
 return color;
};    

Raphael.el.selectFunc = function()
{
	if (!this.selected)
	{
	var bb = this.getBBox();
	bb.x -=3;
	bb.y -=3;
	bb.width  += 6;
	bb.height += 6;
	this.selected = true;
	this.select = this.paper.rect(bb.x,bb.y,bb.width,bb.height).attr("stroke","blue");
	}
	else
	{
           this.select.remove();
	   this.selected = false;
	}
};

Raphael.fn.createObj = function(id,level,x,y,txt)
{
  var widthObj = 120;
  var heightObj = 80;
  var cl = this.getObjColor(level);
  var obj = this.set();
  obj.push(
	  this.rect(-widthObj/2,-heightObj/2,widthObj,heightObj,8).attr("fill",cl),
	  this.text(0,0,txt),
	  this.circle(-widthObj/2+12,-heightObj/2+12,10),
	  this.text(-widthObj/2+12,-heightObj/2+10,level)
          );
//  this.setStart();
//     	this.rect(-widthObj/2,-heightObj/2,widthObj,heightObj,8).attr("fill",cl);//0
//        this.text(0,0,txt);//1
//       	this.circle(-widthObj/2+12,-heightObj/2+12,10);//2
//       	this.text(-widthObj/2+12,-heightObj/2+10,level);//3   
//  var obj = this.setFinish();
  obj[0].set = obj;
  obj[1].set = obj;
  obj[2].set = obj;
  obj[3].set = obj;
  obj.set = obj;
  obj.id = id;
  obj.translate(x,y);
  obj.selected = false;
  return obj;
};

Raphael.fn.createArrow = function(x0,y0,x1,y1)
{
  var xn  = x1-x0;
  var yn  = y1-y0; 
  var pi =  3.1415926;
  var rad2deg = 57.2957804904;//180/pi
  var angle;
  if(xn==0)
   {
     if (yn<0)angle=270
     else angle=90;
   }
  else  angle = Math.atan(yn/xn)*rad2deg;
  if (xn<0) angle = angle+180;
  
  
  if(angle>360)angle = angle%360;
  if(angle<0)  angle = angle+360;
  
  var angleRad = angle/rad2deg;
  var xk=60,
      yk=40;
  
  if((angle>=0)&&(angle<=45))
  {
   xk=60;	  
   yk=40*Math.sin(angleRad);
  }
  else if ((angle>45)&&(angle<=135))
  {
  xk=60*Math.cos(angleRad);
  yk=40;
  }
  else if ((angle>135)&&(angle<=225)) 
  {
  xk=-60;	  
  yk=40*Math.sin(angleRad);
  }
  else if ((angle>225)&&(angle<=315))
  {
  xk=60*Math.cos(angleRad);
  yk=-40;
  }
  else if ((angle>315)&&(angle<=360))
  {
  xk=60;
  yk=40*Math.sin(angleRad);
  };
 
  this.setStart();
     	this.path("M  "+ x0+","+y0+"L "+(x1-xk)+","+(y1-yk));//0
        this.path("M 0,0L -10,-4L -10,4Z").attr("fill","black").translate((x1-xk),(y1-yk)).rotate(angle,0,0);//1
        
   var obj = this.setFinish();
  return obj;
};

Raphael.fn.connection = function (obj1, obj2) 
{
  var bb1 = obj1.getBBox();
      bb2 = obj2.getBBox();
  var x0 = bb1.x+bb1.width/2,
      y0 = bb1.y+bb1.height/2,
      x1 = bb2.x+bb2.width/2,
      y1 = bb2.y+bb2.height/2;
	
var arrow = this.createArrow(x0,y0,x1,y1).toBack();
arrow.from = obj1;
arrow.to = obj2;

return arrow;
};

Raphael.fn.repaintArrow = function(obj)
{
  var bb1 = obj.from.getBBox();
      bb2 = obj.to.getBBox();
  var x0 = bb1.x+bb1.width/2,
      y0 = bb1.y+bb1.height/2,
      x1 = bb2.x+bb2.width/2,
      y1 = bb2.y+bb2.height/2;
      
  var xn  = x1-x0;
  var yn  = y1-y0; 
  var pi =  3.1415926;
  var rad2deg = 57.2957804904;//180/pi
  var angle;
  if(xn==0)
   {
     if (yn<0)angle=270
     else angle=90;
   }
  else  angle = Math.atan(yn/xn)*rad2deg;
  if (xn<0) angle = angle+180;
  
  
  if(angle>360)angle = angle%360;
  if(angle<0)  angle = angle+360;
  
  var angleRad = angle/rad2deg;
  var xk=60,
      yk=40;
  
  if((angle>=0)&&(angle<=45))
  {
   xk=60;	  
   yk=40*Math.sin(angleRad);
  }
  else if ((angle>45)&&(angle<=135))
  {
  xk=60*Math.cos(angleRad);
  yk=40;
  }
  else if ((angle>135)&&(angle<=225)) 
  {
  xk=-60;	  
  yk=40*Math.sin(angleRad);
  }
  else if ((angle>225)&&(angle<=315))
  {
  xk=60*Math.cos(angleRad);
  yk=-40;
  }
  else if ((angle>315)&&(angle<=360))
  {
  xk=60;
  yk=40*Math.sin(angleRad);
  };
  obj.pop().remove();
  obj.pop().remove();
  obj.push(
     	this.path("M  "+ x0+","+y0+"L "+(x1-xk)+","+(y1-yk)).toBack(),//0
        this.path("M 0,0L -10,-4L -10,4Z").attr("fill","black").translate((x1-xk),(y1-yk)).rotate(angle,0,0).toBack()//1
      );    
};
 //глобальные переменные
  var p_arrObjRect=[];
  var p_arrObj=[];
  var connections = []; // массив связей  
  var el_rect_focus; //прямоугольник для выделенного элемента
   

 //функции выбора надписи элемента на схеме
    var fn_setFocusObj = function(id)
    {
   //ищем объект для выделения
      for (var i = 0; i < p_arrObj.size(); i++) 
      {
        if ( p_arrObj[i].id == id )
        {
          fn_focusedObj(p_arrObj[i]);
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

Raphael.fn.fn_tree = function( arr, arr_1, connect, pnl, isXml )
{ 
    var r = this; //холст на котором рисуем
    //функции для drug and drop объекта вместе с надписью и связями
    var dragger = function (x,y,event) 
    {
      this.set.x0=x;
      this.set.y0=y;
      el_rect_focus.hide();          
    };
       
    var  move = function (dx, dy,x,y,event) 
    {
      this.set.translate(x-this.set.x0,y-this.set.y0);
      this.set.x0=x;
      this.set.y0=y;
      var arrow;
      for (var i = connections.length; i--;) 
      {
	     
         arrow = connections[i];
	 if((arrow.from==this.set)||(arrow.to==this.set)) this.paper.repaintArrow(arrow);              
      }
      //двигаем и конутр выделения
      el_rect_focus.translate(x-this.set.x0,y-this.set.y0);    
    };
       
    var up = function (event) 
    {
      el_rect_focus.show();
    };
 
    //функции выбора элемента на схеме
    var fn_def_click = function(event)
    {
      fn_focusedObj(this.set );
      findById(this.set.id);
    };
    
    //функции выбора элемента на схеме по двойному клику
    var fn_def_dblclick = function(event)
    {
      var id = this.set.id;
      if ( m_cb_all.getValue().getGroupValue() == 1 )
      {
        m_cb_all.items.itemAt(2).setValue(true);                  
        //fn_setFocusObj( id ); //ищем объект для выделения        
      }
      else
      {
        //fn_setFocusObj( id ); //ищем объект для выделения
        repaintGraph( r, false );     
      }
    };
    
    
  //глобальные переменные
  var p_max_x = 2000;
  var p_max_y = 1000;  

    
  var p_width = 120; //ширина прямоугольника
  var p_height = 80; //высота прямоугольника
  
  var p_d_width = 80; //размер промежутка между прямоугольниками по горизонтали
  var p_d_height = 60; //размер промежутка между прямоугольниками по вертикали
  //необходимые переменные
  var p_numElem = 0;                  //кол-во элементов в ряду
  
 
    
  var p_y = p_d_height;
  var p_x = p_d_width;

  var p_numUrov = 1; // текущий номер уровня
          
  // все очищаем
   //r.clear();
     connections.clear();
     p_arrObjRect.clear();
     p_arrObj.clear();

  el_rect_focus = this.rect(0, 0, 120+6, 80+6, 7);       
  el_rect_focus.attr({fill: "blue", "fill-opacity": 0, stroke: "blue", cursor: "move",title:name,"stroke-width":2}); 
  el_rect_focus.hide();        
//el_rect_focus.drag(move, dragger, up);          
          

        if ( arr.size() > 0 )//номер уровня может начитася не с 1
        {
            p_numUrov = arr[0].num_urov;
        }        

        for (var i = 0; i < arr.size(); i++) 
        {                     
            if (isXml == 1)     //для XML варианта
            {
                p_numUrov = arr[i].num_urov;
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
            else               //для не XML варианта
            {                                           
              if ( arr[i].num_urov != p_numUrov ) //переходим на следующий уроветь
                {                 
                    p_y = p_numUrov*p_height + p_numUrov*p_d_height +p_d_height;
                    if (p_y+p_height+p_d_height > p_max_y ) 
                    {
                        p_max_y = p_y+p_height+p_d_height;  
                    }
                    p_x = p_d_width;
                   
                    if ( p_numUrov%2 != 0 ) //для не четных рядов делаем сдвиг 
                    {                   
                        p_x = p_x + p_width/2; 
                    }                                   
                    p_numElem = 0; 
                    p_numUrov = p_numUrov + 1;             
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
          
            var el_rect = this.createObj(id,p_numUrov,p_x, p_y,name);       
            el_rect.click(fn_def_click);
            el_rect.dblclick( fn_def_dblclick );
            el_rect.drag(move, dragger, up);
            
	    
	    p_arrObj.push(el_rect);
            p_arrObjRect[id]=el_rect;               
        }
        //для не XML варианта
        if (isXml != 1)
        {
                  p_numUrov = p_numUrov + 1;
          
            p_y = p_numUrov*p_height + p_numUrov*p_d_height +p_d_height;
            if (p_y+p_height+p_d_height > p_max_y ) 
            {
                p_max_y = p_y+p_height+p_d_height;  
            }
                p_x = p_d_width;
                p_numElem = 0; 
        }       
        
        for (var i = 0; i < arr_1.size(); i++) 
        {                     
            if (isXml == 1)//для XML варианта
            {
                p_numUrov = arr_1[i].num_urov;
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
            else        //для не XML варианта
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
           
            var el_rect = this.createObj(id,p_numUrov,p_x, p_y,name);       
            el_rect.click(fn_def_click );
            el_rect.dblclick( fn_def_dblclick );
            el_rect.drag(move, dragger, up);  
	    p_arrObj.push(el_rect);
            p_arrObjRect[id]=el_rect;               
               
        }

        for (var i = 0; i < connect.size(); i++) 
        {
        var id1 = connect[i].idn_old;
        var id2 = connect[i].idn_low;
        var obj1 = p_arrObjRect[id1];
        var obj2 = p_arrObjRect[id2];

        connections.push(this.connection(obj2, obj1));
        
        }        
          this.setSize(p_max_x,p_max_y); 
          pnl.setHeight(p_max_y);
          pnl.setWidth(p_max_x);
         

};