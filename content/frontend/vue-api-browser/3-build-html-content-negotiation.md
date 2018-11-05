---
title: Generate HTML
pageTitle: "How to build HTML as content negotiation"
description: "Learn how to respond as HTML in ASP.NET Core"
---

Content negotiation is the process of the server responding to a client's request for a specific type of representation. You need to write a formatter that makes the HTML version of the resource.

The `HTMLMediaFormatter` takes is configured up to add the scripts. When it is invoked it iterates through the in-memory resource and adds the links to the HTML links on the page.

Note: the injected `ApiClientSettings` is included below for completeness.

<Instruction>

Generate the HTML from the in-memory resource (`LinkedRepresentation`).

```csharp(path="...todo-aspnetcore-vue/api/Api/Web/HtmlFormMediaFormatter.cs")

public class HtmlMediaFormatter : TextOutputFormatter
{
    private ILogger Log { get; }

    private const string ResourceHtml = @"<html>
<head>
  <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8""/>
  <meta name=""viewport"" content=""width=device-width, initial-scale=1"">
  <title>Resource</title>
  {0}
</head>
<body>
  <div id=""app"">Intialising ...</div>
  {1}
</body>
</html>";

    private readonly List<string> scripts = new List<string>();

    public HtmlFormMediaFormatter(ApiClientSettings configuration, ILogger log)
    {
        Log = log;
        SupportedEncodings.Add(Encoding.UTF8);
        SupportedMediaTypes.Add(MediaTypeNames.Text.Html);

        scripts.AddRange(configuration.ToScriptsHref());
    }

    /// <summary>
    ///     This allows rendering the representations in a browser (with javascript enabled). Because a browser
    ///     will allow HTML before JSON having all types available as HTML will
    ///     result in the other data representations trying to be rendered as HTML.
    /// </summary>
    protected override bool CanWriteType(Type type)
    {
        return typeof(LinkedRepresentation).IsAssignableFrom(type);
    }

    public override Task WriteResponseBodyAsync(OutputFormatterWriteContext context, Encoding selectedEncoding)
    {
        return context.HttpContext.Response.WriteAsync(this.ToHtml(context));
    }

    /// <summary>
    ///     Current implementation supports <see cref = "LinkedRepresentation" /> which is on just a wrapper
    ///     around a resource that when the client receives it then comes back to the server for the JSON
    ///     representation.
    /// </summary>
    private string ToHtml(OutputFormatterWriteContext context)
    {
        if (context.Object is LinkedRepresentation)
        {
            var feed = context.Object as LinkedRepresentation;
            return string.Format(ResourceHtml, ToHtmlLinks(feed), ToScripts(scripts));
        }
        else
        {
            Log.Error("Unsupported representation");
        }

        return string.Empty;
    }

    private string ToScripts(List<string> scripts)
    {
        if (scripts != null)
        {
            return scripts.ToString(
                "",
                "",
                "\n      ",
                script => $@"<script src=""{script}""></script> ");
        }

        return string.Empty;
    }


    private string ToHtmlLinks(LinkedRepresentation r)
    {
        if (r != null && r.Links != null)
        {
            return r.Links.ToString(
                "",
                "",
                "\n      ",
                link => $@"<link rel=""{link.Rel}"" href=""{link.HRef}"" />");
        }

        return string.Empty;
    }
}

```
</Instruction>

<Instruction>

Include being able to map the JSON `appsettings.json` configuration to a class

```csharp(path="...todo-aspnetcore-vue/api/Api/Web/ApiClientSettings.cs")
/// <summary>
///     Setting for the api client html to pick the external javascript
/// </summary>
/// <example>
///
///  Development is likely to only have one:
///
/// <code>
///    "Api.Client":{
///         "Scripts": ["dist/api.js"],
///         "Domain": "http://localhost:8080/"
///     }
///  </code>

///  Production may have multiple to allow for Progressive web apps:
///
/// <code>
///    "Api.Client":{
///         "Scripts": ["api.js", "vendors~api.js", "vendors~api~app.js"],
///         "Domain": "https://api.example.com/"
/// </code>
///</example>
public class ApiClientSettings
{
    public const string SectionName = "Api.Client";
    public List<string> Scripts { get; set; }
    public string Domain { get; set; }

    public List<string> ToScriptsHref() => Scripts
        .Select(script => new Uri(new Uri(Domain), script).AbsoluteUri)
        .ToList();
}
```
</Instruction>



