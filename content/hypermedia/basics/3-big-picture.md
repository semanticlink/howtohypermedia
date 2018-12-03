---
title: Big Picture (Trends)
pageTitle: Trends in client design is part of a wider trend enabled by code on demand
description: "Learn that distributed applications have trended towards data and business logic being processed at the client edge"
question: Which of these statements is not true?
answers: ["Hypermedia enables easier transposing of data to the client", "Business logic should not be enacted on the server", "A network of data is the atoms of a reliable structure", "Trick question: this shift to the client is subtle and confusing"]
correctAnswer: 1
---

_How to Hypermedia_ is focused on building and consuming hypermedia APIs that are part of a wider trend towards data and business logic being process at the client edge. As such, the API shows an implementation where the construction of the network of data is merely a thin layer over persistence. The client contains an increasing amount of processing logic that has been provided on-demand toward business processes that while may have human intervention operates as though it is a machine-to-machine interaction.

The goal of the API is to allow for the right compromise between adaptability and robustness in the impedance mistmatch between how data is stored and how it is to be consumed. It assumes that the network of data puts together atomic pieces into a larger whole and structures relationships between the parts and how they will work together as a unit, or remain separate. It then can create strength and reduction of errors by providing the constraints in which the client can act.

The client (or clients) in turn need to be able to follow these rules for a desired end. More importantly, the approach is convergent toward an end state through semantic processes. These tutorials show some different implementations that demonstrate this. With convergence, in the tutorials, the implementations demonstrate ways in which data is transposed onto the client ready for processing and then it uses semantic processing around forms as a way to set the new state.

![big picture](big-picture.png)

### Hypermedia for the dedicated

The trend to move decision making out to the client is part and parcel of a move that has deja vu of the shift from the mainframe to client-server (eg PC) to the cloud: it's a cycle of using lower cost and lower powered devices to access resources on a (logically larger and) more powerful system in a remote place. One key shift, however, is how clients are distributed in both senses of the word. Code on demand makes clients makes distribution of clients easier. However, we also have all these clients making a distributed system. As such, engineering matters when building systems at scale. Writing hypermedia-based systems is one part of a REST-style of architecture and it appears that there are few dedicated enough to build web applications the way the web works. Hopefully, these tutorials will help reduce the gap between hypermedia as niche and something that is a wider option in the mainstream because not only is it the right thing to do, it is easy to do the right thing too!