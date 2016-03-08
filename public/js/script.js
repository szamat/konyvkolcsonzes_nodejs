function KoBook(id,cim,szerzo,kiadasEve){
    var self = this;
    self.id = id;
    self.cim = cim;
    self.szerzo = szerzo;
    self.kiadasEve = kiadasEve;
}
function KoBookModel() {
    var self = this;

    self.books = ko.observableArray([
       new KoBook(1,"Static 1","Szerzo 1","2000"),
       new KoBook(2,"Static 2","Szerzo 2","2003"),
       new KoBook(2,"Static 3","Szerzo 3","2006"),
       new KoBook(2,"Static 4","Szerzo 4","2009"),
       new KoBook(2,"Static 5","Szerzo 5","2012"),
       new KoBook(2,"Static 6","Szerzo 6","2015")
    ]);

    self.addBook = function(id,cim,szerzo,kiadasEve){
        self.books.push(new KoBook(id,cim,szerzo,kiadasEve));
    }

    self.resBooks = ko.observableArray([

    ]);

    self.addReserv = function(book){
        self.resBooks.push(book);
        self.books.remove(book);
    }

    self.removeReservedBook = function(book){
        self.resBooks.remove(book);
        self.books.push(book);
    }

    self.removeBook = function(book){
        self.books.remove(book);
    }
}
$(document).ready(function(){
    ko.applyBindings(new KoBookModel());
})
