---
title: Register text/html
pageTitle: "How to respond to HTML content negotiation in the pipeline"
description: "Learn how to respond to HTML content negotiation in ASP.NET Core"
---

Content negotiation should be orthogonal and only be required to be configured up in the pipeline (rather than be added throughout controllers).

<Instruction>

Register the HTML formatter in the pipeline adding to the `OutputFormatters`

```csharp{18-21}(path="...todo-aspnetcore-vue/api/Api/Startup.cs")
public class Startup
{

    ...

    public void ConfigureServices(IServiceCollection services)
    {

        ...

        services.AddMvcCore(options =>
            {
                options.RespectBrowserAcceptHeader = true;
                options.ReturnHttpNotAcceptable = true;

                ...

                // Content-negotiation output types
                options.OutputFormatters.Add(new HtmlFormMediaFormatter(
                    Configuration.GetSection(ApiClientSettings.SectionName).Get<ApiClientSettings>(),
                    Log));

            })
            .AddJsonFormatters(s => s.ContractResolver = new DefaultContractResolver())
            .AddXmlDataContractSerializerFormatters();


}
```
</Instruction>

Below is the original example of the API home should be able to respond to a request for `text/html` as well as 'application/json. Included is the controller code as well as the construction of the representation.

```csharp{13-20}(path="...todo-aspnetcore-vue/api/Api/Controllers/HomeController.cs")
[Route("")]
public class HomeController : Controller
{
    private readonly Version _version;

    public HomeController(Version version)
    {
        _version = version;
    }

    [HttpGet("", Name = HomeUriFactory.SelfRouteName)]
    [HttpCacheExpiration(CacheLocation = CacheLocation.Public, MaxAge = CacheDuration.Long)]
    public ApiRepresentation GetApi()
    {
        return new ApiVersion
            {
                Version = _version.ToString()
            }
            .ToRepresentation(Url);
    }

    ...

}
```


```csharp(path="...todo-aspnetcore-vue/api/App/RepresentationExtensions/ApiRepresentationExtensions.cs")
public static class ApiRepresentationExtensions
{
   public static ApiRepresentation ToRepresentation(this ApiVersion api, IUrlHelper url)
   {
       return new ApiRepresentation
       {
           Links = new[]
           {
               // root of the api
               url.MakeHomeUri().MakeWebLink(IanaLinkRelation.Self),

               // a virtual resource that redirects to the user
               url.MakeUserMeUri().MakeWebLink(CustomLinkRelation.Me),

               // all authentication approaches
               url.MakeAuthenicateUri().MakeWebLink(CustomLinkRelation.Authenticate),

               // all tags currently created across todos
               url.MakeAllTagsCollectionUri().MakeWebLink(CustomLinkRelation.Tags),

               //  user collection which has the tenant search on it
               url.MakeHomeUsersUri().MakeWebLink(CustomLinkRelation.Users),
           },
           Version = api.Version
       };
   }
}
```

#### Final result

```html
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


