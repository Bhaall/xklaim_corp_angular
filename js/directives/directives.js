'use strict';

xkl.directive('activeLink', function () {
	return {
		link: function (scope, element, attrs) {
			var links = $(".heronav li a");

			$(links).on("click", function() {
				$(links).parent().removeClass('active');
				$(this).parent().addClass('active');
			});
		}
	};	
});

xkl.directive('alert', function () {
	return {
		restrict:'EA',
		templateUrl:'partials/alert.html',
		transclude:true,
		replace:true,
		scope: {
			type: '=',
			close: '&'
		},
		link: function(scope, iElement, iAttrs, controller) {
			scope.closeable = "close" in iAttrs;
		}
	};
});

xkl.directive('focusMe', function($timeout) {
	return {
		restrict:'EA',
		link: function(scope, element) {
			$timeout(function() {
				element.focus();
			}, 800);
		}
  	};
});