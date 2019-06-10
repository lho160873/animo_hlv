<#import "parts/common.ftl" as c>

<@c.page>
    <div class="form-row">
        <div class="form-group col-md-6">
            <form method="get" action="/main" class="form-inline">
                <input type="text" name="filter" class="form-control" placeholder="Search by tag"
                       value="${filter?ifExists}">
                <button class="btn btn-primary ml-2" type="submit">Search</button>
            </form>
        </div>
    </div>


    <#include "parts/messageEdit.ftl" />

    <#include "parts/messageList.ftl" />

</@c.page>