<#include "security.ftl">

<div class="card-columns">
<#list messages as message>
    <div class="card my-3">
        <#if message.filename??>
            <img src="/img/${message.filename}" class="card-img-top">
        </#if>
        <div class="m-2">
            <span>${message.text}</span><br/>
            <i>#${message.tag}</i>
        </div>
        <div class="card-footer text-muted">
            <a href="/user-messages/${message.author.userId}">${message.authorName}</a>
            <#if message.author.userId == userId>
                <a class="btn btn-primary" href="/user-messages/${message.author.userId}?message=${message.id}">
                    Edit
                </a>
            </#if>
        </div>
    </div>
<#else>
    No message
</#list>
</div>