# Neighbourhood-Map
Neighbourhood-Map is a project where interesting places near Mangalore is shown.

###File Structure
* css
  * `style.css` - Takes care of the web-page style.
* js
  * `app.js` - Works with `knockout.js` for wikipedia lists.
  * `map.js` - Works with Google Maps API for map related things.
* `index.html` - Main page

###Manual
Download the repo and open `index.html` to check the live version: [Click Here](https://vasudev-ps.github.io/Neighbourhood-Map-Mangalore/)
User will first see their many location on the map which are interesting places near Mangalore fetched by google.

For more options user should click on the **hamburger menu on the top left side** of application.

Wikipedia links about the clicked location will be fetched if available otherwise links about mangalore city will be fetched.

The Markers will apear on the map **which can be filtered** on basis of name.

Every time the user filters the marker List of marker will be updated.

###How does it work?

Project Uses 

* API: Google maps and Wikipedia.

* javascript libraries: jQuery and Knockout.

* Project uses google places library to search the point of interest places around mangalore. which will be binded to navigation menu using knockout.

* Depending upon the clicking of marker list Wikipedia API returns the result of related wiki links, which will be automatically binded to DOM using  knockout JS.

* On clicked on the marker the details of the places will be displayed in infowindow.

* Marker list can be filtered based on name which will also filters the markers on the map.
