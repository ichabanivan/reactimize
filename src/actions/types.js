import createConst from './createConst';

const APP = {
  SET_DIRECTION: '@app/SET_DIRECTION',
  LANGUAGE: createConst('@app/LANGUAGE'),
};

export const AUTH = {
  SIGNED: '@auth/SIGNED',
  LOGIN_TYPE_FACEBOOK: 'facebook',
  LOGIN_TYPE_TWITTER: 'twitter',
  LOGIN_TYPE_GOOGLE: 'google',
  SOCIAL_SIGN_UP: createConst('@auth/SOCIAL_SIGN_UP'),
  SOCIAL_GET_TOKEN: createConst('@auth/SOCIAL_GET_TOKEN'),
  FORGOT_PASSWORD: createConst('@auth/FORGOT_PASSWORD'),
  SIGN_IN: createConst('@auth/SIGN_IN'),
  SIGN_OUT: createConst('@auth/SIGN_OUT'),
  SIGN_UP: createConst('@auth/SIGN_UP'),
  GET_SELF: createConst('@auth/GET_SELF'),
  UPDATE_PROFILE: createConst('@auth/UPDATE_PROFILE'),
  CHECK_HEATH: createConst('@auth/CHECK_HEATH'),
  REFRESH_SESSION: createConst('@auth/REFRESH_SESSION'),
  RESTORE_SESSION: createConst('@auth/RESTORE_SESSION'),
  EMAIL_CONFIRMATION: createConst('@auth/EMAIL_CONFIRMATION'),
  CHANGE_PASSWORD: createConst('@auth/CHANGE_PASSWORD'),
  UPDATE_PASSWORD: createConst('@auth/UPDATE_PASSWORD'),
  VERIFY_PASSWORD_TOKEN: createConst('@auth/VERIFY_PASSWORD_TOKEN'),
};

export const UI = {
  SIDEMENU: createConst('@ui/SIDEMENU'),
};

export const SERIES = {
  SERIES: createConst('@series/SERIES'),
  SERIES_FILTER: createConst('@series/SERIES_FILTER'),
  SERIES_LIST: createConst('@series/SERIES_LIST'),
  EPISODES: createConst('@series/EPISODES'),
  SYNOPSIS: createConst('@series/SYNOPSIS'),
  MOST_WATCHED: createConst('@series/MOST_WATCHED'),
  MULTIMEDIA_RANDOM: createConst('@series/MULTIMEDIA_RANDOM'),
  MULTIMEDIA_ROLE: createConst('@series/MULTIMEDIA_ROLE'),
  SERIES_STAFF: createConst('@series/SERIES_STAFF'),
  EXCLUSIVE: createConst('@series/EXCLUSIVE'),
  NEWS: createConst('@series/NEWS'),
  NEWS_MEDIA: createConst('@series/NEWS_MEDIA'),
  NEWS_MEDIA_ROLE: createConst('@series/NEWS_MEDIA_ROLE'),
};

export const PROGRAMS = {
  PROGRAM: createConst('@programs/PROGRAM'),
  PROGRAMS_LIST: createConst('@programs/PROGRAMS_LIST'),
  MOST_WATCHED: createConst('@programs/MOST_WATCHED'),
  MOST_WATCHED_SYNOPSIS: createConst('@programs/MOST_WATCHED_SYNOPSIS'),
  SPECIAL_MEETINGS: createConst('@programs/SPECIAL_MEETINGS'),
  VIDEOS: createConst('@programs/VIDEOS'),
  FULL_EPISODES: createConst('@programs/FULL_EPISODES'),
  SYNOPSISES: createConst('@programs/SYNOPSISES'),
  SPONSORS: createConst('@programs/SPONSORS'),
  PRESENTERS: createConst('@programs/PRESENTERS'),
  SPECIAL_GUEST_SYNOPSIS: createConst('@programs/SPECIAL_GUEST_SYNOPSIS'),
  PROGRAM_EPISODES_FILTER: createConst('@programs/PROGRAM_EPISODES_FILTER'),
  PROGRAM_GUESTS_FILTER: createConst('@programs/PROGRAM_GUESTS_FILTER'),
  PROGRAMS_FILTER: createConst('@programs/PROGRAMS_FILTER'),
};

export const SYSTEM = {
  COUNTRIES: createConst('@system/COUNTRIES'),
  NATIONALITY: createConst('@system/NATIONALITY'),
  SUBJECTS: createConst('@system/SUBJECTS'),
  SERIES_GENRES: createConst('@system/SERIES_GENRES'),
  MESSAGE: createConst('@system/MESSAGE'),
  PROGRAM_MESSAGE: createConst('@system/PROGRAM_MESSAGE'),
  WATCH_NEWS: createConst('@system/WATCH_NEWS'),
  WATCH_REPORTAGE: createConst('@system/WATCH_REPORTAGE'),
  WATCH_NEWS_MEDIA: createConst('@system/WATCH_NEWS_MEDIA'),
  WATCH_VIDEO: createConst('@system/WATCH_VIDEO'),
  PLAYLISTS: createConst('@system/PLAYLISTS'),
  CONFIRMATION: createConst('@system/CONFIRMATION'),
  SEARCH: createConst('@system/SEARCH'),
  SEARCH_SUGGESTED: createConst('@system/SEARCH_SUGGESTED'),
  YES: '@system/YES',
  NO: '@system/NO',
};

export const PERSONS = {
  SERIES_STAR: createConst('@persons/SERIES_STAR'),
  SERIES_STARS: createConst('@persons/SERIES_STARS'),
  RANDOM_STARS: createConst('@persons/RANDOM_STARS'),
  PROGRAM_GUEST: createConst('@persons/PROGRAM_GUEST'),
  PROGRAM_GUESTS_SHOW: createConst('@persons/PROGRAM_GUESTS_SHOW'),
  PROGRAM_GUESTS: createConst('@persons/PROGRAM_GUESTS'),
  LATEST_GUEST: createConst('@persons/LATEST_GUEST'),
  PRESENTERS: createConst('@persons/PRESENTERS'),
  PROGRAM_FAMOUS_GUESTS: createConst('@persons/PROGRAM_FAMOUS_GUESTS'),
  PROGRAM_STAFF: createConst('@persons/PROGRAM_STAFF'),
  MANAGED_PRESENTERS: createConst('@persons/MANAGED_PRESENTERS'),
  STARS: createConst('@persons/STARS'),
  STAR: createConst('@persons/STAR'),
  STARS_FAMOUS_WORKS: createConst('@persons/STARS_FAMOUS_WORKS'),
  NEWS_MEDIA_STAR: createConst('@series/NEWS_MEDIA_STAR'),
};

export const NEWS = {
  NEWS: createConst('@news/NEWS'),
  ALL: createConst('@news/ALL'),
  SERIES: createConst('@news/SERIES'),
  PROGRAM: createConst('@news/PROGRAM'),
  REPORTS: createConst('@news/NEWS_REPORT'),
  MULTIMEDIA: createConst('@news/MULTIMEDIA'),
  MULTIMEDIA_RANDOM: createConst('@news/MULTIMEDIA_RANDOM'),
  MULTIMEDIA_EXCLUSIVE: createConst('@news/MULTIMEDIA_EXCLUSIVE'),
  EXCLUSIVE_NEWS: createConst('@news/EXCLUSIVE_NEWS'),
  REPORTAGE: createConst('@news/REPORTAGE'),
  MOST_WATCHED_NEWS: createConst('@news/MOST_WATCHED_NEWS'),
  NEWS_MEDIA: createConst('@news/NEWS_MEDIA'),
};

export const QUIZZES = {
  LATEST: createConst('@quizzes/LATEST'),
  ADD_ANSWER: createConst('@quizzes/ADD_ANSWER'),
  QUESTIONNAIRES: createConst('@quizzes/QUESTIONNAIRES'),
  QUESTIONNAIRE: createConst('@quizzes/QUESTIONNAIRE'),
  LATEST_PROGRAM_POLL_QUIZ: createConst('@quizzes/LATEST_PROGRAM_POLL_QUIZ'),
  LATEST_SERIES_POLL_QUIZ: createConst('@quizzes/LATEST_SERIES_POLL_QUIZ'),
  LATEST_SERIES_QUESTIONNAIRE_QUIZ: createConst('@quizzes/LATEST_SERIES_QUESTIONNAIRE_QUIZ'),
  LATEST_QUESTIONNAIRE_QUIZ: createConst('@quizzes/LATEST_QUESTIONNAIRE_QUIZ'),
};

export const MAIN = {
  HOMEPAGE_FEATURED_SLIDER: createConst('@main/HOMEPAGE_FEATURED_SLIDER'),
  HOMEPAGE: createConst('@main/HOMEPAGE'),
  SERIESPAGE: createConst('@main/SERIESPAGE'),
  PROGRAMPAGE: createConst('@main/PROGRAMPAGE'),
  NEWSPAGE: createConst('@main/NEWSPAGE'),
  HOMEPAGE_MOST_WATCHED: createConst('@main/HOMEPAGE_MOST_WATCHED'),
  TIMELINES_CBC: createConst('@main/TIMELINES_CBC'),
  TIMELINES_DRAMA: createConst('@main/TIMELINES_DRAMA'),
  LIVE_NOW: createConst('@main/LIVE_NOW'),
  TIMELINES_SCHEDULE: createConst('@main/TIMELINES_SCHEDULE'),
};

export const VIDEO = {
  SYNOPSIS: createConst('@video/SYNOPSIS'),
  SERIALS_SYNOPSIS: createConst('@video/SERIALS_SYNOPSIS'),
  EPISODE: createConst('@video/EPISODE'),
  EXCLUSIVE: createConst('@video/EXCLUSIVE'),
};

export const PROFILE = {
  FOLLOWED_SERIES: createConst('@profile/FOLLOWED_SERIES'),
  FOLLOWED_PROGRAMS: createConst('@profile/FOLLOWED_PROGRAMS'),
  MOST_WATCHED: createConst('@profile/MOST_WATCHED'),
  WATCHED_NEWS_MEDIA: createConst('@profile/WATCHED_NEWS_MEDIA'),
  WATCHED_NEWS: createConst('@profile/WATCHED_NEWS'),
  WATCHED_PROGRAMS: createConst('@profile/WATCHED_PROGRAMS'),
  WATCHED_SERIES: createConst('@profile/WATCHED_SERIES'),
  WATCHED_VIDEOS: createConst('@profile/WATCHED_VIDEOS'),
  WATCHED_NEWS_REPORTS: createConst('@profile/WATCHED_NEWS_REPORTS'),
  WATCHED_PROGRAMS_AND_SERIES: createConst('@profile/WATCHED_PROGRAMS_AND_SERIES'),
  // Recommended
  RECOMMENDED_SERIES: createConst('@profile/RECOMMENDED_SERIES'),
  RECOMMENDED_PROGRAMS: createConst('@profile/RECOMMENDED_PROGRAMS'),
  RECOMMENDED_STARS: createConst('@profile/RECOMMENDED_STARS'),
  RECOMMENDED_NEWS: createConst('@profile/RECOMMENDED_NEWS'),
  RECOMMENDED_NEWS_MEDIA: createConst('@profile/RECOMMENDED_NEWS_MEDIA'),
  // Follow
  FOLLOW: createConst('@profile/FOLLOW'),
  UNFOLLOW: createConst('@profile/UNFOLLOW'),
  // Playlists
  CREATE_PLAYLIST: createConst('@profile/CREATE_PLAYLIST'),
  SIMPLE_PLAYLISTS: createConst('@profile/SIMPLE_PLAYLISTS'),
  PLAYLISTS: createConst('@profile/PLAYLISTS'),
  PLAYLIST: createConst('@profile/PLAYLIST'),
  DELETE_PLAYLIST: createConst('@profile/DELETE_PLAYLIST'),
  ADD_ITEM_TO_PLAYLIST: createConst('@profile/ADD_ITEM_TO_PLAYLIST'),
  DELETE_ITEM_FROM_PLAYLIST: createConst('@profile/DELETE_ITEM_FROM_PLAYLIST'),
  VIDEO_LIKE: createConst('@profile/VIDEO_LIKE'),
  VIDEO_UNLIKE: createConst('@profile/VIDEO_UNLIKE'),
};

export const ADS = {
  ENTITY_ADS: createConst('@ads/ENTITY_ADS'),
  PAGE_ADS: createConst('@ads/PAGE_ADS'),
  CUSTOM_ADS: createConst('@ads/CUSTOM_ADS'),
  DEFAULT_ADS: createConst('@ads/DEFAULT_ADS'),
};

export default APP;
