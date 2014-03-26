angular.module("semwebApp", [])

.controller("semwebAppCtrl", function ($scope, sparql) {
  $scope.query = "SELECT ?title\n" +
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
