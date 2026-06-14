export type SdgItemMessages = {
  title: string;
  description: string;
  imageAlt: string;
};

export type SponsorTierMessages = {
  title: string;
  price: string;
  features: string[];
};

export type Messages = {
  meta: {
    siteTitle: string;
    siteDescription: string;
    ogDescription: string;
  };
  common: {
    language: string;
    followUs: string;
    navigation: string;
    legalInfo: string;
    contact: string;
    admin: string;
    madeWith: string;
    by: string;
    noLegalPages: string;
    copyright: string;
    scrollToStats: string;
    menuOpen: string;
    homeAria: string;
    close: string;
    enlargeImage: string;
    enlargedImage: string;
    newMessage: string;
    sending: string;
    sendMessage: string;
    sendRequest: string;
    email: string;
    name: string;
    message: string;
    ourSponsors: string;
    shareOnInstagram: string;
    followOnTikTok: string;
    onLinkedIn: string;
  };
  turnstile: {
    missing: string;
    failed: string;
    loadError: string;
    notConfigured: string;
    secretMissingDev: string;
    formUnavailable: string;
  };
  nav: {
    home: string;
    mission: string;
    selfExam: string;
    join: string;
    sponsor: string;
    contact: string;
  };
  hero: {
    lines: [string, string, string];
  };
  home: {
    metaTitle: string;
    statsBadge: string;
    statsTitle: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    aboutBadge: string;
    aboutTitle: string;
    aboutImageAlt: string;
    aboutCta: string;
    fallbackAbout: [string, string, string];
    solutionBadge: string;
    solutionTitle: string;
    solutionDesc: string;
    stepLookTitle: string;
    stepLookDesc: string;
    stepFeelTitle: string;
    stepFeelDesc: string;
    stepUnderstandTitle: string;
    stepUnderstandDesc: string;
    testimonialsBadge: string;
    testimonialsTitle: string;
    fallbackTestimonials: [string, string, string];
    ctaTitle: string;
    ctaText: string;
    ctaJoin: string;
    ctaContact: string;
  };
  mission: {
    metaTitle: string;
    metaDescription: string;
    heroAria: string;
    heroImageAlt: string;
    pageTitle: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionP1: string;
    visionP2: string;
    visionP3: string;
    visionP4: string;
    visionQuote: string;
    sdgTitle: string;
    sdgItems: [SdgItemMessages, SdgItemMessages, SdgItemMessages, SdgItemMessages];
  };
  join: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    title: string;
    headerDesc: string;
    shareLabel: string;
    shareTitle: string;
    shareDesc: string;
    sponsorLabel: string;
    sponsorTitle: string;
    sponsorDesc: string;
    sponsorCta: string;
    sponsorsBadge: string;
    sponsorsTitle: string;
    partnersBadge: string;
    sponsorsDesc: string;
    sponsorsCta: string;
  };
  sponsor: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    title: string;
    headerDesc: string;
    whatYouGet: string;
    generalContact: string;
    formTitle: string;
    formDesc: string;
    successTitle: string;
    successDesc: string;
    company: string;
    preferredTier: string;
    tierUndecided: string;
    tierInterest: (tier: string) => string;
    tierLine: (tier: string) => string;
    companyLine: (company: string) => string;
    submitError: string;
    tiers: {
      brons: SponsorTierMessages;
      zilver: SponsorTierMessages;
      goud: SponsorTierMessages;
    };
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    title: string;
    headerDesc: string;
    formTitle: string;
    formDesc: string;
    successTitle: string;
    successDesc: string;
    subject: string;
    subjectPlaceholder: string;
    subjectGeneral: string;
    subjectPartnership: string;
    subjectSponsoring: string;
    subjectMedia: string;
    subjectOther: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submitError: string;
  };
  zelfonderzoek: {
    metaTitle: string;
    metaDescription: string;
    downloadTitle: string;
    downloadDescription: string;
    downloadButton: string;
  };
  legal: {
    pageNotFound: string;
  };
};
