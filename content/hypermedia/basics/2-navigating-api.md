---
title: "Navigating a hypermedia API"
pageTitle: "A demonstration of a generic client to walk the network of data API"
description: "Learn what a hypermedia looks like to be able to explore a domain."
question: What is a benefit of a network of data?
answers: ["It should be easy navigated through a browser", "We can user simple clients that can update resources", "It is a fast way to start understanding a domain", "All of the above!"]
correctAnswer: 3
duration: 6
videoId: 8NbjK0BuTe8
---

A well designed hypermedia API is both human and machine readable. Here are some of the key aspects that are illustrated in the video.

* **known starting point**: the same URI is the root of the API ([demo](https://api.todo.semanticlink.io))
* **navigate in the browser using link relations**: the link relations all have URIs that can be followed that moves through the network of data
* **example of client-side route**: in the address bar of the browser, you can always see what resource you are on (it will also be the `self` link to relation too) and then there is the client view of the resource and this will be on the right-hand side of the '#'
* **navigate back to the network of data**: you should not only be able to move through into link relations but also be able to move back up the network of data. There are two ways to do this: use the back button if the previous position was were you want to be or use the `up` link relation to move upwards to the logical parent
* **updates or creates via forms**: being able to update or create is provided via 'template' forms from the server—these contain information about the values that the server will accept. These then can be submitted back with the values added/updated to make changes.
