---
title: Clients
pageTitle: "Writing Clients Overview Tutorial"
description: "Learn that most Api always have multiple clients already whether developers believe it or not."
question: What types of clients are likely to be already running against any Api?
answers: ["Mobile vs browser", "Machine-to-machine and GUI-to-machine", "People-to-data and application-to-api", "All of the above"]
correctAnswer: 3
---


## Practice: different clients use the same Api in the same for different ends

Let's now see how there are always multiple types of clients for an Api.

1. Single resource: the client requests resources as needed (and discards)
2. Combination resource: the client requests resources tends cache resources and allow for rich processing
3. Resource processing: the clients needs to perform business processes with a high level of automation

![](separate-client-api.png)

## Examples

### Single resource

![resource](single-resource.png)

### Combination resource

![resource](combination-resource.png)

### Processing resources

![resource](processing-resource.png)
