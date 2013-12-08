arab-phone
==========

Simple automatic translation fun. 

It translates a string through a series of language pairs. It uses the
API access to http://mymemory.translated.net/, for which arab-phone can
be seen as a straightforward example.

Example Use
-----------

The module is packed as a module exporting two calls: chain (to set
the languages chain) and phone (to access the functionality).

To see it in action, it can be run command-line specifying the
sentence (in French) to run through:

```
node arab-phone.js pendant que les jeunes vierges se baignent a la fontaine, les vieillards boivent et parient aux courses
registering callbackende
registering callbackdefr
registering callbackfrru
registering callbackrues
registering callbackesfr
registering callbackfres
registering callbackesen
registering callbackenko
registering callbackkofr
translation step[en]: while the maidens bathing in the fountain, old drink and bet races
translating to "de"
translation step[de]: während die Mädchen Baden im Brunnen, alte Getränk und Wette Rennen
translating to "fr"
translation step[fr]: tandis que les filles se baignant dans la fontaine, ancienne boisson et pari courses
translating to "ru"
translation step[ru]: в то время как девушки купаются в фонтане, древний напиток и ставка гонки
translating to "es"
translation step[es]: mientras que las chicas de natación en la carrera fuente, antigua bebida y la oferta
translating to "fr"
translation step[fr]: tandis que les filles se baigner dans la fontaine, boisson antique et offrent carrière
translating to "es"
translation step[es]: mientras que las niñas nadan en la fuente, antigua bebida y ofrecen la carrera
translating to "en"
translation step[en]: while the girls swim in the fountain, ancient drink and offer career
translating to "ko"
translation step[ko]: 소녀는 분수, 고대의 음료에서 수영과 직업을 제공하면서
translating to "fr"
last one : fontaines de filles, la natation et la profession ancienne, tout en offrant des boissons
```

About The Name
--------------

The French term [Téléphone arabe](http://fr.wikipedia.org/wiki/T%C3%A9l%C3%A9phone_arabe) 
is the French equivalent for Chinese whispers, the game in which one
person whispers a message to another, which is passed through a line
of people until the last player announces the message to the entire
group.