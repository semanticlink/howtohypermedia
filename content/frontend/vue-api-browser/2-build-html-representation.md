---
title: HTML representation
pageTitle: "What and why HTML representations"
description: "Learn what and why to build HTML representation of data with code on demand"
question: Why do we need to care about HTML representations of a resource?
answers: ["Because HTML, javascript and CSS are ubiquitous", "Because browsers content negotiation asks for HTML as the highest priority", "Because hypermedia is more than data", "Because all of the above"]
correctAnswer: 3
---

### Introduction

You are going to now see an example of an HTML representation that can load the JSON representation. The server must provide a link to the resource and a link to the code on demand.

### The HTML representation

When we request a page in a browser, it generally asks for HTML (this is called content negotiation) as the first representation that it wants. By building a server that responds to these requests we get two things:

 1. We don't have to change any settings in the browsers (no plugins or configuration)
 2. HTML allows us to add functionality to the page like clicking on links and adding rich functionality (that doesn't exist in JSON)

<Instruction>

Download the root of the api

```bash
curl http://localhost:5000
```
</Instruction>

The HTML that looks like this:

```html{6,14}
<html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Resource</title>
      <link rel="self" href="http://localhost:5000/" />
      <link rel="me" href="http://localhost:5000/user/me" />
      <link rel="authenticate" href="http://localhost:5000/authenticate" />
      <link rel="tags" href="http://localhost:5000/tag" />
      <link rel="users" href="http://localhost:5000/user" />
    </head>
    <body>
      <div id="app">Intialising ...</div>
      <script src="http://localhost:8080/api.js"></script>
    </body>
</html>
```
<Instruction>

Compare that with the `json` version (it only has data and links)

```json{4-5}
{
  "links": [
    {
      "rel": "self",
      "href": "http://localhost:5000/"
    },
    {
      "rel": "me",
      "href": "http://localhost:5000/user/me"
    },
    {
      "rel": "authenticate",
      "href": "http://localhost:5000/authenticate"
    },
    {
      "rel": "tags",
      "href": "http://localhost:5000/tag"
    },
    {
      "rel": "users",
      "href": "http://localhost:5000/user"
    }
  ],
  "version": "1.0.0.0"
}
```
</Instruction>

Two lines in the HTML are highlighted:

1. The link relation `self` which is the resource to be loaded which also is the URL in the address bar in the browser.

```html
<link rel="self" href="http://localhost:5000/" />
```

2. The code on demand which is the javascript that does all the heavy lifting. A careful eye will also see that the javascript can (and should) be served up from another domain (ie a CDN).

```html
<script src="http://localhost:8080/api.js"></script>
```
This tutorial separates the ASP.NET Core C# code that generates this HTML and the javascript which is the  `api.js`).

### Quick start on content negotiation

Read [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation) for more on understanding content negotiation values particularly in relation to q values.

<Instruction>

Inspect the request headers on your browser for your request above (eg in [Chrome](https://www.mkyong.com/computer-tips/how-to-view-http-headers-in-google-chrome/) or [Firefox](https://o7planning.org/en/11637/how-to-view-http-headers-in-firefox)) and look the `Accept` header.

```js{8}
GET / HTTP/1.1
Host: localhost:5000
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8
```

</Instruction>

This example shows that `text/html` is the highest priority `0.9` (read 90%).