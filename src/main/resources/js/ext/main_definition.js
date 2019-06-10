
Ext.onReady(function() {

Ext.QuickTips.init();


    //глваная панель окна
    var myBorderPanel = new Ext.Panel({
    renderTo: 'content-grid',
    height: def_height,
    autoWidth:true,
    title: 'Border Layout',
    layout: 'border',
    header: false,
    waitMsgTarget: true,
    hideBorders:true,
    monitorResize:true,
    items:[ m_definitionPanel,
      m_tabsDescript]
        
    });   


   //определяем доступность функций(визуальных кнопок редактирования) на панели   
var obj = new Array();
obj.push( m_definitionGrid.getTopToolbar().items.itemAt(0) );
obj.push( m_definitionGrid.getTopToolbar().items.itemAt(1) );
obj.push( m_definitionGrid.getTopToolbar().items.itemAt(2) );
obj.push( m_definitionGrid.getTopToolbar().items.itemAt(3) );
obj.push( m_definitionGrid.getTopToolbar().items.itemAt(4) );
obj.push( m_definitionGrid.getTopToolbar().items.itemAt(5) );
obj.push( m_definitionGrid.getColumnModel().getColumnById('0') ); //колонка в таблице
obj.push( m_illustrationDescript );//компонент для Иллюстративного материала
//obj.push( m_editDescript );
obj.push( m_editDescript.getTopToolbar().items.itemAt(0) );
obj.push( m_editDescript.getTopToolbar().items.itemAt(1) );

var obj_syncSize = new Array();
obj_syncSize.push(m_editPanel);

obj_syncSize.push(m_editDescript);
obj_syncSize.push(m_illustrationDescript);
obj_syncSize.push(m_editPanelIllustrationDescript);

getRole( 'definition','update', obj, obj_syncSize );  //проверяем роль на возможность сохранения изменений

  
    //массив с определениями (Store БД)
    m_definitionGrid.getStore().load({params: {start: 0, limit: def_limit_defs }}); 

    definitionAllStore.load({params: {start: 0, limit: 0}});         

    //содаем холс для рисования схемы        
    var r = Raphael("map",0,1); 
    //задаем начальные размеры холста
    r.setSize(1000,0); 
    //задаем начальные размеры панели, на которой холс распологается
    pnl_raphael.setWidth(1000);
    pnl_raphael.setHeight(def_height);  

   //регистрируем событие закрытия окна выбора предметной области
    //myBorderPanel.relayEvents(SubjWindow,['hide']);
    myBorderPanel.relayEvents(SubjWindow,['sendSubj']);
    //назначаем функцию обработки события закрытия окна выбора предметной области
    //myBorderPanel.on('hide',function(){onSubjWindowHide( r );});
    myBorderPanel.on('sendSubj',function(){onSendSubj( r );});
    
    //регистрируем событие выбора кнопки построения схемы
    myBorderPanel.relayEvents(m_btnGraph,['click']);
    //назначаем функцию обработки события выбора кнопки построения схемы
    myBorderPanel.on('click',function(){onLoadSchema( r );}); 

});




