---
title: Summary
pageTitle: "Building a rich todo app tutorial"
description: "Learn how to build a todo app over the top of a hypermedia API"
question: Did you find this tutorial useful?
answers: ["What tutorial?", "Yes, I learned something!", "No, I even forgot what I knew before!", "Too confusing!"]
correctAnswer: 1
---

This tutorial showed some of the advanced aspects of building a rich application over a hypermedia API:

* bookmarkable URIs hold state and you'll need to develop your strategy early on for client-side urls and routing
* being able to reconstruct client state (that in practice is performs) tends to require a client-side application cache that views can bind to
* with the two above, users can enter the application anywhere which means that you'll need good on-demand authentication and be able to replay requests
* updating and cloning data needs to occur using the same code and a hypermedia application that has forms (aka affordances) makes this pretty straightforward

That's it!