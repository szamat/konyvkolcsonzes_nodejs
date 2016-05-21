var expect = require('chai').expect;
var getBookListMW = require('../../../middleware/book/getBookList');

describe('getBookList middleware ', function () {

    it('should return book', function (done) {
        var res = {
            tpl: {}
        };
        
        var fakeBookModel = {
            find: function(some){
                return {
                    exec: function(execute){
                        execute(undefined,['book'])
                    }
                }
            }
        };

        getBookListMW({
            bookModel: fakeBookModel
        })({},res,function(err){
            expect(res.tpl.allBooks).to.eql(['book']);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('error occured, sould return with error', function (done) {
        var fakeBookModel = {
            find: function(some){
                return {
                    exec: function(execute){
                        execute('anagyhiba',undefined)
                    }
                }
            }
        };

        getBookListMW({
            bookModel: fakeBookModel
        })({},{},function(err){
            expect(err).to.eql('anagyhiba');
            done();
        });
    });
});