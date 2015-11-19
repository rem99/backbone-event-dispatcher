# Backbone Event Dispatcher
### Example:
var Component = Backbone.View.extend(componentMixin)
Now you can create your initial component view:
```js
var MyComponent = Component.extend({
/* ... */
    initialize: fucntion(data) {
        this.registerAsNewComponent();
        /* Events binding, initialisation etc */
    }
/* ... */
}
```

If u want add some other Views/Models/Collections, just use addComponentItem method:
```js
this.addComponentItem('HeaderView', data);
```

Remember, all component Views/Models/Collections should implement componentMixin.

### Syntax for component-spicific events:
```js
this.emitToComponent('myEvent', someData);
```

### Syntax for component-spicific listeners:
```js
this.listenToComponent('valueChanged', function(data, emitter) {
    /*...*/
});
```

### Syntax for global events:
```js
this.emitGlobal('myEvent', someData);
```

### Syntax for global listeners:
```js
this.addGlobalListener('valueChanged', function(data, emitter) {
    /*...*/
});
```

If you want trigger/listen global events out of components, you can implement eventDispatcherMixin.