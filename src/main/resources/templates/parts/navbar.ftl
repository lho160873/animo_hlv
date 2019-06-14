<#include "security.ftl">
<#import "login.ftl" as l>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Сети знаний</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
            </li>
        <#if user??>
            <li class="nav-item">
                <a class="nav-link" href="/main">Messages</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/user-messages/${currentUserId}">My messages</a>
            </li>
        </#if>
            <#if isAdmin>
            <li class="nav-item">
                <a class="nav-link" href="/user">User list</a>
            </li>
            </#if>
            <#if user??>
            <li class="nav-item">
                <a class="nav-link" href="/user/profile">Profile</a>
            </li>
            </#if>

            <li class="nav-item">
                <a class="nav-link" href="/definitionFind">Понятие</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/definition">Список понятий</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/developer">Список авторов</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/subjarea">Список предметных областей</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/definitionGraph">Схема</a>
            </li>

        </ul>
        <div class="navbar-text mr-3"><a href="/user/${currentUserId}">${name}</a></div>
        <@l.logout />
    </div>
</nav>