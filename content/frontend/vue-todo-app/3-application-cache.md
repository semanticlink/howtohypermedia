---
title: Client-side application cache
pageTitle: Bind views client-side application cache
description: "Client need to have one copy of representations in the application cache"
question: An application cache
answers: ["Is a global, single version of what the clients has loaded","Requires that the developers access resources though link relations","Allows binding the UI to representations","All of the above"]
correctAnswer: 3

---

A client needs an application cache to ensure that there is self-consistency throughout the application (and avoid stale data). Doing this requires that the client is able to insert resources into the application state. It is usually the case that a client requires a URI inside the network and must insert it in the correct location for self-consistency. Without this approach each controller has its own copy of a resource. This tutorial demonstrates how use an existing application cache utility (rather than how to build one yourself).

![application cache](application-cache.png)

### General guidelines

* a representation is always placed in relation to the root of the API
* its position is relative to link relations
* retrieving a representation is retrieved relative to the link relations of the context (and default context is root of the API)

It is quite easy to loose control of this part of the code. One recommendation is to create separate code that uses link relations (the tip here is that semantic link cache import is never in a Vue component). This has multiple benefits: improves understanding of domain (link relations), avoids duplication, improves composition (reusability), improves its changeability and, finally, makes it independently testable. Enough, some code!

<Instruction>

Start with a root representation that has at least the 'self' link and uri (ie sparsely populated). And yes, we have a single (root/global) cache on `this.$root.$api`. This will always be invoked before client routing.

```js(path="...todo-hypermedia/client/src/App.vue")
// App.vue
<script>
    import {query} from 'semantic-network';
    import {apiUri} from 'semantic-link-utils/UriMapping';

    export default {
        name: 'app',

        created: function () {

            /**
             * The api representation is the 'top of the tree' in terms of the network of
             * data synchronisation with the server. Note that the in-memory resource does
             * have an internal {@link State} to track the need for synchronisation throughout
             * its life (including staleness)
             *
             * However, the data is not being fully or reliably propagated down to the children.
             * Until a better solution is found, we are injecting it from the previous state on the
             * state change events. See below.
             *
             * Note: this is currently found on `this.$root.$api` because it was pre-registered
             *
             * @example setup example
             *
             *   let store;
             *
             *   const apiPlugin = {
             *       store,
             *       install(Vue) {
             *           // attach to the root view
             *           // access via this.$root.$api
             *           Vue.prototype.$api = store;
             *       }
             *   };
             *
             *   Vue.use(apiPlugin);
             *
             * @example usage
             *
             *  getUri(this.$root.$api, 'self') --> a uri
             *
             * @type {ApiRepresentation}
             */
            this.$root.$api = this.$root.$api || query.create('HEAD', {rel: 'api'});

        }
    };
</script>
```

</Instruction>

Client routing will now occur and load up a client view. The `apiUri` always injected into views (by convention of the `router`).

<Instruction>

Load the representation in the client URL into the cache, create reference that the HTML can bind to.

```js{35}(path="...todo-hypermedia/client/src/components/app/Todo.vue")
// Todo.vue
<template>
        ...
        <ul class="todo-list">
            <li v-for="(todo, index) in todoCollection"
                ...
            </li>
        </ul>
</template>

<script>
    import {log} from 'logger';
    import {getNamedListByUri, getTodoListByUri} from "domain/todo";

    export default {
        props: {
            apiUri: {type: String},
        },
        data() {
            return {
                /**
                 * Holds a reference to the collection for processing and is bound to the screen. Note: we need
                 * an early binding to 'items' for it to be reactive.
                 *
                 * @type TodoCollectionRepresentation
                 */
                todoCollection: {},
            };
        },

        created() {

            log.debug(`Loading selected todo ${this.apiUri}`);

            // get the data from central place see code below!
            return getTodoListByUri(this.$root.$api, this.apiUri)
                .then(todos => {
                     // create reference to bind into html
                     return this.todoCollection = todos;
                })
                .catch(err => log.error(err));

        },
    };
</script>
```

</Instruction>

Writing the code that walks the network of data is where you need to have the API diagram at hand. A todo list falls in the `root > me > todos > todos`. But it is a little more complicated because there are singletons (me), named collections and collections of collections in there too. Read through the code and also look at the API itself and see if you can figure it out. This is as hard as it gets! Just note that we not dealing with the semantics of (HTTP) network requests at this level. It is all dealt with in the `semantic-network` code.

![see here](../../hypermedia/advanced/todo-api.png)

<Instruction>

Write code that walks the link relations (aka the 'domain').

```js(path="...todo-hypermedia/client/src/domain/todo.js")
import {get, link} from 'semantic-network';
import {log} from 'logger';
import {findResourceInCollectionByUri} from 'semantic-network/utils/collection';
import {FieldType} from 'semantic-network/interfaces';

/**
 * Get the first level of todos (regardless of tenants)
 *
 * @param {ApiRepresentation} apiResource
 * @param {CacheOptions?} options
 * @returns {Promise<TodoCollectionRepresentation>} sparsely populated
 */
export const getTodoList = (apiResource, options) => {

    log.debug('Looking for todos on root');

    return get(apiResource, /me/, options)
        .then(user => get(user, /todos/, options));
};

/**
 * Get the todos on the todo list
 * @param {TodoCollectionRepresentation} todoCollection
 * @param {CacheOptions?} options
 * @returns {Promise<TodoCollectionRepresentation>}
 */
export const getTodos = (todoCollection, options) => {

    log.debug(`Looking for todos on list ${link.getUri(todoCollection, 'self')}`);

    return get(todoCollection, /todos/, {...options, includeItems: true});
};

/**
 *
 * Context: (user)-[todos...]
 * Looks for: -[todos...]+->[tags...]
 * @param {TenantCollectionRepresentation} userTenantsCollection
 * @param {CacheOptions?} options
 * @returns {Promise}
 */
export const getTodosWithTagsOnTenantTodos = (userTenantsCollection, options) => {
    return get(userTenantsCollection, {rel: /todos/, includeItems: true, batchSize: 1, ...options})
        .then(userTenantsTodos => get(
            userTenantsTodos,
            {
                ...options,
                iterateOver: true,
                rel: /tags/,
                includeItems: true,
            }));
};

/**
 * Get the todo list items based on a uri starting from the root
 *
 * Context: (api)
 * Looks for: -(me)-[todos...{self:$todoUri}]-[todos...]
 *
 * @param {ApiRepresentation} apiResource
 * @param {string} todoUri
 * @param {CacheOptions?} options
 * @returns {Promise<CollectionRepresentation>}
 */
export const getTodoListByUri = (apiResource, todoUri, options) => {

    return getNamedListByUri(apiResource, todoUri, options)
        .then(itemResource => get(itemResource, {...options, rel: /todos/, includeItems: true}));
};

/**
 * Get the name todo list based on a uri starting from the root
 *
 * Context: (api)
 * Looks for: -(me)-[todos...{self:$todoUri}]
 *
 * @param {ApiRepresentation} apiResource
 * @param {string} todoUri
 * @param {CacheOptions?} options
 * @returns {Promise<LinkedRepresentation>}
 */
export const getNamedListByUri = (apiResource, todoUri, options) => {
    return getTodoList(apiResource, options)
        .then(todosList => findResourceInCollectionByUri(todosList, todoUri));
};

```

</Instruction>

