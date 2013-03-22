SocialStream.Document = (function(SS, $, undefined){
  var indexCallbacks = [];

  var addIndexCallback = function(callback){
    indexCallbacks.push(callback);
  };

  var index = function(options){
    $.each(indexCallbacks, function(i, callback){ callback(options); });
  };

  var newCallbacks = [];

  var addNewCallback = function(callback){
    newCallbacks.push(callback);
  };

  var new_ = function(options){
    $.each(newCallbacks, function(i, callback){ callback(options); });
  };


  var editCallbacks = [];

  var addEditCallback = function(callback){
    editCallbacks.push(callback);
  };

  var edit = function(options){
    $.each(editCallbacks, function(i, callback){ callback(options); });
  };

  var initTagsForm = function() {
    SS.Tag.select2('input[name$="[tag_list]"]');
  };

  var initNewActivity = function() {
    $('.wall_input button.new_document').click(function(event){
      event.preventDefault();

      $(this).addClass("selected");

      // build document form
      if ($('.wall_input input[name^=document]').length === 0) {
        $('<label/>', {
          "for": 'document_title',
          text: I18n.t('activerecord.attributes.document.title')
        }).insertBefore($('#post_text'));
        
        $('<textarea/>', {
          name: 'document[description]',
          'class': 'document_description',
          placeholder: I18n.t('document.description.input')
        }).insertAfter($('#post_text'));

        $('.wall_input textarea.document_description').val($('#post_text').val());

        $('#post_text').
          attr('name', 'document[title]').
          attr('placeholder', I18n.t('document.title.input'));

        $('<input>', {
          name: 'document[file]',
          type: 'file',
          style: 'display: none;'
        }).insertAfter('.wall_input textarea.document_description');

        $('.wall_input form').
          attr('action', $(this).attr('data-path')).
          attr('enctype', 'multipart/form-data'); // this is ignored if done after creating the file input

        $('.wall_input input[name="post[owner_id]"]').attr('name', 'document[owner_id');
        SS.Wall.changeRelationSelect('document');
      }


      $('.wall_input input[type=file]').trigger('click');

      $('.wall_input input[type=file]').change(function(){
        $("#post_text").val($(this).val().replace(/C:\\fakepath\\/i, ''));
      });
    });


  };

  var initPagination = function() {
    SS.Pagination.show();
  };

  var initNewModal = function() {
    $('.new_document-modal-link').attr('href', '#new_document-modal');
  };

  addIndexCallback(initPagination);

  addNewCallback(initNewModal);

  addEditCallback(initTagsForm);

  SS.Wall.addShowCallback(initNewActivity);

  return {
    new_: new_,
    edit: edit,
    index: index
  };

})(SocialStream, jQuery);
