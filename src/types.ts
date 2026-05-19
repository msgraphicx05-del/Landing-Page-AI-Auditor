
export interface AuditMetric {
  score: number;
  reasoning: string;
  recommendations: string[];
}

export interface LandingPageAudit {
  url: string;
  overallScore: number;
  metrics: {
    helpfulContent: AuditMetric;
    eeat: AuditMetric;
    pageExperience: AuditMetric;
    mobileFirst: AuditMetric;
    contentOriginality: AuditMetric;
    adCompliance: AuditMetric;
  };
  summary: string;
  verdict: string;
  actionPlan: string[];
}

export interface AuditResponse {
  audits: LandingPageAudit[];
  comparison?: string;
}

export interface ExtractionResult {
  pageLabel: string;
  url: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  trustSignals: string[];
  media: string[];
  schemaDetected: string;
  mobileIndicators: string;
  bodyCopy: string;
  forms: string[];
  loadSpeedHints: string[];
}

export interface ExtractionResponse {
  extractions: ExtractionResult[];
}
