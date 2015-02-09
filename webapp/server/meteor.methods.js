//--------------------------------------------------------------------------
// Server Side Helper Functions
//

Meteor.methods({
  updateDictionaryEntry:function(data){
    if(data._id){
      return Dictionary.update(data._id, {
        $set: {
          'Word': data.Word,
          'Definition': data.Definition
        }
      });
    }else{
      return "Failure.  No _id set.";
    }
  }
});
