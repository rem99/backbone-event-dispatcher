(function(root, factory) {

    // AMD
    if (typeof define === 'function' && define.amd) {
        define([
            'backbone',
            './eventDispatcherManager',
            'exports'
        ], function(Backbone, eventDispatcherManager, exports) {
            root.eventDispatcherMixin = factory(Backbone, eventDispatcherManager, exports);
            return root.eventDispatcherMixin;
        });

        // Node.js or CommonJS
    } else if (typeof exports !== 'undefined') {
        var Backbone = require('backbone'),
            eventDispatcherManager = require('./eventDispatcherManager');
        module.exports = factory(Backbone, eventDispatcherManager, exports);

        // browser global
    } else {
        root.eventDispatcherMixin = factory(root.Backbone, root.eventDispatcherManager, {});
    }

}(this, function(Backbone, eventDispatcherManager, exports) {

    /**
     * @type Backbone.Events
     */
    var globalEventDispatcher = eventDispatcherManager.getNewEventDispatcher();

    return _.extend(Backbone.Events, {
        /**
         * @example
         * this.addGlobalListener('click', function (data, emitter) { ... });
         * this.addGlobalListener('click resize', function (data, emitter) { ... });
         * this.addGlobalListener(['click', 'resize'], function (data, emitter) { ... });
         */
        addGlobalListener: function (event, callback) {
            if (_.isArray(event)) {
                event = event.join(' ');
            }
            this.listenTo(globalEventDispatcher, event, callback);
            return this;
        },

        /**
         * @example
         * this.emitGlobal('resize', {size: '100px'});
         */
        emitGlobal: function (event, data) {
            globalEventDispatcher.trigger(event, data, this);
            return this;
        }
    });
}));
