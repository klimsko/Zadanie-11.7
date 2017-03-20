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
      placeholder: 'card-placeholder'
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