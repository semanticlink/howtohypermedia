---
title: Common Questions
pageTitle: "Common Questions"
description: "Answer common questions about these tutorials"
---

### Where are the demo URLs?

* Todo App: https://todo.semanticlink.io
* API: https://api.todo.semanticlink.io

### What are the credentials?

* **user**: test-1@semanticlink.io
* **password**: 1234qwerZXCV

### What's the story about the Authentication?

The todo app should ideally have this implemented outside the application.The current implementation using the credentials above is using [Auth0](https://auth0.com). Basically, it has a free plan that demonstrated the point well enough.

### What about Authorisation?

The todo app can either implement a resource-based or role-based access control. Currently, no chapters explain the (simplified) implementation in the code base.

### What's missing in all this puzzle?

- client-side binding to resources: profiles, can we get around compile time bindings?
- client-side binding to field types in forms: this currently hard coded and not exposed via the API (so devs would need 'documentation' to do this)
- domain knowledge: how do we know what the API at a big picture looks like (json-home, sequence diagrams, dot notation diagrams, API specs)

### Why isn't this more of a tutorial describing what hypermedia is?

This is a tutorial series for the dedicated. It is assumes a baseline level of knowledge and these tutorials are about **how** implementations are done. This is a place to read documented code and look at abstractions and code organisation. The proof is in the ease of use and understanding. If you are looking for what is hypermedia or why then there exists plenty of material via a quick search and loads of books on the subject in the last ten years.

### Why is the tutorial code primarily in one repository?

Currently, at this stage it is easier to keep everything in one repository because we are trying to keep everything in sync and that the utility libraries are also still "under developmnent". Separate folders are good enough for modulerisation and let's not add any more overheads. This could change at any time.

### What is hoped out of __How to Hypermedia__?

That on getting some examples built that are comparable, there is a pragmatic step forwards such that somebody comes up with that secret sauce that move hypermedia from the dedicated to the mainstream. It is likely that a query abstraction (like Neo4j's graphite or GraphQL) over the top of a good client application cache (per client). On the API, there must be a better way that all this boilerplate code. Yet, that tends towards a domain specific langugage (DSL) that moves away from a general purpose language where it by repetition and exception, the essential and accidental are separated. So perhaps it will come from a simplified-REST-inspired-without-the-legacy-bloat serverless-side framework that has clean relative (ie not a flat namespaced) routing. Put differently, the current decades old approaches to MVC make the simple aspects that we should almost get for free way too hard and time consuming. [/end of rant]

### What books/resources are there on Hypermedia?

* Mike Amundsen: eg [Designing and Implementing Hypermedia APIs](https://www.infoq.com/articles/hypermedia-api-tutorial-part-one)
    * [Building Hypermedia APIs with HTML5 and Node: Creating Evolvable Hypermedia Applications](http://shop.oreilly.com/product/0636920020530.do)
    * [RESTful Web APIs: Services for a Changing World](http://shop.oreilly.com/product/0636920028468.do)
    * [RESTful Web Clients: Enabling Reuse Through Hypermedia](http://shop.oreilly.com/product/0636920037958.do)
* Irakli Nadareishvili: [Video](http://youtu.be/_UG7u7ARTfM%3Ft=35m25s) and [Transcript](https://www.freshblurbs.com/blog/2013/10/22/web-of-apis-hypermedia-collection-document.html) of a Talk on Hypermedia
* Steve Klabnik: [Designing Hypermedia APIs](http://www.designinghypermediaapis.com/)and [Video](https://www.youtube.com/watch?v=g4sqydY3hHU)
* Roy Fielding: [Representational State Transfer (REST)”](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
* [API StyleBook](http://apistylebook.com/): collection of resources for API designers (from various providers like Atlassian, Google, Microsoft, PayPal, Redhat)
