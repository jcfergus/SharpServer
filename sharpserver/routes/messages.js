/*jslint es5:true*/

/*
 * GET messages.
 */

exports.get = function(req, res){
  res.send("GET to /messages");
};

exports.post = function(req, res){
	res.send("POST to /messages");
};

exports.put = function(req, res) {
	res.send("PUT to /messages");
}

exports['delete'] = function(req, res) {
	res.send("DELETE to /messages");
}
