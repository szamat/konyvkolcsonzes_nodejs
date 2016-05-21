var expect = require('chai').expect;
var authMW = require('../../../middleware/generic/auth');

describe('auth middlewaare', function(){
    it('no userid, should redirect', function () {
        var req ={
            session: {}
        }

        var redirectOccured = false;

        var res  = {
            redirect: function(){
                redirectOccured = true;
            }
        };
        authMW({})(req,res,{})
        {
            expect(redirectOccured).to.be.eql(true);

        }
    });

    it('userid ok, sould next() call', function () {
        var req ={
            session: {
                userid: 123
            }
        }

        var callNext = false;

        var res  = {
            redirect: function(){
            }
        };

        authMW({})(req,res,function next(){
            callNext = true;
        })
        {
            expect(callNext).to.be.eql(true);

        }
    });
});