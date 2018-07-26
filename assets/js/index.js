var app = angular.module('App', []);

app.controller('Ctrl', function($scope, $http) {
    
	$http.get("../assets/json/index.json")
    .then(function(response) {
        $scope.appdata = response;
    });

   	$scope.activecommentbox = function(){
   		if(this.item.commentboxshow){
   			this.item.commentboxshow = false;
   		}
   		else{
   			this.item.commentboxshow = true;
   		}
   	}

   	$scope.commentbtn = function(){
    	if(this.item.newcomment){
    		if(this.item.commentsArray){
    			this.item.commentsArray.push({
	    			"comment" : this.item.newcomment,
	    			"commentuser" : $scope.appdata.data.selfname,
	    			"newcomment" : "",
	    			"userprofile" : "avtar.jpg",
	    			"commentboxshow" : false
	    		});
    		}
    		else{
    			this.item['commentsArray'] = [];
    			this.item['commentsArray'].push({
	    			"comment" : this.item.newcomment,
	    			"commentuser" : $scope.appdata.data.selfname,
	    			"newcomment" : "",
	    			"userprofile" : "avtar.jpg",
	    			"commentboxshow" : false,
	    		});
    		}
    		this.item.commentboxshow = false;
    		this.item.newcomment = "";

    	}
    	else{
    		alert("Oops!, Comment is empty")
    	}
    }

    $scope.deletecomment = function(index){
    	if(this.$parent.item.commentsArray){
    		this.$parent.item.commentsArray.splice(index, 1);
    	}
    	else if(this.$parent.datashow.commentsArray){
    		this.$parent.datashow.commentsArray.splice(index, 1);
    	}
    }

});



app.directive('comment', function() {
  return {
    restrict: 'E',
    transclude: 'true',
    template: `<div class="clearfix" ng-repeat="item in datashow.commentsArray" ng-if="datashow.commentsArray">
					<ul class="clearfix"> <!-- firstleve-comment -->
						<li class="clearfix">
							<div class="clearfix">
								<div class="commentby-img">
									<img ng-src="../assets/img/{{item.userprofile}}" alt="">
								</div>
								<div class="commentby-nameMsg">
									<div class="msg-name">
										<span class="name">{{item.commentuser}}</span>
										<span class="msg">
											{{item.comment}}
										</span>
										<div class="deletecomment" ng-click="deletecomment($index)">Delete</div>
									</div>
								</div>
							</div>
							<div class="clearfix action-wrapper">
								<div class="clearfix">
									<div class="reply" ng-click="activecommentbox()">Reply</div>
								</div>
							</div>
							<comment></comment>
							<div class="clearfix action-wrapper" style="padding-left:40px;" ng-if="item.commentboxshow">
								<div class="sub-comment-container">
									<div class="subcommentby-img">
										<img ng-src="../assets/img/avtar.jpg" alt="">
									</div>
									<input type="text" class="commetbox"  ng-model="item.newcomment">
									<button class="btn btn-primary pull-right" ng-click="commentbtn()">Send</button>
								</div>
							</div>
						</li>
					</ul>
				</div>`,
    link: function(scope, element, attr){
    	
    	scope.datashow = scope.item;
    }
  };
});
