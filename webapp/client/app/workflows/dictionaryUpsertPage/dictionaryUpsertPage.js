
//-------------------------------------------------------------
// TEMPLATE OUTPUTS

Template.dictionaryUpsertPage.helpers({
  word_enabled: function () {
    if(Session.get('wordEnabled')){
      return 'enabled';
    }else{
      return 'readonly';
    }
  },
  definition_enabled: function () {
    if(Session.get('definitionEnabled')){
      return 'enabled';
    }else{
      return 'readonly';
    }
  },
  isNewWord: function () {
    if (Session.get('current_action') == 'new') {
      return true;
    } else {
      return false;
    }
  },
  isEditingWord: function () {
    if (Session.get('current_action') == 'edit') {
      return true;
    } else {
      return false;
    }
  },
  isViewingWord: function () {
    if (Session.get('current_action') == 'view') {
      return true;
    } else {
      return false;
    }
  },
isDeletingWord: function () {
    if (Session.get('current_action') == 'delete') {
      return true;
    } else {
      return false;
    }
  }
});



//-------------------------------------------------------------
// TEMPLATE INPUTS

Template.dictionaryUpsertPage.events({
  'click #editWordButton': function(){
    Router.go('/edit/' + this.Word);
  },
  'click #updateWordButton': function(){
    if ($('#dictionaryWordInput').val().length) {
      Meteor.call('updateDictionaryEntry', {
        _id: this._id,
        Word: $('#dictionaryWordInput').val(),
        Definition: $('#dictionaryDefinitionInput').val()
      }, function (error, word) {
        console.log('error: ' + error);
        console.log('word: ' + word);
        if(word){
          Router.go('/search/' + $('#dictionaryWordInput').val());
        }
      });
    } else {
      Session.set("createError",
        "Word needs characters, or why bother?");
    }
  },
  'click #newDictionaryWordButton': function () {
    console.log('creating new word...');

    // TODO:  add validation functions
    if ($('#dictionaryWordInput').val().length) {

      Meteor.call('createNewDictionaryEntry', {
        Word: $('#dictionaryWordInput').val(),
        Definition: $('#dictionaryDefinitionInput').val()
      }, function (error, word) {
        console.log('error: ' + error);
        console.log('word: ' + word);
        if(word){
          Router.go('/search/' + $('#dictionaryWordInput').val());
        }
      });
    } else {
      Session.set("createError",
        "Word needs characters, or why bother?");
    }
  },
  'click #deleteDictionaryWordButton': function () {
    Dictionary.remove({_id: this._id});
    Router.go('/');
  },
  'click #cancelDeleteDictionaryWordButton': function () {
    Router.go('/');
  }
});
