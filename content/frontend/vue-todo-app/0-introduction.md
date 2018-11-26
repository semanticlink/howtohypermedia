---
title: Introduction
pageTitle: "Building a rich todo app tutorial"
description: "Learn how to build a todo app over the top of a hypermedia API"
---

### Motivation

Consuming hypermedia means that we have to respect the constraints of self-contained API with one starting point. This tutorial explores a concrete implementation of the todo API that builds a simple todo app.

The tutorial is written using Vue and covers:

* client-side urls and routing
* binding views to representation (through client-side application cache)
* on-demand authentication
* admin view to cloning todos (through sync utilities that build on client-side application cache)

### Two views

#### Todo App

![combination-resource](../../hypermedia/advanced/combination-resource.png)

#### Admin
![processing-resource](../../hypermedia/advanced/processing-resource.png)
