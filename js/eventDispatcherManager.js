(function(root, factory) {

    // AMD
    if (typeof define === 'function' && define.amd) {
        define([
            'backbone',
            'exports'
        ], function(Backbone, exports) {
            root.eventDispatcherManager = factory(Backbone, exports);
            return root.eventDispatcherManager;
        });

        // Node.js or CommonJS
    } else if (typeof exports !== 'undefined') {
        var Backbone = require('backbone');
        module.exports = factory(Backbone, exports);

        // browser global
    } else {
        root.eventDispatcherManager = factory(root.Backbone, {});
    }

}(this, function(Backbone, exports) {
    var lastEventDispatchers = [];
    return {
        getNewEventDispatcher: function () {
            return _.extend({}, Backbone.Events);
        },
        setLastEventDispatcher: function (eventDispatcher) {
            lastEventDispatchers.push(eventDispatcher);
            return this;
        },
        getLastEventDispatcher: function () {
            if (!lastEventDispatchers.length) {
                throw new Error('lastEventDispatchers is empty. \nUse setLastEventDispatcher method ' +
                    'before create new widget component instance or use registerAsNewWidget method at the beginning ' +
                    'of constructor if this is component initialize.');
            }
            return lastEventDispatchers.pop();
        }
    }
}));
