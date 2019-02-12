---
title: Modelling Domain
pageTitle: The domain of the API is modelled primarily through link relations
description: "Learn how to diagram the API textually and get also get visual output"
---

![todo api](../../hypermedia/advanced/todo-api.png)

<Instruction>

Read the underlying code base. The custom link relations are specific to the application (hence in Domain) and the reused anatomy is in an external library (but inline for the tutorial!)

```bash(path="...todo-hypermedia/api")
.
│
├── ApiResources.puml  <-- the overview diagram is <b>really important</b>
│
└── Domain
     └── LinkRelations
        └── CustomLinkRelation.cs
```

</Instruction>


#### Custom

These are the domain link relations contained in the one place.

<Instruction>

Create custom link relations used through the API.

```csharp(path="...todo-hypermedia/api/Domain/LinkRelations/CustomLinkRelation.cs")
namespace Domain.LinkRelations
{
    public static class CustomLinkRelation
    {
        ///************************************
        ///
        ///   Form links
        ///
        ///************************************
        public const string Search = "search";

        public const string Submit = "submit";


        ///************************************
        ///
        ///   Authentication/context links
        ///
        ///************************************

        ///<summary>
        ///    Collection of different authenticate strategies available
        /// </summary>
        public const string Authenticate = "authenticate";
        public const string Authenticator = "authenticator";

        /// <summary>
        ///     Link to the configuration of the Auth0 service
        /// </summary>
        public const string Auth0 = "auth0";

        /// <summary>
        ///     Link to the collection available to the authenticated user
        /// </summary>
        public const string Me = "me";

        /// <summary>
        ///     Tenants collection for authenticated users
        /// </summary>
        public const string Tenants = "tenants";
        public const string Tenant = "tenant";

        /// <summary>
        ///     Users collection on a tenant
        /// </summary>
        public const string Users = "users";


        ///************************************
        ///
        ///   DOMAIN links
        ///
        ///************************************
        /// <summary>
        ///     Todo collection for a user/tenant
        /// </summary>
        public const string Todos = "todos";

        /// <summary>
        ///    Tags (categories) available on a todo
        /// </summary>
        public const string Tags = "tags";
    }
}
```

</Instruction>

### Documenting/Modelling the domain (custom link relations)

For completeness, as you add new custom link relations, it means that you are extending the domain. Modelling it in the domain diagram first is __strongly__ advised. This section will provide the `puml` file that the resulting diagram for compleleness. Reference both forms back to the custom link relations.

<Instruction>

Create a puml file for the diagram.

```text(path="...todo-hypermedia/api/ApiResources.puml")
@startuml

class home as "Home/Root of the API"
home : version
' home +--|> tenant : tenants
home +--|> tag : tags
home #-left-|> todoState : states
home .--|> user : me
home +--|> user : users

class tag as "tag"
tag : name
tag +--|> todo : todos

class tenant as "tenant"
tenant : name
tenant +--|> user : users
tenant +--|> todo : todos


class todo as "todo"
todo : many
todo : state
todo +--> todo : todos
todo #--|> todoState
todo +--|> comment : comments
todo +--|> tag : tags

class comment as "comment"
comment : many
note top
  Not implemented
end note

'
' Integration Support
' ===================
'

class user as "User"
note top
  A user encapsulates the
  concept of identity in
  the system
end note
user : name
user +--|> tenant : tenants
user +--|> todo : todos


'
' Enumeration resources
' =====================
'

class todoState  as "Todo States (enum)"
todoState : name
todoState : description


@enduml
```

</Instruction>



