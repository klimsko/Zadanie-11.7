function Card(id, name, columnId) {
  var self = this;

this.id = id;
this.name = name || 'Nie podano nazwy';
this.columnId = columnId;
this.$element = createCard();


function createCard() {
  var $card = $('<li>').addClass('card');
  var $cardDescription = $('<p>').addClass('card-description').text(self.name+" self.id = "+self.id+" self.columnId = "+self.columnId).attr('data', self.id);
  var $cardDelete = $('<button>').addClass('btn-delete btn btn-warning').text('x');

  $cardDelete.click(function(){
          self.removeCard();
  });

  // $card.click(function(){
  //         self.moveCard();
  // });

  $card.append($cardDelete)
    .append($cardDescription);
  return $card;
}

    // self.moveCard();



}

Card.prototype = {
  removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      success: function(){
        self.$element.remove();
      }
    });
  },
  moveCard: function(event) {
//     var self = this;
//     $.ajax({
//     url: baseUrl + '/board',
//     method: 'GET',
//     success: function(response) {
//       console.log(response.columnId);
//     }
// });

    
  }
}