if ( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function( $, window, document, undefined ) {

    var DnCommentBox = {
        init: function( options, elem ) {
            var self = this;
            self.elem = elem;
            self.$elem = $( elem );
            self.options = $.extend( {}, $.fn.dnCommentBox.options, options );
            self.metadata = self.$elem.data();
            self.overrideOptions();
            self.dnCommentBox = $('<div class="dcb-container" />')
                .addClass('dcb-'+self.options.position)
                .addClass('dcb-'+self.options.style)
                .appendTo('body')
                .append('<div class="dcb-controls"><input type="text" placeholder="发表评论"/><button class="submit-comment">发表</button></div>')
                //.hide();
            self.initializeDnCommentBox();
        },
        overrideOptions: function() {
            var self = this;
            $.each( self.options, function( $option ) {
                if (typeof(self.$elem.data('dnCommentBox-'+$option)) != "undefined") {
                    self.options[$option] = self.$elem.data('toolbar-'+$option);
                }
            });
        },
        initializeDnCommentBox: function() {
            var self = this;
            // self.populateContent();
            self.setTrigger();
        },

        setTrigger: function() {
            var self = this;
            if (self.options.event != 'click') {
            }
        }
    }

    $.fn.dnCommentBox = function( options ) {
        if ($.isPlainObject( options )) {
            return this.each(function() {
                var dnCommentBoxObj = Object.create( DnCommentBox );
                DnCommentBox.init( options, this );
                $(this).data('dnCommentBoxObj', dnCommentBoxObj);
            });
        } else if ( typeof options === 'string' && options.indexOf('_') !== 0 ) {
            var dnCommentBoxObj = $(this).data('dnCommentBoxObj');
            var method = dnCommentBoxObj[options];
            return method.apply(dnCommentBoxObj, $.makeArray(arguments).slice(1));
        }
    };

    $.fn.dnCommentBox.options = {
        hideOnScroll: true,
        zIndex: 120,
        position: 'bottom',
        style: 'default',
        animation: 'standard',
    };
}) ( jQuery, window, document );
