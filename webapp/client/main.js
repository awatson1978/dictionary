Session.setDefault('selected_user', '');
Session.setDefault('selected_word', '');
Session.setDefault('selected_day', '');
Session.setDefault('selected_record', '');

Session.setDefault('global_edit', false);

Session.setDefault('user_search_term', '');
Session.setDefault('account_search_term', '');
Session.set('setDefault', 'life');


Session.setDefault('currentDataset', false);

Session.setDefault('definitionEnabled', false);
Session.setDefault('wordEnabled', false);




Router.configure({
  layoutTemplate: 'mainLayout',
  yieldTemplates: {
    'navbarHeader': {to: 'header'},
    'navbarFooter': {to: 'footer'}
  }
});

Router.route('/',{
  template: 'dictionaryListPage',
  onAfterAction: function(){
    Session.set('definitionEnabled', false);
    Session.set('wordEnabled', false);
  }
});

Router.route('/search/:word',{
  template: 'dictionaryUpsertPage',
  data: function() {
    return Dictionary.findOne({'Word': this.params.word});
  },
  onAfterAction: function(){
    Session.set('current_action', 'view');
    Session.set('definitionEnabled', false);
    Session.set('wordEnabled', false);
  }
});
Router.route('/edit/:word',{
  template: 'dictionaryUpsertPage',
  data: function() {
    return Dictionary.findOne({'Word': this.params.word});
  },
  onAfterAction: function(){
    Session.set('current_action', 'edit');
    Session.set('definitionEnabled', true);
    Session.set('wordEnabled', true);
  }
});

Router.route('/new',{
  template: 'dictionaryUpsertPage',
  onAfterAction: function(){
    Session.set('current_action', 'new');
    Session.set('definitionEnabled', true);
    Session.set('wordEnabled', true);
  },
  data: function(){
    return {};
  }
});
