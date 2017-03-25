var board = {
    name: 'Tablica Kanban',
    createColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
};

function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder',
      receive: function( event, ui ) {
        var cardId = $(ui.item).find('.card-description').attr('data');
        var columnId = $(this).closest('.column.panel.panel-default').attr('data');

        // console.log(cardId, columnId);

        $.ajax({
          url: baseUrl + '/card/' + cardId,
          method: 'PUT',
          data: {
            id: cardId,
            bootcamp_kanban_column_id: columnId
          },
          success: function(){
            
          }
        });
      }
    }).disableSelection();
  
    $('.column-container').sortable().disableSelection();
  }


$('.create-column')
  .click(function() {
    var columnName = prompt('Wpisz nazwę kolumny');
    $.ajax({
      url: baseUrl + '/column',
      method: 'POST',
      data: {
        name: columnName
      },
      success: function(response){
        var column = new Column(response.id, columnName);
        board.createColumn(column);
      }
    });
  });