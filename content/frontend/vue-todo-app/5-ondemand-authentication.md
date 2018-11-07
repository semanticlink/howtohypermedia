---
title: On-demand Authentication
pageTitle: 
description: ""
---

On-demand authentication is mapping a remote authenticated user to an identity in the local system (aka API). If this requirement is not satisfied then the API can respond that the client requires to present a valid authentication token. The API should present the client with options. The creation of a valid token may be then be satisifed elsewhere.

There are so many ways to address this solution. This tutorial uses Auth0 as a provider and demonstrates intercepting `401 Unauthorized` responses and then replays with a valid `JWT` (JSON Web Token).

> Note: The current implementation is less than ideal as all devices pop a new window causing potential user confusion. However, it works well enough for demonstration purposes. This code currently suffers from inter-process communication between the windows which is 'remedied' with a refresh.
> Note2: We won't deal with sliding windows

![ondemand authentication](ondemand-authentication.png)

### Some general guidelines

* use a request interceptor to add an 'Authorization' header
* setup a response interceptor on 401 responses and deals with the `WWW-Authenticate` header and queues for replay
* use the API to find out what you need for the client to make the authentication attempt (ie configuration isn't included at compile time)
* ensure the replayed request now has the updated 'Authorization' header

### Recap on over-the-wire-protocol

<Instruction>

Make request to for a resource which requires authentication and receives `401 Unauthorized`

```http{1,7,24}
GET /user/me HTTP/1.1
Host: localhost:5000
Connection: keep-alive
Accept: application/json;q=1.0
Origin: http://localhost:8080
X-Requested-With: XMLHttpRequest
Authorization: jwt
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Content-Type: application/json;charset=utf-8
Referer: http://localhost:8080/
Accept-Encoding: gzip, deflate, br
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8

HTTP/1.1 401 Unauthorized
Date: Tue, 06 Nov 2018 23:05:40 GMT
Content-Type: application/json; charset=utf-8
Server: Kestrel
Cache-Control: public,max-age=60
Transfer-Encoding: chunked
Expires: Tue, 06 Nov 2018 23:06:41 GMT
Last-Modified: Tue, 06 Nov 2018 23:05:41 GMT
ETag: "69417FDCFE9ABB125FC2C2399F87965E"
Vary: Accept, Accept-Language, Accept-Encoding
WWW-Authenticate: jwt realm="api-auth0" uri=http://localhost:5000/authenticate/auth0
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Expose-Headers: Allow,Location,WWW-Authenticate,x-amzn-remapped-www-authenticate
```

</Instruction>

<Instruction>

Follow the link in the `WWW-Authenticate` header in the 401 response (which returns the configuration for Auth0—there could be multiple available)

```http{1,24-49}
GET /authenticate/auth0 HTTP/1.1
Host: localhost:5000
Connection: keep-alive
Accept: application/json;q=1.0
Origin: http://localhost:8080
X-Requested-With: XMLHttpRequest
Authorization: jwt
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Referer: http://localhost:5000/user/me

HTTP/1.1 200 OK
Date: Tue, 06 Nov 2018 22:37:54 GMT
Server: Kestrel
Last-Modified: Tue, 06 Nov 2018 22:37:55 GMT
Vary: Origin
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Expose-Headers: Allow,Location,WWW-Authenticate,x-amzn-remapped-www-authenticate
Content-Type: application/json; charset=utf-8
Cache-Control: private,max-age=3600
Expires: Tue, 06 Nov 2018 02:24:29 GMT
ETag: "6DACD437210904A86697F752D6FE63B9"

{
  "links": [
    {
      "rel": "self",
      "href": "http://localhost:5000/authenticate/auth0"
    },
    {
      "rel": "up",
      "href": "http://localhost:5000/authenticate"
    }
  ],
  "clientID": "3LWYV9vifRV6ISnLVD06Xaxl23Nri8t1",
  "domain": "semanticlink.au.auth0.com",
  "audience": "todo.semanticlink.io",
  "scope": [
    "openid",
    "profile",
    "offline_access"
  ],
  "leeway": 30,
  "responseType": [
    "token",
    "id_token"
  ],
  "realm": "api-auth0"
}
```

</Instruction>
<Instruction>

Use this data to make a request to Auth0 which returns an auth token.

In the case of Auth0, it provides an RPC-style client library that requires the configuration data from above. Below, we overview the wrappers around the use of this for the pop-window approach. For now, assume that a token has been returned to be included in the `Authorization` header below.

</Instruction>

<Instruction>

Now replay, the original request with `JWT`.

```http{6}
GET /user/me HTTP/1.1
Host: localhost:5000
Connection: keep-alive
Accept: application/json;q=1.0
X-Requested-With: XMLHttpRequest
Authorization: jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5FSTBRVUUxTmpNMk5EY3pOekV5TVRrMFFUTkJOelJDUXpjMFFUUTNRa1k1TWtZek5FSkJPUSJ9.eyJpc3MiOiJodHRwczovL3NlbWFudGljbGluay5hdS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWI4MzM3ZjU1MzUxZjUyYWM4NGYyNDlhIiwiYXVkIjpbInRvZG8uc2VtYW50aWNsaW5rLmlvIiwiaHR0cHM6Ly9zZW1hbnRpY2xpbmsuYXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU0MTU0NjIxNCwiZXhwIjoxNTQxNTUzNDE0LCJhenAiOiIzTFdZVjl2aWZSVjZJU25MVkQwNlhheGwyM05yaTh0MSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUifQ.Pdn8fJKZCa7i0sm1KWMUuAaFKIls9wa3a2Cd6wDNH06pSTqtmL1j1_r-9ujP6HtT3XgiRNlfU87ts5eDqNG43aCdHtFygYKtzlkHcmhmXeDacoXGmk1mKegTkd_CKmNFmx5oEEfbyFIAKarrijV28N_HChTqxLX_Ks4bEtKbXW6MTRu1ase9hXoykAHxZsSJRABocoCcTIotIYFGT0VoRz_CXgxrFxI0eiPtvvs7uK15oQGrrXFjHF66cwDn7eGjrkG7HeyYNKf4aZmTPsichjjMSDYH6eb0eHSzrAi2MGsGifbeyJTYHEdMKF-XUhmx0Ci89tMpyfFOXFoN7UCwEw
Referer: http://localhost:5000/user/me
Accept-Encoding: gzip, deflate, br
Accept-Language: en-GB,en-US;q=0.9,en;q=0.8
```

</Instruction>

### Request Interceptor

The underlying http client is [axios](https://github.com/axios/axios) and thus wrapped implemented specific to [interceptors](https://github.com/axios/axios#interceptors) for that library. It is promised-based and thus translatable to other libraries. In the first request above, you would have already seen the request headers that ask for JSON (`Accept` header interceptor is covered here)

<Instruction>

Setup the `401` interceptor on axios that sends a message that authentication is required

```js(path="...todo-aspnetcore/client/src/lib/semantic-link-utils/http-interceptors.js")
import axios from 'axios';
import {log} from 'logger';
import {httpQueue} from './HTTPQueue';
import {authConfirmed, authRequired, offline, serverError} from './authEvent';
import {eventBus} from './EventBus';


/**
 * Intercept 401 (unauthorised) request so that we can login on-demand and then continue
 * with request processing.
 *
 * TODO: the buffer should really have a set of ignore URLs are blacklisted before pushing
 */
axios.interceptors.response.use(
    response => response,
    error => {

        if (error.response && 401 === error.response.status) {

            httpQueue.pushToBuffer(error.config);

            return new Promise((resolve, reject) => {

                if (eventBus) {
                    // this event starts the process of authentication and MUST be handled
                    eventBus.$emit(authRequired, error);

                    // the event handling the login MUST then trigger this event to be caught
                    // eg EventBus.$emit(authConfirmed)
                    eventBus.$on(authConfirmed, () => {

                        log.debug('[Authentication] login confirmed (http-interceptor)');
                        httpQueue.retryAll()
                            .then(resolve)
                            .catch(reject);
                    });
                } else {
                    log.warn('[Network] Event bus not created');
                }


            });
        } else {
            return Promise.reject(error);
        }
    });
};
```

</Instruction>

### Repond with login (or silent renew)

<Instruction>

Include a listener on the Login component

```js{11,19}(path="...todo-aspnetcore/client/src/components/authentication/Login.vue")
<script>
    import {eventBus} from 'semantic-link-utils/EventBus';
    import {authRequired} from 'semantic-link-utils/authEvent';

    /**
     * Login:
     *    - waits for the unauthorised event (triggered by no network)
     */
    export default {
        mounted() {
            eventBus.$on(authRequired, this.loginRequired);
        },
        methods: {
            /**
             * Login/authenticate based on www-authenticate headers in the 401 response/error
             *
             * @param {AxiosError} error
             */
            loginRequired(error) {

               ...

            },

        }
    };
</script>
```

</Instruction>

<Instruction>

Process the 401 response to determine the auth scheme details. This code only implements one scheme but switch between others. The basic logic is either get a valid token (new via user interface or renew quietly in the background). Note: The [AuthService](https://github.com/semanticlink/todo-aspnetcore/blob/master/client/src/lib/semantic-link-utils/AuthService.js) just wraps the auth0 client code and injects configuration via retrieving the `uri` from the `WWW-Authenticate` header.

```js(path="...todo-aspnetcore/client/src/components/authentication/Login.vue")
<script>
    import {eventBus} from 'semantic-link-utils/EventBus';
    import {authRequired, authConfirmed} from 'semantic-link-utils/authEvent';
    import {log} from 'logger';
    import {
        getAuthenticationScheme,
        JWT,
        setJsonWebTokenOnHeaders,
        getAuthenticationRealm,
        API_AUTH0_REALM,
        renewToken
    } from 'semantic-link-utils/http-interceptors';
    import AuthService from "semantic-link-utils/AuthService";

    methods: {
        /**
         * Login/authenticate based on www-authenticate headers in the 401 response/error
         *
         * @param {AxiosError} error
         */
        loginRequired(error) {

            /**
             * Looks inside the 401 response www-authenticate header and returns the header details
             *
             * @example www-authenticate: Bearer realm="jwt", rel=authenticate, uri=http://example.com
             * @example x-amzn-remapped-www-authenticate: Bearer realm="api", rel=authenticate, uri=http://example.com
             */
            const authenticationScheme = getAuthenticationScheme(error);

            if (authenticationScheme === JWT) {

               // JSONWebToken authentication

               /**
                *  Use our jwt authentication scheme to get a token from external provider (Auth0)
                */
               AuthService.loadFrom401JsonWebTokenChallenge(error)
                   .then(configuration => {


                       /** @type {Auth0ConfigurationRepresentation} */
                       const cfg = configuration.data;

                       if (renewToken(error)) {

                           log.info('Renewing token');

                           AuthService
                               .makeFromRepresentation(cfg)
                               .renewToken()
                               .then(authResult => this.onSuccess(authResult.accessToken))
                               .catch(this.onFailure);

                       } else {

                           const authenticationRealm = getAuthenticationRealm(error);

                           if (authenticationRealm === cfg.realm && authenticationRealm === API_AUTH0_REALM) {

                               AuthService
                                   .makeFromRepresentation(cfg)
                                   .login()
                                   .then(authResult => {

                                       if (authResult) {
                                           return this.onSuccess(authResult.accessToken);
                                       } else {
                                           log.debug('[Authenticator] Json web token not returned on the key: \'accessToken\'');
                                           this.onSuccess(undefined);
                                       }

                                   })
                                   .catch(this.onFailure)

                           } else {
                               log.error(`[Authenticator] Realm mismatch: '${API_AUTH0_REALM}'`);
                           }
                       }

                   })
                   .catch(this.onFailure);

            } else {
            // TODO: could have other scheme to switch on
               log.error(`[Authenticator] www-authenticate type unknown: '${authenticationScheme}'`);
            }

        },
    }
};
</script>
```

</Instruction>

### Ensure Authentication is reset

<Instruction>

Add setting/clearing of `Authorization` header that is used in 'login' and 'logout'.

```js(path="...todo-aspnetcore/client/src/lib/semantic-link-utils/http-interceptors.js")
/**
 * Hold a reference so that it can be rejected/cleared
 */
let jwtInterceptor;

/**
 * Set the bearer token in the headers for this axios instance
 */
export const setJsonWebTokenOnHeaders = (token) => {

    if (!token) {
        log.info('[Authentication] no access token found');
    }

    clearJsonWebTokenOnHeaders();

    log.debug(`[Authentication] setting token on www-authenicate header interceptor scheme '${JWT}'`);

    jwtInterceptor = axios.interceptors.request.use(
        config => {
            config.withCredentials = true;
            config.headers[AUTHORIZATION_HEADER] = authorization.format({scheme: JWT, token: token});
            return config;
        },
        err => Promise.reject(err));
};

/**
 * Clears the bearer token in the headers for this axios instance (part of logging out process)
 */
export const clearJsonWebTokenOnHeaders = () => {

    log.debug('[Authentication] clearing access token');

    if (jwtInterceptor) {
        log.debug('[Authentication] clear jwt token');
        axios.interceptors.request.eject(jwtInterceptor);
    } else {
        log.debug('[Authentication] no access token to clear');
    }
};


/**
 * Name of the Authorization header.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
 * @type {string}
 */
export const AUTHORIZATION_HEADER = 'Authorization';

/**
 * We are using JSON Web Token (JWT and not Java Web Tokens) authentication  here (for now)
 * @see https://tools.ietf.org/html/rfc7235
 * @example www-authenticate: JSONWebToken realm="api", uri=http://example.com/authenticate/jwt
 * @type {string}
 */
export const JWT = 'jwt';

```

</Instruction>

### Replay request

<Instruction>

Process the headers and then hand back to axios to process the requests and continue on

```js(path="...todo-aspnetcore/client/src/components/authentication/Login.vue")
<script>
    import {eventBus} from 'semantic-link-utils/EventBus';
    import {authConfirmed} from 'semantic-link-utils/authEvent';
    import {log} from 'logger';
    import {setJsonWebTokenOnHeaders} from 'semantic-link-utils/http-interceptors';
    import AuthService from "semantic-link-utils/AuthService";

    methods: {
        loginRequired(error) {

            ...
             AuthService
                .makeFromRepresentation(cfg)
                .login()
                .then(authResult => this.onSuccess(authResult.accessToken);

        },
        /**
         * Ensure that the Authorization header is set correctly and then pass back control to replay any requests queued up
         * @param {string} accessToken
         */
        onSuccess(accessToken) {

            if (accessToken) {
                // see below for this implementation
                setJsonWebTokenOnHeaders(accessToken);
            }

            eventBus.$emit(authConfirmed);

        },
    }
};
</script>
```
</Instruction>