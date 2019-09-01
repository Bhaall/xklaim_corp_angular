xkl.controller('homeCtrl', function homeCtrl($scope, $routeParams, sharedProperties) {


});

xkl.controller('carouselCtrl', function carouselCtrl($scope, $routeParams, $location, sharedProperties) {
	
	$scope.steps = ['one', 'two'];
	
	$scope.stringValue = sharedProperties.getString;
	$scope.objectValue = sharedProperties.getObject();
	$scope.setString = function(newValue) {
		$scope.objectValue.data = newValue;
		sharedProperties.setString(newValue);
		$scope.step = newValue;
	};

	if ($scope.stringValue() == 0 || $scope.stringValue() == 1) {
		$scope.step = $scope.stringValue();
		$scope.setCurrentStep($scope.step);
	}
	else {
		$scope.step = 0;
	}
	
	$scope.isFirstStep = function() {
		return $scope.step === 0;
	};

	$scope.isLastStep = function() {
		return $scope.step === ($scope.steps.length - 1);
	};

	$scope.isCurrentStep = function(step) {
		return $scope.step === step;
	};

	$scope.getCurrentStep = function() {
		return $scope.steps[$scope.step];
	};

	$scope.handlePrevious = function() {
		$scope.step -= ($scope.isFirstStep()) ? 0 : 1;
	};

	$scope.handleNext = function(dismiss) {
		$scope.step += 1;
	};
	
	$scope.setCurrentCarStep = function(step) {
		$scope.step = step;
	};
	
	$scope.anim = 'slide';
	
	$scope.slideNextHomeStep = function() {
		$scope.anim = 'slide';
		if ($scope.isLastStep()) {
			$scope.step = 0;
		}
		else {
			$scope.step += 1
		}	
	};

	$scope.slidePrevHomeStep = function() {
		$scope.anim = 'slideright';
		if ($scope.isFirstStep()) {
			$scope.step = 1;
		}
		else {
			$scope.step -= 1
		}
	};
});

xkl.controller('infocarouselCtrl', function infocarouselCtrl($scope, $routeParams, $location, sharedProperties) {

	$scope.steps = ['one', 'two'];

	$scope.step = 0;
	
	$scope.isFirstStep = function() {
		return $scope.step === 0;
	};

	$scope.isLastStep = function() {
		return $scope.step === ($scope.steps.length - 1);
	};

	$scope.isCurrentStep = function(step) {
		return $scope.step === step;
	};

	$scope.setCurrentStep = function(step) {
		$scope.step = step;
	};

	$scope.getCurrentStep = function() {
		return $scope.steps[$scope.step];
	};

	$scope.handlePrevious = function() {
		$scope.step -= ($scope.isFirstStep()) ? 0 : 1;
	};

	$scope.handleNext = function(dismiss) {
		$scope.step += 1;
	};
});

xkl.controller('infoCtrl', function infoCtrl($scope, $routeParams, $location, sharedProperties, contactService) {
	
	$scope.steps = ['one', 'two', 'three'];
	
	$scope.stringValue = sharedProperties.getString;
	$scope.objectValue = sharedProperties.getObject();
	$scope.setString = function(newValue) {
		$scope.objectValue.data = newValue;
		sharedProperties.setString(newValue);
		$scope.step = newValue;
		console.log($scope.step);
	};
	
	$scope.setCurrentStep = function(step) {
		$scope.step = step;
	};
 
	if ($scope.stringValue() == '0' || $scope.stringValue() == '1' || $scope.stringValue() == '2') {
		$scope.step = $scope.stringValue();
		$scope.setCurrentStep($scope.step);
	}
	else  {
		$scope.step = 0;
	}
	
	$scope.isFirstStep = function() {
		return $scope.step === 0;
	};

	$scope.isLastStep = function() {
		return $scope.step === ($scope.steps.length - 1);
	};

	$scope.getCurrentPage = function() {
		return $scope.steps[$scope.step];
	};

	$scope.isCurrentStep = function(step) {
		return $scope.step === step;
	};

	$scope.handlePrevious = function() {
		$scope.step -= ($scope.isFirstStep()) ? 0 : 1;
	};

	$scope.handleNext = function(dismiss) {
		$scope.step += 1;
	};

	$scope.setCurrentClass = function() {
		return $scope.getCurrentPage();
	};
	
	$scope.slideDir = 'slide';
	
	$scope.slideNextStep = function() {
		$scope.slideDir = 'slide';
		
		if ($scope.isLastStep()) {
			$scope.step = 0;
		}
		else {
			$scope.step += 1
		}
	};
	
	$scope.slidePrevStep = function() {
		$scope.slideDir = 'slideright';
		
		if ($scope.isFirstStep()) {
			$scope.step = 2;
		}
		else {
			$scope.step -= 1
		}
	};
	
	$scope.$watch(function() {
		return $location.path();
	}, function(newPath) {
		$scope.location = $location.path();
		$scope.setCurrentClass($scope.getCurrentPage());
	});
});


xkl.controller('404Ctrl', function companyCtrl($scope, $routeParams) {

});

xkl.controller('ContactController', function ContactController($scope, $routeParams, $location, sharedProperties, contactService) {
	
	$scope.alerts = [];

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.contact = {};
	
	$scope.submit = function(contact){
		contactService.post($scope.contact).then(function(data){
			if(data){
				$scope.errorMsgTemplate = "<h4>" + data.meta.message.title + " {{contact.name}}</h4>" + data.meta.message.subtitle;
				switch (data.meta.code) {
					case 200:
						$scope.response = data.response;
						$scope.alerts.push({type: "success", msg: "<h4>Thank you " + $scope.response.email_id + "!</h4> We will be contacting you soon."});
						$scope.contact = '';
						$scope.contactForm.$setPristine();
						break;
					case 400:
						$scope.alerts.push({type: "warning", msg: $scope.errorMsgTemplate});
						break;
					case 404:
						$location.path('/404').replace();		
						break;
					default:
						$scope.alerts.push({type: "warning", msg: $scope.errorMsgTemplate});
				}
			}
		},
		function(errorMessage){
			$scope.alerts = [];
			$scope.contactForm.$setPristine();
			$scope.contact = '';
			$scope.error=errorMessage;
			$scope.alerts.push({type: "warning", msg: "<h4>We believe there's a problem</h4> We were unable to send your contact info."});
		});
	};
});