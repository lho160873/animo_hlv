

<#import "parts/common.ftl" as c>



<@c.page>
<script type="text/javascript" src="/js/lib/prototype.js"></script>
<script type="text/javascript" src="/js/lib/scriptaculous/scriptaculous.js?load=effects"></script>
<script type="text/javascript" src="/js/lib/raphael.js"></script>
<script type="text/javascript" src="/js/ext/graffle.js"></script>
<script type="text/javascript" src="/js/ext/main_graph_new.js"></script>

<h1>Схема</h1>


<div class="form-row">
    <div class="form-group col-md-6">
        <form method="get" action="/definitionGraph" class="form-inline">
            <select class="form-control"  name="subjAreaId"  >
                <option value="" selected disabled hidden>Выберете предметную область</option>
                <#list subjAreaList as subjArea>
                    <option <#if subjAreaId??><#if subjAreaId == subjArea.subjAreaId >selected</#if></#if> value=${subjArea.subjAreaId}>${subjArea.name}</option>>
                </#list>
            </select>
            <button class="btn btn-primary ml-2" type="submit">Построить</button>
        </form>
    </div>

</div>


<div id="container"></div>
<script>
    var arr = [];
        <#list definitions as definition>
        arr.push({ id: '${definition.id}', text:'${definition.name}', num_urov: ${definition.num_urov}});
        </#list>
    var arr_1 = [];
        <#list definitionsBad as definition>
        arr_1.push({ id: '${definition.id}', text:'${definition.name}', num_urov: ${definition.num_urov}});
        </#list>
    var connect = [];
        <#list connections as c>
        connect.push({idn_old: '${c.idn_old}', idn_low: '${c.idn_low}'});
        </#list>

    fn_tree_main(arr,arr_1,connect);
</script>


</@c.page>