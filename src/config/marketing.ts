const clean = (value: string | undefined) => value?.trim() ?? '';

export const marketing = {
  gtmContainerId: clean(import.meta.env.PUBLIC_GTM_CONTAINER_ID) || 'GTM-MDL4773L',
  clarityProjectId: clean(import.meta.env.PUBLIC_CLARITY_PROJECT_ID),
  googleSiteVerification: clean(import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION),
  bingSiteVerification: clean(import.meta.env.PUBLIC_BING_SITE_VERIFICATION),
  yandexVerification: clean(import.meta.env.PUBLIC_YANDEX_VERIFICATION) || '9380d232c85e9ecf',
} as const;

export const hasMarketingRuntime =
  marketing.gtmContainerId !== '' || marketing.clarityProjectId !== '';
