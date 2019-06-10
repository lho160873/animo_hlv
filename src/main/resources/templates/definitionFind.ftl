<#import "parts/common.ftl" as c>

<@c.page>
    <h1>Понятие</h1>
<br/>


<div class="form-row">
    <div class="form-group col-md-6">
        <form method="get" action="/definitionFind" class="form-inline">
            <input type="text" name="filter" class="form-control" placeholder="Понятие"
                   value="${filter?ifExists}">
            <button class="btn btn-primary ml-2" type="submit">Поиск</button>
        </form>
    </div>
</div>



<table class="table table-striped">
        <thead>
        <tr>
            <th>Понятие</th>
            <th>Определение</th>
            <th>Предметная область</th>
            <th>Автор</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <#list definitions as definition>
            <tr>
                <td>${definition.name}</td>
                <td>${definition.description}</td>
                <td>${definition.subjArea.name}</td>
                <td>${definition.subjArea.developer.fio}</td>
                <td><a href="/definitionDel/${definition.idn}">Удалить</a> </td>
            </tr>
        </#list>
        </tbody>
    </table>


</@c.page>