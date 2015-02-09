

Template.mainLayout.helpers({
  title: function(){
    return Session.get('account_search_term');
  }
});



//-----------------------------------------------------
// NAVBARS

Template.navbarFooter.helpers({
  isVisible: function(){
    if(Session.get('currentDataset')){
        return true;
    }else{
        return false;
    }
  }
});
