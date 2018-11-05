---
title: "Minimally layered design"
pageTitle: "Keep a separation between clients and API"
description: "Learn why hypermedia is a thin layer across persistence that should guide us through the business problem."
question: What is a benefit of a network of data?
answers: ["It should be easy navigated through a browser", "It has fine grained access control", "It can use HTTP as an application protocol", "All of the above!"]
correctAnswer: 3
duration: 5
---


![](minimal-layers.png)

### Not just client/server

Think of a hypermedia solution as three logical layers rather than two. A traditional layers is client/server, backend/frontend. Instead, position the 'network of data' as a third, logical layer. This layer is now the integration point from the application. Compared with the client/server architecture where the server access the persistence store as the integration point: in these designs, the persistence is often accessed in different ways by different 'applications'.

Below is the usual mental model people have for a client and server request-response cycle.
