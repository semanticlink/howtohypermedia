---
title: Introduction
pageTitle: "Building a rich todo app tutorial"
description: "Learn how to build a todo app and admin functions over the top of a hypermedia API"
---

### Motivation

Consuming hypermedia means respecting the constraints of a self-contained API from a known single starting point and following link relations. This tutorial explores a concrete implementation of the todo API that builds a simple todo app.

The tutorial is written using Vue and covers:

* client-side urls and routing
* binding views to representation (through client-side application cache)
* on-demand authentication
* cloning todos (through sync utilities that build on client-side application cache)

### Two views of the application

 Most business applications have administrative functions hidden from the customer-side view. This has been modelled in the todo app to show that clients can interact with the API to varying levels. The first is the customer-side view is creating and using todos individually and at the request of users (with some batch functions). The other view is administrative which often requires bulk processing. By the end of the tutorial, you should start to understand that all of these functions exist on a continuum and all should build on the same foundation as outlined in the points above.

### View One: Todo App

The customer fronting application walks the API and binds the UI to specific parts resources for display, update, creation and deletion. It also might batch process functions by iterating over a set.

![combination-resource](../../hypermedia/advanced/combination-resource.png)

### View Two: Admin

Administrative view often also require bulk processing. Drag and drop is a technique to facilitate invoking these types of approaches. Underneath, resources are hydrated and evaluated for changes to be made back against the server.

![processing-resource](../../hypermedia/advanced/processing-resource.png)
