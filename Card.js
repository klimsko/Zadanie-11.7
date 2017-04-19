function Card(id, name, columnId) {
  var self = this;

  this.id = id;
  this.name = name || 'Description is not declared';
  this.columnId = columnId;
  this.$element = createCard();


  function createCard() {
    var $card = $('<li>').addClass('card');
    var $cardDescription = $('<p>').addClass('card-description').text(self.name).attr('data', self.id);
    var $cardEditNotice = $('<div>').addClass('card-edit').text('DoubleClick to edit');
    var $cardDelete = $('<button>').addClass('btn-delete btn btn-warning').text('x');
    var $cardOk = $('<span aria-hidden="true">').addClass('glyphicon glyphicon-ok');

    $cardDelete.click(function(){
            self.removeCard();
    });



    $card.dblclick(function() {
      disableSortable();
      $cardOk.show();
      $cardDescription.attr('contenteditable', 'true');
      $cardOk.click(function(){
        $cardDescription.attr('contenteditable', 'false');
        addSortable();
        var description = $cardDescription.text();
        self.renameCardDescription(description);
      });
      
    });

    $card.append($cardDelete)
      .append($cardDescription)
      .append($cardOk)
      .append($cardEditNotice);
    return $card;

  }
 
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
  renameCardDescription: function(val) {
    var self = this;
    var currentColumnId = self.$element.closest('.column.panel.panel-default').attr('data');
    $.ajax({
          url: baseUrl + '/card/' + self.id,
          method: 'PUT',
          data: {
            id: self.id,
            name: val,
            bootcamp_kanban_column_id: currentColumnId
          },
          success: function(){
            self.$element.find('.glyphicon').hide();
          }
    });
  }
}
