var IAM_OPTIONS = ["Helpless", "Ok", "Lonely", "Happy"]
var IAM_IWANT_OPTIONS = {
  "Helpless": ["Food", "Warmth"],
  "Ok": ["Education", "Advocacy"],
  "Lonely": ["Support", "to Talk"],
  "Happy": ["Activities", "Information"]
}
var RESULTS = [
  {
    distance: "1.2 km",
    name: "Aboriginal Child Family & Community Care State Secretariat (NSW)Inc",
    keywords: ["Advocacy", "Disability"],
    description: "This is a placemarker for the descrition.",
    lat: -33.916932,
    lng: 151.1550813
  },
  {
    distance: "2.2 km",
    name: "Aboriginal Disability Network Incorporated",
    keywords: ["Information", "Disability"],
    description: "This is a placemarker for the descrition.",
    lat: -33.892373,
    lng: 151.1975543
  },
  {
    distance: "3.2 km",
    name: "Aftercare",
    keywords: ["Counselling,", "Community Network"],
    description: "This is a placemarker for the descrition.",
    lat: -33.8702774,
    lng: 151.154553
  }
]

var GOOGLE_MAPS_KEY = "?key=AIzaSyDYJnoMS16NR-wHbs5ZWywv5Tdg8TdNamA";
var GOOGLE_MAPS_CALLBACK = "&callback=initMap";
var GOOGLE_MAPS_API_URL = "https://maps.googleapis.com/maps/api/js" + GOOGLE_MAPS_KEY + GOOGLE_MAPS_CALLBACK;

window.initMap = function() {
    app.$emit('google.maps:init');
    console.log('fired message');
};
document.write(
  "<script src=\"" + GOOGLE_MAPS_API_URL
  + GOOGLE_MAPS_CALLBACK
  +"\" async defer></script>"
);

var app = new Vue({
  el: "#questionaire",
  data: {
    iam: IAM_OPTIONS,
    iwant: [],
    results: RESULTS,
    show_i_want: false,
    defining_search: true,
    map: {},
    location: {
      lng: '',
      lat: ''
    }
  },
  methods: {
    select_i_am: function(i) {
      if(this.show_i_want) {
        this.restart()
      } else {
        choice = this.iam[i];
        this.iam = [choice];
        this.iwant = IAM_IWANT_OPTIONS[choice];
        this.show_i_want = true;
      }
    },
    select_i_want: function(i) {
      choice = this.iwant[i];
      this.iwant = [choice];
      this.defining_search = false;
      this.addMarkers(RESULTS)
    },
    restart: function() {
      this.iam = IAM_OPTIONS;
      this.show_i_want = false;
      this.defining_search = true;
    },
    addMarkers: function(results) {
      results.forEach(function(result) {
        var marker = new google.maps.Marker({
          position: {
            lat: result.lat,
            lng: result.lng
          },
          map: this.map,
          label: result.name
        });

        // preparing infowindow
        var infowindow = new google.maps.InfoWindow({
          content: '<h4>' + result.name + '</h4>' +
                    '<info></info>'
        });

        // adding listener, so infowindow is opened
        marker.addListener('click', function(event) {
          infowindow.open(this.map, marker);
        });
      });
    }
  },
  events: {
    'google.maps:init': function() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: -33.8651053,
          lng: 151.2092549
        },
        zoom: 12
      });
    }
  }
});

Vue.transition('reveal', {
  afterEnter: function (el) {
    loadMap();
  }
})
