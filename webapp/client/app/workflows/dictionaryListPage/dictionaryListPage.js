
//==================================================================================================
// TEMPLATE INPUTS

Template.dictionaryListPage.events({
  'click .about-the-author-button': function () {
    window.location.href = "https://coderwall.com/awatson1978";
  },
  'click .get-the-code-button': function () {
    window.location.href = "https://github.com/awatson1978/dictionary";
  },
  'click .cancel-btn': function () {
    Session.set('selected_word', '');
  },
  'click .list-group-item': function (event, template) {
    Router.go('/search/' + this.Word);

    // Session.set('selected_word', this._id);
    // Session.set('current_action', 'view');
  },
  'keyup #dictionarySearchInput': function (evt, tmpl) {
    Session.set('dictionary_search', $('#dictionarySearchInput').val());
  },
  'click #dictionarySearchInput': function () {
    Session.set('selected_word', '');
  }
});


//==================================================================================================
// TEMPLATE OUTPUTS

Template.dictionaryListPage.helpers({
  editingWord: function () {
    if (Session.get('selected_word')) {
      return true;
    } else {
      return false;
    }
  },
  dictionaryList: function () {
    return Dictionary.find({
      'Word': {
        $regex: Session.get('dictionary_search'),
        $options: 'i'
      }
    }, {
      limit: 200
    });
  }
});
