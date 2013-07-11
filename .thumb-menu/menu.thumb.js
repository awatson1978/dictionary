//-----------------------------------------------------
//THUMB MENU

Template.thumbMenu.events({
   'click .dictionary-button': function(){
       Meteor.Router.to('/dictionary');
    },
    'click .wordlist-button': function(){
        Meteor.Router.to('/wordlist');
    },
    'click .customers-button': function(){
        Meteor.Router.to('/customers');
    },
    'click .dowjones-button': function(){
        Meteor.Router.to('/dowjones');
    }
});
Template.thumbMenu.isVisible = function(){
    if(Session.get('currentDataset')){
        return true;
    }else{
        return false;
    }
};
Template.thumbMenu.isCustomersPage = function(){
    if(Session.get('currentDataset') == 'customers'){
        return 'highlighted';
    }else{
        return 'dimmed';
    }
};
Template.thumbMenu.isDowJonesPage = function(){
    if(Session.get('currentDataset') == 'dowjones'){
        return 'highlighted';
    }else{
        return 'dimmed';
    }
};
Template.thumbMenu.isWordlistPage = function(){
    if(Session.get('currentDataset') == 'wordlist'){
        return 'highlighted';
    }else{
        return 'dimmed';
    }
};
Template.thumbMenu.isDictionaryPage = function(){
    if(Session.get('currentDataset') == 'dictionary'){
        return 'highlighted';
    }else{
        return 'dimmed';
    }
};
