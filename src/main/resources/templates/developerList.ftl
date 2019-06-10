<#import "parts/common.ftl" as c>

<@c.page>
    <h1>Список авторов</h1>
<br/>




<a href="#myModalBox" class="btn btn-primary" data-toggle="modal">Добавить нового автора</a>

<div id="myModalBox" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Заголовок модального окна -->
            <div class="modal-header">
                <h4 class="modal-title">Автор - добавление</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <!-- Основное содержимое модального окна -->
            <div class="modal-body">
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


<a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
   aria-controls="collapseExample">
    Добавить нового автора
</a>



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
            </div>
        </form>
    </div>
</div>


<table class="table table-striped table-bordered">
        <thead>
        <tr>
            <th>ФИО</th>
            <th>Комментарий</th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <#list developers as developer>
            <tr>
                <td>${developer.fio}</td>
                <td>${developer.comment}</td>
                <td>
                    <form method="post" enctype="multipart/form-data" action="/developerDel">
                        <input name="developerId" type="hidden"  value=${developer.developerId}>
                        <input type="hidden" name="_csrf" value="${_csrf.token}">
                        <button type="submit" class="btn btn-primary">Удалить</button>
                    </form>

                </td>
                <td>
                    <a href="#edit${developer.developerId}" class="btn btn-primary" data-toggle="modal">Редактировать</a>

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