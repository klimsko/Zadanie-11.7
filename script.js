$(function() {

function addScript(src){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.async = false;
  document.body.appendChild(script);
}

addScript('Column.js');
addScript('Board.js');
addScript('Card.js');
addScript('App.js');

})