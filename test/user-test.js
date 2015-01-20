require('coffee-script/register');
var should   = require('should'); 
var assert   = require('assert');
var request        = require('supertest');  
var mongoose       = require('mongoose');
var config         = require('../config/environement');
var userBaseSchema = require('../models/userBase');
var User           = require('../models/user');
var Person         = require('../models/person');
var Organization   = require('../models/organization');

mongoose.connect(config.development.db); 

var profile = {
    firstName: 'test',
    lastName: 'test',
    password: 'test',
    email: 'test@gmail.com'
};


describe('instance person', function(done){
    it('should instanciate new person with Person type', function(done){
        var person = new Person();
        person.should.have.property('__t', 'Person')
        done()
    });
});

describe('Person instance of User', function(done){
    it('should return true', function(done){
        var person = new Person();
        person.should.be.an.instanceof(User);
        done()
    });
});

describe('Person instance of Organization', function(done){
    it('should return false', function(done){
        var person = new Person();
        person.should.not.be.an.instanceof(Organization);
        done()
    });
});

describe('Organization instance of User', function(done){
    it('should return true', function(done){
        var organization = new Organization();
        organization.should.be.an.instanceof(User);
        done()
    });
});

describe('save User without email and password', function(done){
    it('should return validation error', function(done){
        var user = new User();
        user.save(function(err){
            err.should.have.property('errors')
        });
        done()
    });
});

