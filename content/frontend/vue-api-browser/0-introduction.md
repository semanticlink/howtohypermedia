---
title: Introduction
pageTitle: "Building general purpose API browser client tutorial"
description: "Learn how to build a general purpose client to browse over the API "
question: A general purpose client of a hypermedia best serves who?
answers: ["Business-to-business", "Machine-to-machine", "People-to-data", "All of the above"]
correctAnswer: 2
---

### Motivation

Using hypermedia means that we have a self contained API that should make it easy to browse the API just as we would web pages. This means that we can easily view, create, update and delete through the browser!

![](../../hypermedia/advanced/single-resource.png)

### What is a general purpose client?

A general purpose client for a browser is the ability to:

- use any browser (ideally without installing extras) eg chrome, firefox, safari to navigate around the data
- make the domain of the business understandable!
- to have the URL in the browser address bar be the same as the API address
- be able to make updates or deletions

Web pages are easy to use, why can't we have this for data too?

### It's really just an HTML representation of a resource

There is no magic with a general purpose client. Here's what happens. Enter a starting point of the API in the browser address bar. The server will respond with an HTML representation of the resource. The HTML returns two things: a 'self' link of the address of the resource and a link to the javascript (ie code on demand) that will do all the work of re-asking the server for the appropriate representation of the resource and then processes that request including displaying it. In most cases, it asks for JSON (ie application/json) and deals with authentication.

### The challenge

Writing a client for hypermedia is going to be a balance between general purpose doing anything and the specifics of the domain of the API. As you go through this tutorial, we'll point out where some is general or specific. Specific usually means that there isn't an open standard agreement yet.