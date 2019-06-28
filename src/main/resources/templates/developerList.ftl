<#import "parts/common.ftl" as c>

<@c.page>
    <h1>Список авторов</h1>
<br/>

<div class="collapse" id="collapseExample">
    <div class="form-group mt-3">
        <form method="post" enctype="multipart/form-data" action="/developer">
            <div class="form-group">
                <input name="fio" class="form-control" type="text" placeholder="ФИО">
            </div>
            <div class="form-group">
                <input name="comment" class="form-control" type="text" placeholder="Комментарий">
            </div>
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


<div class="mb-3">

<a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
   aria-controls="collapseExample">
    Добавить нового автора
</a>

</div>

<table class="table table-striped table-bordered">
        <thead>
        <tr>
            <th>ФИО</th>
            <th>Комментарий</th>
            <th></th>

        </tr>
        </thead>
        <tbody>
        <#list developers as developer>
            <tr>
                <td>${developer.fio}</td>
                <td>${developer.comment}</td>
                <td><a href="/developerDel/${developer.developerId}">Удалить</a>&nbsp&nbsp&nbsp&nbsp
                    <a href="#edit${developer.developerId}" data-toggle="modal">Редактировать</a>

                    <div id="edit${developer.developerId}" class="modal fade">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <!-- Заголовок модального окна -->
                                <div class="modal-header">
                                    <h4 class="modal-title">Автор - редактирование</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group mt-3">
                                        <form method="post" enctype="multipart/form-data" action="/developerEdit">
                                            <input name="developerId" type="hidden"  value=${developer.developerId}>
                                            <div class="form-group">
                                                <input name="fio" class="form-control" type="text" placeholder="ФИО" value=${developer.fio}>
                                            </div>
                                            <div class="form-group">
                                                <input name="comment" class="form-control" type="text" placeholder="Комментарий" value=${developer.comment}>
                                            </div>
                                            <input type="hidden" name="_csrf" value="${_csrf.token}">

                                            <div class="form-group">
                                                <button type="submit" class="btn btn-primary">Сохранить</button>
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>

            </tr>
        </#list>
        </tbody>
    </table>




</@c.page>