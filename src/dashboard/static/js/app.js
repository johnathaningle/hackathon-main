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
            var main_node;
            console.log(parsed_data.node_list);
            for (let i = 0; i < parsed_data.node_list.length; i++) {
              if (i ==0) {
                username = parsed_data.node_list[i];
                main_node = graph.newNode({label: username});
              }
            }
            
            parsed_data.connections.forEach(relationship => {
              var node2;
              let name2 = relationship[1];
              if (Object.values(node_list).indexOf(name2) < 0) {
                node2 = graph.newNode({label: name2});
                node_list[name2] = node2;
              } else {
                node2 = Object.values(node_list).indexOf(name2); 
              }
              graph.newEdge(main_node, node2);
              
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