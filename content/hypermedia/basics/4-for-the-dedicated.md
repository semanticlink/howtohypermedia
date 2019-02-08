---
title: Hypermedia for the dedicated
pageTitle: Hypermedia is the engine of application state
description: "Learn some techniques that will ease the server and client development"
question: Which of these statements is not true?
answers: ["Hypermedia does have a huge barrier to entry in training and learning", "REST requires discipline on all sides", "Hypermedia works with any representation", "Hypermedia over fetches"]
correctAnswer: 3
---

These tutorials put up for grabs a collection-based implementation of hypermedia that is hopefully pragmatic as it attempts to balance between simplicity and flexibility for the current context:

* _collections:_ proven to work well enough for most business-type conditions (different parts can move independently and cooperate)
* _pragmatic:_ can be coded and tested in general purpose languages and with standards without the need for more specialised tooling
* _simplicity:_ can be reasoned about by developers to model business processes without elaborate tooling
* _flexibility:_ the underlying abstractions can be serialised (across-the-wire representations) into preferred microformats
* _current context:_ it surprising how, regardless of technology changes, developers (and tooling/library makers) still find ways to reimplement antipatterns from the past using shiny new technology

Engineering matters when building systems at scale (more correctly, across multiple scales). Working with hypermedia is one part of a REST-style of architecture and it appears that there are few dedicated enough to build web applications the way the web works. Hopefully, these tutorials will help reduce the gap between hypermedia as niche and something that is a wider option in the mainstream because it is not the domain of experts (ie the right thing to do) but rather because it is easy to do the right thing!

Finally, hypermedia is part of a REST-style of architecture and a good summary of its challenges and benefits have been [already well outlined](https://blog.goodapi.co/rest-vs-graphql-a-critical-review-5f77392658e7):
 
> ### REST pros
> * Will scale indefinitely
> * High performance (especially over HTTP2)
> * Proven for decades
> * Works with any representation
> * Affordance-centric
> * Server-driven application state (server tells you what you can call an when)
> * Full decoupling of client and server enabling the independent evolution
> ###REST neutral
> * Design first, you have to think about use cases upfront, design resources and affordances accordingly.
> * Multiple APIs (or dedicated resources) for specific client needs
> * No reference documentation needed
> ### REST cons
> * Huge entry barrier in training and learning, which most of us never overcome
> * The big change in the paradigm shift from SOAP, challenging for enterprises to change the mindset
> * Requires clients to play along
> * Poor or no tooling for clients
> * No framework or tooling guidance
> * Requires discipline on all sides
> * You have to be an expert and then you still won’t get it right
> * You do it wrong and you end up in the world of problems worse then if you would go with GraphQL
> * Challenging to keep consistency and any governance