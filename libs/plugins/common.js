window.setThumbnailOfRsVideo = function ($videoImage, videoUrl) {
	if(videoUrl.length > 0) {
		if(/(youtube|yt)/.test(videoUrl)) {
			$videoImage.attr('src', '//img.youtube.com/vi/' + videoUrl.split('v=')[1] + '/hqdefault.jpg');
		} else if (/vimeo/.test(videoUrl)) {
			window.getVimeoIdFromUrl(videoUrl).then(function (id) {
				$.ajax('//www.vimeo.com/api/v2/video/' + id + '.json', {
					dataType: 'jsonp',
					cache: true
				}).done(function (data) {
					$videoImage.attr('src', data[0].thumbnail_large);
				});
			});
		}
	}
};

window.adjustHeader = function() {
	$('header').width($('.view-content').width());
};

window.mapThemes = {
  blackAndWhite: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]
};

$(document).ready(function () {
	function initHeadroom() {
		var myElement = document.querySelector(".headroom");

		if(!document.getElementById('header-injectable-place')) {
            var scroller = window;

            var headroom = new Headroom(myElement, {
                tolerance: 0,
                offset : 0,
                scroller : scroller,
                classes: {
                    initial: "headroom",
                    pinned: "headroom--pinned",
                    unpinned: "headroom--unpinned"
                }
            });
            headroom.init();
        }
	}

	function initSlidebars() {
		var controller = new slidebars();
		controller.init();

		window.__OPEN_SIDEBAR__ = function () {
            controller.toggle('id-1');
            $('body').addClass('offcanvas-open');
        };
		// Toggle Slidebars
		$('.toggle-id-1').on('click', function (event) {
			event.stopPropagation();
			event.preventDefault();
			controller.toggle('id-1');
			$('body').addClass('offcanvas-open');
		});

		// Close
		$('.site, .offcanvas-backdrop, .offcanvas-close, .offcanvas a.close-menu').on('click', function () {
			controller.close();
			$('body').removeClass('offcanvas-open');
		} );

		window['CLOSE_SIDEBAR_MENU'] = function () {
            controller.close();
            $('body').removeClass('offcanvas-open');
        }
	}

	function closeOverlayOnEsc() {
		$(document).keyup(function(e) {
			if (e.keyCode === 27) {
				$('.modal.in .modal-close').click();
			}
		});
	}

	closeOverlayOnEsc();
	initHeadroom();
	initSlidebars();
	window.adjustHeader();
	
	$(window).resize(window.adjustHeader);
});
