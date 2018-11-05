---
title: Displaying forms
pageTitle: "How the client translates forms to display"
description: "Learn how to process form values for create and edit forms"
---

Displaying forms is about allowing users to easily values the API requires the client to send back in its request. This tutorials demonstrates one way to map these values to the user and the current values in the representation. This is currently an underdeveloped as aspect of hypermedia clients and the extend to which to generalise this is up for debate.

![](forms.png)

### Some general guidelines

* This component requires prior knowledge of form types from the API (eg 'http://types/text') (this could be a reference collection or standardised based)
* This component only maps simple types and is thus highly constrained
* Generalised components are best for early modelling around simple collections
* Selects in this example only work on inline values (by value) rather than other collections (by reference)
* It would be possible to make these fully-featured, including layout configurable

<Instruction>

Add a vue component that loads up the resources and its form.

```js(path="...todo-aspnetcore-vue/client/src/components/api/Resource.vue")

<template>

 ...
    <Form :representation="representation"
          :formRepresentation="formRepresentation"/>

 ...

</template>

```

</Instruction>

<Instruction>

Add switches to show the visual element (and populate where necessary).


```js(path="...todo-aspnetcore-vue/client/src/components/api/Resource.vue")

<template>

    <b-form>

        <b-form-group v-for="item in formRepresentation.items"
                      :key="item.name"
                      :label="item.name">
            <!-- DATE TIME -->
            <!-- date time pickers are unreliable across browsers and devices -->
            <template v-if="mapApiToUiType(item.type) === 'date' || mapApiToUiType(item.type) === 'datetime'">
                <datetime
                        :type="mapApiToUiType(item.type)"
                        v-model="formObj[item.name]"
                        input-class="form-control"
                        :phrases="{ok: 'Continue', cancel: 'Exit'}"
                        use12-hour
                        auto
                        :min-datetime="minDatetime"
                ></datetime>
                <div>{{ localDateTime.zoneName}} ({{ localDateTime.offsetNameLong}})</div>
            </template>

            <!-- RADIO -->
            <b-form-radio-group
                    v-else-if="mapApiToUiType(item.type) === 'check'"
                    v-model="formObj[item.name]"
                    buttons
                    button-variant="outline-primary"
                    size="sm"
                    :options="[{text: 'True', value: true},{text: 'False', value: false}]"
            ></b-form-radio-group>

            <!-- SELECT -->
            <b-form-select
                    v-else-if="mapApiToUiType(item.type) === 'select'"
                    v-model="formObj[item.name]"
            >
                <option :value="null" disabled>-- Please select an option --</option>
                <template v-for="option in item.items">
                    <option :value="option.value">{{ option.label}}</option>
                </template>
            </b-form-select>

            <!-- TEXT -->
            <b-form-input
                    v-else
                    :id="`input-1-${item.name}`"
                    :type="mapApiToUiType(item.type)"
                    v-model="formObj[item.name]"
                    :required="item.required"
                    :placeholder="item.description"
            ></b-form-input>
            <span class="highlight"></span><span class="bar"></span>


        </b-form-group>


    </b-form>

</template>

<script>
    import {Datetime} from 'vue-datetime';
    import {DateTime as LuxonDateTime} from 'luxon'
    // You need a specific loader for CSS files
    import 'vue-datetime/dist/vue-datetime.css'

    import {filter, getUri, matches} from 'semantic-link';
    import {log} from 'logger';

    export default {
        name: "Form",
        components: {datetime: Datetime, Back, Ok},
        props: {
            /**
             * Collection or item representation.
             * @type {CollectionRepresentation|LinkedRepresentation}
             */
            representation: {
                type: Object,
                required: true
            },
            /**
             * Form that specifies the item/inputs to submit back to the server
             * @type {FormRepresentation}
             */
            formRepresentation: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                error: null,
                /**
                 * An in-memory object of the data that we are going to send back to the server. In the case of a
                 * create form it will be empty (new) and the edit form it will be a clone of the representation
                 * to be updated.
                 *
                 * @type {*|LinkedRepresentation}
                 */
                formObj: {},
                minDatetime: LuxonDateTime.local().toISO(),
                localDateTime: LuxonDateTime.local()
            }
        },
        created() {

            function makeFormObj(form, collection) {
                 return matches(form, /^submit$/)
                     ? {}                   // POST clean/new
                     : {...collection};     // PUT clone
             }

            /**
             * When we show a form on the screen, decide whether to clone or create an in-memory representation
             */
            this.formObj = makeFormObj(this.formRepresentation, this.representation);
        },
        methods: {
            /**
             * Maps the representation types to the known types that can be rendered (input not select at this stage)
             * @see https://bootstrap-vue.js.org/docs/components/form-input
             *
             * TODO: a fuller set
             *   types: [ 'text', 'password', 'email', 'number', 'url', 'tel', 'date', `time`, 'range', 'color' ]
             *
             * TODO: implement mapping based on agent
             *
             *      Caveats with input types:
             *      - Not all browsers support all input types, nor do some types render in the same format across browser types/version.
             *      - Browsers that do not support a particular type will fall back to a text input type. As an example, Firefox desktop doesn't support date, datetime, or time, while Firefox mobile does.
             *      - Chrome lost support for datetime in version 26, Opera in version 15, and Safari in iOS 7. Instead of using datetime, since support should be deprecated, use date and time as two separate input types.
             *      - For date and time style input, where supported, the displayed value in the GUI may be different than what is returned by its value.
             *      - Regardless of input type, the value is always returned as a string representation.
             *
             * @param {string} type
             * @returns {string}
             */
             mapApiToUiType(type) {

                switch (type) {
                    case 'http://types/text':
                        return 'text';
                    case 'http://types/text/password':
                        return 'password';
                    case 'http://types/text/email':
                        return 'email';
                    case 'http://types/check':
                        return 'check';
                    case 'http://types/date':
                        return 'date';
                    case 'http://types/datetime':
                        return 'datetime';
                    case 'http://types/select':
                        return 'select';
                    default:
                        log.warn(`Form type not found: '${type}'`);
                        return 'text';
                }

            };

        }
    }
</script>

```

</Instruction>