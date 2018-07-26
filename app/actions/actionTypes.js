const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const INIT 		= 'INIT';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, INIT].forEach(type => res[type] = `${base}_${type}`);
  return res;}

// Login events
export const LOGIN = createRequestTypes('LOGIN');
export const LOGOUT = createRequestTypes('LOGOUT');
export const REGISTER = createRequestTypes('REGISTER');
export const LOGIN_FROM_REGISTRATION = createRequestTypes('LOGIN_FROM_REGISTRATION');

// Account
export const ACCOUNT_USERINFO = createRequestTypes('ACCOUNT_USERINFO');
export const ACCOUNT_MANAGEINFO = createRequestTypes('ACCOUNT_MANAGEINFO');
export const ACCOUNT_CHANGEPASSWORD = createRequestTypes('ACCOUNT_CHANGEPASSWORD');
export const ACCOUNT_SETPASSWORD = createRequestTypes('ACCOUNT_SETPASSWORD');
export const ACCOUNT_ADDEXTERNALLOGIN = createRequestTypes('ACCOUNT_ADDEXTERNALLOGIN');
export const ACCOUNT_REMOVELOGIN = createRequestTypes('ACCOUNT_REMOVELOGIN');
export const ACCOUNT_EXTERNALLOGIN = createRequestTypes('ACCOUNT_EXTERALLOGIN');
export const ACCOUNT_EXTERNALLOGINS = createRequestTypes('ACCOUNT_EXTERNALLOGINS');

// CoachCalendar
export const COARCHCALENDAR_APPOINTMENTS = createRequestTypes('COARCHCALENDAR_APPOINTMENTS');
export const COARCHCALENDAR_REQUESTAPPONTMENT = createRequestTypes('COARCHCALENDAR_REQUESTAPPONTMENT');

// Person
export const PERSON_ID = createRequestTypes('PERSON_ID');
export const PERSON = createRequestTypes('PERSON');

// Organizatin events
export const ORGANIZATION_USERORG = createRequestTypes('ORGANIZATION_USERORG');
export const ORGANIZATION = createRequestTypes('ORGANIZATION');

// Prompt
export const PROMPTS_ID_ANSWER = createRequestTypes('PROMPTS_ID_ANSWER');
export const PROMPTS_GETALL = createRequestTypes('PROMPTS_GETALL');
export const PROMPTS_ID = createRequestTypes('PROMPTS_ID');
export const PROMPT = createRequestTypes('PROMPT');

// RUMs events
export const RUMSLIST = createRequestTypes('RUMSLIST');
export const RUMSLIST_CREAT = createRequestTypes('RUMSLIST_DETAILS');
export const RUMS_CREATE = createRequestTypes('RUMS_CREATE');
export const RUMS_UPDATE = createRequestTypes('RUMS_UPDATE');
export const RUMS_DELETE = createRequestTypes('RUMS_DELETE');
export const RUMS_SORT = createRequestTypes('RUMS_SORT');

// User events
export const USER = createRequestTypes('USER');
export const USER_DETAILS = createRequestTypes('USER_DETAILS');
export const USER_ID_ACTIONS = createRequestTypes('USER_ID_ACTIONS');
export const USER_ID_ACTION_DETAILS = createRequestTypes('USER_ID_ACTION_DETAILS');
export const USER_ID_NOTIFICATIONS = createRequestTypes('USER_ID_NOTIFICATIONS');
export const USER_LEADS_SELECT = createRequestTypes('USER_LEADS_SELECT');
export const USER_UPDATE = createRequestTypes('USER_UPDATE');

// Action events
export const ACTIONS_OPEN = createRequestTypes('ACTIONS_OPNE');
export const ACTIONS_HISTORY = createRequestTypes('ACTIONS_HISTORY');
export const ACTIONS_PERSON_ID = createRequestTypes('ACTIONS_PERSON_ID');
export const ACTIONS_COMPLETE_ID = createRequestTypes('ACTIONS_COMPLETE_ID');
export const ACTIONS_ADD = createRequestTypes('ACTIONS_ADD');
export const ACTIONS_UPDATE = createRequestTypes('ACTIONS_UPDATE');
export const ACTIONS_ID = createRequestTypes('ACTIONS_ID');
export const GET_USERACTION = createRequestTypes('GET_USERACTION');
export const POST_USERACTION = createRequestTypes('POST_USERACTION');

// Notification events
export const NOTIFICATIONS_INDEX = createRequestTypes('NOTIFICATION_INDEX');
export const NOTIFICATIONS_DISMISS_ID = createRequestTypes('NOTIFICATIONS_DISMISS_ID');
export const NOTIFICATIONS_SENDFEEDBACKEMAIL = createRequestTypes('NOTIFICATIONS_SENDFEEDBACKEMAIL');

export const CHECKED_ONBOARDING_WELCOME = 'CHECKED_ONBOARDING_WELCOME';
export const CHECKED_ONBOARDING_INTERACT = 'CHECKED_ONBOARDING_INTERACT';
export const CHECKED_ONBOARDING_LEARN = 'CHECKED_ONBOARDING_LEARN';
export const CHECKED_ONBOARDING_READY_TO_BEGIN = 'CHECKED_ONBOARDING_READY_TO_BEGIN';
export const CHECKED_ONBOARDING_TRACK = 'CHECKED_ONBOARDING_TRACK';
export const CHECKED_ONBOARDING_SELF = 'CHECKED_ONBOARDING_SELF';
export const CHECKED_ONBOARDING_WELCOME_TO_PURSUIT = 'CHECKED_ONBOARDING_WELCOME_TO_PURSUIT';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
