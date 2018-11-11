---
title: Cloning Resources
pageTitle: Easily make copies of trees of data using HTML5 drag and drop
description: "Forms in hypermedia make cloning of trees straightforward and we can leverage that with drag and drop functionality alongside the client-side application cache"
---

The are lots of ways to walk the API: the todo app displays it with a user interface; the general api browser walks and allows simple updates. Cloning resources extends the general purpose client and programmatically makes it possible to deal with complicated updates—its purpose is to make copies in bulk without people intervention. One easy example is the business problem of moving data between environments (eg between test to another test environment, or bringing production data back into another environment or from a production staging/testing into production).

All of this is made possible because hypermedia uses forms to instruct the client.

### Getting started: Admin

<Instruction>

Load up the admin view on the todo app. Click Admin (bottom left), drag 'Rewire' onto the drop target next to Organisations. A Rewire will be created (note: you might need to refresh the page)

![drag drop clone](drag-drop-clone.png)

</Instruction>

### Simple general principles

* have a client version that is the desired version
* match this against server version
* resolve differences and submit appropriate actions

![engine](cloning.png)

#### Two examples:

1. Update existing resource: your client version is a copy of the server and all resource identities are the same; the only change is to remove some items and change a couple of attributes. This solution would do a mixture of DELETE and PUT requests.
2. Clone a resource: your client version has a different root parent (ie it has an identitity that does not yet exists). The change is significant that the resources below to root need to be re-parented (or put differently a part of the tree is copied and grafted into a new parent). This solution would require POST throughout but also match new resource against the old ones (ie substitutions).

All of this done using the semantic link cache library and the purpose of this tutorial is show how it is used (not how to build it) and the mental model it requires.

> Note: the drag'n'drop is just user-sugar to make the interaction practical. Again, if you want to understand the mechanics drag'n'drop look at the code (but the issue is that HTML5 API here is the right thing to do).

### Update existing

1. Drag the organisation off onto the desktop (that will get a copy as JSON, aka hydrate)
2. Update the JSON
3. Drag back onto the same

The instructions below are to process this

<Instruction>

Load (fully hydrate) the selected tenant on drag. Note: there is magic in here that the drag event is listening for an event because you can't communicate between events with promises.

```js{10,64}(path="...todo-aspnetcore/client/src/components/app/Admin.vue")
<template>
    <div>
         <ul>
            <li v-for="tenant in tenants.items" v-cloak>
                <span>{{ tenant.name }}</span>
                <drag-and-droppable-model
                    ...
                    >
                    <b-button
                            @mousedown="hydrateTenant(tenant)"
                            variant="outline"
                            v-b-tooltip.hover.html.right
                            title="Drag off to take a copy or drop on to update">
                        <add w="22px" h="22px" title="Drag"/>
                    </b-button>
                </drag-and-droppable-model>
            </li>
        </ul>
    </div>
</template>

<script>
    import {log} from 'logger';
    import DragAndDroppableModel from '../DragAndDroppableModel.vue'
    import bButton from 'bootstrap-vue/es/components/button/button';
    import bTooltip from 'bootstrap-vue/es/components/tooltip/tooltip'
    import Add from 'vue-ionicons/dist/md-cloud-upload.vue';
    import {eventBus} from 'semantic-link-utils/EventBus';
    import {getTenantsOnUser, getUserTenant, getTodosWithTagsOnTenantTodos} from 'domain/tenant';



    export default {
        components: {DragAndDroppableModel, bButton, add, bTooltip},
        data() {
            return {
                /**
                 * Tenants available for the user
                 * @type {TenantCollectionRepresentation}
                 */
                tenants: {},
            };
        },
        created: function () {

            log.info(`Loading tenants for user`);

            getTenantsOnUser(this.$root.$api)
                .then(tenants => getTodosWithTagsOnTenantTodos(tenants)
                    .then(() => this.tenants = tenants));

        },
        methods: {
            /**
             * Helper that when a tenant is on start drag that the entire graph is hydrated. Once that is done
             * it hands back off with an event that needs to be listened for.
             *
             * Note: communicating between events async requires this approach
             *
             * @param {TenantRepresentation} tenant user's tenant
             */
            hydrateTenant(tenant) {
                getUserTenant(tenant)
                    .then(() => eventBus.$emit('resource:ready'))
            },

        },
    };
</script>
```

</Instruction>

<Instruction>

Implement a hydration strategy across the API.

```js(path="...todo-aspnetcore/client/src/domain/tenant.js")
import {cache} from 'semantic-link-cache';
import {mapWaitAll} from 'semantic-link-cache/mixins/asyncCollection';

/***********************************
 *
 * Retrieve tenant information
 * ===========================
 */


/**
 * Get the tenants that an authenticated user has access to
 *
 * Context: (api)
 * Access: -(me)-[tenants...]
 *
 * @param {ApiRepresentation} apiResource
 * @param {UtilOptions?} options
 * @returns {Promise<TenantCollectionRepresentation>}
 */
export const getTenantsOnUser = (apiResource, options) =>
    cache.getSingleton(apiResource, 'me', /me/, options)
        .then(user => cache.getNamedCollectionAndItems(user, 'tenants', /tenants/, options));
/**
 * Get the users that exist on a user tenant
 *
 * @param userTenantsCollection
 * @param {UtilOptions?} options
 * @returns {Promise<CollectionRepresentation>}
 */
export const getTenantUsers = (userTenantsCollection, options) =>
    cache.getNamedCollectionAndItems(userTenantsCollection, 'users', /users/, options);

/**
 * Loads up a tenant to be copied with todos and users
 *
 * @param {TenantRepresentation} tenant
 * @param {UtilOptions?} options
 * @returns {Promise<TenantRepresentation>}
 */
export const getUserTenant = (tenant, options) =>
    Promise.all([getTodosWithTagsOnTenantTodos(tenant.todos, options), getTenantUsers(tenant, options)])
        .then(() => tenant);

/**
 *
 * Context: (user)-[todos...]
 * Looks for: -[todos...]+->[tags...]
 * @param {TenantCollectionRepresentation} userTenantsCollection
 * @param {UtilOptions?} options
 * @returns {Promise}
 */
export const getTodosWithTagsOnTenantTodos = (userTenantsCollection, options) =>
     cache.tryGetNamedCollectionAndItemsOnCollectionItems(userTenantsCollection, 'todos', /todos/, options)
        .then(todosCollection => mapWaitAll(todosCollection, item =>
            cache.tryGetNamedCollectionOnCollectionItems(item, 'tags', /tags/, options)));

```

</Instruction>

<Instruction>



```js{12,65}(path="...todo-aspnetcore/client/src/components/app/Admin.vue")
<template>
    <div>
         <ul>
            <li v-for="tenant in tenants.items" v-cloak>
                <span>{{ tenant.name }}</span>
                <drag-and-droppable-model
                        :model="tenant"
                        :async="true"
                        media-type="application/json"
                        :dropped="createOrUpdateTenant">
                    ...
                </drag-and-droppable-model>
            </li>
        </ul>
    </div>
</template>

<script>
    import {log} from 'logger';
    import DragAndDroppableModel from '../DragAndDroppableModel.vue'
    import bButton from 'bootstrap-vue/es/components/button/button';
    import bTooltip from 'bootstrap-vue/es/components/tooltip/tooltip'
    import Add from 'vue-ionicons/dist/md-cloud-upload.vue';
    import {eventBus} from 'semantic-link-utils/EventBus';
    import {getTenantsOnUser, getUserTenant, getTodosWithTagsOnTenantTodos} from 'domain/tenant';

    export default {
        components: {DragAndDroppableModel, bButton, add, bTooltip},
        methods: {
            /**
             * Update an existing tenant with existing (or new) todo lists with tags)
             * @param tenantDocument
             */
            createOrUpdateTenant(tenantDocument) {

                syncTenant(this.$root.$api, tenantDocument);

            },
        },
    };
</script>
```

</Instruction>

<Instruction>

Implement a sync strategy across the API. Note: the implementation of `pooledTagResourceResolver` follows

```js{93}(path="...todo-aspnetcore/client/src/domain/tenant.js")
import {getUri} from 'semantic-link';
import {log} from 'logger';
import {pooledTagResourceResolver} from 'domain/tags';
import {uriMappingResolver, sync, cache} from 'semantic-link-cache';

/***********************************
 *
 * Sync
 * ====
 */

/**
 * Sync the tenant in the context of the tenant collection
 *
 * @param {TenantCollectionRepresentation} tenantCollection
 * @param {*|TenantCollectionRepresentation} aTenant
 * @param {{function(TenantRepresentation, LinkedRepresentation, UtilOptions):Promise}[]} strategies
 * @param {UtilOptions?} options
 * @returns {Promise}
 */
const syncTenantStrategy = (tenantCollection, aTenant, strategies, options) =>
    sync.getResourceInCollection(tenantCollection, aTenant, strategies, options);

/**
 * Sync the todos in the context of a user collectoin
 *
 * @param {UserCollectionRepresentation} user
 * @param {*|UserCollectionRepresentation} aUser
 * @param {{function(UserCollectionRepresentation, LinkedRepresentation, UtilOptions):Promise}[]} strategies
 * @param {UtilOptions?} options
 * @returns {Promise}
 */
const syncTodosStrategy = (user, aUser, strategies, options) =>
    sync.getNamedCollectionInNamedCollection(user, 'todos', /todos/, aUser, strategies, options);

/**
 * Sync the tags in the context of a todo
 *
 * @param {TodoRepresentation} todo
 * @param {*|TodoCollectionRepresentation} aTodo
 * @param {UtilOptions?} options
 * @returns {Promise}
 */
const syncTagsStrategy = (todo, aTodo, options) =>
    sync.getNamedCollectionInNamedCollection(todo, 'tags', /tags/, aTodo, [], options);


/**
 * Clone a graph of tenant todo lists
 *
 * Context: (api)-(me)-[tenants]
 * Access: [todos...]-[todos...]-[tags]
 * Pool: (api)-[tags]
 *
 * @param {ApiRepresentation} apiResource
 * @param {TenantRepresentation} aTenant
 * @param {UtilOptions?} options
 * @returns {Promise<TenantCollectionRepresentation>}
 */
export const syncTenant = (apiResource, aTenant, options) => {

    if (!aTenant) {
        throw new Error('Tenant is empty');
    }

    log.debug(`[Tenant] start create ${aTenant.name} ${aTenant.code}`);

    return getTenantsOnUser(apiResource, options)
        .then(userTenants => {
            log.debug(`[Tenant] users loaded ${getUri(userTenants, /self/)}`);
            return syncTenantStrategy(
                userTenants,
                aTenant,
                [
                    (usersRepresentation, usersDocument, options) => syncTodosStrategy(
                        usersRepresentation,
                        usersDocument,
                        [
                            (usersRepresentation, usersDocument, options) => syncTodosStrategy(
                                usersRepresentation,
                                usersDocument,
                                [
                                    (todoRepresentation, todoDocument, options) =>
                                        syncTagsStrategy(todoRepresentation, todoDocument, options)

                                ],
                                options)
                        ],
                        options),
                ],
                {
                    ...options,
                    ...pooledTagResourceResolver(apiResource),
                    resolver: uriMappingResolver
                });
        });

};
```

</Instruction>

<Instruction>

Create a resolver for a resource outside of the tree (tags)

```js(path="...todo-aspnetcore/client/src/domain/tags.js")
import {PooledCollection} from 'semantic-link-cache';
import {log} from 'logger';
import {makeSparseResourceFromUri} from 'semantic-link-cache/cache/sparseResource';


/**
 * A pooled resource is required by a resource to be resolved but lives outside the current scope of the resource for
 * resolution. This function provides that resolution service that is plugged in via the {@link UtilOptions} when syncing
 * resources.
 *
 * @example
 *
 *  The 'todos' collection in the userCollection requires a 'tags' collection that lives outside todos
 **
 *      return cache
 *          .getResource(user)
 *          .then(user =>
 *               sync.getResourceInNamedCollection(
 *                  user,
 *                  'todos',
 *                  /todos/,
 *                  userDocument,
 *                  [],
 *                  {
 *                      ...options,
 *                      ...pooledTagResourcesResolver(tenant)
 *                  }));
 *
 * @param {LinkedRepresentation} contextResource
 * @return {{resourceFactory: (function(*): LinkedRepresentation), resourceResolver: (function(string):Array<function(*, *)>)}} see {@link UtilOptions.resourceFactory} and {@link UtilOptions.resourceResolver}
 */
export function pooledTagResourceResolver(contextResource) {

    let resolve = (collectionName, collectionRel, type) =>
        (resource, options) => PooledCollection
            .getPooledCollection(contextResource, collectionName, collectionRel, resource, options)
            .then(document => {
                if (document) {
                    return document;
                } else {
                    log.error(`TODO: make new pooled resource: ${type} '${resource.name || ''}'`);
                    return undefined;
                }
            });

    return {
        resourceFactory: linkRel => makeSparseResourceFromUri(linkRel.href, {name: linkRel.title}),
        resourceResolver: (type/*, context */) => {

            const rel = {
                tag: resolve('tags', /tags/, type),
            };

            if (rel[type]) {
                return rel[type];
            } else {
                log.info(`Unable to resolve pooled resource '${type}', available: [${Object.keys(rel).join(',')}]`);
                return () => Promise.resolve(undefined);
            }
        }
    };

}
```

</Instruction>

### Create or Update?

What is the difference between the two in the context of hypermedia? How to know whether to call create or update? You don't. The question the code asks of the data is the difference in state. Do you exist? Are you different?

In the sample, you can force a create by changing the root resource identity. This requires two changes, remove the 'self' link and change the 'name' attribute.

<Instruction>

Force create a new tenant

```js{13-7 }(path="...todo-aspnetcore-vue/client/src/components/app/Admin.vue")
        methods: {
            /**
             * Create a new tenant and clones existing lists/tags onto this tenant
             *
             * Note: demo version just creates its own new tenant with random numbers
             *
             * @param tenantDocument
             * @param apiResource
             */
            createTenantOnRoot(tenantDocument, apiResource) {

                // Ensure the survey name and code are 'unique' (To Be Deleted)
                tenantDocument.name = `${tenantDocument.name || 'New tenant'} (${Date.now() % 1000000})`;
                tenantDocument.code = `${Date.now() % 1000000}.${tenantDocument.code }`;
                if ('links' in tenantDocument) {
                    delete tenantDocument.links;
                }

                this.$notify('Starting create new tenant');

                this.createOrUpdateTenant(tenantDocument);
            },

```

</Instruction>

<Instruction>

Alternatively, drag the tenant into a JSON file and change the JSON

```text
{
  <del>"links": [                         <b><---- Update here by deleting</b>
    {
      "rel": "self",
      "href": "http://localhost:5000/user/933bcca4e2/tenant/9e27499f9a"
    },
    {
      "rel": "canonical",
      "href": "http://localhost:5000/tenant/9e27499f9a"
    },
    {
      "rel": "edit-form",
      "href": "http://localhost:5000/tenant/form/edit"
    }
  ],</del>
  "name": "Rewire [new]",                 <b><---- Update here (create unique)</b>
  "code": "[new]rewire.semanticlink.io",  <b><---- Update here</b>
  "description": "A sample tenant (company/organisation)",
  "todos": {
    "links": [
      {
        "rel": "self",
        "href": "http://localhost:5000/user/933bcca4e2/todolist"
      },
      {
        "rel": "create-form",
        "href": "http://localhost:5000/todolist/form/create"
      }
    ],
    "items": [
      {
        "links": [
          {
            "rel": "self",
            "href": "http://localhost:5000/todolist/1dedfe1c43"
          }
        ],
        "name": "Shopping Todo List"
      }
    ]
  }
}
```

</Instruction>

<Instruction>

Here's the diff file of above

```diff
@@ -1,20 +1,6 @@
 {
-  "links": [
-    {
-      "rel": "self",
-      "href": "http://localhost:5000/user/933bcca4e2/tenant/9e27499f9a"
-    },
-    {
-      "rel": "canonical",
-      "href": "http://localhost:5000/tenant/9e27499f9a"
-    },
-    {
-      "rel": "edit-form",
-      "href": "http://localhost:5000/tenant/form/edit"
-    }
-  ],
-  "name": "Rewire",
-  "code": "rewire.semanticlink.io",
+  "name": "Rewire [new]",
+  "code": "[new]rewire.semanticlink.io",
   "description": "A sample tenant (company/organisation)",
   "todos": {
     "links": [

```

</Instruction>