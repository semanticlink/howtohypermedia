---
title: Updates and deletes
pageTitle: Updating and deleting items through the user interface
description: "The application cache also deals with the updates and deletion of resources"
question: The semantics of an update is
answers: ["Put the original resource with changes","Put a representation of form fields filled in with a merge of original and new values","PUT on the self link relation of the form","All of the above"]
correctAnswer: 1
---

Dealing with updates and deletes is pretty straightforward. In a hypermedia-based app updates is the process of retrieving a form on resource, filling it in the desired values and submitting (a PUT) back to the server. Deleting, is submitting back (a DELETE) to the server. Each then need to be responded to appropriately on success/failure for redirection or retries. The semantic network code deals with most of these semantics for the application cache.

![todo app](./todo-app.png)

### Update & Delete

Update is the most complex in the todo app because it does inline editing, multi-editing at one time, delete if empty and cancel (reset changes). You can read the code for this complexity. This instruction is to model a simple update that you would first start with.

<Instruction>



```js(path="...todo-hypermedia/client/src/components/app/TodoItem.vue")
// TodoItem.vue (this is an iterator item on Todo.vue)
<template>

    <li>

        <!-- editItem and item toggle but both need to exist -->

        <!-- Editing view bound to editItem -->
        <input class="toggle"
               type="checkbox"
               v-model="editItem.completed">
        <input class="edit"
               type="text"
               v-model.trim="editItem.name"
               @keyup.enter="doneEdit">
        <button class="save" @click="doneEdit"></button>

        <!-- View/ready-only bound to item -->
        <div class="view">
            <input class="toggle"
                   type="checkbox"
                   v-model="item.completed">
            <label @dblclick="startEdit">{{ item.name }}</label>
            <button class="destroy" @click="remove"></button>
        </div>


    </li>
</template>

<script>
    import {del, update} from 'semantic-network';
    import * as link from 'semantic-link';
    import {log} from 'logger';

    /**
     *
     * This component is a line item that allows the user to update:
     *
     *  * completed (checkbox)
     *  * name (label)
     *
     * The wireframe layout is:
     *
     *   [x <&circle-x>] Text [update <&plus>]
     *
     */
    export default {
        props: {
            // parent collection
            collection: {type: Object, required: true},
            // item of the collection
            item: {type: Object, required: true}
        },
        data() {
            return {
                editItem: {},
            };
        },
        methods: {

            ...

            /**
             * Make the field editable with the latest values
             */
            startEdit() {
                this.editItem = {...this.item};
            },

            /**
             * Take the edited values and update if there is a change and delete in the case that because
             * the name has been emptied there is a logical delete. Flush these changes back through the collection
             * server-side
             */
            doneEdit() {
                return update(this.item, this.editItem);
            },

            /**
             * Flush the delete back through the collection server-side
             */
            remove() {
                return del(this.collection, this.item);
            },


        }
    };
</script>
```

</Instruction>


