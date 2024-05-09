export const releaseProfiles = ['production'] as const;
export const releaseChannels = ['production'] as const;

export type ReleaseProfile = (typeof releaseProfiles)[number];
export type ReleaseChannel = (typeof releaseChannels)[number];
