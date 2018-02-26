class DataTable {

  constructor (json) {
    this.initFromJson(json);
    this.menu_col = 0;
    this.first = 0; // deprecated
    this.col_nb = undefined;
    this.row_nb = undefined;
    this._dataColumns = undefined;
    this._data = undefined;
    this.show = 0;
    this.select_del = undefined;
    this.old_label = undefined;
    this.add_New_Name = undefined;
    this.add_is_change = 0;
    this.poi_id = undefined;
    this.nb_row = 0;
    this.upload = 0;
    this.upload_token = undefined;
    this.onUp = 0;
    this.saveTemplet = {};
    this.widget_templet_loaded = 0;
    this.is_edit = 0;
    this.data_save = []
    this.is_html = 0;
  }

  initFromJson(json) {
    this.id = json.map_id;
  }

  nbChar(chaine,lettre) {
  var nb = 0;
  chaine = chaine.split("");
  for(var i in chaine)
    nb += chaine[i] == lettre;
  return nb;
}

  is_number(chaine) {
    for(var i in chaine)
    {
      if("0123456789".indexOf(chaine[i]) == -1)
        return(-1)
    }
    return 0;
  }

  is_number(chaine) {
    for(var i in chaine)
    {
      if("0123456789".indexOf(chaine[i]) == -1)
        return(-1)
    }
    return 0;
  }

  valid_cell(content, usage, type) {
    var t = this
    if(content == undefined)
    {
      content = $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] div span').text()
      usage = $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').attr('usage')
      type = $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').attr('type')
    }
    var erreur = 0
    if(content == '')
    {
      $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').css('background-color', '')
      return 0
    }
    content = content.trim().toLowerCase()
    if(usage == 10 || usage == 11)
    {
      if(t.nbChar(content, '.') != 2 && t.nbChar(content, ',') != 1)
        erreur = 1;
      var tab = content.split(',')
      if(usage == 10 && (parseFloat(tab[0]) > 180 ||  parseFloat(tab[0]) < -180 || parseFloat(tab[1]) > 90 ||  parseFloat(tab[1]) < -90))
        erreur = 1
      if(usage == 11 && (parseFloat(tab[1]) > 180 ||  parseFloat(tab[1]) < -180 || parseFloat(tab[0]) > 90 ||  parseFloat(tab[0]) < -90))
        erreur = 1
      content = content.replace(/\.|\,/g,'');
      if(t.is_number(content) == -1)
        erreur = 1
    }
    if(usage == 6 || usage == 7)
    {
      if(usage == 6 && (parseFloat(content) > 180 ||  parseFloat(content) < -180))
        erreur = 1
      if(usage == 7 && (parseFloat(content) > 90 ||  parseFloat(content) < -90))
        erreur = 1
      if(t.nbChar(content, '.') != 1)
        erreur = 1;
      content = content.replace(/\./g,'');
      if(t.is_number(content) == -1)
        erreur = 1
    }
    if(type == 1)
    {
      if(is_number(content) == -1)
        erreur = 1;
    }
    if(type == 8)
    {
      if ("abcdefghijklmnopqrstuvwxyz".indexOf(content[0]) == -1)
        erreur = 1
      var tab = content.split(' ')
      for (var i in tab)
      {
        if ("abcdefghijklmnopqrstuvwxyz".indexOf(tab[i][0]) != -1)
        {
          var format = tab[i].split('-')
          if(format.length != 1 && format.length != 2)
            erreur = 1
          if(format[0][format[0].length - 1] == ':')
            format[0] = format[0].substr(0, format[0].length - 1) 
          if(format[0] != 'mo' && format[0] != 'tu' && format[0] != 'we' && format[0] != 'th' && format[0] != 'fr' && format[0] != 'sa' && format[0] != 'su')
            erreur = 1
          if(format[1] != undefined)
          {
            if(format[1][format[1].length - 1] == ':')
              format[1] = format[1].substr(0, format[1].length - 1) 
            if(format[1] != 'mo' && format[1] != 'tu' && format[1] != 'we' && format[1] != 'th' && format[1] != 'fr' && format[1] != 'sa' && format[1] != 'su')
              erreur = 1
          }
        }
        else if("0123456789".indexOf(tab[i][0]) != -1 && (tab[i].length == 12 || tab[i].length == 11))
        {
          var test = 0
          test += "0123456789".indexOf(tab[i][1]) == -1
          test += ":".indexOf(tab[i][2]) == -1
          test += "0123456789".indexOf(tab[i][3]) == -1
          test += "0123456789".indexOf(tab[i][4]) == -1
          test += "-".indexOf(tab[i][5]) == -1
          test += "0123456789".indexOf(tab[i][6]) == -1
          test += "0123456789".indexOf(tab[i][7]) == -1
          test += ":".indexOf(tab[i][8]) == -1
          test += "0123456789".indexOf(tab[i][9]) == -1
          test += "0123456789".indexOf(tab[i][10]) == -1
          if(tab[i][11])
            test += ",".indexOf(tab[i][11]) == -1
          
          if(test == 1)
            erreur = 1
        }
        else
          erreur = 1
      }
    }

    if(type == 4)
    {
      if(content.substr(0, 8) != "https://" && content.substr(0, 7) != "http://" && content.substr(0, 18) != '<img src="https://' && content.substr(0, 17) != '<img src="http://')
        erreur = 1
    }
    if(erreur == 1)
    {
      $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').css('background-color', '#f27d7d')
      $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] .div_after').show()
    }
    else
    {
      $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').css('background-color', '')
      $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] .div_after').hide()
    }
    return erreur
  }
  

stringToAttr(str) {
  str = str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "_");
  return str;
}

  editCell() {
    var t = this;

    $('.td-tab span').dblclick(function() {
      var col = $(this).parent().attr('col-nb');
      t.col_nb = col;
      t.row_nb = $(this).parent().attr('row');
      var col = $('[col-nb='+col+'][row=-1]').children('select').val();
        var row = $(this).parent().attr('row')
        $(this).parent().attr('contenteditable', 'true');
        $(this).parent().focus();
        $('[row='+ row +']').css('overflow-x', 'visible');
        $('[row='+ row +']').css('white-space', 'normal');
      })

      $('.td-tab').focusout(function() {
        var col = $(this).attr('col-nb');
        var col = $('[col-nb='+col+'][row=-1]').children('select').val();
        if(col == '0-4')
        {
          var text = $(this).children('input').val()
          var paren =  $(this).children('span').show().text(text);
          $(this).children('input').remove()
          return;
        }
          var row = $(this).attr('row')
          $(this).attr('contenteditable', 'false');
          $('[row='+ row +']').css('overflow-x', 'hidden');
          $('[row='+ row +']').css('white-space', 'nowrap');
      })
      $('span').click(function() {
          t.old_label = $(this).text();
      })
    }


  resize_text() {
     var t = this;
    var is_clic = 0;
      var pos_y = -1;
      var first = 1

      $('.deploy_div').mousedown(function(event) {
        $('.table-1').disableSelection();
        is_clic = 1;
        if(first == 1)
          pos_y = parseInt($('.deploy_div').css('top'));
        first = 0;
        console.log(event)
      });

      $(window).mousemove(function(event) {
        if(is_clic == 0) return ;
        var pos = parseInt($('.editor-cel-div-spancell').css('min-height')) -33
        var here = event.clientY - 123 - pos_y;
        var deplace = (pos + here)
        $('.editor-cel-div-spancell').css('min-height', deplace + +33)
        $('.editor-cel-div-spancell').css('max-height', deplace + +33)
        pos_y = deplace
      })

      $(window).on('mouseup', function() {
        is_clic = 0;
        $('.table-1').enableSelection()
      });

      $('.editor-cel-fx').click(function () {
        if($(this).attr('data-commande') == 'poi')
        {
          t.cherche_on_map = 1;
          $('.panels-container').hide();
        }
        else if($(this).attr('data-commande') == 'code')
        {
          $('.editor-cel-div-spancell').empty()
          t.is_html == 0 ? t.is_html = 1 : t.is_html = 0;

          if(t.is_html)
            $('.editor-cel-div-spancell').text($('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] div span').html())
          else
            $('.editor-cel-div-spancell').append($('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] div span').html())
          return
        }
        else if($(this).attr('data-commande') == 'createlink')
        {
          var url = prompt('Enter the link here: ', 'http:\/\/');
          document.execCommand($(this).attr('data-commande'), false, url);
        }
        else {document.execCommand($(this).attr('data-commande'), false, null);}
        $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').children('div').children('span').empty()
        $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').children('div').children('span').html($('.editor-cel-div-spancell').html())
      })
  }

   resizeCol() {
    var t = this;
    var is_clic = 0;
      var pos_x = -1;
      var col = undefined;
      var $parent = undefined;
      $('.table-picture').change(function() {
        console.log('ok')
      })
      $('.handle-table').mousedown(function(event) {
        is_clic = 1;
        pos_x = event.clientX;
        col = $(this).parent().parent().attr('col-nb')
        $parent = $(this).parent()
        $('.table-1').disableSelection();
      });

      $('.handle-table2').mousedown(function(event) {
        var row = $(this).parent().parent().attr('row')
        is_clic = 1;
        pos_x = event.clientX - 15;
        col = $(this).parent().parent().attr('col-nb')
        col = parseInt(col) - 1
        var $lui = $('.table-2 [col-nb=' + col +'][row=' + row +']');
        col = $lui.attr('col-nb')
        $parent = $lui
        $('.table-1').disableSelection();
      });

      $('.handle-table .handle-table2').dblclick(function () {
        var col = $(this).parent().parent().attr('col-nb')
        $('[col-nb='+ col +']').css('max-width', '')
        $('[col-nb='+ col +']').css('min-width', '')
      })
      $('.table-2, .table-1').on('mouseup', function() {
        is_clic = 0;
        pos_x = -1;
        col = undefined;
        $('.table-1').enableSelection()
      });
      $('.table-1, .table-2').mousemove(function(event) {
        if(is_clic == 0) return ;
        var pos = parseInt($parent.css('width'))
        var here = event.clientX - pos_x;
        var deplace = pos + here

        if(deplace < 20)
            deplace = 20;
        if(col == '#')
        {
            $('[col-nb=-1]').css('min-width', deplace)
            $('[col-nb=-1]').css('max-width', deplace)
        }
        else
        {
            $('[col-nb=' + col + ']').css('min-width', deplace)
            $('[col-nb=' + col + ']').css('max-width', deplace)
        }
        pos_x = event.clientX;
      });

      $('.table-panel').scroll(function() {
        var offset = $(this).scrollLeft();
        $('.table-1').css('left', -offset)
      });

      var on_edit = 0
      $('.table-1 td').click(function() {
        if(on_edit == 2)
          return;
        var type = $(this).attr('type')
        var usage = $(this).attr('usage')
        if(usage == '6' || usage == '7' || usage == '8' || usage == '10' || usage == '11')
          $('.editor-cel-fx[data-commande=poi]').show()
        else
          $('.editor-cel-fx[data-commande=poi]').hide()
        if(type == '4')
          $('.editor-cel-fx[data-commande=upload]').show()
        else
          $('.editor-cel-fx[data-commande=upload]').hide()
        if((type == '5') || (type == '6') || $(this).attr('col-nb') == "-1")
          return ;
        if(t.targetX != -1 && t.targetY  != -1)
        {
          $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] div').css('margin-top', '').css('max-height', '20px')
          $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').children('div').css('border-width', '').css('z-index', '').css('position', '').css('background-color', '').css('width', '').css('border-color', '').css('border-style', '')
          $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').children('div').css('border-color', '').css('border-style', '').css('border-width', '')
          t.is_html = 0;
        }
        on_edit = 1
        $(this).children('div')
        $(this).children('div').css('border-color', '#4F80F3').css('border-style', 'solid').css('border-width', '1px')
        t.targetX = $(this).attr('row')
        t.targetY = $(this).attr('col-nb')
        t.save_content_cel = $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] span').html()
        $('.editor-cel-div-spancell').empty()
        $('.editor-cel-div-spancell').append($(this).children('div').children('span').html())
      })

      $('.editor-cel-div-spancell').click(function() {

        on_edit = 2;
        $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').children('div').css('border-width', '2px').css('z-index', '404').css('position', 'fixed').css('background-color', 'white').css('width', '100%')
        $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').children('div').css('background-color', 'white').css('border-color', '#4F80F3').css('border-style', 'solid')
        $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] span').attr('contenteditable', 'true')
        var height = parseInt($('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').css('height'))
        height = height / 2
        $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] div').css('margin-top', '-' + height + 'px').css('max-height', '5000px')
      })
      $(window).click(function(e) {
        if (on_edit != 2)
          return;

        if(!$(e.target).hasClass('table_is_edit') && !($(e.target).attr('contenteditable') == 'true'))
        {
          on_edit = 0;
          var valid = t.valid_cell()
          $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] div').css('margin-top', '').css('max-height', '20px')
          $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').children('div').css('border-width', '').css('z-index', '').css('position', '').css('background-color', '').css('width', '').css('border-color', '').css('border-style', '')
          $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').children('div').css('border-color', '').css('border-style', '').css('border-width', '')
          $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] span').attr('contenteditable', 'false');
          var oui = $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']')
        }
      })

      $('.editor-cel-div-spancell').keyup(function(e) {
        if(e.keyCode == 27)
        {
          $(this).focusout()
          $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] div').css('margin-top', '').css('max-height', '20px')
          $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').children('div').css('border-width', '').css('z-index', '').css('position', '').css('background-color', '').css('width', '').css('border-color', '').css('border-style', '')
          $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').css('background-color', '').css('border-color', '').css('border-style', '')
          t.targetX = -1
          t.targetY = -1
        }
        $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').children('div').children('span').empty()
        $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').children('div').children('span').html($(this).html())
        var valide = t.valid_cell()
        if($('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+'] span').html() != t.save_content_cel)
          {
            $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').addClass('edited')
            if(valide == 1)
              $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').addClass('data-invalid')
            else
              $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').addClass('data-valid')
          }
          else
            $('.table-1 td[row='+t.targetX+'][col-nb='+t.targetY+']').removeClass('edited').removeClass('data-invalid').removeClass('data-valid')
      })

      $('.spanCell').keyup(function() {
        $('.editor-cel-div-spancell').empty()
        $('.editor-cel-div-spancell').append($(this).html())
      })
  }

  bind_cross() {
    var t = this;
    $('.div_after').click(function() {
      var row = $(this).parent().attr('row')
      var col_nb = $(this).parent().attr('col-nb')
      var txt = $('.table-1 th[row=-1][col-nb='+col_nb+'] span').text()
      $('.table-1 td[row='+row+'][col-nb='+col_nb+']').css('background-color', '#FFFFFF')
      $('.table-1 td[row='+row+'][col-nb='+col_nb+'] span').empty()
      $('.table-1 td[row='+row+'][col-nb='+col_nb+'] span').html(t._data[row][txt])
      $(this).hide();
    })
  }

  bind_slide() {
    var t = this
    $('.slid-data-left').click(function() {
      if(t.nb_row == 0)
        return ;
      t.nb_row--;
      $('.table-1 tr').remove();
      $('.table-1 th').remove();
      t.reloadTable(50);
     })

     $('.slid-data-raight').click(function() {
        if(50 * (t.nb_row + 1) >= t._data.length)
          return;
       t.nb_row++;
       $('.table-1 tr').remove();
       $('.table-1 th').remove();
       t.reloadTable(50);
     })
  }

    initThead() {
      var t = this;

      var $handle = $('<div>')
      .addClass('handle-table')
      .append('<span>').text('oui');

      var $th = $('<th>')
      .addClass('td-tab')
      .attr('row', '-1')
      .append($('<span>').attr('contenteditable', 'true').addClass('spanCell').text('#'))
      .append($select)

      for(var i in t._dataColumns) {
      var $select = $('<select>').addClass('select_tabel')
      .append($('<option>').attr('value', '0-0').text('text'))
      .append($('<option>').attr('value', '1-1').text('external id'))
      .append($('<option>').attr('value', '0-2').text('title'))
      .append($('<option>').attr('value', '0-3').text('place name'))
      .append($('<option>').attr('value', '0-4').text('place address'))
      .append($('<option>').attr('value', '0-5').text('full location'))
      .append($('<option>').attr('value', '1-6').text('longitude'))
      .append($('<option>').attr('value', '1-7').text('latitude'))
      .append($('<option>').attr('value', '0-8').text('coordinates'))
      .append($('<option>').attr('value', '0-9').text('layer'))

      if(t._dataColumns[i].usage == 0 && t._dataColumns[i].type == 0)
        $select.children('[value=0-0]').attr('selected', '');
      else if(t._dataColumns[i].usage == 1 && t._dataColumns[i].type == 1)
        $select.children('[value=1-1]').attr('selected', '');
      else if(t._dataColumns[i].usage == 2 && t._dataColumns[i].type == 0)
        $select.children('[value=0-2]').attr('selected', '');
      else if(t._dataColumns[i].usage == 3 && t._dataColumns[i].type == 0)
        $select.children('[value=0-3]').attr('selected', '');
      else if(t._dataColumns[i].usage == 4 && t._dataColumns[i].type == 0)
        $select.children('[value=0-4]').attr('selected', '');
      else if(t._dataColumns[i].usage == 5 && t._dataColumns[i].type == 0)
        $select.children('[value=0-5]').attr('selected', '');
      else if(t._dataColumns[i].usage == 6 && t._dataColumns[i].type == 1)
        $select.children('[value=1-6]').attr('selected', '');
      else if(t._dataColumns[i].usage == 7 && t._dataColumns[i].type == 1)
        $select.children('[value=1-7]').attr('selected', '');
      else if(t._dataColumns[i].usage == 8 && t._dataColumns[i].type == 0)
        $select.children('[value=0-8]').attr('selected', '');
      else if(t._dataColumns[i].usage == 9 && t._dataColumns[i].type == 0)
        $select.children('[value=0-9]').attr('selected', '');
        $th = $('<th>')
        $th = $('<th>')
        .addClass('th-tab')
        .attr('row', '-1')
        .attr('col-nb', i)
        .append($('<div>').append($('<div>').addClass('handle-table2'))
        .append($('<span>')/*.addClass('spanCell').attr('contenteditable', 'true')*/.text(t._dataColumns[i].label))
        .append($('<div>').addClass('handle-table')))
        $('.thead-tab').append($th);
      }
    }

    initTbody(page) {
    var t = this;
    var row = page * t.nb_row;

    while (row < page * (t.nb_row + 1)) {
        var select = $('.tbody-tab').find();
        var $tr = $('<tr>')
        .addClass('tr-tab');
        if(t._data[row] == undefined)
          return ;
        var data = []
        for (var i in t._dataColumns) {
          var content = t._data[row][t._dataColumns[i].label];
          var type = t._dataColumns[i].type;
          var usage = t._dataColumns[i].usage;
          var div = "<span>"
          if((type == 7)  && content == "")
          {
            content = "DD-MM-YY xx:xx"
            div = $('<input type="text" value="2012-05-15 21:05" class="datetimepicker">').datetimepicker()
          }
          else if (type == 7)
            div = $('<input type="text" value="2012-05-15 21:05" class="datetimepicker">').datetimepicker()
          if((type == 6)  && content == "")
          {
            content = "23:42"
            div = $('<input type="time" id="startTime">')
          }
          else if(type == 6)
            div = $('<input type="time" id="startTime">')
          if((type == 5)  && content == "")
          {
            content = "29/07/2042"
            div = $('<input type="text" id="datepicker" class="date">')
          }
          else if(type == 5)
            div = $('<input type="text" id="datepicker" class="date">')
          if((type == 9)  && content == "")
            content = "mo-fr: 09:00-12:00, 14:00-16:30, 19:30-00:00 fr: 00:00-02:00, 10:00-15:00 su: 00:00-23:00"
          var $td = $('<td>').css('max-height', '20px')
          .addClass('td-tab')
          .attr('row', row)
          .attr('col-nb', i)
          .attr('type', type)
          .attr('usage', usage)
          .attr('contenteditable', 'false')
          .css('max-width', 300)
          .css('background-color', usage == 1 ? '#CCCCCC': t.valid_cell(content, usage, type) == 0 ? '#FFFFFF': '#f27d7d')
          .append($('<div>').addClass('first').append( $('<div>').addClass('handle-table2'))
                                      .append($(div).addClass('spanCell').attr('contenteditable', 'false').html(content).val(content))
                                      .append($('<div>').addClass('handle-table'))).append($('<a>').attr('href', '#').addClass('div_after').html('X').hide())
          .appendTo($tr);
          data.push(content)
        }
        t.data_save.push(data)
        row++;
        $('.tbody-tab').append($tr);
      }
      $('.date.spanCell').datepicker()
      $('.dropdown-menu').show()
  }



  reloadTable(page) {
    var t = this
    $('.table-1 tbody').empty()
    $('.table-1 thead').empty()
    t.initThead()
    t.initTbody(page)
    t.editCell()
    t.resizeCol()

    t.bind_cross()
  }

  loadTable(page) {
      var t = this
        var data = {
          action: "get_map_data",
          status: 200,
          messages: [],
          items: [{
            cols: [{usage: 0, comment: "", type: 0, order: 0, label: "name"},
            {usage: 10, comment: "", type: 0, order: 1, label: "coordinates"},
            {usage: 0, comment: "", type: 4, order: 2, label: "picture"},
            {usage: 0, comment: "", type: 0, order: 3, label: "description"},
            {usage: 9, comment: "", type: 0, order: 4, label: "label"},
            {usage: 0, comment: "", type: 5, order: 13, label: "date"},
            {usage: 0, comment: "", type: 6, order: 6, label: "heur_debut"},
            {usage: 0, comment: "", type: 6, order: 7, label: "heur_fin"},
            {usage: 0, comment: "", type: 0, order: 8, label: "ref"},
            {usage: 1, comment: "", type: 1, order: 9, label: "id"}],
            data: [{}],
          }]
        }
        var i = 0
        while (i < 157)
        {
          var the_data = {coordinates: "139.712866,35.688821",
                    date: "",
                    description: `Ne cherchez plus‚ c’est le meilleur burger de Tokyo !<br>Chatty Chatty Burger est tellement excellent que nous avons dû revoir notre barème pour tout les burgers de Tokyo que nous avons visité.<br>Voir en vidéo : https://youtu.be/2faGXtMxR2k?t=12m35s<br>Sur Ici Japon : http://www.ici-japon.com/voyage-japon/restaurants-a-tokyo/burgers/chatty-chatty<br><br><img src=https://lh4.googleusercontent.com/SgXD9cfxKsEqNz26m20zy6qOb-C764LQQ3jadu0_ZMeDji7BJQvYDhE-xQTzpA6d6ovNa0EMPV7Q3e5eNEeJrvGbTA7E-zu1H1NkbyV2r8VE4U86BfI6V8PzBAtRMS4"" height=""200"" width=""auto"" />"""`,
                    heur_debut: "",
                    heur_fin: "",
                    id: i,
                    label: "Burgers",
                    name: "Chatty Chatty",
                    picture: "https://lh6.googleusercontent.com/vGv9T_KQ8ovS1pSdnu-CD4BZ8ueH1-LtfotyyJd_EBNr36F3RA9FRYexVEa8A17fs935vtYhlKQxbvx7B9cyC2R8QmMRcRGMC1AYgD1xbWodsDotEL56ijnEOgjFrc4Q",
                    ref:""}
          data.items[0].data[i] = the_data;
          data.items[0].data[i].id = i
          i++;
        }
        console.log(data)
        $('table-1 tbody').empty();
        $('table-1 thead').empty();
        if (data.items.length == 0) return;
        t._dataColumns = data.items[0].cols;
        t._data = data.items[0].data;
        if (t._data.length == 0)
          return;
        t.initThead()
        t.initTbody(page)
        t.editCell()
        t.resizeCol()
        t.bind_cross()
  }
}


var datatable = new DataTable ({});
window.g_datatable = datatable;
window.setTimeout(function() {
  console.log('ok')
  datatable.loadTable(50)
  datatable.resize_text()

  datatable.bind_slide()

}, 100);

//platform.bind_table_select()
