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
                .append('<div class="dcb-controls"><input class="comment-input" type="text" placeholder="发表评论"/><button class="submit-comment">发表</button><div class="faces-triggler"></div></div>')
                .append('<div class="selector-content"></div>');
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
            self.populateContent();
            self.setTrigger();
        },
        populateContent: function() {
            // 填充selector-content中的内容
            selectorContent = $(".selector-content");
            selectorContent.append('<div class="face-selector"><div class="selector-tab"><div class="tablink active" onclick="openCity(event, \'Tokyo\')">Smile</div></div>');
        },
        setTrigger: function() {
            var self = this;
            if (self.options.event != 'click') {
            }

            $(".faces-triggler").click(function(){
                self.triggerFaceSelector();
            })
        },
        triggerFaceSelector: function() {
            $('.face-selector').slideToggle();
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
