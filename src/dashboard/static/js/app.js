document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("springydemo");
    var parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var graph = new Springy.Graph();
            data = this.responseText;
            parsed_data = JSON.parse(data);
            console.log(parsed_data.node_list);
            console.log(parsed_data.connections);
            graph.addNodes(JSON.stringify(parsed_data.node_list));

            var edges = [];
            parsed_data.connections.forEach(element => {
              var edge = [];
              element.forEach(attr => {
                if (typeof(attr) == "object") {
                  console.log('its an object!!')
                  attr = JSON.stringify(attr);
                  edge.push(attr);
                } else {
                  edge.push(attr);
                }
              });
              edges.push(edge);
            });
            console.log(edges);

            graph.addEdges(edges);
            // console.log(parsed_data.connections);
            jQuery(function () {
              var springy = jQuery('#springydemo').springy({
                graph: graph
              });
            });
        }
    }
    request.open('GET', `/api/connections`, true);
    request.send();
  });
  // var graph = new Springy.Graph();
  // graph.addNodes('Dennis', 'Michael', 'Jessica', 'Timothy', 'Barbara')
  // graph.addNodes('Amphitryon', 'Alcmene', 'Iphicles', 'Heracles');
  
  // graph.addEdges(
  //   ['Dennis', 'Michael', {"color": '#00A0B0', "label": 'Foo bar'}],['Michael', 'Dennis', {"color": '#6A4A3C'}],
  //   ['Michael', 'Jessica', {
  //     "color": '#CC333F'
  //   }],
  //   ['Jessica', 'Barbara', {
  //     color: '#EB6841'
  //   }],
  //   ['Michael', 'Timothy', {
  //     "color": '#EDC951'
  //   }],
  //   ['Amphitryon', 'Alcmene', {
  //     color: '#7DBE3C'
  //   }],
  //   ['Alcmene', 'Amphitryon', {
  //     color: '#BE7D3C'
  //   }],
  //   ['Amphitryon', 'Iphicles'],
  //   ['Amphitryon', 'Heracles'],
  //   ['Barbara', 'Timothy', {
  //     color: '#6A4A3C'
  //   }]
  // );
  
  // jQuery(function () {
  //   var springy = jQuery('#springydemo').springy({
  //     graph: graph
  //   });
  // });