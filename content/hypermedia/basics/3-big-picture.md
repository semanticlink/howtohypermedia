---
title: Big Picture (Trends)
pageTitle: Trends in client design is part of a wider trend enabled by code on demand
description: "Learn that distributed applications have trended towards data and business logic being processed at the client edge"
question: Which of these statements is not true?
answers: ["Hypermedia enables easier transposing of data to the client", "Business logic should not be enacted on the server", "A network of data is the atoms of a reliable structure", "Trick question: this shift to the client is subtle and confusing"]
correctAnswer: 1
---

How to Hypermedia is focussed on building and consuming hypermedia APIs that are part of a wider trend towards data and business logic being process at the client edge. As such, the API shows an implementation where the construction of the network of data is merely a thin layer over persistence. The client contains an increasing amount of processing logic that has been provided on-demand toward business processes that while may have human intervention operates as though it is a machine-to-machine interaction.

The goal of the API is to allow for the right compromise between adaptability and robustness in the impedance mistmatch between how data is stored and how it is to be consumed. It assumes that the network of data puts together atomic pieces into a larger whole and structures relationships between the parts and how they will work together as a unit, or remain separate. It then can create strength and reduction of errors by providing the constraints in which the client can act.

The client (or clients) in turn need to be able to follow these rules for a desired end. More importantly, the approach is convergent toward an end state through semantic processes. These tutorials show some different implementations that demonstrate this. With convergence, in the tutorials, the implementations demonstrate ways in which data is transposed onto the client ready for processing and then it uses semantic processing around forms as a way to set the new state.

![big picture](big-picture.png)