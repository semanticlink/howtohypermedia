---
title: Modelling Representations
pageTitle: Modelling linked representations
description: "Learn how the linked representation is the base to singletons and collections but collections are modelled through feed representations."
---



### Semantic Link model

The API uses the Semantic Link model as it basis. Go check out api modelling in the advanced section. You'll now do an implementation.

<Instruction>

Read the underlying code base.

```bash
.
│
└── SemanticLink
    ├── FeedItemRepresentation.cs
    ├── FeedRepresentation.cs
    ├── IanaLinkRelation.cs
    ├── LinkedRepresentation.cs
    └── WebLink.cs

```

</Instruction>

### Actual code

This code is external to the todo app although it is found inside the repository

<Instruction>

Create a linked representation with serialisation markup. In this form, notice that the `DataContract` attributing helps with serialisation to different formats (eg "linked" helps with XML output and is not see in the JSON form, whereas "links" will be seen in both XML and JSON).

```csharp(path="...todo-aspnetcore-vue/api/SemanticLink/LinkedRepresentation.cs")
using System.Runtime.Serialization;

namespace SemanticLink
{
    [DataContract(Name = "linked")]
    public abstract class LinkedRepresentation
    {
        [DataMember(Name = "links", Order = 10, EmitDefaultValue = false)]
        public WebLink[] Links { get; set; }
    }
}
```

</Instruction>


<Instruction>

Create a web link representation.

```csharp(path="...todo-aspnetcore-vue/api/SemanticLink/WebLink.cs")
using System.Runtime.Serialization;

namespace SemanticLink
{
    /// <summary>
    ///     An agnostic content type as a means of indicating the relationship
    ///     between resources on the web. It is a subset of the Web Linking RFC 5988
    ///     see https://tools.ietf.org/html/rfc5988
    /// </summary>
    [DataContract(Name = "link")]
    public class WebLink
    {
        /// <summary>
        ///     The descriptive name name in order to define the type of link or the relationship.
        ///     This is the fundamental part of the semantic interface where a client
        ///     follows the link based on the relationship between the source and
        ///     destination resources. Example link relation types are found at
        ///     http://www.iana.org/assignments/link-relations/link-relations.xhtml
        /// </summary>
        [DataMember(Name = "rel", Order = 10, EmitDefaultValue = false)]
        public string Rel { get; set; }

        /// <summary>
        ///     The URI to the target link. See http://tools.ietf.org/html/rfc5988#section-5.1
        /// </summary>
        [DataMember(Name = "href", Order = 20, EmitDefaultValue = false)]
        public string HRef { get; set; }

        /// <summary>
        ///     Human readable label for the destination. This may from part of the semantic
        ///     interface where the link relation (rel) is insufficient or ambiguous
        /// </summary>
        [DataMember(Name = "title", Order = 30, EmitDefaultValue = false)]
        public string Title { get; set; }

        /// <summary>
        ///     The "type" parameter, when present, is a hint indicating what the
        ///     media type of the result of dereferencing the link should be.  Note
        ///     that this is only a hint; for example, it does not override the
        ///     Content-Type header of a HTTP response obtained by actually following
        ///     the link.
        /// </summary>
        [DataMember(Name = "type", Order = 40, EmitDefaultValue = false)]
        public string Type { get; set; }
    }
}
```

</Instruction>


<Instruction>

Create a feed representation. In this form, notice that the `DataContract` attributing helps with serialisation to different formats (eg "feed" helps with XML output to atom and is not see in the JSON form).

```csharp(path="...todo-aspnetcore-vue/api/SemanticLink/FeedRepresentation.cs")
using System.Runtime.Serialization;

namespace SemanticLink
{
    /// http://en.wikipedia.org/wiki/Atom_(standard)#Example_of_an_Atom_1.0_feed
    [DataContract(Name = "feed")]
    public class FeedRepresentation : LinkedRepresentation
    {
        [DataMember(Name = "items", Order = 20)]
        public FeedItemRepresentation[] Items { get; set; }
    }
}
```

</Instruction>


<Instruction>

Create a feed item representation. In this form, notice that the `DataContract` attributing helps with serialisation to different formats (eg "feed-item" helps with XML output to atom and is not see in the JSON form).

```csharp(path="...todo-aspnetcore-vue/api/SemanticLink/FeedItemRepresentation.cs")
using System;
using System.Runtime.Serialization;

namespace SemanticLink
{
    [DataContract(Name = "feed-item")]
    public class FeedItemRepresentation
    {
        /// <summary>
        ///     The canonical URI for the item.
        /// </summary>
        [DataMember(Name = "id", Order = 15, EmitDefaultValue = false)]
        public string Id { get; set; }

        [DataMember(Name = "title", Order = 20, EmitDefaultValue = false)]
        public string Title { get; set; }

        [DataMember(Name = "published", Order = 30, EmitDefaultValue = false)]
        public DateTime? Published { get; set; }

        [DataMember(Name = "updated", Order = 40, EmitDefaultValue = false)]
        public DateTime? Updated { get; set; }

        [DataMember(Name = "author", Order = 50, EmitDefaultValue = false)]
        public string Author { get; set; }

        [DataMember(Name = "categories", Order = 50, EmitDefaultValue = false)]
        public string[] Categories { get; set; }
    }
}
```

</Instruction>

### Link relations

Below for completeness is an example of the IANA link relations that are generally used. This is an incomplete set of IANA itself as well not containing link relations from other accepted sources.

> Note: the next tutorial deals with custom link relations which make up the "domain" of the application

<Instruction>

Create

```csharp(path="...todo-aspnetcore-vue/api/SemanticLink/IanaLinkRelation.cs")
namespace SemanticLink
{
    /// See http://en.wikipedia.org/wiki/Link_relation
    /// See http://www.iana.org/assignments/link-relations/link-relations.xhtml
    public static class IanaLinkRelation
    {
        /// <summary>
        ///     Conveys an identifier for the link's context.
        /// </summary>
        /// <remarks>
        ///    http://www.iana.org/go/rfc4287
        /// </remarks>
        public const string Self = "self";

        /// <summary>
        ///    Refers to a parent document in a hierarchy of documents.
        /// </summary>
        /// <remarks>
        ///    http://www.iana.org/go/rfc8288
        /// </remarks>
        public const string Up = "up";

        /// <summary>
        ///     Refers to a resource that can be used to search through the link's context and related resources.
        /// </summary>
        /// <remarks>
        ///    http://www.opensearch.org/Specifications/OpenSearch/1.1
        /// </remarks>
        public const string Search = "search";

        /// <summary>
        ///     Refers to an icon representing the link's context.
        /// </summary>
        /// <remarks>
        ///    http://www.w3.org/TR/html5/links.html#link-type-icon
        /// </remarks>
        public const string Icon = "icon";

        /// <summary>
        ///    The target IRI points to a resource where a submission form can be obtained.
        /// </summary>
        /// <remarks>
        ///    http://www.iana.org/go/rfc6861
        /// </remarks>
        public const string CreateForm = "create-form";

        /// <summary>
        ///    The target IRI points to a resource where a submission form for editing associated resource can be obtained.
        /// </summary>
        /// <remarks>
        ///    http://www.iana.org/go/rfc6861
        /// </remarks>
        public const string EditForm = "edit-form";

        /// <summary>
        ///    Designates the preferred version of a resource (the IRI and its contents).
        /// </summary>
        /// <remarks>
        ///    http://www.iana.org/go/rfc6596
        /// </remarks>
        public const string Canonical = "canonical";

        /// <summary>
        ///    Indicates a resource where payment is accepted.
        /// </summary>
        /// <remarks>
        ///    http://www.iana.org/go/rfc8288
        /// </remarks>
        public const string Payment = "payment";

        /// <summary>
        ///    Points to a resource containing the version history for the context
        /// </summary>
        /// <remarks>
        ///    http://www.iana.org/go/rfc5829
        /// </remarks>
        public const string VersionHistory = "version-history";

        /// <summary>
        ///    	Refers to a substitute for this context
        /// </summary>
        /// <remarks>
        ///    http://www.w3.org/TR/html5/links.html#link-type-alternate
        /// </remarks>
        public const string Alternate = "alternate";

        /// <summary>
        ///     Identifying that a resource representation conforms to a certain profile, without affecting the
        ///     non-profile semantics of the resource representation.
        /// <</summary>
        /// <remarks>
        ///     https://tools.ietf.org/html/rfc6906
        /// </remarks>
        public const string Profile = "profile";
    }
}
```

</Instruction>

