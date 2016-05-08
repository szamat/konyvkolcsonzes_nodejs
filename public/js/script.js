/*Books rent list model*/
function KoBook(id,cim,szerzo,kiadasEve,resbookid){
    var self = this;
    self.id = id;
    self.cim = cim;
    self.szerzo = szerzo;
    self.kiadasEve = kiadasEve;
    self.resbookid = resbookid;
}
function KoBookModel() {
    var self = this;

    self.books = ko.observableArray([]);

    self.addBook = function(id,cim,szerzo,kiadasEve){
        self.books.push(new KoBook(id,cim,szerzo,kiadasEve));
    }

    self.resBooks = ko.observableArray([]);

    self.addReserv = function(book){
        self.resBooks.push(book);
        self.books.remove(book);
    }

    self.removeReservedBook = function(book){
        self.resBooks.remove(book);
        self.books.push(book);
    }

    self.resBooksSerialize = function(){
        var res = [];
        $.each(self.resBooks(),function(i,v){
            res.push(v.id);
        })
        return res;
    }

    self.removeBook = function(book){
        self.books.remove(book);
    }
    self.reset = function(){
        self.resBooks.removeAll()
        self.books.removeAll();
    }
}

/*Book details*/
function KodDetailedBook(){
    var self = this;
    self.id = ko.observable(0);
    self.konyvCim = ko.observable("");
    self.konyvSzerzo = ko.observable("");
    self.kiadasEve = ko.observable("");
    self.ismerteto = ko.observable("");;
    self.mufaj = ko.observable("");
    self.availableGenres = ko.observableArray(['Kalandregény', 'SciFi']);

    self.setBook = function(id,cim,szerzo,kiadasEve,mufaj,ismerteto){
        self.id(id);
        self.konyvCim(cim);
        self.konyvSzerzo(szerzo);
        self.kiadasEve(kiadasEve);
        self.ismerteto(ismerteto);
        self.mufaj(mufaj);
    };
}
/*User model*/
function KoUser(){
    var self = this;
    self.id = ko.observable(0);
    self.name = ko.observable("");
    self.password = ko.observable("");

    self.setUser = function(id,name,password){
        self.id(id);
        self.name(name);
        self.password(password);
    };
    self.reset = function(){
        self.id("");
        self.name("");
        self.password("");
    }
}

/*Rented books model*/
/*
 id
 kolcsonzoNeve
 elerhetoseg
 visszaDatum
 resBooks
    cim
    szerzo
    kiadasEve
 */
function KoRentalBack(){
    var self = this;
    self.id = ko.observable("");
    self.kolcsonzoNeve = ko.observable("");
    self.elerhetoseg = ko.observable("");
    self.visszaDatum = ko.observable("");
    self.resBooks = ko.observableArray([]);

    self.addResBook = function(bid,cim,szerzo,kiadasEve,resbookid){
        self.resBooks.push(new KoBook(bid,cim,szerzo,kiadasEve,resbookid));
    }

    self.setDetails = function(id, name, elerhetoseg, visszaDatum){
        self.id(id)
        self.kolcsonzoNeve(name);
        self.elerhetoseg(elerhetoseg);
        self.visszaDatum(visszaDatum);
    }

    self.resetAll = function(){
        self.id("");
        self.elerhetoseg("");
        self.visszaDatum("");
        self.resBooks.removeAll();
    }

}


