<#import "parts/common.ftl" as c>

<@c.page>
    <h1>Список предментых областей</h1>
<br/>

<a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
   aria-controls="collapseExample">
    Добавить новый предмет
</a>

<div class="collapse" id="collapseExample">
    <div class="form-group mt-3">
        <form method="post" action="/subjarea" enctype="multipart/form-data">
            <div class="form-group">
                <input name="name" class="form-control" type="text" placeholder="Введите предмет">
            </div>
            <div class="form-group">
                <select class="form-control"  name="fio">
                    <option value="" selected disabled hidden>Выберите автора</option>
                    <#list developers as developer>
                        <option>${developer.fio}</option>>
                    </#list>
                </select>
            </div>
            <input type="hidden" name="_csrf" value="${_csrf.token}">

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Сохранить</button>
            </div>
        </form>
    </div>
</div>


<table class="table table-striped">
        <thead>
        <tr>
            <th>Предмет</th>
            <th>Автор</th>
            <th></th>

        </tr>
        </thead>
        <tbody>
        <#list subjAreas as subjArea>
            <tr>
                <td>${subjArea.name}</td>
                <td>${subjArea.fio}</td>
                <td><a href="/subjareaDel/${subjArea.subjAreaId}">Удалить</a> </td>
            </tr>
        </#list>
        </tbody>
    </table>






</@c.page>