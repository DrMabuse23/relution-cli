//var blessed = require('blessed')
//  , contrib = require('blessed-contrib')
//  , screen = blessed.screen();
//
//var grid = new contrib.grid({rows: 12, cols: 12, screen: screen});
//var tree = grid.set(0, 4, 4, 4, contrib.tree, {label: 'Commands'});
//
////allow control the table with the keyboard
//tree.focus();
//var log = grid.set(0, 8, 4, 4, contrib.log,
//  {
//    label: 'Server Log'
//  });
//
//log.log("new log line")
//tree.on('select', function (node) {
//  let keys = Object.keys(node)
//  keys.forEach((key) => {
//    log.log(key);
//  });
//
//  //if (node.myCustomProperty){
//  //  log.log(node.myCustomProperty);
//  //}
//
//  //console.log(node);
//});
//
//// you can specify a name property at root level to display root
//tree.setData(
//  {
//    name: 'Commands',
//    extended: false,
//    children: {
//      'Server': {
//        name:'server1',
//        children: {
//          'serveradd': {
//            'name': 'add'
//          },
//          'serveremove': {
//            'name':'remove'
//          }
//        }
//      },
//      'Server2': {
//        children: {
//          'serveradd2': {
//            'name': 'add'
//          },
//          'remove2': {
//            'name':'remove'
//          }
//        }
//      }
//    }
//
//  })
//
//screen.key(['escape', 'q', 'C-c'], function (ch, key) {
//  return process.exit(0);
//});
//
//
//screen.render();
var readline = require('readline'),
  rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('relution> ');
rl.prompt();

rl.on('line', function(line) {
  switch(line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    default:
      console.log('Say what? I might have heard `' + line.trim() + '`');
      break;
  }
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});
