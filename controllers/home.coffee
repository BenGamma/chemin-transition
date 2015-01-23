passport = require 'passport'

exports.index =  (req, res) ->
    res.render 'index', title : 'Blog | MVC'

exports.partials =  (req, res) ->
    filename = req.params.filename;

    return unless filename
    
    res.render("partials/" + filename );
