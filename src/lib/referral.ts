const REFERRAL_BASE_URL = "https://2zo116ibbb.execute-api.eu-west-2.amazonaws.com/";
const RECORD_REFERRAL_ENDPOINT = `${REFERRAL_BASE_URL}record-rreferral`;
const REFERRAL_LOOKUP_ENDPOINT = `${REFERRAL_BASE_URL}referral-lookup`;

const REFERRAL_PATTERN = /^RECCE[A-Z0-9]{1,}$/i;
const CAMPAIGN_PATTERN = /^CAMP[A-Z0-9]{1,}$/i;
const VISITOR_ID_STORAGE_KEY = "recce_visitor_id";

export const isValidReferralCode = (code: string | null | undefined) =>
  typeof code === "string" && REFERRAL_PATTERN.test(code);

export const isValidCampaignCode = (code: string | null | undefined) =>
  typeof code === "string" && CAMPAIGN_PATTERN.test(code);

export type ReferralPlatform = "android" | "ios" | "desktop";

export const detectPlatform = (uaRaw: string | null | undefined): ReferralPlatform => {
  const ua = (uaRaw || "").toLowerCase();
  if (ua.includes("android")) return "android";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) return "ios";
  return "desktop";
};

export type ReferralContext = {
  referralCode: string | null;
  campaignCode: string | null;
  effectiveCode: string | null;
  type: "referral" | "campaign" | null;
};

export const resolveReferralContext = ({
  explicitReferral,
  primaryId,
}: {
  explicitReferral?: string | null;
  primaryId?: string | null;
}): ReferralContext => {
  const normalizedExplicit = explicitReferral?.trim() ?? null;
  const normalizedPrimary = primaryId?.trim() ?? null;

  const referralCandidate =
    (normalizedExplicit && isValidReferralCode(normalizedExplicit) && normalizedExplicit.toUpperCase()) ||
    (normalizedPrimary && isValidReferralCode(normalizedPrimary) && normalizedPrimary.toUpperCase()) ||
    null;

  if (referralCandidate) {
    return {
      referralCode: referralCandidate,
      campaignCode: null,
      effectiveCode: referralCandidate,
      type: "referral",
    };
  }

  const campaignCandidate =
    (normalizedExplicit && isValidCampaignCode(normalizedExplicit) && normalizedExplicit.toUpperCase()) ||
    (normalizedPrimary && isValidCampaignCode(normalizedPrimary) && normalizedPrimary.toUpperCase()) ||
    null;

  if (campaignCandidate) {
    return {
      referralCode: null,
      campaignCode: campaignCandidate,
      effectiveCode: campaignCandidate,
      type: "campaign",
    };
  }

  return {
    referralCode: null,
    campaignCode: null,
    effectiveCode: null,
    type: null,
  };
};

const parseOsVersionFromUA = (ua: string): string | null => {
  const lower = ua.toLowerCase();
  const androidMatch = lower.match(/android\s([0-9._]+)/);
  if (androidMatch?.[1]) {
    return androidMatch[1].replace(/_/g, ".");
  }

  const iosMatch = lower.match(/os\s([0-9_]+)\slike mac os/);
  if (iosMatch?.[1]) {
    return iosMatch[1].replace(/_/g, ".");
  }

  const macMatch = lower.match(/mac os x\s([0-9_]+)/);
  if (macMatch?.[1]) {
    return macMatch[1].replace(/_/g, ".");
  }

  const windowsMatch = lower.match(/windows nt\s([0-9.]+)/);
  if (windowsMatch?.[1]) {
    return windowsMatch[1];
  }

  return null;
};

async function detectOsVersion(): Promise<string | null> {
  if (typeof navigator === "undefined") return null;

  try {
    if ((navigator as any).userAgentData?.getHighEntropyValues) {
      const { platformVersion } = await (navigator as any).userAgentData.getHighEntropyValues(["platformVersion"]);
      if (typeof platformVersion === "string" && platformVersion.trim().length > 0) {
        return platformVersion.trim();
      }
    }
  } catch (error) {
    console.warn("[Referral] Failed to read userAgentData platformVersion", error);
  }

  const fallback = parseOsVersionFromUA(navigator.userAgent || "");
  return fallback;
}

const generateVisitorId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const random = Math.random().toString(36).slice(2);
  return `recce-${Date.now().toString(36)}-${random}`;
};

export const getOrCreateVisitorId = () => {
  if (typeof window === "undefined") return null;
  try {
    const existing = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY);
    if (existing && existing.length > 0) {
      return existing;
    }
    const nextId = generateVisitorId();
    window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, nextId);
    return nextId;
  } catch {
    return generateVisitorId();
  }
};

async function fetchPublicIp(): Promise<string | null> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    if (!res.ok) return null;
    const data = (await res.json()) as { ip?: string };
    return data?.ip ?? null;
  } catch {
    return null;
  }
}

const isTrackableCode = (code: string | null | undefined) =>
  typeof code === "string" && (isValidReferralCode(code) || isValidCampaignCode(code));

export async function recordReferralHit(referralCode: string) {
  if (!isTrackableCode(referralCode)) return;
  if (typeof navigator === "undefined" || typeof window === "undefined") return;

  const userAgent = navigator.userAgent ?? "unknown";
  const platform = detectPlatform(userAgent);
  const ipAddress = await fetchPublicIp();
  const visitorId = getOrCreateVisitorId();
  const osVersion = await detectOsVersion();

  try {
    await fetch(RECORD_REFERRAL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        referralCode,
        ipAddress,
        userAgent,
        platform,
        pageUrl: window.location.href,
        visitorId,
        osVersion,
      }),
    });
  } catch (error) {
    console.error("[Referral] Failed to record referral", error);
  }
}

type ReferrerDetails = {
  found: boolean;
  name: string | null;
  type: "referral" | "campaign" | null;
};

export async function fetchReferrerDetails(referralCode: string): Promise<ReferrerDetails> {
  try {
    const response = await fetch(REFERRAL_LOOKUP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referralCode }),
    });
    if (!response.ok) {
      return { found: false, name: null, type: null };
    }
    const data = (await response.json()) as { found?: boolean; name?: string | null; type?: "referral" | "campaign" };
    return {
      found: Boolean(data?.found),
      name: data?.name ?? null,
      type: (data?.type as "referral" | "campaign" | undefined) ?? null,
    };
  } catch (error) {
    console.error("[Referral] Failed to fetch referrer details", error);
    return { found: false, name: null, type: null };
  }
}

export async function submitReferralEmail(payload: {
  referralCode: string;
  email: string;
  visitorId?: string | null;
}) {
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent ?? "unknown" : "unknown";
  const platform = detectPlatform(userAgent);
  const pageUrl = typeof window !== "undefined" ? window.location.href : null;
  const visitorId = payload.visitorId ?? getOrCreateVisitorId();
  const osVersion = await detectOsVersion();

  try {
    const response = await fetch(RECORD_REFERRAL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referralCode: payload.referralCode,
        email: payload.email,
        visitorId,
        userAgent,
        platform,
        pageUrl,
        emailCaptureSource: "rewards-email-form",
        osVersion,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to submit referral email (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error("[Referral] Failed to submit referral email", error);
    throw error;
  }
}

export const shouldRecordReferral = () => {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
  return detectPlatform(ua) === "desktop";
};

export const resolveReferralCode = ({
  explicitReferral,
  primaryId,
}: {
  explicitReferral?: string | null;
  primaryId?: string | null;
}) => {
  return resolveReferralContext({ explicitReferral, primaryId }).referralCode;
};

export const shouldRecordReferralNow = (referralCode: string | null) => {
  if (!referralCode) return false;
  if (!isTrackableCode(referralCode)) return false;
  return shouldRecordReferral();
};
