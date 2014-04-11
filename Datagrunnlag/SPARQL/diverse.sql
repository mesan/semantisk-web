DESCRIBE ?s
WHERE{
 ?s ?p ?o.
}
LIMIT 10
--
-- Gir
--
@prefix dc:    <http://purl.org/dc/elements/1.1/> .
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix msw:   <http://www.mesan.no/semantisk-web#> .

<http://www.matvaretabellen.no/12.012>
        a                  <http://dbpedia.org/resource/Ingredient> ;
        dc:identifier      "Popcorn, poppet, kjøpt" ;
        msw:alkohol        "0" ;
        msw:betakaroten    "90" ;
        msw:enumettet      "8.3" ;
        msw:fett           "14.5" ;
        msw:flerumettet    "1.3" ;
        msw:folat          "14" ;
        msw:fosfor         "275" ;
        msw:jern           "3.1" ;
        msw:jod            "7" ;
        msw:kalium         "240" ;
        msw:kalsium        "5" ;
        msw:karbohydrat    "51.4" ;
        msw:kilojoule      "1670" ;
        msw:kilokalorier   "398" ;
        msw:kobber         "0.16" ;
        msw:kolesterol     "0" ;
        msw:kostfiber      "11" ;
        msw:magnesium      "86" ;
        msw:matvareId      "12.012" ;
        msw:mettet         "4.3" ;
        msw:monoDisakk     "1.4" ;
        msw:natrium        "786" ;
        msw:niacin         "0.8" ;
        msw:protein        "10.1" ;
        msw:retinol        "0" ;
        msw:riboflavin     "0.03" ;
        msw:salt           "2" ;
        msw:selen          "1" ;
        msw:sink           "0.1" ;
        msw:spiseligDel    "100" ;
        msw:stivelse       "50" ;
        msw:sukkerTilsatt  "0" ;
        msw:tiamin         "0.01" ;
        msw:trans          "M" ;
        msw:vann           "4" ;
        msw:vitaminA       "7" ;
        msw:vitaminB12     "0" ;
        msw:vitaminB6      "0.2" ;
        msw:vitaminC       "0" ;
        msw:vitaminD       "0" ;
        msw:vitaminE       "0" .
--
-- Mal med namespace-oppsett
-- 
PREFIX dc:    <http://purl.org/dc/elements/1.1/> 
PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
PREFIX msw:   <http://www.mesan.no/semantisk-web#> 
SELECT ?s
WHERE{
 ?s ?p ?o.
}
LIMIT 50
--
-- Proteinfrie matvarer
--
PREFIX dc:    <http://purl.org/dc/elements/1.1/> 
PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
PREFIX msw:   <http://www.mesan.no/semantisk-web#> 
SELECT ?s ?identifier
WHERE{
 ?s msw:protein "0".
 ?s dc:identifier ?identifier.
}
LIMIT 50
--
-- 
--
PREFIX dc:    <http://purl.org/dc/elements/1.1/> 
PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
PREFIX msw:   <http://www.mesan.no/semantisk-web#> 
DESCRIBE msw:folat
--
-- gir
--
@prefix dc:    <http://purl.org/dc/elements/1.1/> .
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix msw:   <http://www.mesan.no/semantisk-web#> .

msw:folat  a            <http://dbpedia.org/resource/Nutrients> ;
        dc:description  "Beregnet verdi fra intern oppskrift (til Matvaretabellen 2006 eller tidligere versjon)." ;
        dc:title        "Folat" ;
        msw:enhet       "µg" .
--
--
--
PREFIX dc:    <http://purl.org/dc/elements/1.1/> 
PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
PREFIX msw:   <http://www.mesan.no/semantisk-web#> 
SELECT ?s ?identifier
WHERE{
 ?s ?p ?o.
 ?s dc:identifier ?identifier.
}
LIMIT 50
--
--
PREFIX dc:    <http://purl.org/dc/elements/1.1/> 
PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
PREFIX msw:   <http://www.mesan.no/semantisk-web#> 
SELECT ?s ?p ?identifier ?title ?o
WHERE{
 ?s ?p ?o.
 ?p dc:title ?title.
 ?s dc:identifier ?identifier.
}
ORDER BY ?s
LIMIT 50
--
--
PREFIX dc:    <http://purl.org/dc/elements/1.1/> 
PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
PREFIX msw:   <http://www.mesan.no/semantisk-web#> 
SELECT ?s ?p ?identifier ?title ?o ?enhet
WHERE{
 ?s ?p ?o.
 ?p dc:title ?title.
 ?p msw:enhet ?enhet.
 ?s dc:identifier ?identifier.
}
ORDER BY ?s
LIMIT 50
--
-- Litt ryddigere output
--
PREFIX dc:    <http://purl.org/dc/elements/1.1/> 
PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
PREFIX msw:   <http://www.mesan.no/semantisk-web#> 
SELECT ?identifier ?title ?o ?enhet
WHERE{
 ?s ?p ?o.
 ?s dc:identifier ?identifier.
 ?p dc:title ?title.
 ?p msw:enhet ?enhet.
}
ORDER BY ?s
LIMIT 50