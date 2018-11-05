---
title: Summary
pageTitle: "Building general purpose API browser client tutorial"
description: "Learn how to user hypermedia as engine to navigate an API and make changes"
question: Did you find this tutorial useful?
answers: ["What tutorial?", "Yes, I learned something!", "No, I even forgot what I knew before!", "Too confusing!"]
correctAnswer: 1
---

Building a general purpose client for a browser requires that you have an API that:

* responds to HTML
* serves up the javascript client code
* then requests specific media types (eg JSON)

The general purpose client code must:

* be able follow links
* convert representations to HTML
* add actions to HTML based on semantic links
* display forms and put existing data in
* semantically decide how to perform form submission

There is on aspect in the code that wasn't covered. Completing PATCH of uri-list via HTML5 drag and drop. Extend yourself, it is in there!

That's it!