(function(root, factory) {

    // AMD
    if (typeof define === 'function' && define.amd) {
        define([
            './eventDispatcherManager',
            './eventDispatcherMixin',
            'exports'
        ], function(eventDispatcherManager, eventDispatcherMixin, exports) {
            root.componentMixin = factory(eventDispatcherManager, eventDispatcherMixin, exports);
            return componentMixin;
        });

        // Node.js or CommonJS
    } else if (typeof exports !== 'undefined') {
        var eventDispatcherManager = require('eventDispatcherManager'),
            eventDispatcherMixin = require('eventDispatcherMixin');
        module.exports = factory(eventDispatcherManager, eventDispatcherMixin, exports);

        // browser global
    } else {
        root.componentMixin = factory(root.eventDispatcherManager, root.eventDispatcherMixin, {});
    }

}(this, function(eventDispatcherManager, eventDispatcherMixin, exports) {
    return _.extend({

        /**
         * @protected
         *
         * Don't read value directly!
         * Use _getLocalEventDispatcher method for getting
         */
        _localEventDispatcher: null,

        _getLocalEventDispatcher: function () {
            if (!this._localEventDispatcher) {
                this._localEventDispatcher = eventDispatcherManager.getLastEventDispatcher();
            }
            return this._localEventDispatcher;
        },

        addComponentItem: function (addComponentItem /*, argument1, argument2, ... */) {
            eventDispatcherManager.setLastEventDispatcher(this._getLocalEventDispatcher());
            var instance = new (addComponentItem.bind.apply(addComponentItem, arguments))();
            instance._getLocalEventDispatcher(); // to be sure
            return instance;
        },

        registerAsNewComponent: function () {
            this._localEventDispatcher = eventDispatcherManager.getNewEventDispatcher();
        },

        listenToComponent: function (name, callback, context) {
            context = context || this;
            if (_.isArray(callback)) {
                callback.forEach(function(callback) {
                    this.listenToComponent(name, callback, context);
                }, this);
                return this;
            }
            context.listenTo(this._getLocalEventDispatcher(), name, callback);
            return this;
        },

        emitToComponent: function (name, data) {
            this._getLocalEventDispatcher().trigger(name, data, this);
            return this;
        }
    }, eventDispatcherMixin);
}));
