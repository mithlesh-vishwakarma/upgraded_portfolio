import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  noindex?: boolean;
  ogType?: string;
  ogImage?: string;
  schema?: object | object[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  noindex = false,
  ogType = "website",
  ogImage = "https://ordinarycoder.com/og-image.jpg",
  schema,
}) => {
  const location = useLocation();
  const currentCanonical =
    canonicalUrl ||
    `https://ordinarycoder.com${location.pathname === "/" ? "" : location.pathname}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set/update meta tag
    const updateMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 3. Set Primary Meta Tags
    updateMeta("title", title);
    updateMeta("description", description);
    updateMeta("robots", noindex ? "noindex, nofollow" : "index, follow");

    // 4. OpenGraph Tags
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:url", currentCanonical, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:image", ogImage, true);
    updateMeta("og:site_name", "OrdinaryCoder", true);

    // 5. Twitter Tags
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:url", currentCanonical);
    updateMeta("twitter:image", ogImage);
    updateMeta("twitter:card", "summary_large_image");

    // 6. Canonical Tag
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute("href", currentCanonical);

    // 7. Schema Markup (JSON-LD)
    const schemaId = "dynamic-seo-schema";
    let scriptElement = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (schema) {
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.id = schemaId;
        scriptElement.type = "application/ld+json";
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schema);
    } else if (scriptElement) {
      scriptElement.remove();
    }
  }, [title, description, currentCanonical, noindex, ogType, ogImage, schema]);

  return null;
};

export default SEO;
