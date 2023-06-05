(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    'use strict';
    
    var utils = require('./helper/utils.js'),
        components = require('./sections/components.js'),
        about = require('./sections/page-about.js'),
        homepage = require('./sections/page-home.js'),
        ourworkCategories = require('./sections/page-ourwork-categories.js'),
        ourworkProjects = require('./sections/page-ourwork-projects.js'),
        ourwork = require('./sections/page-ourwork.js'),
        services = require('./sections/page-services.js'),
        signup = require('./sections/signup.js');
    
    var app = {
        init: function(){
            // Modernizr with Detectizr
            Detectizr.detect({
                addAllFeaturesAsClass: true
            });
    
            // href prevent click
            $( 'a.preventDefault' ).click(function(e){
                e.preventDefault();
            });
    
            this.ajaxLoader();
            this.jsEvents();
    
            _setInit = false;
        },
    
        ajaxLoader: function( ajax ){
    
            var _this = this;
    
            if( ajax === false ) {
    
                // remove
                $( '.ajaxloader.al-overlay' ).remove();
    
            } else {
    
                if( $( 'html.history' ).length ) {
                    // initial
                    $( '#sitewrapper' ).css({ opacity: 0 });
                    _this.ajaxOverlay({ init: true });
                    // set ajaxloader bgcolor
                    $( '.ajaxloader.al-overlay' ).css({ 'background-color': $( '.ajaxloader.al-overlay' ).data( 'bg' ) });
    
                    // click event
                    $( 'a' ).on('click', function(e){
                        
                        var $jsbtn = $( this ).hasClass( 'jsbtn' );
                        var $linkTel = $( this ).is( '[href^="tel:"]' );
                        var $linkEmail =  $( this ).is( '[href^="mailto:"]' );
                        var $linkExternal = $( this ).attr( 'target' ) === '_blank';
    
                        if( $jsbtn || $( this ).hasClass( 'xclude' ) || $linkTel || $linkEmail || $linkExternal ) {
                            if( $jsbtn ) {
                                utils.sendGoogleEvent( 'JS Link', 'click', $( this ).html() );
                            }
                            if( $linkTel ) {
                                utils.sendGoogleEvent( 'Tel Link', 'click', $( this ).attr( 'href' ) );
                            }
                            if( $linkEmail ) {
                                utils.sendGoogleEvent( 'Email Link', 'click', $( this ).attr( 'href' ) );
                            }
                            if( $linkExternal ) {
                                utils.sendGoogleEvent( 'Outbound Link', 'click', $( this ).attr( 'href' ) );
                            }
                            return;
                        }
    
                        e.preventDefault();
    
                        var pageUrl = $( this ).attr( 'href' );
    
                        if( pageUrl !== window.location.href ) {
    
                            _this.ajaxOverlay({ show: true });
    
                            $.ajax({
                                url: pageUrl,
                                async: true,
                                cache: false,
                                success: function( data ) {
                                    // console.log( data );
                                    _this.ajaxOverlay({ data: data });
                                },
                                error: function(jqXHR, textStatus, errorThrown) { 
                                    if( jqXHR.status === 404 || errorThrown === 'Not Found' ) { 
                                        console.log( 'There was a 404 error' );
                                        location.reload();
                                    }
                                }
                            });
    
                            // manipulating the browser URL
                            window.history.pushState( { path: pageUrl }, '', pageUrl );
                        }
                    });
    
                    // overriding the browser back and forward buttons
                    window.onpopstate = function(event){
                        // console.log( 'location: '+ document.location +', state: '+ JSON.stringify(event.state) );
                        _this.ajaxOverlay({ show: true });
    
                        $.ajax({
                            url: document.location,
                            async: true,
                            cache: false,
                            success: function( data ) {
                                // console.log( data );
                                _this.ajaxOverlay({ data: data });
                            },
                            error: function(jqXHR, textStatus, errorThrown) { 
                                if( jqXHR.status === 404 || errorThrown === 'Not Found' ) { 
                                    console.log( 'There was a 404 error' );
                                    location.reload();
                                }
                            }
                        });
                    };
                }
    
                // $( document ).ready(function(){
                // 	console.log( 'document ready!' );
                // 	_this.jsEvents();
                // });
    
                // $( document ).find( 'title' ).bind( 'DOMSubtreeModified', function(){
                // 	console.log( 'document change!' );
                // 	_this.jsEvents();
                // });
            }
        },
    
        ajaxOverlay: function( obj ){
    
            var _this = this,
                duration = 0.6;
    
            if( obj.init ) {
                if( _setInit ) {
                    TweenMax.set( $( '.ajaxloader.al-overlay' ), { x: '-100%' });
                    TweenMax.set( $( '.overlay__ourwork' ), { x: '0%' });
                    TweenMax.to( $( '.overlay__ourwork' ), duration, { x: '100%', delay: duration * 2, ease: Power1.easeInOut,  });
                    TweenMax.to( $( '#sitewrapper' ), duration, { opacity: 1, delay: duration * 2, ease: Power1.easeInOut,  });
                    /* TweenMax.set( $( '.ajaxloader.al-overlay' ), { x: '-100%' });
                    TweenMax.set( $( '.ajaxloader.al-overlay .al-overlay--elem' ), { opacity: 0, x: '-75%' });
                    TweenMax.to( $( '.ajaxloader.al-overlay .al-overlay--elem' ), duration, { opacity: 1, x: '-50%', delay: duration, ease: Power1.easeInOut,  });
                    TweenMax.to( $( '.ajaxloader.al-overlay' ), duration, { x: '0%', ease: Power1.easeInOut,  });
                    TweenMax.to( $( '#sitewrapper' ), duration, { opacity: 0 }), ease: Power1.easeInOut, ; */
                }
                else {
                    TweenMax.to( $( '.ajaxloader.al-overlay .al-overlay--elem' ), duration, { opacity: 0, x: '-25%', ease: Power1.easeInOut,  });
                    TweenMax.to( $( '.ajaxloader.al-overlay' ), duration, { x: '100%', delay: duration, ease: Power1.easeInOut,  });
                    TweenMax.to( $( '#sitewrapper' ), duration, { opacity: 1, delay: 0.8, ease: Power1.easeInOut,  });
                }
            }
            else if( obj.show ) {
                TweenMax.set( $( '.ajaxloader.al-overlay' ), { x: '-100%' });
                TweenMax.set( $( '.ajaxloader.al-overlay .al-overlay--elem' ), { opacity: 0, x: '-75%' });
                TweenMax.to( $( '.ajaxloader.al-overlay .al-overlay--elem' ), duration, { opacity: 1, x: '-50%', delay: duration, ease: Power1.easeInOut,  });
                TweenMax.to( $( '.ajaxloader.al-overlay' ), duration, { x: '0%', ease: Power1.easeInOut,  });
                TweenMax.to( $( '#sitewrapper' ), duration, { opacity: 0, ease: Power1.easeInOut,  });
            }
            else {
    
                setTimeout(function(){
                    _this.ajaxResponse( obj.data );
                }, 0);
                
            }
        },
    
        ajaxResponse: function( response ){
    
            var $dom = $( document.createElement( 'html' ) );
            $dom[0].innerHTML = response; // Here's where the "magic" happens
    
            var $head = $dom.find( 'head' ),
                $body = $dom.find( 'body' );
    
            // Google Analytics
            var $gaPath = $head.find( 'link[rel="canonical"]' ).attr( 'href' ).replace( _getDomainName, '' );
            var $gaTitle = $head.find( 'title' ).html();
            utils.sendGoogleTrack( $gaPath, $gaTitle );
    
            // UPDATE elemets
            // --------------
            // title
            $( 'head title' ).html( $head.find( 'title' ).html() );
            // bundle
            // $( '#cwiz-bundle' ).removeAttr( 'src' ).attr( 'src', $head.find( '#cwiz-bundle' ).attr( 'src' ) );
            // canonical
            $( 'head link[rel="canonical"]' ).attr( 'href', $head.find( 'link[rel="canonical"]' ).attr( 'href' ) );
            // shortlink
            $( 'head link[rel="shortlink"]' ).attr( 'href', $head.find( 'link[rel="shortlink"]' ).attr( 'href' ) );
            // application/json+oembed
            $( 'head link[type="application/json+oembed"]' ).attr( 'href', $head.find( 'link[type="application/json+oembed"]' ).attr( 'href' ) );
            // text/xml+oembed
            $( 'head link[type="text/xml+oembed"]' ).attr( 'href', $head.find( 'link[type="text/xml+oembed"]' ).attr( 'href' ) );
            // Yoast SEO
            this.setMetaTag( $head, 'name', 'description' );
            this.setMetaTag( $head, 'name', 'twitter:card' );
            this.setMetaTag( $head, 'name', 'twitter:description' );
            this.setMetaTag( $head, 'name', 'twitter:title' );
            this.setMetaTag( $head, 'name', 'twitter:image' );
            this.setMetaTag( $head, 'property', 'og:locale' );
            this.setMetaTag( $head, 'property', 'og:type' );
            this.setMetaTag( $head, 'property', 'og:title' );
            this.setMetaTag( $head, 'property', 'og:description' );
            this.setMetaTag( $head, 'property', 'og:url' );
            this.setMetaTag( $head, 'property', 'og:site_name' );
            this.setMetaTag( $head, 'property', 'og:image' );
            // body class
            $( 'body' ).removeAttr( 'class' ).addClass( $body.attr( 'class' ) );
            // set new contents
            $( 'body' ).html( $body.html() );
        },
    
        setMetaTag: function( $head, type, typeVal ){
    
            var thistype = null;
    
            if( type === 'name' ) {
                thistype = 'name="'+ typeVal +'"';
            }
            else {
                thistype = 'property="'+ typeVal +'"';
            }
    
            var contentValue = $head.find( 'meta['+ thistype +']' ).attr( 'content' );
    
            if( $head.find( 'meta['+ thistype +']' ).length ) {
                if( $( 'meta['+ thistype +']' ).length ) {
                    // update
                    $( 'meta['+ thistype +']' ).attr( 'content', contentValue );
                }
                else {
                    // remove and create a new one
                    $( 'meta['+ thistype +']' ).remove();
                    $( '<meta '+ thistype +' content="'+ contentValue +'">' ).insertAfter( $( 'head meta[name="robots"]' ) );
                }
            }
            else {
                // remove
                $( 'meta['+ thistype +']' ).remove();
            }
        },
    
        jsEvents: function(){
            // mobile orientation
            if( $( 'html.mobile' ).length ) {
                $( '<div id="mobilePortrait"></div>' ).insertAfter( $( '#sitewrapper' ) );
            }
            
            // google analytic
            setTimeout(function(){
                if( $( 'body.shop-online' ).length ) {
                    // don't track
                } else {
                    // utils.sendGoogleTrackingEvent( '30 seconds', 'read', '' );
                }
            }, 30000);
            
            if( components.elem.length ) {
                components.init();
            }
            if( about.elem.length ) {
                about.init();
            }
            if( homepage.elem.length ) {
                homepage.init();
            }
            if( ourworkCategories.elem.length ) {
                ourworkCategories.init();
            }
            if( ourworkProjects.elem.length ) {
                ourworkProjects.init();
            }
            if( ourwork.elem.length ) {
                ourwork.init();
            }
            if( services.elem.length ) {
                services.init();
            }
            if( signup.elem.length ) {
                signup.init();
            }
            
            utils.scrollToElem();
            // utils.elemTrackingEvent();
    
            // image responsive variable width
            $( 'img.varWidth' ).load(function(){
                $( this ).css({ 
                    width: '100%', 
                    'max-width': $( this ).width() 
                });
            });
        }
    };
    
    module.exports = app.init();
    
    },{"./helper/utils.js":3,"./sections/components.js":6,"./sections/page-about.js":7,"./sections/page-home.js":8,"./sections/page-ourwork-categories.js":9,"./sections/page-ourwork-projects.js":10,"./sections/page-ourwork.js":11,"./sections/page-services.js":12,"./sections/signup.js":13}],2:[function(require,module,exports){
    'use strict';
    
    module.exports = {
    
        mobile_portrait:    320,
        mobile_iphone6:     375,
        mobile_iphone6plus: 415,
        mobile_mid:         460,
        mobile_landscape:   600,
        tablet_small:       700,
        tablet_ipad:        768,
        tablet_portrait:    800,
        tablet_mid:         900,
        tablet_landscape:   1024,
        desktop:            1200
        
    };
    
    },{}],3:[function(require,module,exports){
    /** 
     * @author: Arlan Viray
     * @email: arlanv555@gmail.com
     * Copyright (c) 2015
     */
    
    'use strict';
    
    module.exports = {
    
        randomNum: function( minVal, maxVal, floatVal ){
            var randVal = minVal + ( Math.random() * (maxVal - minVal) );
            return typeof floatVal=='undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
        },
    
        arrayShuffle: function( o ){
            for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },
    
        arraySortDescending: function( a, b ){
            return b.value - a.value;
        },
    
        arrayCountValues: function( arr, item ){
            var count = 0;
            $.each(arr, function(i, v){
                if( parseInt(v) === item ) count++;
            });
            return count;
        },
    
        arrayRemoveItem: function( arr, item ){
            var remCounter = 0;
            for(var index = 0; index < arr.length; index++){
                if( arr[index] === item ) {
                    arr.splice(index, 1);
                    remCounter++;
                    index--;
                }
            }
            return remCounter;
        },
    
        isValidEmailAddress: function( email ){
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            return pattern.test( email );
        },
    
        isValidPhoneNumber: function( phone ){
            var pattern = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/i);
            return pattern.test( phone );
        },
    
        scrollToElem: function( elem, minus ){
            $( 'html, body' ).animate({ scrollTop:($(elem).length ? $(elem).offset().top - (minus ? minus : 0) : 0) }, 500);
        },
    
        scrollIntoView: function( elem ){
            /* 
            // Example use
            $( window ).scroll(function(){
                if( utils.scrollIntoView($(elem)) ) {
                    console.log( 'visible' );
                }
                else {
                    if( $(window).scrollTop() < $elem.offset().top ) {
                        // only trigger when scroll down the page
                        console.log( 'not visible' );
                    }
                }
            }).scroll();
            */
            
            if( $(elem).length < 1 )
                return false;
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();
            return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop));
        },
    
        mobileOrientation: function( orientation ){
            if( orientation === 'landscape' ) {
                var $elem = $( '#mobileLandscape' );
            }
            else {
                var $elem = $( '#mobilePortait' );
            }
    
            var windowOrientation = function(){
                if( window.orientation == 90 || window.orientation == -90 ) {
                    if( orientation === 'landscape' ) {
                        $elem.fadeIn();
                    }
                    else {
                        $elem.fadeOut();
                    }
                }
                else {
                    if( orientation === 'landscape' ) {
                        $elem.fadeOut();
                    }
                    else {
                        $elem.fadeIn();
                    }
                } 
            };
    
            $elem.bind('touchmove', function(e){ e.preventDefault() });
            
            $( window ).bind('orientationchange', function(event){
                windowOrientation();
            });
            windowOrientation();
        },
    
        timeStamp: function(){
            var currentdate = new Date();
            var datetime = currentdate.getDate() +'/'+ (currentdate.getMonth() + 1) +'/'+ currentdate.getFullYear() +' '+ currentdate.getHours() +':'+ currentdate.getMinutes() +':'+ currentdate.getSeconds();
            return datetime;
        },
    
        oldIE: function(){
            if( navigator.appVersion.indexOf('MSIE 10.') != -1 || navigator.appVersion.indexOf('MSIE 9.') != -1 || navigator.appVersion.indexOf('MSIE 8.') != -1 )
                return true;
            else
                return false;
        },
    
        windowHistory: function(){
            if( window.history && window.history.pushState )
                return true;
            else
                return false;
        },
    
        // start Google Analtics
        sendGoogleTrackingEvent: function( category, action, label, value, noninteraction ){
            if( window.ga && ga.create ) {
                if( value ) {
                    if( noninteraction ) {
                        ga( 'send', 'event', category, action, label, value, noninteraction );
                        // console.log( 'TrackEvent: '+ category +' >> '+ action +' >> '+ label +' >> '+ value +' >> '+ noninteraction );
                    } 
                    else {
                        ga( 'send', 'event', category, action, label, value );
                        // console.log( 'TrackEvent: '+ category +' >> '+ action +' >> '+ label +' >> '+ value );
                    }
                } 
                else {
                    ga( 'send', 'event', category, action, label );
                    // console.log('TrackEvent: '+ category +' >> '+ action +' >> '+ label);
                }
            }
        },
    
        sendGoogleEvent: function( eventCategory, eventAction, eventLabel ){
            if( window.ga && ga.create ) {
                ga( 'send', 'event', eventCategory, eventAction, eventLabel );
                // console.log( 'ga: '+ eventCategory +' >> '+ eventAction +' >> '+ eventLabel );
            }
            else if( window.__gaTracker && __gaTracker.create ) {
                __gaTracker( 'send', 'event', eventCategory, eventAction, eventLabel );
                // console.log( '__gaTracker: '+ eventCategory +' >> '+ eventAction +' >> '+ eventLabel );
            }
        },
    
        sendGoogleTrack: function( path, title ) {
            if( window.ga && ga.create ) {
                ga('set', { page: path, title: title });
                ga('send', 'pageview');
                // console.log( 'ga: '+ path +' >> '+ title );
            }
        },
        // end Google Analtics
    
        elemTrackingEvent: function(){
            var _this = this;
    
            $('a').click(function(e){
                // e.preventDefault();
    
                var $category = $(this).data( 'category' );
                var $action = $(this).data( 'action' );
                var thisAction = '';
    
                if( $category !== undefined ) {
                    if( $action !== undefined ) {
                        thisAction = $action;
                    } else {
                        thisAction = 'click';
                    }
    
                    _this.gaTrackingEvent( $category, thisAction, $(this).data('label') );
                }
            });
        },
    
        isTouchDevice: function(){
            return typeof window.ontouchstart !== 'undefined';
        },
    
        embedYoutube: function( elem, vId, vWidth, vHeight ){
            var vWidth = vWidth ? vWidth : 560,
                vHeight = vHeight ? vHeight : 315;
            $( elem ).prepend( '<iframe src="//www.youtube.com/embed/'+ vId +'?autoplay=1" width="'+ vWidth +'" height="'+ vHeight +'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' );
        },
    
        embedVimeo: function( elem, vId, vWidth, vHeight ){
            var vWidth = vWidth ? vWidth : 560,
                vHeight = vHeight ? vHeight : 315;
            $( elem ).prepend( '<iframe src="//player.vimeo.com/video/'+ vId +'?autoplay=1" width="'+ vWidth +'" height="'+ vHeight +'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' );
        },
    
        runTest: function(){
            console.log( 'runTest' );
        }
    
    };
    },{}],4:[function(require,module,exports){
    /** 
     * @author: Arlan Viray
     * @email: arlanv555@gmail.com
     * Copyright (c) 2015
     */
    /*
    loadmore.init({
        url: $('link[rel="canonical"]').attr('href'),
        autoLoad: true,
        obj.typeLoad: 'masonry | shoponline | default to switch statement'
    });
    */
    
    var utils = require('../helper/utils.js');
    
    module.exports = {
        
        id: null,
        url: null,
        endId: null,
        loading: false,
        btnClass: null,
        btnText: null,
    
        init: function( obj ){
            var _this = this;
    
            this.id = $( '#loadmore a' ).data( 'id' );
            this.endId = Math.ceil( $( '#loadmore a' ).data( 'total' ) / $( '#loadmore a' ).data( 'setby' ) );
            this.url = obj.url;
            this.btnClass = $( '#loadmore a' ).attr( 'class' );
            this.btnText = $( '#loadmore a' ).html();
    
            if( this.id === this.endId ) {
                $( '#loadmore' ).remove();
    
            } else {
                
                switch( obj.typeLoad ) {
                    case 'masonry':
                        this.masonryAction();
                        break;
    
                    case 'shoponline':
                    case 'shopOnline':
                    case 'shop-online':
                        this.shopOnlineAction();
                        break;
    
                    default:
                        this.dataAction();
                }
    
                if( obj.autoLoad ) {
                    $( window ).scroll(function(e){
    
                        if( !_this.loading && utils.scrollIntoView( $( '#loadmore' ) ) ) {
                            $( '#loadmore a' ).click();
                            _this.loading = true;
                        }
    
                    }).scroll();
                }			
            }
    
            if( this.endId < 1 ){
                this.remButton();
            }
        },
    
        dataAction: function(){
            var _this = this;
            
            $( 'body' ).on('click', '#loadmore a', function(e){
                e.preventDefault();
    
                _this.id = $(this).data( 'id' );
                _this.resetButton();
                
                $.ajax({
                    type: 'POST',
                    url: _this.url,
                    // retrieve data-id
                    data: 'id='+ _this.id,
                    // do not cache the page
                    cache: false,
    
                    success: function( html ){
                        // append html
                        $( '.loadmore-data' ).append( html );
    
                        _this.remButton();
                        // append a new button
                        _this.setButton();
    
                        _this.loading = false;
                    }
                });
            });
        },
    
        masonryAction: function(){
            var _this = this;
            
            $( 'body' ).on('click', '#loadmore a', function(e){
                e.preventDefault();
    
                _this.id = $(this).data( 'id' );
                _this.resetButton();
    
                $.ajax({
                    type: 'POST',
                    url: _this.url,
                    // retrieve data-id
                    data: 'id='+ _this.id,
                    // do not cache the page
                    cache: false,
    
                    success: function( html ){
                        if(html.length > 0) {
                            // make html as object
                            var el = $(html);
    
                            // append html object to masonry
                            $( '.loadmore-masonry' ).append( el );
    
                            // set interval to make reposition occur
                            var setIntervalId = setInterval(function(){
                                $( '.loadmore-masonry' ).masonry( 'reloadItems' );
                                $( '.loadmore-masonry' ).masonry( 'layout' );
                            }, 10);
    
                            // clear interval
                            setTimeout(function(){
                                clearInterval(setIntervalId);
                            }, 3500);
    
                            _this.remButton();
                            // append a new button
                            _this.setButton();
    
                            _this.loading = false;
                        }
                    }
                });
            });
        },
    
        shopOnlineAction: function(){
            var _this = this;
            
            $( 'body' ).on('click', '#loadmore a', function(e){
                e.preventDefault();
    
                _this.id = $(this).data( 'id' );
                _this.resetButton();
                
                $.ajax({
                    type: 'GET',
                    url: $(this).attr( 'href' ),
                    // retrieve data-id
                    // data: 'id='+ _this.id,
                    // do not cache the page
                    cache: false,
                    // get html
                    dataType: 'html',
    
                    success: function( data ){
                        console.log( data );
                        // get all applicable elements
                        var filteredData = $( data ).find( '.data__panel--col' );
    
                        // append filter data
                        $( '.loadmore-data' ).append( filteredData );
    
                        _this.remButton();
                        // set link base on data
                        var linkData = $( data ).find( '#loadmore a' ).attr( 'href' );
                        // append a new button
                        _this.setButton( linkData );
    
                        _this.loading = false;
                    }
                });
            });
        },
    
        resetButton: function(){
            $( '#loadmore a' ).addClass( 'inactive' ).html( 'Loading...' );
        },
    
        remButton: function(){
            $( '#loadmore' ).remove();
        },
    
        setButton: function( url ){
            console.log( this.id, this.endId - 1 );
            if( this.id !== this.endId - 1 ) {
                $( '#loadmorecontainer' ).append( '<div id="loadmore" class="center"><a href="'+ ( url ? url : '#' ) +'" class="'+ this.btnClass +'" data-id="'+ ( this.id + 1 ) +'">'+ this.btnText +'</a></div>' );
            }
        }
    
    };
    
    },{"../helper/utils.js":3}],5:[function(require,module,exports){
    /** 
     * @author: Arlan Viray
     * @email: arlanv555@gmail.com
     * Copyright (c) 2015
     */
    /*
    <style type="text/css">
        .grid-container, .grid-items {
            max-width: 1000px;
            margin: 0 auto;
        }
    </style>
    <div class="grid-container">
        <div class="grid-items">
            <div class="grid-item"></div>
        </div>
    </div>
    
    masonry.set({
        el: $( '.element' ),
        loadmore: true | default to false
    });
    */
    
    'use strict';
    
    var loadmore = require('./loadmore.js');
    
    module.exports = {
    
        set: function( obj ){
    
            var timeout = obj.timeout ? obj.timeout : 500;
    
            setTimeout(function(){
    
                // init Masonry
                var $grid = obj.el.find( '.grid-items' ).masonry({
                    itemSelector: '.grid-item',
                    isFitWidth: true,
                    isAnimated: true
                });
    
                // layout Masonry after each image loads
                if( obj.imagesloaded ) {
                    // console.log( 'Masonry with imagesLoaded' );
                    $grid.imagesLoaded().progress( function() {
                        $grid.masonry('layout');
                    });
                }
    
            }, timeout );
    
            if( obj.loadmore ) {
                // console.log( 'Masonry with loadmore' );
                loadmore.init({
                    url: $('link[rel="canonical"]').attr('href'),
                    autoLoad: true,
                    typeLoad: 'masonry'
                });
            }
    
        }
    
    };
    
    },{"./loadmore.js":4}],6:[function(require,module,exports){
    'use strict';
    
    module.exports = {
    
        elem: $( '.components' ),
        contact: $( '.components.contact__panel' ),
        mobileNav: $( '#mobileNavigation' ),
    
        init: function(){
            this.setLinkbars();
            this.setContact();
            this.setMobileNav();
        },
    
        setLinkbars: function(){
            // console.log( 'setLinkbars' );
            var $linkbarT = $( '.components.linkbar__top' ),
                $linkbarTCircle = $linkbarT.find( '.circle' ),
                $linkbarB = $( '.components.linkbar__bottom, .components.linkbar__bottom2' ),
                $linkbarBCircle = $linkbarB.find( '.circle' ),
                $linkbarR = $( '.components.linkbar__right' ),
                $linkbarRCircle = $linkbarR.find( '.circle' );
    
            /* if( $linkbarT.length && $linkbarTCircle.length ) {
                var tlT = new TimelineMax({ repeat: -1 });
                tlT.to( $linkbarTCircle, 1, { opacity: 1 });
                tlT.to( $linkbarTCircle, 1, { top: 0, bottom: 'auto' });
                tlT.to( $linkbarTCircle, 1, { opacity: 0, delay: 1 });
            }
            if( $linkbarB.length && $linkbarBCircle.length ) {
                var tlB = new TimelineMax({ repeat: -1 });
                tlB.to( $linkbarBCircle, 1, { opacity: 1 });
                tlB.to( $linkbarBCircle, 1, { top: 'auto', bottom: 0 });
                tlB.to( $linkbarBCircle, 1, { opacity: 0, delay: 1 });
            }
            if( $linkbarR.length && $linkbarRCircle.length ) {
                var tlR = new TimelineMax({ repeat: -1 });
                tlR.to( $linkbarRCircle, 1, { opacity: 1 });
                tlR.to( $linkbarRCircle, 1, { left: 0, right: 'auto' });
                tlR.to( $linkbarRCircle, 1, { opacity: 0, delay: 1 });
            } */
        },
    
        setContact: function(){
            // console.log( 'setContact' );
            var $contact = this.contact, 
                $mobileNav = this.mobileNav;
    
            // open it
            $( 'a.jsbtn.contactbtn' ).click(function(e){
                e.preventDefault();
    
                if( $mobileNav.is( ':visible' ) ) {
                    $mobileNav.fadeOut();
                }
                
                $( 'html, body' ).addClass( 'noscroll' );
                $contact.fadeIn();
            });
    
            // close it
            $contact.find( '.jsbtn.icon-close-x' ).click(function(){
                $( 'html, body' ).removeClass( 'noscroll' );
                $contact.fadeOut();
            });
        },
    
        setMobileNav: function(){
            // console.log( 'setMobileNav' );
            var $contact = this.contact, 
                $mobileNav = this.mobileNav;
    
            // open it
            $( '#mobileIcon' ).click(function(){
                if( $contact.is( ':visible' ) ) {
                    $contact.fadeOut();
                }
    
                $( 'html, body' ).addClass( 'noscroll' );
                $mobileNav.fadeIn();
            });
    
            // close it
            $mobileNav.find( '.jsbtn' ).click(function(){
                $( 'html, body' ).removeClass( 'noscroll' );
                $mobileNav.fadeOut();
            });
        }
    
    };
    
    
    },{}],7:[function(require,module,exports){
    'use strict';
    
    module.exports = {
    
        elem: $( 'body.page-template-page-About' ),
    
        init: function(){
    
            var $headerlogo = this.elem.find( '.components.header__logo' ),
                $cblock1 = this.elem.find( '.contents__block.cblock1' ),
                $cblock2 = this.elem.find( '.contents__block.cblock2' ),
                $cblock3 = this.elem.find( '.contents__block.cblock3' );
    
            var duration = 0.6;
    
            TweenMax.set($headerlogo, { opacity: 0, y: '20%' });
    
            var $tbaTitle = $cblock1.find( 'h5' );
            TweenMax.set($tbaTitle, { opacity: 0, y: '50%' });
            
            var $tbaHeader = $cblock1.find( 'h2' );
            TweenMax.set($tbaHeader, { opacity: 0, y: '30%' });
                
            var $tbaCopy = $cblock1.find( '.headercopy' );
            TweenMax.set($tbaCopy, { opacity: 0, y: '20%' });
    
            var $tbaLine = $cblock2.find( '.line' );
            TweenMax.set($tbaLine, { height: '0%' });
            $.each($cblock2.find( 'ul li' ), function(i, obj){
                TweenMax.set($(obj).find('.bodycopy'), { opacity: 0, y: '30%' });
            });
    
            var $tbaClients = $cblock3.find( 'h5' );
            TweenMax.set($tbaClients, { opacity: 0, y: '50%' });
            $.each($cblock3.find( 'ul li' ), function(i, obj){
                TweenMax.set($(obj), { opacity: 0, y: '30%' });
            });
        
            // content load
            setTimeout(function(){
    
                var tlMax = new TimelineMax({
                    onComplete:function(){
                        $.each($cblock2.find( 'ul li' ), function(i, obj){
                            new Waypoint({
                                element: $( obj ),
                                handler: function( direction ) {
                                    if( direction === 'down' ) {
                                        TweenMax.to( $(obj).find('.bodycopy'), duration, { ease: Power1.easeInOut, opacity: 1, y: '0%', delay: .105 * i });
                                        var $line = $(obj).find('.line');
                                        if ($line) {
                                            TweenMax.to( $line, duration, { ease: Power1.easeInOut, height: '100%', delay: .425 });
                                        }
                                        this.destroy();
                                    }
                                },
                                offset: '80%'
                            });
                        });
    
                        new Waypoint({
                            element: $tbaClients,
                            handler: function( direction ) {
                                if( direction === 'down' ) {
                                    TweenMax.to( $tbaClients, duration, { ease: Power1.easeInOut, opacity: 1, y: '0%' });
                                    this.destroy();
                                }
                            },
                            offset: '80%'
                        });
    
                        $.each($cblock3.find( 'ul li' ), function(i, obj){
                            new Waypoint({
                                element: $( obj ),
                                handler: function( direction ) {
                                    if( direction === 'down' ) {
                                        TweenMax.to( $( obj ), duration, { ease: Power1.easeInOut, opacity: 1, y: '0%', delay: .105 + .105 * i });
                                        this.destroy();
                                    }
                                },
                                offset: '80%'
                            });
                        });
                    } 
                });
    
                /* tlMax.to( $headerlogo, duration, { opacity: 1 });
                tlMax.to( $cblock1, duration, { opacity: 1 });
                tlMax.to( $cblock2.find( 'ul li:nth-child(1)' ), duration, { opacity: 1 }); */
    
                TweenMax.to( $headerlogo, duration, { ease: Power1.easeInOut, opacity: 1, y: '0%' });
                TweenMax.to($tbaTitle, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .275 });
                tlMax.to($tbaHeader, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .475 });
                TweenMax.to($tbaCopy, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .725 });
                
            }, 500);
            
        }
    
    };
    
    
    },{}],8:[function(require,module,exports){
    'use strict';
    
    var ourwork = require('./page-ourwork.js');
    
    module.exports = {
    
        elem: $( 'body.page-template-page-Homepage' ),
    
        init: function(){
            this.removeOverlay();
        },
    
        removeOverlay: function(){
            var $oOurwork = this.elem.find( '.components.overlay__ourwork' ),
                $oLogo = $oOurwork.find( '.logo img' );
            
            $oLogo.imagesLoaded(function(){
    
                setTimeout(function(){
                    // console.log( 'Logo image loaded' );
    
                    /* $oOurwork.fadeOut(function(){
                        // $( this ).remove();
                    }); */
                    ourwork.init();
                }, 1500);
    
            });
        }
    
    };
    
    
    },{"./page-ourwork.js":11}],9:[function(require,module,exports){
    'use strict';
    
    var masonry = require('../modules/masonry.js');
    
    module.exports = {
    
        elem: $( 'body.page-template-page-Ourwork--Viewall, body.page-template-page-Ourwork--Category' ),
    
        init: function(){
            var $headerlogo = this.elem.find( '.components.header__logo' ),
                $scategories = this.elem.find( '.components.section__categories' ),
                $cblock1 = this.elem.find( '.contents__block.cblock1' );
    
            $cblock1.css({ opacity: 0 });
    
            TweenMax.set($headerlogo, { opacity: 0, y: '20%' });
            var $tbaCategories = $scategories.find( 'ul li' );
            TweenMax.set($tbaCategories, { opacity: 0, y: '80%' });
    
            $.each($cblock1.find( 'ul li' ), function(i, obj){
                TweenMax.set($(obj).find( '.thumbnail-inner' ), { height: 0 });
                TweenMax.set($(obj).find( '.thumbnail-inner .shower' ), { scale: 1.1 });
                TweenMax.set($(obj).find( 'h5' ), { opacity: 0, y: '30%' });
                TweenMax.set($(obj).find( 'h2' ), { opacity: 0, y: '30%' });
            });
    
            // content load
            setTimeout(function(){
    
                var duration = 0.6;
                var toggle = true;
                var tlMax = new TimelineMax({
                    onComplete:function(){
                        $.each($cblock1.find( 'ul li h5' ), function(i, obj){
                            var $itemCategory = $(obj);
                            var $itemTitle = $(obj).parent().find('h2');
    
                            new Waypoint({
                                element: $( obj ),
                                handler: function( direction ) {
                                    if( direction === 'down' ) {
                                        TweenMax.to($itemCategory, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .525 });
                                        TweenMax.to($itemTitle, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .575 });
                                        this.destroy();
                                    }
                                },
                                offset: '100%'
                            });
                        });
    
                        $cblock1.css({ opacity: 1 });
                    } 
                });
    
                
                tlMax.to( $headerlogo, duration, { opacity: 1, y: '0%' });
                $.each($tbaCategories, function(i, el) {
                    var delay = .275 + (.105 * i);
                    TweenMax.to(el, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: delay });
                });
    
                $.each($cblock1.find( 'ul li' ), function(i, obj){
                    TweenMax.to($(obj).find( '.thumbnail-inner' ), duration * 1.25, { ease: Power2.easeInOut, height: '100%', delay: duration });
                    TweenMax.to($(obj).find( '.thumbnail-inner .shower' ), duration * 2, { ease: Power1.easeOut, scale: 1, y: '0%', delay: duration });
                });
    
                // hover
                $cblock1.find( 'ul li a' ).hover(
                    function(){
                        TweenMax.to( $( this ).find( '.thumbnail img' ), duration / 2, { scale: 0.98 });
                    },
                    function(){
                        TweenMax.to( $( this ).find( '.thumbnail img' ), duration / 2, { scale: 1 });
                    }
                );
    
                // 
                masonry.set({
                    el: $cblock1,
                    imagesloaded: true
                });
                
            }, 500);
    
        }
    
    };
    
    
    },{"../modules/masonry.js":5}],10:[function(require,module,exports){
    'use strict';
    
    module.exports = {
    
        elem: $( 'body.single-projects' ),
    
        init: function(){
            var $elem = this.elem,
                $headerlogo = $elem.find( '.components.header__logo' ),
                $breadcrumb = $elem.find( '.breadcrumb__panel' ),
                $heropanel = $elem.find( '.hero__panel' );
    
            var duration = 0.6;
    
            this.imgAnimateScroll( $elem.find( '.row_3_2__panel ul li:last-child' ) );
            if( !$elem.find( '.row_3_3__panel ul li' ).hasClass( 'bgcolorset' ) ) {
                // added 2019-01-10
                // no auto scrolling anymore
                // this.imgAnimateScroll( $elem.find( '.row_3_3__panel ul li' ) );
            }
            this.imgAnimateGallery( $elem.find( '.row_3_3_2__panel ul li' ) );
            this.imgScrollFade();
    
            // logo
            TweenMax.set($headerlogo, { opacity: 0, y: '20%' });
            
            // title (our work)
            TweenMax.set($breadcrumb, { opacity: 0, y: '20%' });
    
            // image
            var $itemImageInner = $heropanel.find( '.item-image-inner' );
            TweenMax.set($itemImageInner, { height: 0 });
            var $itemImage = $itemImageInner.find( '.shower' );
            TweenMax.set($itemImage, { scale: 1.1 });
    
            // box
            var $itemBox = $heropanel.find( '.bodycopy-background' );
            $itemBox.css({ width: '0%' })
            
            // copy
            var $bodyTitle = $heropanel.find( 'h1 span' );
            TweenMax.set($bodyTitle, { opacity: 0, y: '30%' });
            var $bodyCopy = $heropanel.find( '.bodycopy p' );
            TweenMax.set($bodyCopy, { opacity: 0, y: '10%' });
    
            // arrows
            var $leftArrow = $elem.find( '.pagination__arrow.prev' );
            var $rightArrow = $elem.find( '.pagination__arrow.next' );
            TweenMax.set($leftArrow, { opacity: 0, y: '30%' });
            TweenMax.set($rightArrow, { opacity: 0, y: '-30%' });
    
            $.each($elem.find( '.row_panel:not(.row_3__panel)' ), function(i, obj){
                TweenMax.set($(obj), { y: '100px' });
            });
    
            $.each($elem.find( '.row_1__panel' ), function(i, obj) {
                TweenMax.set($(obj).find('.line-left'), { height: '0%' });
                TweenMax.set($(obj).find('.line-right'), { height: '0%' });
                TweenMax.set($(obj).find('.gt20words'), { opacity: 0, y: '10%' });
            });
            
            $.each($elem.find( '.row_3__panel' ), function(i, obj) {
                TweenMax.set($(obj).find('.line'), { height: '0%' });
                TweenMax.set($(obj).find('h5'), { opacity: 0, y: '100%' });
            });
    
            // content load
            setTimeout(function(){
    
                // logo
                TweenMax.to($headerlogo, duration, { ease: Power1.easeOut, opacity: 1, y: '0%' });
                
                // title (our work)
                TweenMax.to($breadcrumb, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .275 });
    
                // image
                TweenMax.to($itemImageInner, duration * 1.25, { ease: Power2.easeInOut, height: '100%', delay: .535 });
                TweenMax.to($itemImage, duration * 2, { ease: Power1.easeOut, scale: 1, delay: .535 });
    
                // box
                TweenMax.to($itemBox, duration * 1.25, { ease: Power1.easeOut, width: '100%', delay: .875 });
                
                // copy
                TweenMax.to($bodyTitle, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: 1.225 });
                TweenMax.to($bodyCopy, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: 1.425 });
    
                // arrows
                TweenMax.to($leftArrow, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: 1.675 });
                TweenMax.to($rightArrow, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: 1.755 });
    
                $.each($elem.find( '.row_panel' ), function(i, obj){
                    new Waypoint({
                        element: $( obj ),
                        handler: function( direction ) {
                            if( direction === 'down' ) {
                                TweenMax.to( $( obj ), duration, { ease: Power1.easeOut, y: '0px' });
                                this.destroy();
                            }
                        },
                        offset: '100%'
                    });
                });
    
                $.each($elem.find( '.row_1__panel' ), function(i, obj) {
                    new Waypoint({
                        element: $( obj ),
                        handler: function( direction ) {
                            if( direction === 'down' ) {
                                TweenMax.to($(obj).find('.line-left'), duration, { ease: Power1.easeInOut, height: '100%', delay: .225 });
                                TweenMax.to($(obj).find('.line-right'), duration, { ease: Power1.easeInOut, height: '100%', delay: .225 });
                                TweenMax.to($(obj).find('.gt20words'), duration * 2, { ease: Power1.easeInOut, opacity: 1, y: '0%', delay: .225 });
                                this.destroy();
                            }
                        },
                        offset: '80%'
                    });
                });
    
                $.each($elem.find( '.row_3__panel' ), function(i, obj) {
                    new Waypoint({
                        element: $( obj ),
                        handler: function( direction ) {
                            if( direction === 'down' ) {
                                TweenMax.to($(obj).find('.line'), duration, { ease: Power1.easeInOut, height: '100%' });
                                TweenMax.to($(obj).find('h5'), duration, { ease: Power1.easeInOut, opacity: 1, y: '0%', delay: .225 });
                                this.destroy();
                            }
                        },
                        offset: '80%'
                    });
                });
                
            }, 500);
        },
    
        imgAnimateScroll: function( parentElem ){
            var $panel = $( parentElem ),
                duration = 5;
    
            // set for multi scroll within the page
            var funcs = {};
            $.each($panel, function(i, obj){
                if( $( obj ).length ) 
                {
                    var ilocal = i;
    
                    funcs[i] = function(){
                        // conditional for ajax load
                        if( $( obj ).is(':visible') ) 
                        {
                            var $imgScroll = $( obj ).find( '.imgAnimateScroll' ),
                                $imgPad = $( obj ).find( '.imgPad' ),
                                duration = $imgScroll.height() / 200;
    
                            TweenMax.to( $imgScroll, duration, { top: -($imgScroll.height() - $imgPad.height()), ease: Linear.easeNone, delay: 3, 
                                onComplete: function() {
                                    TweenMax.to( $imgScroll, duration, { top: 0, ease: Linear.easeNone, delay: 3, 
                                        onComplete: function(){
                                            funcs[ ilocal ]();
                                        }
                                    });
                                }
                            });
                            
                            // console.log( 'imgAnimateScroll'+ ilocal );
                        }
                    };
    
                    setTimeout(function(){ 
                        funcs[ ilocal ]();
                    }, 1000);
                }
            });
        },
    
        imgAnimateGallery: function( parentElem ){
            var $panel = $( parentElem ),
                $images = $panel.find( '.imgGallery' ),
                duration = 1,
                counter = 0
    
            if( $panel.length ) {
                
                // first image visible
                $images.eq( counter ).css({ 'opacity': 1 });
    
                // set transitions
                var timer = setInterval(function(){
                    
                    // conditional for ajax load
                    if( $panel.is(':visible') ) {
                        counter++;
    
                        TweenMax.to( $images, duration, { opacity: 0 });
                        TweenMax.to( $images.eq( counter - 1 ), duration, { opacity: 1 });
    
                        if( counter == $images.length ) {
                            counter = 0;
                        }
    
                        // console.log('imgAnimateGallery');
                    }
                    else {
                        clearInterval( timer );
                        // console.log('Stop imgAnimateGallery');
                    }
    
                }, 3000);
            }
        },
    
        imgScrollFade: function(){
            var $panel = $( '.row_3_3_3__panel ul li' ),
                $images = $panel.find( '.imgScrollFade' ),
                duration = 5,
                counter = 0;
            
            if( $panel.length ) {
    
                // first image visible
                $images.eq( counter ).css({ 'opacity': 1 });
    
                var animateImage = function(){
                    // conditional for ajax load
                    if( $panel.is(':visible') ) 
                    {
                        var $imgScroll = $images.eq( counter ),
                            $imgPad = $panel.find( '.imgPad' ),
                            duration = $imgScroll.height() / 200; console.log(duration);
    
                        TweenMax.to( $imgScroll, duration, { top: -($imgScroll.height() - $imgPad.height()), ease: Linear.easeNone, delay: 2, 
                            onComplete: function() {
                                TweenMax.to( $imgScroll, duration, { top: 0, ease: Linear.easeNone, delay: 2, 
                                    onComplete: function(){
                                        counter++;
    
                                        if( counter == $images.length ) {
                                            counter = 0;
                                        }
    
                                        // set new image
                                        TweenMax.to( $images, 1, { opacity: 0 });
                                        TweenMax.to( $images.eq( counter ), 1, { opacity: 1, 
                                            onComplete:function(){
                                                // remove style
                                                $images.not( ':eq('+ counter +')' ).removeAttr( 'style' );
                                            } 
                                        });
    
                                        animateImage();
                                    }
                                });
                            }
                        });
                        
                        // console.log( 'imgScrollFade' );
                    }
                    
                };
    
                setTimeout(function(){ 
                    animateImage();
                }, 1000);
            }
    
    
        },
    
    };
    
    
    },{}],11:[function(require,module,exports){
    'use strict';
    
    var breakpoints = require('../helper/breakpoints.js');
    
    module.exports = {
    
        elem: $( 'body.page-template-page-Ourwork' ),
        ehover: false,
        initial: true,
    
        init: function(){
            // content load
            var _this = this,
                $projcol1 = $( '.ourwork__wrapper .ourwork__projects .ourwork__projects--col.col1' ),
                $projcol2 = $( '.ourwork__wrapper .ourwork__projects .ourwork__projects--col.col2' );
            
            var duration = 0.6;
            var currentIndex = 1;
            
            $( '.ourwork__wrapper' ).css({ opacity: 1 });
    
            // logo
            var $tbaLogo = $projcol1.find( '.item--logo' );
            TweenMax.set($tbaLogo, { opacity: 0, y: '20%' });
    
            // title (our work)
            var $tbaTitle = $projcol1.find( '.item--title' );
            TweenMax.set($tbaTitle, { opacity: 0, y: '20%' });
    
            // projects
            var $tbaProjects = $projcol1.find( 'ul li' );
            TweenMax.set($tbaProjects, { opacity: 0, y: '80%' });
    
            // box
            var $itemBox = $projcol2.find( '.item--box:nth-child('+ currentIndex +')' );
            var $itemBoxHolder = $itemBox.find( '.item--box-holder' );
            $itemBoxHolder.css({ width: '0%' })
    
            // image
            var $itemImageContainer = $projcol2.find( '.item--image:nth-child('+ currentIndex +')' );
            var $itemImageInner = $itemImageContainer.find( '.item--image-holder-inner' );
            TweenMax.set($itemImageInner, { height: 0 });
            var $itemImage = $itemImageInner.find( '.shower' );
            TweenMax.set($itemImage, { scale: 1.1 });
    
            // title
            var $itemImageTitle = $itemImageContainer.find( '.item--image-title h1' );
            TweenMax.set($itemImageTitle, { opacity: 0, y: '20%' });
            var $itemImageView = $itemImageContainer.find( '.item--image-title .item--image-viewproject a' );
            TweenMax.set($itemImageView, { opacity: 0, y: '40%' });
            var $itemImageViewLine = $itemImageContainer.find( '.item--image-title .item--image-viewproject a .line' );
            TweenMax.set($itemImageViewLine, { width: '0%' });
    
            // cta
            var $tbaCTACopy = $projcol1.find( '.components.linkbar__bottom .linkbar__copy a' );
            TweenMax.set($tbaCTACopy, { opacity: 0, y: '50%' });
            var $tbaCTALine = $projcol1.find( '.components.linkbar__bottom .line' );
            TweenMax.set($tbaCTALine, { height: '0%' });
            var $tbaCTACircle = $projcol1.find( '.components.linkbar__bottom .circle' );
            TweenMax.set($tbaCTACircle, { opacity: 0, y: '50%' });
    
            setTimeout(function(){
    
                $itemBox.show();
                $itemImageContainer.show();
    
                // logo
                TweenMax.to($tbaLogo, duration, { ease: Power1.easeOut, opacity: 1, y: '0%' });
                
                // title (our work)
                TweenMax.to($tbaTitle, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .275 });
                
                // projects
                $.each($tbaProjects, function(i, el) {
                    var delay = .625 + (.105 * i);
                    TweenMax.to(el, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: delay });
                });
    
                // line
                TweenMax.to($projcol1.find( 'ul li:nth-child('+ currentIndex +') .line-left' ), duration * 2, { ease: Power1.easeOut, width: '40%', delay: .515 });
                TweenMax.to($projcol1.find( 'ul li:nth-child('+ currentIndex +') .line-right' ), duration * 2, { ease: Power1.easeOut, width: '40%', delay: .515 });
    
                // box
                TweenMax.to($itemBoxHolder, duration * 2, { ease: Power1.easeOut, width: '100%', delay: .535 });
    
                // image
                TweenMax.to($itemImageInner, duration * 1.25, { ease: Power2.easeInOut, height: '100%', delay: .925 });
                TweenMax.to($itemImage, duration * 2, { ease: Power1.easeOut, scale: 1, delay: .925 });
    
                // title
                TweenMax.to($itemImageTitle, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: 1.225 });
                TweenMax.to($itemImageView, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: 1.525 });
                TweenMax.to($itemImageViewLine, duration, { ease: Power1.easeOut, width: '100%', delay: 1.625 });
    
                // cta
                TweenMax.to($tbaCTACopy, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: 1.725 });
                TweenMax.to($tbaCTALine, duration, { ease: Power1.easeOut, height: '100%', delay: 1.875 });
                // TweenMax.to($tbaCTACircle, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: 2 });
    
                _this.ehover = true;
            }, 250);
    
            this.projectImageResize();
            this.projectTransitions();
        },
    
        projectImageResize: function(){
            var _this = this,
                $projectImage = $( '.ourwork__wrapper .ourwork__projects .ourwork__projects--col.col2' ),
                $itemImage = $projectImage.find( '.item--image-wrapper .item--image' );
    
            $( window ).resize(function(){
                // only on browser specific width
                if( $( this ).width() >= breakpoints.tablet_ipad ) 
                {
                    
                    var targetHeight = $( this ).height(),
                    $itemImageHolder = $itemImage.find( '.item--image-holder' );
    
                    // set initial width
                    if( !_this.initial ) {
                        $itemImageHolder.css('width', 'initial');  
                    }
    
                    var containerHeight = $itemImageHolder.height(),
                        containerWidth = $itemImageHolder.width();
    
                    if( containerHeight > targetHeight ) {
    
                        while( containerHeight > targetHeight ) {
                            containerHeight = containerHeight - (containerHeight * .01);
                            containerWidth = containerWidth - (containerWidth * .01);
                        }
    
                        $itemImageHolder.width( containerWidth - 60 );
                        // console.log( containerWidth, containerHeight );
                    }
    
                    _this.initial = false;
    
                }
            }).resize();
        },
    
        projectTransitions: function(){
            var _this = this,
                $col1 = $( '.ourwork__wrapper .ourwork__projects .ourwork__projects--col.col1' ),
                $col2 = $( '.ourwork__wrapper .ourwork__projects .ourwork__projects--col.col2' );
    
            var lineLeftW = '40%',
                lineRightW = '40%',
                duration = 0.6,
                prevIndex = 1,
                zIndex = 2;
    
            // initial setting
            $col1.find( 'ul li:nth-child('+ prevIndex +') a' ).addClass( 'active' );
            $col1.find( 'ul li .line' ).css({ width: '0%' });
            // $col1.find( 'ul li:nth-child('+ prevIndex +') .line-left' ).css({ width: lineLeftW });
            // $col1.find( 'ul li:nth-child('+ prevIndex +') .line-right' ).css({ width: lineRightW });
    
            $col2.find( '.item--image' ).hide();
            // $col2.find( '.item--image:nth-child('+ prevIndex +')' ).show();
            $col2.find( '.item--box' ).hide();
            // $col2.find( '.item--box:nth-child('+ prevIndex +')' ).show();
            
            // hover
            $col1.find( 'ul li a' ).hover(
                function(){
                    if( !$( this ).hasClass( 'active' ) && _this.ehover ) {
                        // _this.ehover = false;
    
                        var thisIndex = parseInt( $( this ).parent().index() + 1 ),
                            prevItemImageHolder = $col2.find( '.item--image:nth-child('+ prevIndex +') .item--image-holder' ),
                            $itemImageContainer = $col2.find( '.item--image:nth-child('+ thisIndex +')' ),
                            $prevItemImageContainer = $col2.find( '.item--image:nth-child('+ prevIndex +')' );
    
                        if ($itemImageContainer.hasClass('is-animating') || $prevItemImageContainer.hasClass('is-animating')) {
                            return false;
                        }
    
                        // do not triggered below if still animating
                        if( TweenMax.isTweening( prevItemImageHolder ) ) {
                            return false;
                        }
    
                        // col1 set active state
                        $col1.find( 'ul li a' ).removeClass( 'active' );
                        $( this ).addClass( 'active' );
    
                        // line
                        TweenMax.set($col1.find( 'ul li:nth-child('+ prevIndex +') .line-left' ), { opacity: 1 });
                        TweenMax.set($col1.find( 'ul li:nth-child('+ prevIndex +') .line-right' ), { opacity: 1 });
                        TweenMax.set($col1.find( 'ul li:nth-child('+ thisIndex +') .line-left' ), { opacity: 1, width: '0%' });
                        TweenMax.set($col1.find( 'ul li:nth-child('+ thisIndex +') .line-right' ), { opacity: 1, width: '0%' });
                        TweenMax.to($col1.find( 'ul li:nth-child('+ prevIndex +') .line-left' ), duration * 2, { ease: Power1.easeOut, opacity: 0, width: '37.5%' });
                        TweenMax.to($col1.find( 'ul li:nth-child('+ prevIndex +') .line-right' ), duration * 2, { ease: Power1.easeOut, opacity: 0, width: '37.5%' });
                        TweenMax.to($col1.find( 'ul li:nth-child('+ thisIndex +') .line-left' ), duration * 2, { ease: Power1.easeOut, width: '40%' });
                        TweenMax.to($col1.find( 'ul li:nth-child('+ thisIndex +') .line-right' ), duration * 2, { ease: Power1.easeOut, width: '40%' });
    
                        // box
                        var $itemBox = $col2.find( '.item--box:nth-child('+ thisIndex +')' );
                        var $prevItemBox = $col2.find( '.item--box:nth-child('+ prevIndex +')' );
                        var $itemBoxHolder = $itemBox.find( '.item--box-holder' );
                        $itemBox.css({ zIndex: zIndex });
                        // $prevItemBox.css({ zIndex: 1 });
                        $itemBoxHolder.css({ width: '0%' })
                        $itemBox.show();
                        TweenMax.to($itemBoxHolder, duration * 2, { ease: Power1.easeOut, width: '100%', delay: .2 });
    
                        // image
                        var $itemImageInner = $itemImageContainer.find( '.item--image-holder-inner' );
                        var $prevItemImageInner = $prevItemImageContainer.find( '.item--image-holder-inner' );
                        var $itemImage = $itemImageInner.find( '.shower' );
                        var $prevItemImage = $prevItemImageInner.find( '.shower' );
                        // $itemImageContainer.addClass('is-animating');
                        $prevItemImageContainer.addClass('is-animating');
                        $itemImageContainer.css({ zIndex: zIndex });
                        // $prevItemImageContainer.css({ zIndex: 1 });
                        TweenMax.set($itemImageInner, { height: 0, y: '0%' });
                        TweenMax.set($itemImage, { scale: 1.1 });
                        $itemImageContainer.show();
                        /* TweenMax.to($itemImageContainer, duration * 2, { opacity: 1, delay: .49, onComplete: function(el) {
                            $(el).removeClass('is-animating');
                        }, onCompleteParams: [$itemImageContainer] }); */
                        TweenMax.to($itemImageInner, duration * 1.25, { ease: Power2.easeInOut, height: '100%', delay: .49, onComplete: function(prev, next, box) {
                            $(prev).removeClass('is-animating');
                            if ($col2.find( '.item--image.is-animating').length === 0) {
                                $col2.find('.item--image').css({ zIndex: 1 });
                                $col2.find('.item--box').css({ zIndex: 1 });
                                zIndex = 3;
                                $(next).css({ zIndex: 2 });
                                $(box).css({ zIndex: 2 });
                            }
                            $prevItemImageContainer.hide();
                        }, onCompleteParams: [$prevItemImageContainer, $itemImageContainer, $itemBox] }); 
                        TweenMax.to($prevItemImageInner, duration * 1.25, { ease: Power2.easeInOut, y: '50%', delay: .49 });
                        TweenMax.to($itemImage, duration * 2, { ease: Power1.easeOut, scale: 1, delay: .49, });
                        TweenMax.to($prevItemImage, duration * 2, { ease: Power1.easeOut, scale: 1.1, delay: .49, onComplete: function() {
                            $prevItemBox.hide();
                        } });
    
                        // title
                        var $itemImageTitleContainer = $itemImageContainer.find( '.item--image-title' );
                        var $itemImageTitle = $itemImageTitleContainer.find( 'h1' );
                        var $prevItemImageTitleContainer = $prevItemImageContainer.find( '.item--image-title' );
                        var $itemImageView = $itemImageContainer.find( '.item--image-title .item--image-viewproject a' );
                        var $itemImageViewLine = $itemImageContainer.find( '.item--image-title .item--image-viewproject a .line' );
                        TweenMax.set($itemImageTitleContainer, { opacity: 1, scale: 1 });
                        TweenMax.set($itemImageTitle, { opacity: 0, y: '20%' });
                        TweenMax.set($itemImageView, { opacity: 0, y: '40%' });
                        TweenMax.set($itemImageViewLine, { width: '0%' });
                        TweenMax.to($prevItemImageTitleContainer, duration, { ease: Power1.easeOut, opacity: 0, scale: .9, delay: .2 });
                        TweenMax.to($itemImageTitle, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .79 });
                        TweenMax.to($itemImageView, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: 1.09 });
                        TweenMax.to($itemImageViewLine, duration, { ease: Power1.easeOut, width: '100%', delay: 1.19 });
    
                        zIndex += 1;
                        prevIndex = thisIndex;
                    }
                },
                function(){
                    // do nothing...
                }
            );
    
            $col2.find( '.item--image-link' ).hover(
                function(){
                    TweenMax.to($( this ).find( '.item--image-holder img' ), duration, { ease: Power1.easeOut, scale: 0.98 });
                },
                function(){
                    TweenMax.to($( this ).find( '.item--image-holder img' ), duration, { ease: Power1.easeOut, scale: 1 });
                }
            );
        }
    
    };
    },{"../helper/breakpoints.js":2}],12:[function(require,module,exports){
    'use strict';
    
    var breakpoints = require('../helper/breakpoints.js'),
        masonry = require('../modules/masonry.js');
    
    module.exports = {
    
        elem: $( 'body.page-template-page-Services' ),
    
        init: function(){
    
            var $headerlogo = this.elem.find( '.components.header__logo' ),
                $cblock1 = this.elem.find( '.contents__block.cblock1' ),
                $cblock2 = this.elem.find( '.contents__block.cblock2' ),
                $layout1 = $cblock2.find( '.layout1' );
    
            var duration = 0.6;
    
            // clone bodycopy and re-insert for mobile version layout
            $( window ).resize(function(e){
                if( $( this ).width() < breakpoints.tablet_ipad ) {
    
                    $.each($layout1, function(i, obj){
                        if( !$( obj ).find( '.item-row .col2 .bodycopy' ).length ) {
                            $( obj ).find( '.bodycopy' ).appendTo( $( obj ).find( '.item-row .col2' ) );
                        }
                    });
    
                } 
                else {
    
                    $.each($layout1, function(i, obj){
                        if( $( obj ).find( '.item-row .col2 .bodycopy' ).length ) {
                            $( obj ).find( '.item-row .col2 .bodycopy' ).appendTo( $( obj ) );
                        }
                    });
    
                }
            }).resize();
    
            // 
            masonry.set({
                el: $cblock2
            });
    
            TweenMax.set($headerlogo, { opacity: 0, y: '20%' });
    
            var $tbaTitle = $cblock1.find( 'h5' );
            TweenMax.set($tbaTitle, { opacity: 0, y: '50%' });
                
            var $tbaBody = $cblock1.find( '.headercopy' );
            TweenMax.set($tbaBody, { opacity: 0, y: '20%' });
    
            $.each($cblock2.find( 'ul li' ), function(i, obj){
                var $itemNumber = $(obj).find( '.number' );
                TweenMax.set($itemNumber, { opacity: 0, x: '-30%' });
                var $itemTitle = $(obj).find('.title');
                TweenMax.set($itemTitle, { opacity: 0, y: '30%' });
                var $itemBody = $(obj).find('.bodycopy');
                TweenMax.set($itemBody, { opacity: 0, y: '30%' });
            });
    
            // content load
            setTimeout(function(){
    
                var tlMax = new TimelineMax({
                    onComplete:function(){
                        $.each($cblock2.find( 'ul li' ), function(i, obj){
                            var $itemNumber = $(obj).find( '.number' );
                            var $itemTitle = $(obj).find('.title');
                            var $itemBody = $(obj).find('.bodycopy');
    
                            new Waypoint({
                                element: $( obj ),
                                handler: function( direction ) {
                                    if( direction === 'down' ) {
                                        TweenMax.to($itemNumber, duration * 1.25, { ease: Power1.easeInOut, opacity: 1, x: '0%' });
                                        TweenMax.to($itemTitle, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .125 });
                                        TweenMax.to($itemBody, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .325 });
                                        this.destroy();
                                    }
                                },
                                offset: '80%'
                            });
                        });
                    } 
                });
    
                TweenMax.to( $headerlogo, duration, { ease: Power1.easeInOut, opacity: 1, y: '0%' });
                tlMax.to($tbaTitle, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .275 });
                TweenMax.to($tbaBody, duration, { ease: Power1.easeOut, opacity: 1, y: '0%', delay: .625 });
            }, 500);
            
        }
    
    };
    
    
    },{"../helper/breakpoints.js":2,"../modules/masonry.js":5}],13:[function(require,module,exports){
    'use strict';
    
    module.exports = {
    
        elem: $( '#mc-SIGNUP' ),
    
        init: function(){
            // submission event
            this.elem.submit(function(e){
                e.preventDefault();
    
                $.ajax({
                    url: _getStylesheetDirectoryUri +'/includes/MC_Signup.php',
    
                    data: 'ajax=true&email='+ escape($('#mc-EMAIL').val()),
    
                    method: $(this).attr('method'),
    
                    success: function( msg ) {
    
                        console.log( msg );
                        if( msg === 'Success' ) {
                            // msg = msg +' You are now on our newsletter emailing list.';
                            msg = 'Thank You!';
    
                            // disable fields
                            $('#mc-EMAIL, #mc-SUBMIT').prop( 'disabled', true );
    
                            // reset
                            setTimeout(function(){
                                $('#mc-EMAIL').val('');
                                $('#mc-EMAIL, #mc-SUBMIT').prop( 'disabled', false );
                                $('#mc-RESPONSE').html('');
                            }, 5000);
    
                        }
                        else {
                            if( msg === 'Failure' ) {
                                msg = 'Email already exists';
                            }
                        }
    
                        $('#mc-RESPONSE').html(msg);
                    },
    
                    error: function( request, status, error ) {
                        // console.log(request.responseText);
                    }
                });
            });
        }
    
    };
    
    },{}]},{},[1]);
    