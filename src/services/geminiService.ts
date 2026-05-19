import { GoogleGenAI, Type } from "@google/genai";
import { AuditResponse, ExtractionResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function auditLandingPages(urls: string[]): Promise<AuditResponse> {
  const prompt = `
    You are an expert Landing Page Auditor AI trained on Google's 2026 Search Quality Evaluator Guidelines, Core Web Vitals standards, and conversion optimization best practices.
    
    Analyze the following landing page(s): ${urls.join(", ")}
    
    Score each page against Google's 2026 standards using the following 6 categories, each worth up to 100 points. 
    Return a score and a 2–3 sentence justification per category.

    Categories:
    1. Helpful Content Score — Is content written for people, not search engines? Does it answer real user intent?
    2. E-E-A-T Score — Does the page show real experience, expertise, authority, and trust signals?
    3. Page Experience Score — Core Web Vitals compliance: LCP < 2.5s, INP < 200ms, CLS < 0.1.
    4. Mobile-First Score — Is the page fully responsive? Thumb-friendly CTAs? No intrusive interstitials?
    5. Content Originality Score — Is the content unique? No AI-generated filler? No thin content?
    6. Ad & Policy Compliance Score — Does the page follow Google Ads 2026 landing page policies? Transparent claims, no misleading offers?
    
    Final Score should be a weighted average of these 6 categories.
    Provide a clear "verdict" for each page (e.g., "Highly Recommended", "Needs Improvement", "High Risk").
    
    If two URLs are provided, compare them and highlight which one performs better and why in the comparison field.
    
    Output the result in JSON format matching the following schema:
    {
      "audits": [
        {
          "url": "string",
          "overallScore": number (0-100),
          "metrics": {
            "helpfulContent": { "score": number, "reasoning": "string (2-3 sentences)", "recommendations": ["string"] },
            "eeat": { "score": number, "reasoning": "string (2-3 sentences)", "recommendations": ["string"] },
            "pageExperience": { "score": number, "reasoning": "string (2-3 sentences)", "recommendations": ["string"] },
            "mobileFirst": { "score": number, "reasoning": "string (2-3 sentences)", "recommendations": ["string"] },
            "contentOriginality": { "score": number, "reasoning": "string (2-3 sentences)", "recommendations": ["string"] },
            "adCompliance": { "score": number, "reasoning": "string (2-3 sentences)", "recommendations": ["string"] }
          },
          "summary": "string",
          "verdict": "string",
          "actionPlan": ["string"]
        }
      ],
      "comparison": "string (optional comparison text if 2 URLs provided)"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      tools: [{ urlContext: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          audits: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                url: { type: Type.STRING },
                overallScore: { type: Type.NUMBER },
                metrics: {
                  type: Type.OBJECT,
                  properties: {
                    helpfulContent: {
                      type: Type.OBJECT,
                      properties: {
                        score: { type: Type.NUMBER },
                        reasoning: { type: Type.STRING },
                        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ["score", "reasoning", "recommendations"]
                    },
                    eeat: {
                      type: Type.OBJECT,
                      properties: {
                        score: { type: Type.NUMBER },
                        reasoning: { type: Type.STRING },
                        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ["score", "reasoning", "recommendations"]
                    },
                    pageExperience: {
                      type: Type.OBJECT,
                      properties: {
                        score: { type: Type.NUMBER },
                        reasoning: { type: Type.STRING },
                        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ["score", "reasoning", "recommendations"]
                    },
                    mobileFirst: {
                      type: Type.OBJECT,
                      properties: {
                        score: { type: Type.NUMBER },
                        reasoning: { type: Type.STRING },
                        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ["score", "reasoning", "recommendations"]
                    },
                    contentOriginality: {
                      type: Type.OBJECT,
                      properties: {
                        score: { type: Type.NUMBER },
                        reasoning: { type: Type.STRING },
                        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ["score", "reasoning", "recommendations"]
                    },
                    adCompliance: {
                      type: Type.OBJECT,
                      properties: {
                        score: { type: Type.NUMBER },
                        reasoning: { type: Type.STRING },
                        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ["score", "reasoning", "recommendations"]
                    }
                  },
                  required: ["helpfulContent", "eeat", "pageExperience", "mobileFirst", "contentOriginality", "adCompliance"]
                },
                summary: { type: Type.STRING },
                verdict: { type: Type.STRING },
                actionPlan: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["url", "overallScore", "metrics", "summary", "verdict", "actionPlan"]
            }
          },
          comparison: { type: Type.STRING }
        },
        required: ["audits"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function extractLandingPageData(urls: string[]): Promise<ExtractionResponse> {
  const prompt = `
    You are an expert Landing Page Auditor AI.
    
    For each of the following landing page(s): ${urls.join(", ")}, extract the following information:
    1. Headline
    2. Subheadline
    3. Primary CTA (text + placement)
    4. Trust Signals (list)
    5. Media (images/videos found, include alt text if available)
    6. Schema Detected (Yes/No + type)
    7. Mobile Indicators (responsive tags found or not)
    8. Body Copy (brief summary)
    9. Forms (description of forms found)
    10. Load Speed Hints (any indicators of performance)
    
    Label each page as Page A, Page B, etc.
    
    Output the result in JSON format matching the following schema:
    {
      "extractions": [
        {
          "pageLabel": "string (e.g., Page A)",
          "url": "string",
          "headline": "string",
          "subheadline": "string",
          "primaryCta": "string",
          "trustSignals": ["string"],
          "media": ["string"],
          "schemaDetected": "string",
          "mobileIndicators": "string",
          "bodyCopy": "string",
          "forms": ["string"],
          "loadSpeedHints": ["string"]
        }
      ]
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      tools: [{ urlContext: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          extractions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                pageLabel: { type: Type.STRING },
                url: { type: Type.STRING },
                headline: { type: Type.STRING },
                subheadline: { type: Type.STRING },
                primaryCta: { type: Type.STRING },
                trustSignals: { type: Type.ARRAY, items: { type: Type.STRING } },
                media: { type: Type.ARRAY, items: { type: Type.STRING } },
                schemaDetected: { type: Type.STRING },
                mobileIndicators: { type: Type.STRING },
                bodyCopy: { type: Type.STRING },
                forms: { type: Type.ARRAY, items: { type: Type.STRING } },
                loadSpeedHints: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["pageLabel", "url", "headline", "subheadline", "primaryCta", "trustSignals", "media", "schemaDetected", "mobileIndicators", "bodyCopy", "forms", "loadSpeedHints"]
            }
          }
        },
        required: ["extractions"]
      }
    }
  });

  return JSON.parse(response.text);
}
