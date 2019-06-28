<#import "parts/common.ftl" as c>

<@c.page>
    <h1>Список всех понятий</h1>
<br/>








<form method="get" class="form-inline">
    <div class="form-row">
                <div class="col-sm">

            <select class="form-control"  name="subjAreaId"  >
                <option value="" selected disabled hidden>Выберете предметную область</option>
                <#list subjAreaList as subjArea>
                    <option <#if subjAreaId??><#if subjAreaId == subjArea.subjAreaId >selected</#if></#if> value=${subjArea.subjAreaId}>${subjArea.name}</option>>
                </#list>
            </select>

                </div>
                <div class="col-sm">
                <button class="btn btn-primary ml-2" type="submit" formaction="/definition">Поиск</button>
                </div>

                <div class="col-sm">
            <button class="btn btn-primary ml-2" type="submit" formaction="/definitionCalc">Запустить Анализ</button>
                </div>
            </div>
</form>



<p class="text-muted font-italic">
    &nbsp${test?ifExists}
</p>




<a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
   aria-controls="collapseExample">
    Добавить новое поняти
</a>

<div class="collapse" id="collapseExample">
    <div class="form-group mt-3">
        <form method="get" enctype="multipart/form-data" action="/definitionAdd">
            <div class="form-group">
                <select class="form-control"  name="subjAreaId"  >
                    <option value="" selected disabled hidden>Выберете предметную область</option>
                    <#list subjAreaList as subjArea>
                        <option <#if subjAreaId??><#if subjAreaId == subjArea.subjAreaId >selected</#if></#if> value=${subjArea.subjAreaId}>${subjArea.name}</option>>
                    </#list>
                </select>
            </div>

            <div class="form-group">
                <input name="name" class="form-control" type="text" placeholder="Понятие">
            </div>
            <div class="form-group">
                <label for="taDescription">Определение</label>
                <textarea class="form-control" name="description"  id = "taDescription" rows="6"></textarea>
            </div>

            <!--<div class="form-group">
                <input name="description" class="form-control" type="text" placeholder="Определение">
            </div>-->

            <input type="hidden" name="_csrf" value="${_csrf.token}">

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Сохранить</button>
                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Отменить
                </button>
            </div>

        </form>
    </div>
</div>

<nav aria-label="Страницы">
    <ul class="pagination justify-content-center">
        <li class="page-item"><a class="page-link" href="#">Предыдущая</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Следующая</a></li>
    </ul>
</nav>

<table class="table table-striped table-bordered">
    <thead>
    <tr>
        <th>Понятие</th>
        <th>Определение</th>
        <th>Номер уровня</th>
        <th></th>
    </tr>
    </thead>
    <tbody>
        <#list definitions as definition>
        <tr>
            <td>${definition.name}</td>
            <td>${definition.description}</td>
            <td>${definition.numUrov}</td>
            <td><a href="/definitionDel/${definition.idn?string("0")}">Удалить</a> </td>
        </tr>
        </#list>
    </tbody>
</table>


</@c.page>