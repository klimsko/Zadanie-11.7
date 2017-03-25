function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name || 'Nie podano nazwy';
    this.$element = createColumn();

    function createColumn() {
      var $columnContainer = $('<div>').addClass('col-lg-4 col-md-4 col-sm-6 col-xs-12');
      var $column = $('<div>').addClass('column panel panel-default').attr('data', self.id);
      var $columnHeading = $('<div>').addClass('panel-heading');
      var $columnTitle = $('<h2>').addClass('panel-title').text(self.name+" self.id = "+self.id);
      var $columnTitleChange = $('<div>').attr('id', 'title_cotainer_change').append('<input type="text" id="title_val"> <button id="save_title">Save</button> </div>');
      var $columnBody = $('<div>').addClass('panel-body');
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete btn btn-warning').text('x');
      var $columnAddCard = $('<button>').addClass('add-card btn btn-info').text('Dodaj kartę');
      
      $columnDelete.click(function() {
              self.removeColumn();
      });

      // Zmiana nazwy kolumny
      $columnTitle.click(function(){
        self.$element.find('#title_cotainer_change').show();
                
        self.$element.find('#save_title').click(function(){
          var name = $('#title_val').val();
          console.log(name);
            self.changeTitleName(name);
        });
        
        
      });




      // Dodawanie karteczki po kliknięciu w przycisk:
      $columnAddCard.click(function(event) {
        var cardName = prompt('Wpisz nazwę karty');
        event.preventDefault();

        $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                  name: cardName,
                  bootcamp_kanban_column_id: self.id
                },
                success: function(response) {
                  var card = new Card(response.id, cardName, self.id);
                  self.createCard(card);
                }
        });

      });

      $columnContainer.append($column);
      $column.append($columnHeading)
        .append($columnBody);
      $columnHeading.append($columnTitle)
        .append($columnTitleChange)
        .append($columnDelete);
      $columnBody.append($columnAddCard)
        .append($columnCardList);
      return $columnContainer;
    }
  }

Column.prototype = {
    createCard: function(card) {
      this.$element.children('.column').children('.panel-body').children('ul').append(card.$element);
    },
    removeColumn: function() {
      var self = this;
      $.ajax({
        url: baseUrl + '/column/' + self.id,
        method: 'DELETE',
        success: function(response){
          self.$element.remove();
        }
      });
    },

    changeTitleName: function(value) {
      //var title = prompt('Enter new title name');
      var self = this;
      $('#title_cotainer_change').remove();
      $.ajax({
        url: baseUrl + '/column/' + self.id,
        method: 'PUT',
        data: {
          id: self.id,
          name: value
        },
        success: function(response){

          self.$element.find('.panel-title').text(value);
          
        }
      });
    }

};