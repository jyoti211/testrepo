db = module.exports = {
  mysql : require('mysql'),
  mySqlClient : null,
 
  connect : function (host, user, password, database) {
	 this.mySqlClient = this.mysql.createConnection({
      host     : host,
      user     : user,
      password : password,
      database : database
    });  
    },
 
  close : function() {
    this.mySqlClient.end();
  },
 
  executeSelectQuery : function( selectQuery, callbackResultFunction, data ) {
	 this.mySqlClient.query(
      selectQuery, function( error, results ) {
    	  console.log(selectQuery);
		if ( error ) {
		 db.close();
          return error;
		} else {
			callbackResultFunction(results, data);
		}
	  }
	);
  },
 
  executeInsertQuery : function( insertQuery ) {
	 this.mySqlClient.query(
	  insertQuery,
	  function result(error, info) {
        if (error) {console.log("error");
          db.close();
          return error;
        }
		return info.insertId;
	  }
	);
  },
  
  executeUpdateQuery : function( updateQuery ) {
    this.mySqlClient.query(
	  updateQuery,
	  function result(error) {
        if (error) {
          this.close();
          return error;
        }
		return;
	  }
	);
  }
  
};

