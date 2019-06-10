
Ext.onReady(function()
  {

    Ext.QuickTips.init();


    var r = Raphael("map");

    var dragger = function ()
    {
      this.ox = this.type == "rect"? this.attr("x"): this.attr("cx");
      this.oy = this.type == "rect"? this.attr("y"): this.attr("cy");
      this.animate({"fill-opacity": .2}, 500);
    };

    var move = function (dx, dy)
    {
      var att = this.type == "rect"? {x: this.ox + dx, y: this.oy + dy}: {cx: this.ox + dx, cy: this.oy + dy};
      this.attr(att);
      this.move_text();
      for (var i = connections.length; i--;) {
        r.connection(connections[i]);
      }
      r.safari();

    };

    var up = function ()
    {
      this.animate({"fill-opacity": 1}, 500);
    };


    var shapes =[r.rect(50, 10, 80, 30, 2),
      r.rect(150, 110, 80, 30, 2),
      r.rect(250, 10, 80, 30, 2)
    ];

    for (var i = 0, ii = shapes.length; i < ii; i++)
    {
      var color = Raphael.getColor();
      shapes[i].attr({fill: color, stroke: color, "fill-opacity": 1, "stroke-width": 2, cursor: "move"});
      shapes[i].drag(move, dragger, up);
    }


    var connections =[]; // массив связей

    var pnl_raphael = new Ext.Panel(
      {
      title: 'Сеть',
      contentEl: 'map',
        // autoWidth:true,
      header: false
      }
    );

   
    
    
    fn_tree = function(arr, arr_1, connect)
    {
      var p_numElem = 0; //кол-во элементов в ряду
      var p_color = Raphael.getColor(); //цвет для текущего ряда
      var p_y = 40;
      var p_x = 40;
      var p_max_x = 2000;
      var p_max_y = 1000;
      var p_numUrov = 1; // текущий номер уровня
      var p_width = 100; //ширина прямоугольника
      var p_height = 40; //высота прямоугольника
      var p_d_width = 40; //размер промежутка между прямоугольниками по горизонтали
      var p_d_height = 40; //размер промежутка между прямоугольниками по вертикали
      var p_arrObjRect =[];
      var p_arrObj =[];


      // все очищаем
      //r.clear();
      connections.clear();
      p_arrObjRect.clear();
      p_arrObj.clear();

      if (arr.size() > 0)//номер уровня может начитася не с 1
        p_numUrov = arr[0].num_urov;


      for (var i = 0; i < arr.size(); i++)
      {
        //alert('fn_tree 1');
        if (arr[i].num_urov != p_numUrov) //переходим на следующий уроветь
        {
          p_y = p_numUrov*p_height + p_numUrov*p_d_height +p_d_height;
          if (p_y+p_height+p_d_height > p_max_y)
          {
            p_max_y = p_y+p_height+p_d_height;
          }
          p_x = p_d_width;
          p_numElem = 0;
          p_color = Raphael.getColor();
          p_numUrov = p_numUrov + 1;
        }
        //alert('fn_tree 2');
        if (p_numElem != 0)
        {
          p_x = p_numElem*p_width + p_numElem*p_d_width +p_d_width;
          if (p_x+p_width+p_d_width > p_max_x)
          {
            p_max_x = p_x+p_width+p_d_width;
          }
        }
        p_numElem = p_numElem + 1;
        var name = arr[i].text;
        var id = arr[i].id;
        var el_rect = r.rect(p_x, p_y, p_width, p_height, 2);
        el_rect.attr({fill: p_color, "fill-opacity": 1, stroke: "black", cursor: "move", "stroke-width": 1, title: name});
        //el_rect.attr({fill: p_color, "fill-opacity": 1, stroke: "black",cursor: "move",title:name,"stroke-width":1});
        el_rect.dblclick(function (event)
          {
            alert('dblclick');
          }
        );
        el_rect.drag(move, dragger, up);
        p_arrObj.push(el_rect);
        p_arrObjRect[id] = el_rect;

      }
      p_numUrov = p_numUrov + 1;
      p_y = p_numUrov*p_height + p_numUrov*p_d_height +p_d_height;
      if (p_y+p_height+p_d_height > p_max_y)
      {
        p_max_y = p_y+p_height+p_d_height;
      }
      p_x = p_d_width;
      p_numElem = 0;
      p_color = "white";

      for (var i = 0; i < arr_1.size(); i++)
      {
        if (p_numElem != 0)
        {
          p_x = p_numElem*p_width + p_numElem*p_d_width +p_d_width;
          if (p_x+p_width+p_d_width > p_max_x)
          {
            p_max_x = p_x+p_width+p_d_width;
          }
        }
        p_numElem = p_numElem + 1;

        var name = arr_1[i].text;
        var id = arr_1[i].id;

        var el_rect = r.rect(p_x, p_y, p_width, p_height, 2);
        el_rect.attr({fill: p_color, "fill-opacity": 1, stroke: "black", cursor: "move", title: name, "stroke-width": 1});
        el_rect.dblclick(function (event)
          {
            alert('dblclick');
          }
        );
        el_rect.drag(move, dragger, up);
        p_arrObj.push(el_rect);
        p_arrObjRect[id] = el_rect;

      }



      for (var i = 0; i < p_arrObj.size(); i++)
      {
        if (typeof p_arrObj[i] != 'undefined')
          r.create_text(p_arrObj[i]);
      }

      for (var i = 0; i < connect.size(); i++)
      {
        var id1 = connect[i].idn_old;
        var id2 = connect[i].idn_low;
        var obj1 = p_arrObjRect[id1];
        var obj2 = p_arrObjRect[id2];

        connections.push(r.connection(obj1, obj2, "#000", "#fff"));

      }
      for(var i = 0; i < connections.size(); i++)
      {
        connections[i].line.toBack();
      }


      r.setSize(p_max_x, p_max_y);
      pnl_raphael.setHeight(p_max_y);
      pnl_raphael.setWidth(p_max_x);


    }



    fn_load = function()
    {
      // все очищаем
      r.clear();
      Ext.Ajax.request(
        {
        waitMsg: 'Please wait...',
        url: 'graph/view',
        params: {
          task: "LOAD"
          },
        success: function(response)
          {
            var json = response.responseText;
            var res = eval('(' + json + ')');
            fn_tree(res.data, res.data_1, res.connections);
          },
        failure: function(response)
          {
            Ext.MessageBox.alert('Ошибка', response.statusText);
          }

        }
      );
    }


    var pnl_main = new Ext.Panel(
      {
      renderTo: 'content-grid',
      height: def_height,
      autoWidth: true,
      header: true,
      title: 'Сеть',
      autoScroll: true,
      items:[pnl_raphael],
      tbar:[
          {
          text: 'Загурзить',
            // iconCls: 'silk-add',
          handler: fn_load,
          scope: this
          }, '-'
        ]
      }
    );


    r.setSize(1000, def_height);
    pnl_raphael.setWidth(1000);
    pnl_raphael.setHeight(def_height);


  }
);