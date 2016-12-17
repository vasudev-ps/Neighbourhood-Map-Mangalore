var marker = [];
var wikisuccess = "Some useful Wikipedia Links about the place.";
var wikilocal = "Some useful Wikipedia Links about Mangalore.";
var wikifail = "Failed to get Wiki Resources.";
var viewModel = {
        WikiName: ko.observableArray(),
        WikiLinks: ko.observableArray(),
        markerList:ko.observableArray(),
        wikiPara:ko.observable(),
        toggleNav: function(){
            document.getElementById("Nav").classList.toggle("open");
            marker = markerName.slice(),
            viewModel.markerList(marker);
        },
        //Toggle the nav when clicked on map
        mapNav : function(){
            if ($("#Nav").hasClass("open")) {
                document.getElementById("Nav").classList.toggle("open");
            }
        },
        //handles click of marker list
        listClick : function(data, event) {
            var name = event.target.innerHTML;
            var id;//get the id of marker
            for(var i=0;i<10;i++){
                if (name === markerName[i]){
                    id = i;break;
                }
            }
            viewModel.addItem(name);
            viewModel.showInfo(id);
            },
            //add wikipedia links to the nav bar
        addItem : function(address) {
            var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + address + "&format=json&callback=wikiCallback";
            console.log(wikiUrl);
            var wikiTimeout = setTimeout(function() {
                viewModel.wikiPara(wikifail);
            }, 8000);
            $.ajax(wikiUrl, {
                dataType: 'jsonp',
                success: function(data) {
                    viewModel.asignWikilinks(data);
                    clearTimeout(wikiTimeout);
                }
            });
        },
        asignWikilinks : function(data){
            //check if data is present about  the search.
            //else give useful data about mangalore
            if(data[1].length === 0){
                viewModel.wikiPara(wikilocal);
                viewModel.addItem(placeName);
            }
            else{
                viewModel.wikiPara(wikisuccess);
                viewModel.WikiName(data[1]);
                viewModel.WikiLinks(data[3]);
            }
        },
        showInfo:function(id){
            showInfoWindow(id);
        },
        query:ko.observable(''),

        search: function(value) {
            // remove all the current markerList, which removes them from the view
            //reffered below site
            //http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
            viewModel.markerList.removeAll();
            for(var x in markerName) {
              if(markerName[x].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                viewModel.markerList.push(markerName[x]);
                //set the visibility of mached marker to true
                placeMarkers[x].setVisible(true);
              }
              else{
                //unmached markers visibility false
                //cannot use setmap(null). looses all data of map
                    placeMarkers[x].setVisible(false);
              }
            }
          }
};
//for filtering input from user using subscribe
    viewModel.query.subscribe(viewModel.search);
    ko.applyBindings(viewModel);
