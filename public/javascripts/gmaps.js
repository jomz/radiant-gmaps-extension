//<![CDATA[
function gmap(div_id,name,lat,len,straat,postcode,land,extra_cloud_stuff,lang){
	if(!lang){var lang = 'nl';}
	var nl_strings = new Array();
	nl_strings['directions'] = "Wegbeschrijving";
	nl_strings['tohere'] = "Naar hier";
	nl_strings['fromhere'] = "Vanaf hier";
	nl_strings['startpoint'] = "Startpunt";
	nl_strings['endpoint'] = "Eindpunt";
	nl_strings['example_address'] = "Bv. Kwatrechtsteenweg 150 Wetteren";
	nl_strings['calculate'] = "Berekenen";
	
	var fr_strings = new Array();
	fr_strings['directions'] = "Description d'itinéraire";
	fr_strings['tohere'] = "Vers ici";
	fr_strings['fromhere'] = "À partir ici";
	fr_strings['startpoint'] = "Point de départ";
	fr_strings['endpoint'] = "Terminus";
	fr_strings['example_address'] = "P.ex.. Kwatrechtsteenweg 150 Wetteren";
	fr_strings['calculate'] = "Calculer";
	
	var en_strings = new Array();
	en_strings['directions'] = "Directions";
	en_strings['tohere'] = "To here";
	en_strings['fromhere'] = "From here";
	en_strings['startpoint'] = "Starting point";
	en_strings['endpoint'] = "End point";
	en_strings['example_address'] = "Eg. Kwatrechtsteenweg 150 Wetteren";
	en_strings['calculate'] = "Calculate";
	
	eval("strings = " + lang + "_strings");
	
	gicons = [];
	gmarkers = [];
	htmls = [];
	to_htmls = [];
	from_htmls = [];
	i=0;
	adress = straat + "," + postcode + "," + land
	cloud_stuff = "<h2>" + name + "</h2>" + 
	'<p>' + straat + '<br />' +
	postcode + '<br />' +
	land + '<br />' +
	extra_cloud_stuff + '</p>'
	
	if (GBrowserIsCompatible()) {	
	  // Display the map, with some controls and set the initial location 
	  var map = new GMap2(document.getElementById(div_id));
	  map.addControl(new GLargeMapControl());
	  map.addControl(new GMapTypeControl());
	  map.setCenter(new GLatLng(lat,len), 10);
	  // Set up markers with info windows
	  var point = new GLatLng(lat,len);
	  var marker = createMarker(map, point, name, adress, cloud_stuff);
	}
		// display a warning if the browser was not compatible
	else {
	  alert("Sorry, the Google Maps API is not compatible with this browser");
	}
}
// A function to create the marker and set up the event window
function createMarker(map, point,name,adres,html) {
  var marker = new GMarker(point);

  // The info window version with the "Naar hier" form open
  to_htmls[i] = html + '<br>'+strings.directions+': <b>'+strings.tohere+'<\/b> - <a href="javascript:fromhere(' + i + ')">'+strings.fromhere+'<\/a>' +
     '<br>'+strings.startpoint+':<form action="http:\/\/maps.google.com\/maps" method="get" target="_blank">' +
     '<input type="text" size="35" maxlength="40" name="saddr" id="saddr" value="" \/><br \/>' +
		 '<span class=\"notice\">'+strings.example_address+'</span><br \/>' +
		 '<input value="'+strings.calculate+'" type="submit" \/>' +
     '<input type="hidden" name="daddr" value="' + adres + '" \/>';
  // The info window version with the "from here" form open
  from_htmls[i] = html + '<br \/>'+strings.directions+': <a href="javascript:tohere(' + i + ')">'+strings.tohere+'<\/a> - <b>'+strings.fromhere+'<\/b>' +
     '<br>'+strings.endpoint+':<form action="http:\/\/maps.google.com\/maps" method="get"" target="_blank">' +
     '<input type="text" size="35" maxlength="40" name="daddr" id="daddr" value="" \/><br \/>' +
		 '<span class=\"notice\">'+strings.example_address+'</span><br \/>' +
     '<input value="'+strings.calculate+'" type="submit" \/>' +
     '<input type="hidden" name="saddr" value="' + adres + '" \/>';
  // The inactive version of the direction info
  html = html + '<br \/>'+strings.directions+': <a href="javascript:tohere('+i+')">'+strings.tohere+'<\/a> - <a href="javascript:fromhere('+i+')">'+strings.fromhere+'<\/a>';

  GEvent.addListener(marker, "click", function() {
    marker.openInfoWindowHtml(html);
  });

  gmarkers[i] = marker;
  htmls[i] = html;
  i++;
  //return marker;
	map.addOverlay(marker);
	marker.openInfoWindowHtml(html);
}

// functions that open the directions forms
function tohere(i) {
  gmarkers[i].openInfoWindowHtml(to_htmls[i]);
}
function fromhere(i) {
  gmarkers[i].openInfoWindowHtml(from_htmls[i]);
}
//]]>