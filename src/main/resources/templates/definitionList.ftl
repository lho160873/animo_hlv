<#import "parts/common.ftl" as c>

<@c.page>
    <h1>Список всех понятий</h1>
<br/>





<div id="frmAdd" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Заголовок модального окна -->
            <div class="modal-header">
                <h4 class="modal-title">Понятие - добавление</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <!-- Основное содержимое модального окна -->
            <div class="modal-body">
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
                            <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                        </div>

                    </form>
                </div>
            </div>
            <!-- Футер модального окна
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary">Сохранить изменения</button>
            </div>-->
        </div>
    </div>
</div>


<div class="form-row">
    <div class="form-group col-md-6">
        <form method="get" class="form-inline">

            <select class="form-control"  name="subjAreaId"  >
                <option value="" selected disabled hidden>Выберете предметную область</option>
                <#list subjAreaList as subjArea>
                    <option <#if subjAreaId??><#if subjAreaId == subjArea.subjAreaId >selected</#if></#if> value=${subjArea.subjAreaId}>${subjArea.name}</option>>
                </#list>
            </select>
            <button class="btn btn-primary ml-2" type="submit" formaction="/definition">Поиск</button>
            <button class="btn btn-primary ml-2" type="submit" formaction="/definitionCalc">Запустить Анализ</button>
        </form>
    </div>
</div>
<p>
${test?ifExists}
</p>

<a href="#frmAdd" class="btn btn-primary" data-toggle="modal">Добавить новое понятие</a>
<nav aria-label="Страницы">
    <ul class="pagination justify-content-center">
        <li class="page-item"><a class="page-link" href="#">Предыдущая</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Следующая</a></li>
    </ul>
</nav>

<table class="table table-striped">
    <thead>
    <tr>
        <th>Понятие</th>
        <th>Определение</th>
        <th>Номер уровня</th>

    </tr>
    </thead>
    <tbody>
        <#list definitions as definition>
        <tr>
            <td>${definition.name}</td>
            <td>${definition.description}</td>
            <td>${definition.numUrov}</td>
        </tr>
        </#list>
    </tbody>
</table>


</@c.page>