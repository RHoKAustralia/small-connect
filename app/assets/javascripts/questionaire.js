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
    description: "Provides free advocacy and disability support.",
    location: {
      lat: -33.916932,
      lng: 151.1550813
    }
  },
  {
    distance: "1.3 km",
    name: "Aboriginal Disability Network Incorporated",
    keywords: ["Information", "Disability"],
    description: "Provides information and disability support.",
    location: {
      lat: -33.892373,
      lng: 151.1975543
    }
  },
  {
    distance: "4.5 km",
    name: "Aftercare",
    keywords: ["Counselling,", "Community Network"],
    description: "Free councelling services for young people in the community.",
    location: {
      lat: -33.8702774,
      lng: 151.154553
    }
  }
]

var GOOGLE_MAPS_KEY = "?key=AIzaSyDYJnoMS16NR-wHbs5ZWywv5Tdg8TdNamA";
var GOOGLE_MAPS_API_URL = "https://maps.googleapis.com/maps/api/js" + GOOGLE_MAPS_KEY;

document.write(
  "<script src=\"" + GOOGLE_MAPS_API_URL + "\" async defer></script>"
);

var app = new Vue({
  el: "#questionaire",
  data: {
    iam: IAM_OPTIONS,
    iwant: [],
    results: RESULTS,
    show_i_want: false,
    defining_search: true,
    map: false,
    location: {
      lat: -33.8651053,
      lng: 151.2092549
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
      this.addResults(RESULTS)
    },
    restart: function() {
      this.iam = IAM_OPTIONS;
      this.show_i_want = false;
      this.defining_search = true;
    },
    addResults: function(results) {
      this.results = results;
      map = this.loadMap();
      results.forEach(function(result) {
        var marker = new google.maps.Marker({
          position: result.location,
          map: this.map,
          label: result.name
        });

        var infowindow = new google.maps.InfoWindow({
          content: '<h4>' + result.name + '</h4>' +
                  '<info>' + result.description + '</info>'
        });

        marker.addListener('click', function(event) {
          infowindow.open(this.map, marker);
        });
      });
    },
    loadMap: function() {
      if(!this.map) {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: this.location,
          zoom: 12
        });
      }
      return this.map;
    },
    panToMarker: function(i) {
      var map = this.loadMap();
      var result = this.results[i];

      map.panTo(result.location);
    }
  }
});

Vue.transition('reveal', {
  afterEnter: function (el) {
    loadMap();
  }
})
