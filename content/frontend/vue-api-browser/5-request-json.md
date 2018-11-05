---
title: GET application/json
pageTitle: "How the client requests JSON"
description: "Learn how to request JSON from the client"
---

Each. request for a resource has a similar pattern. Request the HTML, load and excute the javascript that in turn make an authenticated request for the JSON (assume for now you are authenticated)

#### Summary

    GET / (text/html)
    GET api.js (text/javascript)
    GET / (application/json;q=1.0 & XMLHttpRequest) (with Authorization header)

<Instruction>

Open the root resource http://localhost:5000/ in browser looks like this series of request across the wire

```bash{12-13})(nocopy)

GET / HTTP/1.1
Host: localhost:5000
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8

GET /api.js HTTP/1.1
Host: localhost:8080
Accept: */*
Referer: http://localhost:5000/

GET / HTTP/1.1
Host: localhost:5000
Accept: application/json;q=1.0
X-Requested-With: XMLHttpRequest
Authorization: jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5FSTBRVUUxTmpNMk5EY3pOekV5TVRrMFFUTkJOelJDUXpjMFFUUTNRa1k1TWtZek5FSkJPUSJ9.eyJpc3MiOiJodHRwczovL3NlbWFudGljbGluay5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWI4MzM3ZjU1MzUxZjUyYWM4NGYyNDlhIiwiYXVkIjpbInRvZG8uc2VtYW50aWNsaW5rLmlvIiwiaHR0cHM6Ly9zZW1hbnRpY2xpbmsuYXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU0MTE5ODMyNiwiZXhwIjoxNTQxMjA1NTI2LCJhenAiOiIzTFdZVjl2aWZSVjZJU25MVkQwNlhheGwyM05yaTh0MSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUifQ.dPAvrIa0BFZxg9doxj_hBuYIKpx5zDcubcFAmCsByZoS-cBHfWAhkTmNVR0EItq3gwx-9Y3PvNzPcAfHnAL-tcnX9y-BzVNka82jYymnv7Za8X4bvfAvzttfa2OqILOVbsKAo8i-W2mk7PmeYZi0GuHfnC9Mu7tz6NKJdIJW8N2inKgtg7wxh-C3CuxieciJSk4iRD8qhdLb9E_fP0cZ-7D63comwgHyOuN5t_wWEQWEjIgOnaaiSQp_tqUJNVgMY0Fxj2d17-PEwf-ze4XURJpgxqY3E_aJEHK6q6LuyPfji8WpMs4jajYlGbJWXLLOTvSR3LJYC7tq3SS6INIpBw
Referer: http://localhost:5000/
```

</Instruction>

![api requests](api-requests.png)

### Setting the Accept Header

The api client uses (Axios) to make HTTP requests the hood. In the example above, the highlighted lines are the headers that must be set by the client to request JSON over HTML.

<Instruction>

Register the interceptor at the bootstrap of the Vue application

```js{1,5}(path="...todo-aspnetcore-vue/client/src/api.js")
import {setInterceptors} from 'semantic-link-utils/http-interceptors';

...

setInterceptors();

/**
 * This view sets up the application including the on-demand authentication (login) and
 * the application being offline
 */
new Vue({
    el: '#app',

    ...
});
```

</Instruction>

<Instruction>

Register an axios interceptor to set `Accept` and `X-Requested-Headers`.

```js{22-23}(path="...todo-aspnetcore-vue/client/src/lib/semantic-link-utils/http-interceptors.js")
import axios from 'axios';

/**
 *
 * @param options
 */
export const setInterceptors = options => {

    /**
     * We are using axios as the http client. It allows us to register interceptors
     *  @see https://github.com/axios/axios#interceptors
     */

    /**
     * Setup the headers on the xhr object so that we can play nice with the API
     */
    axios.interceptors.request.use(
        config => {
            /*
             * We are going to be a monolingual JSON application
             */
            config.headers['Accept'] = 'application/json;q=1.0';
            config.headers['X-Requested-With'] = 'XMLHttpRequest';

            return config;
        },
        err => Promise.reject(err));

```

</Instruction>

<Instruction>

Query the html page to get the URL off the 'self' link (eg &lt;link rel="self" href="http://localhost:5000/" />) and provide it to the &lt;Resource> vue component to be processed through the 'apiUri' property

```js{8,11}(path="...todo-aspnetcore-vue/client/src/api.js")
/**
 * This view sets up the application including the ondemand authentication (login) and
 * the application being offline
 */
new Vue({
    el: '#app',
    data: {
        apiUri: document.querySelector('HEAD link[rel="self"]').href
    },
    components: {Offline, Login, Resource, Spinner},
    template: '<div><Spinner/><Resource :apiUri="this.apiUri"></Resource><Offline/><Login/><notifications/></div>'
});
```

</Instruction>

<Instruction>

Resource.vue retrieves the representation and holds a copy in-memory (before it is processed on the screen)

```js(path="...todo-apnetcore-vue/client/src/components/api/Resource.vue")
// Resource.vue
<script>
    import axios from 'axios';
    import {LinkedRepresentation} from 'semantic-link';
    import {log} from 'logger';

    export default {

        props: {
            apiUri: {type: String},
        },

        data() {
            return {
                /**
                 * In memory representation based on the apiUri
                 * @type {LinkedRepresentation}
                 */
                representation: null,

            }
        },
        created() {
            this.getRepresentation();
        },
        methods: {

            /**
             * GET the resource and layout the JSON as html with update, created and remove
             * return {Promise<LinkedRepresentation | never>}
             */
            getRepresentation() {

                log.debug(`[Resource] Fetching representation ${this.apiUri}`);

                return axios
                    .get(this.apiUri)
                    .then(/** @type {AxiosResponse} */response => {

                        this.representation = response.data;

                        ...

                        return this.representation

                      })
                    .catch(/** @type {AxiosError} */error => { ... });
            },

        }
    }
</script>

```
</Instruction>

