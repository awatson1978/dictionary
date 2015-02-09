Session.set('selected_user', '');
Session.set('selected_word', '');
Session.set('selected_day', '');
Session.set('selected_record', '');

Session.set('global_edit', false);

Session.set('user_search_term', '');
Session.set('account_search_term', '');


Session.setDefault('currentDataset', false);

Meteor.Router.add({
    '/': function(){
        Session.set('currentDataset', 'dictionary');
        return 'dictionaryPage';
    },
//    '/customers': function(){
//        Session.set('currentDataset', 'customers');
//        return 'customersPage';
//    },
//    '/dowjones': function(){
//        Session.set('currentDataset', 'dowjones');
//        return 'dowjonesPage';
//    },
//    '/wordlist': function(){
//        Session.set('currentDataset', 'wordlist');
//        return 'wordlistPage';
//    },
//    '/dictionary': function(){
//        Session.set('currentDataset', 'dictionary');
//        return 'dictionaryPage';
//    },

//    '/dowjones': function() {
//        if (Session.get('aboutUs')) {
//            return 'aboutUs';
//        } else {
//            return 'aboutThem';
//        }
//    },

    '*': function(){
        Session.set('currentDataset', false);
        return 'homePage';
    }
});