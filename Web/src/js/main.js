angular.module("main", [])

.controller("mainCtrl", function ($scope, $http, sparql, ingredients) {
  $scope.recipes = [{
    "tittel": "Julepostei med medister",
    "innhold": [{
      "navn": "Lever, svin, rå",
      "mengde": 500,
      "enhet": "g"
    }, {
      "navn": "Svin, bacon med svor, rå",
      "mengde": 100,
      "enhet": "g"
    }, {
      "navn": "Medisterdeig, rå",
      "mengde": 150,
      "enhet": "g"
    }, {
      "navn": "Løk, gul/rød, norsk, rå",
      "mengde": 0.5,
      "enhet": "stk"
    }, {
      "navn": "Hvetemel, sammalt, fint/grovt",
      "mengde": 1,
      "enhet": "dl"
    }, {
      "navn": "Ansjos, hermetisk",
      "mengde": 2,
      "enhet": "stk"
    }, {
      "navn": "Egg, rå",
      "mengde": 2,
      "enhet": "stk"
    }, {
      "navn": "Matfløte, 20 % fett",
      "mengde": 1,
      "enhet": "dl"
    }, {
      "navn": "Kjøttbuljong, tilberedt",
      "mengde": 0.5,
      "enhet": "dl"
    }, {
      "navn": "Havsalt",
      "mengde": 2,
      "enhet": "ts"
    }, {
      "navn": "Pepper, sort, hel/malt",
      "mengde": 0.5,
      "enhet": "ts"
    }, {
      "navn": "Ingefærrot, rå",
      "mengde": 0.5,
      "enhet": "ts"
    }]
  }, {
    "tittel": "Røktk olje med eggesmør",
    "innhold": [{
      "navn": "Hyse, kolje, kokt",
      "mengde": 1.5,
      "enhet": "kg"
    }, {
      "navn": "Gulrot, norsk, rå",
      "mengde": 500,
      "enhet": "g"
    }, {
      "navn": "Smør",
      "mengde": 1,
      "enhet": "ss"
    }, {
      "navn": "Hvetemel, sammalt, fint/grovt",
      "mengde": 1,
      "enhet": "ss"
    }, {
      "navn": "Helmelk, 3,5 % fett",
      "mengde": 1,
      "enhet": "dl"
    }, {
      "navn": "Kremfløte, 38 % fett",
      "mengde": 1,
      "enhet": "dl"
    }, {
      "navn": "Havsalt",
      "mengde": 1,
      "enhet": "ts"
    }, {
      "navn": "Pepper, sort, hel/malt",
      "mengde": 0.25,
      "enhet": "ts"
    }, {
      "navn": "Egg, rå",
      "mengde": 2,
      "enhet": "stk"
    }, {
      "navn": "Smør",
      "mengde": 200,
      "enhet": "g"
    }, {
      "navn": "Persille, norsk, rå",
      "mengde": 2,
      "enhet": "ss"
    }]
  }];

  $scope.tab = "oppskrifter";

  $scope.selectRecipe = function (recipe) {
    for (var i in recipe.innhold) {
      (function(index) {
        ingredients.sokIngridiens(recipe.innhold[i].navn).success(function(data, status, headers, config) {
          var verdier = data.results.bindings;
          var formaterteVerdier = [];

          for(var i = 0; i < verdier.length; i++) {
            mengde = 0;
            var nyttObjekt = {};
            if(verdier[i].enhet.value === "mg") {
              mengde = verdier[i].mengde.value / 1000;

              nyttObjekt = {
                "navn" : verdier[i].navn.value,
                "mengde" : mengde,
                "enhet" : "g"
              };
            } else if (verdier[i].enhet.value === "g") {
              nyttObjekt = {
                "navn" : verdier[i].navn.value,
                "mengde" : verdier[i].mengde.value,
                "enhet" : "g"
              };
            }

            if(nyttObjekt !== null) {
              if(nyttObjekt.mengde > 0) {
                formaterteVerdier.push(nyttObjekt);
              }
            }
          }
          recipe.innhold[index].nutrients = formaterteVerdier;
        });
      })(i);
    }
    $scope.selectedRecipe = recipe;
  };

  $scope.dbpediaQuery = "SELECT ?title\n" +
    "WHERE {\n" +
    "?game <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Category:First-person_shooters> .\n" +
    "?game foaf:name ?title .\n" +
    "}\n" +
    "ORDER by ?title";

  $scope.doQuery = function (q) {
    sparql.query(q).success(function (data) {
      $scope.results = data.results.bindings;
    });
  };
})

.factory("ingredients", function ($http) {
  var ingredients = {};

  ingredients.sokIngridiens = function(sokeord) {
    return $http({
      method: 'GET',
      url: genererSporring(sokeord)
    });

  };

  var genererSporring = function(sokeOrd) {
    var prefix = "http://localhost:3030/miniprosjekt/query?query=";
    var postfix = "&output=json&stylesheet=";
    var sporring = "PREFIX dc: <http://purl.org/dc/elements/1.1/> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX msw: <http://www.mesan.no/semantisk-web#> SELECT ?navn ?mengde ?enhet WHERE { ?ingridiens dc:identifier '" + sokeOrd + "' . ?ingridiens ?type ?mengde . ?type msw:enhet ?enhet . ?type dc:title ?navn . FILTER (?enhet = 'mg' || ?enhet = 'g' || ?enhet = 'kJ' || ?enhet = 'kcal' || ?enhet = 'kg' )}";
    sporring = prefix + encodeURIComponent(sporring) + postfix;

    return sporring;
  };

  return ingredients;
})

.factory("sparql", function ($http) {
  var sparql = {};
  var baseUrl = "http://dbpedia.org/sparql?default-graph-uri=http%3A//dbpedia.org&query=";
  var prefix = "PREFIX owl: <http://www.w3.org/2002/07/owl#> " +
      "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> " +
      "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
      "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
      "PREFIX foaf: <http://xmlns.com/foaf/0.1/> " +
      "PREFIX dc: <http://purl.org/dc/elements/1.1/> " +
      "PREFIX : <http://dbpedia.org/resource/> " +
      "PREFIX dbpedia2: <http://dbpedia.org/property/> " +
      "PREFIX dbpedia: <http://dbpedia.org/> " +
      "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>";

  var suffix = "format=application/sparql-results+json";

  sparql.query = function (q) {
    return $http.get(baseUrl + encodeURIComponent(prefix) + encodeURIComponent(q) + "&" + encodeURIComponent(suffix));
  };

  return sparql;
})

;
