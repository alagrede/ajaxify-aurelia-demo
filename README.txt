#Import project
mvn eclipse:eclipse

#Run
mvn spring-boot:run

In src/main/resources/static/
#Aurelia installation
npm install

#Develop with aurelia 
au run --watch --env dev

#Build aurelia for deploy in war
au build
