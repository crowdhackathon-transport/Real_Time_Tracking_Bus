Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}
angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $rootScope, $http) {

          
            $scope.loginData = {};
            
            $scope.PayData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });
            
            $ionicModal.fromTemplateUrl('templates/pay.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modals = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };
            
            $scope.closePay = function () {
                 $scope.modals.hide();
            };

           
            $scope.login = function () {
                $scope.modal.show();
            };
            
            $scope.pay = function () {
                $scope.modals.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {


                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
                    $scope.closeLogin();
                }, 1000);
            };
            
            $scope.doPay = function () {
     
                $timeout(function () {
                    $scope.closePay();
                }, 1000);
            };

            $http.get('http://altdevs.com/dev/oasa/json/b1.json').success(function (data, status, headers, config) {
                $rootScope.b1bus = data;
            });
            $http.get('http://altdevs.com/dev/oasa/json/stops.json').success(function (data, status, headers, config) {
                $rootScope.bStops = data;

            });
            
            $rootScope.availableSearchParams = [
            {key: "stop", name: "Στάση", placeholder: "Στάση..."},
            {key: "bus", name: "Λεωφορείο", placeholder: "Λεωφορείο..."},
            ];
           



        })
.controller('WeatherCtrl', function($scope, $rootScope, $http, $ionicLoading) { ////////////////////////////////////////////////////////////
  $scope.weather=[];

  // $scope.lan = $rootScope.myLocation.lat;
  // $scope.lng = $rootScope.myLocation.lng;

// http://api.openweathermap.org/data/2.5/forecast?lat=37.977362350&lon=23.71472134
// 'http://api.openweathermap.org/data/2.5/forecast?lat='+ $scope.lan + '&lon=' + $scope.lng + "'"

  $scope.loadWeather = function() {
    $http.get('http://api.openweathermap.org/data/2.5/forecast?lat=37.977362350&lon=23.71472134').success(function(data, status, headers, config) {
        $scope.weather = data.list;
       
    });
  };

  // $rootScope.myLocation = {
  //             lat:myLat,
  //             lng:myLng
  //         };

$scope.loadWeather();

})
.controller('PlayCtrl', function ($scope, $ionicPopup, $location) {
    $scope.items = [
    {
        "bus_name": "A11",
        "alarm_name": "πρωινό λεωφορείο",
        "alarm_description": "το πρωινό λεωφορείο που με αφήνει έξω απο την δουλεία μου.",
    },
    {
        "bus_name": "Β11",
        "alarm_name": "απογευματινό λεωφορείο",
        "alarm_description": "το λεωφορείο που συναντώ τους φίλους μου.",
    }

    ]
    $scope.shouldShowDelete = true;
    $scope.shouldShowReorder = true;
    $scope.listCanSwipe = true;

    $scope.currentDate = new Date();
    $scope.title = "Custom Title";

    $scope.datePickerCallback = function (val) {
        if(typeof(val)==='undefined'){      
         
        }else{
            
        }
    };

    $scope.slots = {epochTime: 12600, format: 12, step: 15};

$scope.timePickerCallback = function (val) {
  if (typeof (val) === 'undefined') {
   
  } else {
       // `val` will contain the selected time in epoch
  }
};
$scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Ειδοποιήση',
     template: 'Η καταχώρηση διαγράφηκε'
   });
   alertPopup.then(function(res) {

   });
 };

$scope.showNew = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Ειδοποιήση',
     template: 'Η καταχώρηση αποθηκεύτηκε'
   });
   alertPopup.then(function(res) {

   });
   $location.path( '/alarms' );
 };
})


.controller('MapCtrl', function($scope, $ionicLoading, $compile,$rootScope,$http) {


      
    //Functions 
    $scope.toRad = function(x) {
     return x * Math.PI / 180;
    }

    $scope.sortJSON = function(data, key, way) {
        return data.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        });
    }

     $scope.addMarkerWithTimeout = function(position, timeout) {
      window.setTimeout(function() {
        markers.push(new google.maps.Marker({
          position: position,
          map: map,
          animation: google.maps.Animation.DROP
        }));
      }, timeout);
    }



    $scope.clearMarkers = function() {
      setAllMap(null);
      $scope.mc.clearMarkers();
      $scope.cluster = [];
    }

    $scope.removeFirst = function(array,seperator){
        var response = array.split(seperator);
        response.shift();
        response.shift();
        response = response.join("-");
        return response;    
    }
    $scope.getBusName = function(array,seperator){
        var response = array.split(seperator);
        response.shift();
        response.shift();
       
        response = response[0];

        return response;    
    }

    // Sets the map on all markers in the array.
    function setAllMap(map) {
      for (var i = 0; i < $rootScope.markers.length; i++) {
        $rootScope.markers[i].setMap(map);
      }
    }
    

    $rootScope.nearBy = function(latP,lngP,lat,lng){
        var lat2 = latP; 
        var lon2 = lngP; 
        var lat1 = lat;
        var lon1 = lng; 

        var R = 6371; // km 
        //has a problem with the .toRad() method below.
        var x1 = lat2-lat1;
        var dLat = $scope.toRad(x1);  //x1.toRad();
        var x2 = lon2-lon1;
        var dLon = $scope.toRad(x2);//x2.toRad();  
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                        Math.cos($scope.toRad(lat1)) * Math.cos($scope.toRad(lat2)) * 
                        Math.sin(dLon/2) * Math.sin(dLon/2);  
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; 
        return d;

    }
        //Local Variables
        var myLatlng = new google.maps.LatLng(37.97647232102689, 23.748860687976048);
        var bStopIcon = './img/bstopthumb.png';
        var markerIcon = './img/bluedot_retina.png';
         var markerBusIcon = './img/bus2.png';
        var myLocIcon = new google.maps.MarkerImage(
                           markerIcon,
                            null, // size
                            null, // origin
                            new google.maps.Point( 8, 8 ), // anchor (move to center of marker)
                            new google.maps.Size( 40, 40 ) // scaled size (required for Retina display icon)
                        );
        var radius = 1000;        
        var infowindow = null; 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }; 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions); 
        navigator.geolocation.getCurrentPosition(function(pos) {
          
          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          var myLocation = new google.maps.Marker({
              position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
              map: map,
              title: "My Location",
              icon:myLocIcon,
              draggable:true,
          });

          //Run Map after we get client position
          $rootScope.init(pos.coords.latitude,pos.coords.longitude);

          //Google Map Listeners
          google.maps.event.addListener(myLocation, "dragstart", function(event) { 
    
            $scope.pointCircle.setMap(null);
            $scope.clearMarkers();
          });

          google.maps.event.addListener(myLocation, "dragend", function(event) { 
            var lat = event.latLng.lat(); 
            var lng = event.latLng.lng(); 
          
                $scope.map.setZoom(16);
            // $scope.clearMarkers();
            $rootScope.init(lat,lng);   
               $scope.map.setCenter(new google.maps.LatLng(lat,lng)); 
                                      $scope.map.panTo(new google.maps.LatLng(lat,lng));          
          });

        });
           

        $rootScope.init = function(myLat,myLng){
          //Init Variables
          $scope.map = map;
          $rootScope.nearStops = [];
          $rootScope.markers = [];
          $scope.cluster = [];
          $scope.mc; 
          $scope.busName;
          $scope.directionDisplay;
          $scope.directionsService = new google.maps.DirectionsService();
          $scope.directionsDisplay = new google.maps.DirectionsRenderer({
              map: $scope.map,
              suppressMarkers : true
          });
          $scope.line;

          $scope.directionsDisplay.setMap($scope.map);
         //  //Initialize the Path Array
         // $scope.path = new google.maps.MVCArray();
 
         //   //Initialize the Direction Service
         //   $scope.service = new google.maps.DirectionsService();
 
         //   //Set the Path Stroke Color
         //   $scope.poly = new google.maps.Polyline({ map: $scope.map, strokeColor: '#4986E7' });
          var clusterStyles;

          // var clusterStyles = [
          //   {
          //     textColor: 'white',
          //     url: './img/bus_stop.png',
          //     height: 50,
          //     width: 50,
          //     textSize:'30'
          //   },
          //  {
          //     textColor: 'white',
          //     url: './imgbus_stop.png',
          //     height: 50,
          //     width: 50,
          //     textSize:'30'
          //   },
          //  {
          //     textColor: 'white',
          //      url: './imgbus_stop.png',
          //     height: 50,
          //     width: 50,
          //     textSize:'30'
          //   }
          // ];
        $scope.mcOptions = {styles: clusterStyles,};
          var populationOptions = {
                      strokeColor: '#FF0000',
                      strokeOpacity: 0.3,
                      strokeWeight: 2,
                      fillColor: '#FF0000',
                      fillOpacity: 0.15,
                      map: $scope.map,
                      center: new google.maps.LatLng(myLat, myLng),
                      radius:radius
                    };
          $scope.pointCircle = new google.maps.Circle(populationOptions); 
          $rootScope.myLocation = {
              lat:myLat,
              lng:myLng
          };

            //Parse bus stops and filter only closests to 1 klm
            angular.forEach($rootScope.bStops, function(bStop, key) {
                var dist = $rootScope.nearBy($rootScope.myLocation.lat,$rootScope.myLocation.lng,bStop.stop_lat,bStop.stop_lon);

                if(dist <= 1){
                    //Get distance in meters
                    dist = dist*1000;
                    dist = String(dist).split(".");
                    dist = dist[0];

                    //Add distance to bus Stop
                    bStop.distance = dist*1;
                    //Add Bus stop to marker array
                    $rootScope.nearStops.push(bStop); 
                }
            }); 

            $rootScope.nearStops = $scope.sortJSON($rootScope.nearStops,'distance','123');
            window.nearstops = $rootScope.nearStops;

            angular.forEach($rootScope.nearStops, function(bStop, key) {
              
                 
            //Create Marker for each bus stop
            var point = new google.maps.LatLng(bStop.stop_lat, bStop.stop_lon); 
            var marker;
               

                    marker  = new google.maps.Marker({
                        map: $scope.map,
                        position: point,
                        icon: bStopIcon,
                        animation: google.maps.Animation.DROP,
                        distance:bStop.distance,
                        stop_code:bStop.stop_code
                    });
                   
                    
                    $scope.cluster.push(marker);

                    google.maps.event.addListener(marker, "click", function () {

                      var tempthis = this;
                      $http.get('http://altdevs.com/dev/oasa/json/getstop.php?stopid='+marker.stop_code).success(function(data, status, headers, config) {
                        
                        $scope.buses = [];
                       
                        $scope.buseshtml = '';
                          angular.forEach(data, function(row, key) {

                            $scope.buses.push($scope.getBusName(row.trip_id,"-"));
                          });

                            $scope.uniquebuses = $scope.buses.unique();

                        
                          angular.forEach($scope.uniquebuses, function(row, key) {
                             $http.get('http://altdevs.com/dev/oasa/json/getroutename.php?busname='+row).success(function(data1, status, headers, config) {
                                if(data1[0]){                            
                                 $scope.buseshtml += '<button class="busbutton" onclick="showRoute(\''+row+'\');">Λεωφορείο:<b> '+row+'</b> [ '+ data1[0].route_long_name+' ]</button>';
                                }

                               if(key == $scope.uniquebuses.length-1){
                                     if (infowindow) {
                                          infowindow.close();                        
                                      } 
                                      //showRoute();
                                      

                                      infowindow = new google.maps.InfoWindow({
                                          content: '<div id="content" class="busInfo"><h4>Όνομα Στασης: <b>'+bStop.stop_name+'</b> (<span style="color:red;">'+bStop.distance+'</span> μέτρα μακριά)</h4>'+
                                        '<p>Τοποθεσια: <b>'+bStop.stop_desc+'</b><br></p><br>'+$scope.buseshtml+'<p><img style="width:100px;"src="./img/adv.jpg"/></p></div>'
                                      });
                                      infowindow.open($scope.map, tempthis);
                                      $scope.map.setCenter(tempthis.getPosition()); 
                                      $scope.map.panTo(tempthis.getPosition());
                                      $scope.map.setZoom(18);


                                      //On infowindow Close
                                      google.maps.event.addListener(infowindow,'closeclick',function(){
                                         $scope.map.setCenter(new google.maps.LatLng($rootScope.myLocation.lat, $rootScope.myLocation.lng));
                                         $scope.map.panTo(new google.maps.LatLng($rootScope.myLocation.lat, $rootScope.myLocation.lng));
                                         $scope.map.setZoom(15);
                                      });
                               }


                            });
                          });

                      
                       
                         });
                    });
                   

               $rootScope.markers.push(marker);
             
            });
            
           
            // console.log($rootScope.markers);

            $scope.mc = new MarkerClusterer( $scope.map,$rootScope.markers,$scope.mcOptions);


        }
      window.showRoute = function(bus){
       // $scope.directionsDisplay.setMap($scope.map);
        $http.get('http://altdevs.com/dev/oasa/json/bustrip.php?busid='+bus).success(function(data, status, headers, config) {
         
  
        $scope.singleBus = [];
            angular.forEach(data, function(row, key) {
                var myLatlng = new google.maps.LatLng(row.stop_lat, row.stop_lon);
                  $scope.singleBus.push(myLatlng);
            
            });
           


        
             
       

               var waypts = [];
               $rootScope.lineCoordinates = [];
              

               var totalLength = $scope.singleBus.length-1;
           
                var step = totalLength / 7;
                step = Math.ceil(step);
               for (var i = 0; i < $scope.singleBus.length; i+=step) {

                  var busStop = $scope.singleBus[i];
                
                  // lineCoordinates.push(busStop);
                   waypts.push({
                    location:busStop,
                    stopover:true});

                  };

                  var lineSymbol = {
                   path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 5,
                    strokeColor: '#303030'
                  };

                     // var lineSymbol = './img/bus_stop.svg';
                 


                start  = $scope.singleBus[totalLength];
                end = $scope.singleBus[0];
                var request = {
                    origin: start,
                    destination: end,
                    waypoints: waypts,
                    optimizeWaypoints: true,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                $scope.directionsService.route(request, function(response, status) {
                 
                    if (status == google.maps.DirectionsStatus.OK) {
                     
                      $scope.paths = response.routes[0].legs;
                 
                        $scope.directionsDisplay.setDirections(response);
                        var route = response.routes[0];
                     
                        angular.forEach($scope.paths, function(row, key) {                         
                          angular.forEach(row.steps, function(row, key) {
                            angular.forEach(row.path, function(row, key) {
                             $rootScope.lineCoordinates.push(row);
                            });
                          });
                        });

                    
                         angular.forEach($rootScope.lineCoordinates, function(row, key) {
                          
                          $scope.map.setCenter(row); 
                          $scope.map.panTo(row);
                          $scope.map.setZoom(15);
                          
                         });
                        

                        

                 // Create the polyline and add the symbol to it via the 'icons' property.
                  $scope.line = new google.maps.Polyline({
                    path: $rootScope.lineCoordinates,
                    // icons: [{
                    //   icon: lineSymbol,
                    //   offset: '100%'
                    // }],
                    map: map
                  });
                  //animateCircle();
                        // });

                markerBus = new google.maps.Marker({
                    position: new google.maps.LatLng($rootScope.lineCoordinates[0].A, $rootScope.lineCoordinates[0].F),
                     icon: markerBusIcon,
                     eta:10,
                     myHtmlContent:'<div id="content" class="busInfo"><h4>Χρόνος Άφιξης : 10<b></div>',
                    map: $scope.map
                });
                  businfowindow = new google.maps.InfoWindow({
                                          content: '<div id="content" class="busInfo"><h4>Χρόνος Άφιξης : 10<b></div>'
                                      });
                businfowindow.setContent(markerBus.myHtmlContent);

              
                        businfowindow.open($scope.map, markerBus);
             
                var totalTime = $rootScope.lineCoordinates.length*3;
            
                for (var i = 0; i < $rootScope.lineCoordinates.length; i++) {
                   (function(i,businfowindow) {
                        setTimeout(function() { 

                          var pos = new google.maps.LatLng($rootScope.lineCoordinates[i].A, $rootScope.lineCoordinates[i].F );
                        
                        
                            markerBus.setPosition(pos);
                            
                             totalTime = (totalTime-3);

                             // totalTime = totalTime)/60/60
                              // totalTime = Math.floor(totalTime);
                              // totalTime = Math.floor((totalTime/60));
                                  
                        
                              businfowindow.setContent('<div id="content" class="busInfo"><h4>Χρόνος Άφιξης : <span style="color:red;">'+Math.floor((totalTime/60))+'</span> λεπτά<br><p>Γραμμή: <span style="color:red;">'+bus+'</span> </p></h4><p><b>Ταχύτητα: </b><span style="color:red;">30</span> χλμ/ωρα</p><p><b>Διαθέσιμες θέσεις: </b><span style="color:red;"><b>12</b>/40</span></p><p><b>Θερμορασία Λεωφορείου: </b><span style="color:red;">25</span> C</p></div>');
                        }, i * 3000);


                          // businfowindow.open($scope.map, markerBus);
                          // markerBus.eta = i;
                          //   console.log(markerBus.eta);
                          // label.bindTo('eta', markerBus, 'eta');
                          //    label.bindTo('text', markerBus, 'eta');
                        
                       
                    })(i,businfowindow);
                    

                };
                
                    }
                });

              });
        }
function animateCircle() {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1);

      var icons = $scope.line.get('icons');
      icons[0].offset = (count / 2) + '%';
       $scope.line.set('icons', icons);
      //   if(count< $rootScope.lineCoordinates.length){
      //   $scope.map.setCenter($rootScope.lineCoordinates[ Math.floor(count)]); 
      //   $scope.map.panTo($rootScope.lineCoordinates[ Math.floor(count)]);
      //   $scope.map.setZoom(16);
      // }

  }, 40);
}

 


})

.controller('PlaylistCtrl', function($scope, $stateParams, $http, $ionicLoading,$rootScope) {



    $ionicLoading.show({
        template: 'Φόρτωση δεδομένων'
    })
    $scope.loadMore = function () {
        $http.get('http://altdevs.com/dev/oasa/json/stops.json').success(function (data, status, headers, config) {
            $ionicLoading.hide()
            $scope.bStops = data;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };
    $scope.$on('$stateChangeSuccess', function () {
        $scope.loadMore();
       
    $rootScope.nearStops = window.nearstops;
  
    });
})
