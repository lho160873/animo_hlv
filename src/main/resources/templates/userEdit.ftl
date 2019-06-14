<#import "parts/common.ftl" as c>

<@c.page>
    <h1>User editor</h1>

    <#if user??>
<form action="/user" method="post">
    <input type="hidden" value="${_csrf.token}" name="_csrf">
    <input type="text" value="${user.username}" name="username">
    <input type="hidden" value="${user.id}" name="userId">
    <#list roles as role>
        <div>
            <label><input type="checkbox" name="${role}" ${user.roles?seq_contains(role)?string("checked","")}>${role}</label>
        </div>
    </#list>
    <button type="submit">Save</button>
</form>
    <#else>
        Необходимо авторизоваться
</#if>

</@c.page>