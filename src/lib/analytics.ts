import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = "b1bc9de3f668fe76f0d93b031b7e1147";
const MIXPANEL_OPTIONS = {
  autocapture: true,
  record_sessions_percent: 100,
  api_host: "https://api-eu.mixpanel.com",
} as const;

let isInitialized = false;

const ensureInit = () => {
  if (isInitialized) return true;
  if (typeof window === "undefined") return false;

  mixpanel.init(MIXPANEL_TOKEN, MIXPANEL_OPTIONS);
  isInitialized = true;
  return true;
};

const track = (event: string, props?: Record<string, unknown>) => {
  if (!ensureInit()) return;
  mixpanel.track(event, props);
};

export const analytics = {
  init: () => ensureInit(),
  trackPageView: (props: { page: string; entityId?: string | null; referralCode?: string | null }) =>
    track("Page View", {
      page: props.page,
      entityId: props.entityId ?? undefined,
      referralCode: props.referralCode ?? undefined,
    }),
  trackDeleteRequestSubmitted: (props: { emailProvided: boolean; userIdProvided: boolean }) =>
    track("Delete Request Submitted", props),
  trackDeleteRequestFailed: (props: { error: string; emailProvided: boolean; userIdProvided: boolean }) =>
    track("Delete Request Failed", props),
  trackReviewViewed: (props: { reviewId: string; referralCode?: string | null }) =>
    track("Review Page Viewed", {
      reviewId: props.reviewId,
      referralCode: props.referralCode ?? undefined,
    }),
  trackReviewOpenInApp: (props: { reviewId: string; referralCode?: string | null }) =>
    track("Review Open In App Clicked", {
      reviewId: props.reviewId,
      referralCode: props.referralCode ?? undefined,
    }),
  trackProfileViewed: (props: { profileId: string; referralCode?: string | null }) =>
    track("Profile Page Viewed", {
      profileId: props.profileId,
      referralCode: props.referralCode ?? undefined,
    }),
  trackProfileAutoRedirect: (props: { profileId: string; referralCode?: string | null; platform: "android" | "ios" }) =>
    track("Profile Auto Redirect Attempt", {
      profileId: props.profileId,
      referralCode: props.referralCode ?? undefined,
      platform: props.platform,
    }),
  trackProfileOpenInApp: (props: { profileId: string; referralCode?: string | null }) =>
    track("Profile Open In App Clicked", {
      profileId: props.profileId,
      referralCode: props.referralCode ?? undefined,
    }),
  trackRewardAutoRedirect: (props: { rewardCode: string; referralCode?: string | null; platform: "android" | "ios" }) =>
    track("Reward Auto Redirect Attempt", {
      rewardCode: props.rewardCode,
      referralCode: props.referralCode ?? undefined,
      platform: props.platform,
    }),
  trackRewardOpenInApp: (props: { rewardCode: string; referralCode?: string | null }) =>
    track("Reward Open In App Clicked", {
      rewardCode: props.rewardCode,
      referralCode: props.referralCode ?? undefined,
    }),
};

export type Analytics = typeof analytics;
