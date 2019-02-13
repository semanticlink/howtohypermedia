---
title: "Minimally layered design"
pageTitle: "Keep a separation between clients and API"
description: "Learn why hypermedia is a thin layer across persistence that should guide us through the business problem."
question: What is a benefit of a network of data?
answers: ["It should be easy navigated through a browser", "It can have fine grained access control", "It can use HTTP as an application protocol", "All of the above!"]
correctAnswer: 3
duration: 2
---

![minimal layers](minimal-layers.png)

A hypermedia solution can be logically thought of as three logical layers: client, network of data and API. This extends the traditional two layer approach: client/server, backend/frontend. Two layers tends towards designs that couples the client too tightly with the server, particularly through static URLs (as described in the previous page).

The new logical layer lies between the client and API and can be termed the 'network of data'. This layer enables the follow-your-nose approach of hypermedia, and contains a series of messages including both data and options of what is available to the client. This layer now becomes the integration point regardless of the type of client and ensures that HTTP is used an application protocol to help with message framing. Unlike designs where persistence is the integration point for multiple applications, this three-layer design has one, and only one, front door into the API.

The tutorials contain code samples that show how the API code is only a thin, but necessary, layer over persistence (eg database) that connects resources as linked set of data. The tutorials also show that how multiple types of clients can walk the same of network of data to different effects.

In all, the business value of hypermedia is to expose the available business functions though a Web browser that are broadly understood and useful because it allows people to browse the domain and incrementally build up knowledge about the specifics and limits of the current domain. You should start to get this idea of how this works in the next chapter.