---
title: Multiple clients
pageTitle: "Writing Clients Overview Tutorial"
description: "Learn that most APIs should have multiple types of clients."
question: What types of clients are likely to be already running against any API?
answers: ["Mobile vs browser", "Machine-to-machine and GUI-to-machine", "People-to-data and application-to-api", "All of the above"]
correctAnswer: 3
videoId: hE6ymKeJmsM
duration: 10
---

There are multiple types of clients that can walk across the API. Earlier solutions were concerned with different devices and languages (eg mobile vs desktop, browser vs native, React vs Vue). These people-to-date and GUI-to-machine  concerns are still issues but solving these technical concerns alone is not enough. As well, hypermedia requires clients that solve machine-to-machine and application-to-api concerns. The underlying design in this approach is how can the client reconstruct state and get the server to converge on a new state? Whilst at the same time not require human interpretation/intervention.

**How to Hypermedia** has code samples for three different types of clients. This chapter gives context of how each of these clients are different. These clients are separated out each of them deal with representations on the client to different extents and for different ends.

![multiple clients](multiple-clients.png)

### Summary of clients

* **Single resource:** the client requests resources as needed and discards (independent represesentations across requests or between routes/views/controllers)
* **Combination resource:** the client requests resources tends cache resources and allow for rich processing (retains cache of linked resources/network of data across requests eg single-page application with cache across routes/views)
* **Resource processing:** the clients needs to perform business processes with a high level of automation (cache + synchronisation across multiple requests)

### Client One: single resource

In the samples, this is the general purpose client that is used to view the API itself. It is code that can make a single request/response display cycle. Primarily all it needs to be able to do is know mime type to convert it into a in-memory representation and find the `links` and then bind it to a generalised HTML view. It doesn't tend to scale well, nor does it need to. This example is the API browser code that can be shipped on every HTML representation of a resource.

![resource](single-resource.png)

### Client Two: combination resource

In the samples, this is the 'todo' app with its rich interface and easy editing. The code makes many requests to build up a cache of representations that are then bound to the user interface. This approach can then streamline the user experience across a business process.

![resource](combination-resource.png)

### Client Three: processing resources

In the samples, this is the __admin__ function inside the todo app. The goal of the admin code is the clone or update entire representations structures without intervention. The code is able to synchronise an entire network using only link relations (and its type: collection or singleton). In practice, this is used in multiple ways: as an export function, an bulk-processing update and move data across boundaries. The purpose of this type of client is to perform bulk processing of the resources on the client (not on the server).

![resource](processing-resource.png)
