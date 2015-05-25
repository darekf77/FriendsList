
FriendsList
===================
> Usługa sieciowa wraz z klientem  

----------

Opis
-------------

FriendsList to aplikacja wykorzystująca framework NodeJS wraz z bazą danych MongoDB, która zapewnia bardzo wysoką wydajność nawet przy dużej liczbie jednoczesnych operacji odczyty/zapisu do serwera. Aplikacja udostępnia REST-owe API, opisane w [tutaj](/api/docs)

----------

Testy jednostkowe, funkcjonalne
--------------------

Wykonanie w głównym katalogu aplikacji:

    $ grunt test

spowoduje uruchomienie testów (framework mocha) jednostkowych i funkcjonalnych w środowisku testowym ( utworzy się dodatkowa testowa baza danych ) .
Raport pokazujący w jakim stopniu testy pokrywają kod znajduje się [tutaj.](/tests/coverage/report/)

Wersja produkcyjna / developerska
--------------------
Aby uruchomić aplikację w trybie produkcyjnym należy wyeksportować w konsoli zmienną NODE_ENV:

    $ export NODE_ENV=production && nodejs server.js

Aby z powrotem powrócić do trybu developement należy wykonać:

    $ export NODE_ENV=development 
    $ grunt

