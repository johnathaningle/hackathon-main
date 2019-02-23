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
            var node_list={};
            console.log(parsed_data.node_list);
            parsed_data.node_list.forEach(name => {
              let node = graph.newNode({label: name});
              node_list.name = node;
            });
            
            parsed_data.connections.forEach(relationship => {
              var node1;
              var node2;
              let name1 = relationship[0];
              let name2 = relationship[1];
              if (Object.values(node_list).indexOf(name1) < 0) {
                node1 = graph.newNode({label: name1});
                node_list[name1] = node1;
              } else {
                node1 = Object.values(node_list).indexOf(name1); 
              }
              if (Object.values(node_list).indexOf(name2) < 0) {
                node2 = graph.newNode({label: name2});
                node_list[name2] = node2;
              } else {
                node2 = Object.values(node_list).indexOf(name2); 
              }
              graph.newEdge(node1, node2);
              
            });
            console.log(node_list);
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
// var edges = [
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

// ];
// graph.addEdges(edges);

// jQuery(function () {
//   var springy = jQuery('#springydemo').springy({
//     graph: graph
//   });
// });

var graph = new Springy.Graph();
// var names = ['Dennis', 'Michael', 'Jessica', 'Timothy', 'Barbara'];
// graph.addNodes()
// graph.addNodes('Amphitryon', 'Alcmene', 'Iphicles', 'Heracles');

// graph.addEdges(['Dennis', 'Michael', {
//     "color": '#00A0B0',
//     "label": 'Foo bar'
//   }], ['Michael', 'Dennis', {
//     "color": '#6A4A3C'
//   }],
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
//   color: '#6A4A3C'
//   }]);

jQuery(function () {
  var springy = jQuery('#springydemo').springy({
    graph: graph
  });
});