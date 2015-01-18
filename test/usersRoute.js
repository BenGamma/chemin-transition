var should   = require('should'); 
var assert   = require('assert');
var request  = require('supertest');  
var mongoose = require('mongoose');
var config   = require('../config/environement');
var User     = require('../models/user');

var profile = {
    firstName: 'test',
    lastName: 'test',
    password: 'test',
    email: 'test@gmail.com'
};


describe('Routing', function() {
    var url = 'http://localhost:3000/';
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function(done) {
        // In our tests we use the test db
        mongoose.connect(config.development.db);                            
        done();
    });

    describe('CreateAccount', function(){
        it('should create new Account', function(done){
            request(url)
                .post('api/users/')
                .send(profile)
                .expect(function(res){
                    res.body.should.have.property('user').and.should.be.type('object');
                    res.body.should.have.property('message', 'created');              
                })
                .end(done);
            ;
        });
    });

    describe('DuplicateAccount', function(){
        it('should return an error message', function(done){
            request(url)
                .post('api/users/')
                .send(profile)
                .expect(function(res){
                    res.body.should.have.property('message', 'user already exist');  
                })
                .end(done)
            ;
        });
    });

    describe('unauthorized access user', function(){
        it('should return unauthorized access', function(done){
            request(url)
                .delete('api/users/')
                .set('token', 'SFSsdfgnhjdgsfsd')
                .set('email', 'test@gmail.com')
                .expect(function(res){
                    res.body.should.have.property('message', 'Unauthorized access') 
                })
                .end(done)
            ;
        });
    });
    describe('RemoveAccount', function(){
        it('should remove user', function(done){
            User.findOne({ 'local.email': 'test@gmail.com' }, function(err, user){
                request(url)
                    .delete('api/users/')
                    .set('token', user.local.token)
                    .set('email', user.local.email)
                    .send({
                        'id': user.id,
                    })
                    .expect(function(res){
                        res.body.should.have.property('message', 'user deleted');  
                    })
                    .end(done)
                ;
            });
        });
    });

});
