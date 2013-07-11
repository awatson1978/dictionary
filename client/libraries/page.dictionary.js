
Template.dictionaryDatasetTemplate.events({
   'click .about-the-author-button':function(){
       window.location.href = "https://coderwall.com/awatson1978";
   },
   'click .get-the-code-button':function(){
       window.location.href = "https://github.com/awatson1978/dictionary";
   }
});









//-------------------------------------------------------------
// dictionaryIndexTemplate

Template.dictionaryIndexTemplate.editingWord = function(){
    if(Session.get('selected_word')){
        return true;
    }else{
        return false;
    }
};

Template.dictionaryIndexTemplate.events({
    'click .cancel-btn': function(){
        Session.set('selected_word', '');
        Meteor.flush();
    }
});


Template.dictionaryIndexTemplate.dictionaryList = function(){
    try{
        return Dictionary.find({
                'Word': { $regex: Session.get('dictionary_search'), $options: 'i' }
        },{limit: 20});
    }catch(error){
        console.log(error);
    }
};
Template.dictionaryIndexTemplate.events({
    'click .list-group-item':function(event, template){
        Session.set('selected_word', this._id);
        Session.set('current_action','view');
    }
});
Template.dictionaryIndexTemplate.events({
    'keyup #dictionarySearchInput': function(evt,tmpl){
        try{
            Session.set('dictionary_search', $('#dictionarySearchInput').val());
            Meteor.flush();
        }catch(err){
            console.log(err);
        }
    },
    'click #dictionarySearchInput':function(){
        Session.set('selected_word', '');
    }
});


//
////-------------------------------------------------------------
//// B.  Helpers
//
Template.dictionaryFormTemplate.helpers({
    word: function(){
        try{
            if(Session.get('current_action') == 'new'){
                return {"Word":""};
            }else{
                return Dictionary.findOne(Session.get('selected_word'));
            }
        }catch(error){
            console.log(error);
        }
    }
});


//-------------------------------------------------------------
// C. Event Map

Template.dictionaryFormTemplate.events({
    //-------------------------------------------------------------
    // 1. Desktop Clicks - Editing

    'click #dictionaryWordInput':function(){
        Session.set('editing_word', true);
        Meteor.flush();
    },
    'click #dictionaryDefinitionInput':function(){
        Session.set('editing_definition', true);
        Meteor.flush();
    },

    //-------------------------------------------------------------
    // 2. Mobile Tabs - Editing

    'mouseout #dictionaryWordInput':function(){
        Session.set('editing_word', false);
        Meteor.flush();
    },
    'mouseout #dictionaryDefinitionInput':function(){
        Session.set('editing_definition', true);
        Meteor.flush();
    }
})



//-------------------------------------------------------------
// 3. Submit
// 4. Stop Editing

Template.dictionaryFormTemplate.events(
    okCancelEvents('#dictionaryWordInput',
        {
            ok: function (value) {
                Dictionary.update(Session.get('selected_word'), {$set: { 'Word': value }});
                Session.set('editing_word', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_word', false);
            }
        })
);
Template.dictionaryFormTemplate.events(
    okCancelEvents('#dictionaryDefinitionInput',
        {
            ok: function (value) {
                Dictionary.update(Session.get('selected_word'), {$set: { 'Definition': value }});
                Session.set('editing_definition', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_definition', false);
            }
        })
);

//-------------------------------------------------------------
// D. Display Readonly Value

Template.dictionaryFormTemplate.word_enabled = function(){
    if(Session.get('global_edit')){
        return "enabled";
    }else if(Session.get('editing_word')){
        return "enabled";
    }else{
        return "readonly";
    }
};
Template.dictionaryFormTemplate.definition_enabled = function(){
    if(Session.get('global_edit')){
        return "enabled";
    }else if(Session.get('editing_definition')){
        return "enabled";
    }else{
        return "readonly";
    }
};


//-------------------------------------------------------------
// E. Buttons

Template.dictionaryFormTemplate.isNewWord = function(){
    try{
        if(Session.get('current_action') == 'new'){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
};
Template.dictionaryFormTemplate.isDeletingWord = function(){
    try{
        if(Session.get('current_action') == 'delete'){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
};


Template.dictionaryFormTemplate.events({
    'click #newDictionaryWordButton': function(){
        console.log('creating new word...');

        try{

            // TODO:  add validation functions
            if ($('#dictionaryWordInput').val().length) {

                Meteor.call('createNewDictionaryEntry', {
                    Word: $('#dictionaryWordInput').val(),
                    Definition: $('#dictionaryDefinitionInput').val()
                }, function (error, word) {
                    console.log('error: ' + error);
                    console.log('word: ' + word);
                });
            }else {
                Session.set("createError",
                    "Word needs characters, or why bother?");
            }
            evt.target.value = '';
            Session.set('current_action','view');
            Session.set('selected_word', '');
            Meteor.flush();
        }catch(err){
            console.log(err);
        }

        Session.set('current_action','view');
    },
    'click #deleteDictionaryWordButton': function(){
        Dictionary.remove(Session.get('selected_word'));
        Session.set('current_action','view');
        Session.set('selected_word', '');
    },
    'click #cancelDeleteDictionaryWordButton': function(){
        Session.set('current_action','view');
    }
});
