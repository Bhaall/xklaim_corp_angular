xkl.factory('contactService',function($http, $q){
	return{
		apiPath:'api/corp_site/v1/contact/',	
		post: function(userInfo){
			var deferred = $q.defer();
			$http.post(this.apiPath + userInfo).success(function(data){
				deferred.resolve(data);
			}).error(function(){
				deferred.reject("An error occured while fetching items");
			});
			return deferred.promise;
		}
	}
});


xkl.service('sharedProperties', function() {
    var stringValue = 'test string value';
    var objectValue = {
        data: 'test object value'
    };
    
    return {
        getString: function() {
            return stringValue;
        },
        setString: function(value) {
            stringValue = value;
        },
        getObject: function() {
            return objectValue;
        }
    }
});