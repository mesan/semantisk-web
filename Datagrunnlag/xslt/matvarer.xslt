<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:rdf="http://www.w3c.org/1999/02/22-rdf-syntax-ns#"
                xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:msw="http://www.mesan.no/semantisk-web#"
                version="2.0">
    <xsl:output method="xml" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <xsl:apply-templates select="rdf:RDF" />
    </xsl:template>
    
    <xsl:template match="rdf:RDF">
        <xsl:copy>
            <xsl:apply-templates select="rdf:Description" />
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="rdf:Description">
        <rdf:Description>
            <xsl:attribute name="rdf:about">
                <xsl:value-of select="concat('http://www.matvaretabellen.no/', msw:matvareId)" />
            </xsl:attribute>
            <xsl:call-template name="rdf:type" />
            <xsl:copy-of select="*"/>
        </rdf:Description>
    </xsl:template>
    
    <xsl:template name="rdf:type">
        <rdf:type>
            <xsl:attribute name="rdf:resource">
				<xsl:text>http://dbpedia.org/resource/Ingredient</xsl:text>
			</xsl:attribute>
        </rdf:type>
    </xsl:template>
    
</xsl:stylesheet>
