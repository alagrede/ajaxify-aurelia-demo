#Import project
mvn eclipse:eclipse

#Run
mvn spring-boot:run

#Develop with aurelia 
au run --watch --env dev

#Build aurelia for deploy in war
au build