// content.js
  token = "eb8bf080ab48519636920ff20fc6cf25";
  var $;
  let rating, restaurantName;

  function getCityId(city) {

      const cityLowerCase = city.toLowerCase();
      const cityId = city_map[cityLowerCase];
      console.log(cityId);
      return cityId;
  }


  let city_map = 
  {
    "ahmedabad":11,
    "bangalore":4,
    "chandigarh":12,
    "chennai":7,
    "coimbatore":30,
    "delhi":1,
    "gurgaon":1,
    "hyderabad":6,
    "jaipur":10,
    "kochi":9,
    "kolkata":2,
    "mumbai":3,
    "pune":5
  }

  function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }


  (function() {
      // Load the script
      var script = document.createElement("SCRIPT");
      script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
      script.type = 'text/javascript';
      script.onload = function() {
          $ = window.jQuery;
          // Use $ here...
          let url = location.href;
          document.body.addEventListener('click', ()=>{
          requestAnimationFrame(()=>{
            if(url!==location.href) {
              console.log('url changed'); 
              url = location.href;  
              if (document.getElementById("menu-restaurant-collection")) {
                  main();
              }
              else if( document.getElementById('all_restaurants')) {
                  console.log("Restaurant listing page ");
                  main();
              }
            }
          });
        }, true); 

          main();
      };
      document.getElementsByTagName("head")[0].appendChild(script);

  })();


  function main() {
    
      
    setTimeout(function(){
        if (document.getElementById("menu-restaurant-collection")) {
          restaurantName = document.querySelectorAll('h1')[0].innerHTML;
        //const rating = 4.0;
          const cityName = window.location.pathname.split('/')[1];
          const localityName = document.querySelectorAll('a')[5].children[0].innerHTML;
          console.log('data that we found '+restaurantName+'('+cityName+":"+localityName+")");
          console.log('-> ' + find_restaurant(restaurantName, localityName, cityName));  
         } else if (document.getElementById("all_restaurants")) {
            console.log("Restaurant listing page ");
        }         
    }, 1000)  
    console.log("Restaurant detail page ");
  }


  function filterRestaurant(restaurantList, name, location) {
      console.log(restaurantList);
      let data = [];
      let output = [];
      filteredRestaurantByName = restaurantList.filter(function(d) {
         let candName, similarQuotient;
         candName = d.restaurant.name;
         similarQuotient = similarity(candName, name);
         similarQuotient = parseInt(similarQuotient * 1000);
         d.score = similarQuotient;
         console.log(d.restaurant.name + "("+d.restaurant.location.locality+ " ) RN% ->"+similarQuotient)
         // console.log( candName + ' ----->' + similarQuotient);
         // return similarQuotient > 300;
         return true;
      });

      output = filteredRestaurantByName.filter(function(element) {
        let candLocality, similarQuotient; 
        candLocality = element.restaurant.location.locality;
        similarQuotient = similarity(candLocality, location);
        console.log(element.restaurant.name + "("+element.restaurant.location.locality+ " ) L% ->"+similarQuotient)
        similarQuotient = parseInt(similarQuotient * 100);
        element.score += similarQuotient;
        // console.log( candLocality + '------> ' + similarQuotient);
        return element.score > 320;
        // return similarQuotient > 20;
      })

      return output;

  }


  function find_restaurant(name, locality, city) {
    const cityId = getCityId(city); 

    const encodedName = encodeURIComponent(name);
    const sanitizedName = encodedName.replace('\'','');
    
    const nextUrl = 'https://developers.zomato.com/api/v2.1/search?entity_type=city&entity_id=${cityId}&q=${sanitizedName}';
    console.log(nextUrl);
    $.ajax({
      url: nextUrl,
      headers: { 
          Accept : "text/plain; charset=utf-8",
          "Content-Type": "application/json charset=utf-8",
          "user-key": "user_key"
      },
      type: 'GET',
      contentType: "application/json",
      success: function(data) {
        //window.temp1 = data.restaurants;
        //console.log(data.restaurants);
        result = filterRestaurant(data.restaurants, name, locality)  
        let final_output;
        let scoreMax = 0;
        if (result.length > 0) {
        result.forEach(function (d) {
          console.log(d.restaurant.name + " -- "+d.restaurant.location.locality+ " -- "+d.score)
          if(d.score > scoreMax) {
              scoreMax = d.score;
              final_output = d;
          }
        })
        rating = final_output.restaurant.user_rating.aggregate_rating;      
        rating_html = "<a target='_blank' style='color:white' href="+final_output.restaurant.url+">"+ rating +"</a>"

        zomato_html = "<a target='_blank' style='color:white' href="+final_output.restaurant.url+">Zomato Rating </a>"
        red_background_html = '<div style="background-color:#d53d4c;color:#ffffff" class="_1CKuC _3y8su">'+zomato_html+'<span style="border-color:#d53d4c transparent #d53d4c transparent" class="_3ccBN"></span></div>'

          //if (result.length > 1) { 
        //document.querySelectorAll('h1')[0].innerHTML = restaurantName + '  |  ' + rating_html + '☆';
        zomato_rating_html = '<div class="_2iUp9 _2GxGP" style = "border-left:1px solid hsla(0,0%,100%,.2);margin-left:20px" ><div class="_2l3H5"><span class="icon-star _2n5YQ"></span><span>' + rating_html + '</span></div><div class="_1De48">'+red_background_html+'</div></div>'
        document.getElementsByTagName('div')[29].innerHTML += zomato_rating_html;
          //}
        }
        else {
          console.log('Sorry restaurant not found on zomato')
        }

      },
      error: function(data, errorThrown) {
        console.log(data);
      }
    });

    return name;
  }


  function httpGet(theUrl)
  {
      var xhr = new XMLHttpRequest();
      xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
      xmlHttp.send( null );
      return xmlHttp.responseText;
  }
