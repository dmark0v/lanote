/**
* Section.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      user_id:{
          type:'string',
          required:true,
          unique:true
      },
      note_id:'string',
      nodes:'array'
  }
};



