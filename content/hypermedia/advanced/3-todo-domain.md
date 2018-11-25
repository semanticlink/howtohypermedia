---
title: Todo Domain
pageTitle: "TODO app domain API"
description: "Learn about different security aspects and strategies for your Api, such as authentication, authorisation and auditing, and the one-front door strategy."
question: Which one of these strategies is not a valid way to defend your system?
answers: ["Make your system cater for each security attack vector", "Have one strategy only", "Write simple, understandable code that is boilerplate", "Make your code subtle and obscure"]
correctAnswer: 3
---

### Modelling the API via collections

![](todo-api.png)

```dot
class home as "Home/Root of the API" <<H, #00FF00) >>
home : version
' home +--|> tenant : tenants
home +--|> tag : tags
home #-left-|> todoState : states
home .--|> user : me
home +--|> user : users

class tag as "tag"
tag : name
tag +--|> todo : todos

class tenant as "tenant"  <<O, #00FF00) >>
tenant : name
tenant +--|> user : users
tenant +--|> todo : todos


class todo as "todo"   <<I, #0000FF) >>
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

class user as "User"  <<A, #00FFFF) >>
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

class todoState  as "Todo States (enum)" <<E, #FF7700) >>
todoState : name
todoState : description

```


We could specific it via https://mnot.github.io/I-D/json-home/