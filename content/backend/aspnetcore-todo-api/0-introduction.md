---
title: Introduction
pageTitle: "Building a hypermedia API in ASP.NET Core tutorial"
description: "Learn how to build a hypermedia API that works within the constraints of REST"
---

### Motivation

Using hypermedia means that we have a self-contained API with one starting point and then easily reasoned about from there! The building blocks of an API aren't that hard. However, it is easy to loose control of it. This tutorial covers the different types of building blocks—some that are one off and some that are repeated. Much of the repeated code looks the same across other languages and frameworks. The one-off code will needed in other implementations but may easier or harder but the underlying approach is the same.

### The repeatables (doing hypermedia)

* modelling representations (collections and singletons)
* modelling the domain through link relations
* constructing representations
    * singleton
    * collection (feed representation)
    * virtual (redirect)
* constructing searchable resources
* create representation (on collection with create-form)
* update singleton (with edit-form)
* update collection (with edit-form and different mime-types)

### The one-offs (wiring up hypermedia)

Currently this tutorial does not include explaining what is in the code base.

* content negotiation
* URI construction and deconstruction
* caching strategies
* dependency injection
* persistence bootstrapping
* CORS
* authentication
* authorisation (resource-based model rather than role-based)
* persisting resources (and writing authorisation rules)
* test strategies