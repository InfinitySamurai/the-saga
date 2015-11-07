//Created by Russell Long
//
//
//  Possible optimizations:
//      -make it so only the table you are viewing updates
//      -make it so that building and population tables only update when 
//          a button is actually pressed, or when tab is switched to
//      -I don't like the UpdateResource, UpdatePopulation etc,
//          There is too much repeated code, could condense these a bit



var tickrate = 1000;

function Planets(){
    
    this.earth = new Planet("Earth");
    this.earth.buildings = new EarthBuildings(this.earth);
    this.mars = new Planet("Mars");
    this.mars.buildings = new MarsBuildings(this.mars);

    this.resourceCount = Object.keys(this.earth.resources).length
};

//creates all resources in the game in an object
function Resources(){
    this.food = new Resource("food"),
    this.wood = new Resource("wood"),
    this.stone = new Resource("stone"),
    this.iron = new Resource("iron"),
    this.copper = new Resource("copper"),
    this.coal = new Resource("coal"),
    this.uranium = new Resource("uranium"),
    this.crystal = new Resource("crystal"),
    this.hydrogen = new Resource("hydrogen"),   
    this.energy = new Resource("energy"),
    this.science = new Resource("science")
};

//create all the types of people that exist
function Population(){
    this.villagers = new People("Villager", 5000),
    this.townspeople = new People("Townsperson", 10000),
    this.colonists = new People("Colonist", 60000),
    this.scientists = new People("Scientist", 20000)
};

//create all the planets and assign their stuffs
function Planet(name){
    this.name = name;
    this.resources = new Resources;
    this.population = new Population;
}
 
//create a new person with a name and a create time in milliseconds
function People(name, createTime){
    this.name = name,
    this.amount = 0,
    this.discovered = 0,
    this.createTime = createTime
}

//creates a new resource
function Resource(name){
    this.name = name,
    this.discovered = 0,
    this.amount = 0,
    this.increment = 0,
    this.multiplier = 1
}

//creates a new building
//inputs
//name: the name of the building
//resource: A resource object that is associated with a specific planet
//  e.g. earth.resources.food
//increment: the amount that building will increase the resource production by
//multiplier: the amount that the building will multiply the resource production by
function Building(name, resource, increment, multiplier){
    this.name = name,
    this.discovered = 0,
    this.amount = 0,
    this.resource = resource,
    this.increment = increment,
    this.multiplier = multiplier
}

//creates all the building for earth
function EarthBuildings(earth){
    var resources = earth.resources;
    this.mill = new Building("Mill", resources.food, 1, 0);
    this.quarry = new Building("Quarry", resources.stone, 1, 0);
    this.lumbermill = new Building("Lumbermill", resources.wood, 1, 0);
}

function MarsBuildings(mars){
    var resources = mars.resources;
    this.nuclearplant = new Building("NuclearPlant", resources.energy, 100, 0);
}
    

planets = new Planets();


//Updates the tables of resources for a planet
//inputs
//planet: the planet that we are updating the table of
//table: the table that is going to be updated
function UpdateResources(planet, table){
    //console.log(planet);
    for(var resourcename in planet.resources){
        var resource = planet.resources[resourcename];
        var resourcerow = $(table).find('.' + resourcename);
        if(resource.amount > 0 || resource.discovered == 1){
            var tableRowExists = 0;
            
            //console.log(resourcerow.find('td').eq(1));
            if(resourcerow.length != 0){
                tableRowExists = 1;   
                resourcerow.find('td').eq(1).text(resource.amount);
                
            }

            if(!tableRowExists){
                $(table).find('tbody:last').append('<tr class="' + resourcename
                    + '"><td>' + resource.name + '</td><td>' + resource.amount + '</td><td>'
                    + resource.increment*resource.multiplier/tickrate*1000 + '</td></tr>');
            }
        }
    }
    
};

//Updates the population table of a planet, see UpdateResources
function UpdatePopulation(planet, table){
    for(var peoplename in planet.population){
        var people = planet.population[peoplename];
        var peoplerow = $(table).find('.' + peoplename);
        if(people.amount > 0 || people.discovered == 1){
            var tableRowExists = 0;
            
            if(peoplerow.length != 0){
                tableRowExists = 1;
                peoplerow.find('td').eq(1).text(people.amount);
            }
            
            if(!tableRowExists){
                $(table).find('tbody:last').append('<tr class="' + peoplename
                + '"><td>' + people.name + '</td><td>' + people.amount + '</td></tr>');
            }
        }
    }
}

//Updates the buildings of a planet, see UpdateResources
function UpdateBuildings(planet, table){
    for(var buildingname in planet.buildings){
        var building = planet.buildings[buildingname];
        var buildingrow = $(table).find('.' + buildingname);
        if(building.amount > 0 || building.discovered == 1){
            var tableRowExists = 0;
            
            if(buildingrow.length != 0){
                tableRowExists = 1;
                buildingrow.find('td').eq(1).text(building.amount);
                buildingrow.find('td').eq(3).text(building.amount*building.increment);
                buildingrow.find('td').eq(4).text(building.amount*building.multiplier);
            }
            
            if(!tableRowExists){
                $(table).find('tbody:last').append('<tr class="' + buildingname
                + '"><td>' + building.name + '</td><td>' + building.amount + '</td><td>'
                + building.resource.name + '</td><td>' + building.amount*building.increment
                + '</td><td>' + building.amount*building.multiplier + '</td></tr>');
            }
        }
    }
}
    
window.setInterval(function(){
    var resourceTables = document.getElementsByClassName("planet-resources");
    var populationTables = document.getElementsByClassName("planet-population");
    var buildingTables = document.getElementsByClassName("planet-buildings");
    for(var i=0;i<resourceTables.length;i++){
        var planet = resourceTables[i].id.split("-")[0];
        //console.log(planets[planet].resources);
        UpdateResources(planets[planet], resourceTables[i]);
        UpdatePopulation(planets[planet], populationTables[i]);
        UpdateBuildings(planets[planet], buildingTables[i]);
    }
    
//    for(i=0;i<populationTables.length;i++){
//        planet = resourceTables[i].id.split("-")[0];
//        UpdatePopulation(
//    }
}, tickrate);

function BuyPerson(row){
    
}


//
//table id="earth-resources" class="planet-resources"
//table id="mars-resources" class="planet-resources"
//
//functions UpdateTable(planet, table){
//
//
//
//
//
//
//}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//load();
//$(document).ready(function(){
//    
//    
//    
//    $('#increment').on('click', function(e){
//        
//        resources.cookies ++; 
//        save();
//    });    
//    
//});
//
//window.setInterval(function(){
//       $('#cookie-counter').text(resources.cookies);
//}, 200);
//
//
//
//function save(){
//    localStorage.setItem('resources', JSON.stringify(resources));
//};
//
//function load(){
//     if(localStorage && localStorage.getItem('resources')){
//        var savedresources = JSON.parse(localStorage.getItem('resources'));
//
//        if(typeof savedresources.cookies !== 'undefined'){
//            resources.cookies = savedresources.cookies;   
//        }
//    }
//};