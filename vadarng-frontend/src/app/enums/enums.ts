export enum EnInviteWorkspaceRoleStatus {
  /// Pending.
  Pending = 0,

  /// Accept.
  Accept = 1,

  /// Reject.
  Reject = 2,

  /// Cancel.
  Cancel = 3
}

export enum EnTypeOfDevices {
  /// <summary>
  /// Client.
  /// </summary>
  Client = 0,

  /// <summary>
  /// Server.
  /// </summary>
  Server = 1,

  /// <summary>
  /// NetworkEquipment.
  /// </summary>
  NetworkEquipment = 2
}

export enum EnPermissions {
  /// Full Permission.
  FullPermission = 10000,

  /// Host Setting.
  HostSetting = 1,

  /// Host View.
  HostView = 2,

  /// Group Setting.
  GroupSetting = 3,

  /// Group View.
  GroupView = 4,

  /// Permission View.
  WorkspacePermissionView = 5,

  /// Permission Setting.
  WorkspacePermissionSetting = 6,

  /// Email Notification View.
  EmailNotificationView = 7,

  /// Email Notification Setting.
  EmailNotificationSetting = 8,

  /// Policy View.
  PolicyView = 9,

  /// Policy Setting.
  PolicySetting = 10,

  /// Whitelist Ip View.
  WhitelistIpView = 11,

  /// Whitelist Ip Setting.
  WhitelistIpSetting = 12,

  /// Events View.
  EventsView = 13,

  /// Logs View.
  LogsView = 14,

  /// Dashboard View.
  DashboardView = 15,

  /// All Hosts Setting.
  AllHostsSetting = 16,

  /// All Hosts View.
  AllHostsView = 17,

  /// All Groups Setting.
  AllGroupsSetting = 18,

  /// All Groups View.
  AllGroupsView = 19,

  /// All Dashboards View.
  AllDashboardsView = 20,

  /// All Logs View.
  AllLogsView = 21,

  /// All Events View.
  AllEventsView = 22,

  /// All Notification View.
  AllNotificationView = 23,

  /// Permission Settings.
  AllPermissionSetting = 24,

  /// Role Settings.
  AllRoleSetting = 25,

  /// User Settings.
  AllUserSetting = 26,

  /// User Settings.
  AllActionSetting = 27,

  /// User Settings.
  ActionSetting = 28
}

export enum EnCategoryType {
  /// Post Type.
  Post = 0,

  /// Page Type.
  Page = 1
}

export enum HttpStatus {
  Success = 1,
  Error = 0,
  Fail = -1
}

export enum ExpireStatus {
  Active = 0,
  Inactive = 1,
  Revoked = 2,
  ExpiredDate = 3
}

export enum GroupOfSecurity {
  All = 0,
  Vulnerabilities = 1,
  Integrity_Monitoring = 2,
  Mitre_ATT_CK = 3,
  System_Auditing = 4,
  Policy_Monitoring = 5,
  NIST_80053 = 6,
  PCI_DSS = 7
}

export enum BBException {
  /// Forbidden
  InternalException = 500,

  /// Forbidden
  Forbidden = 403,

  /// Un-Authorized
  UnAuthorized = 401,

  /// User Not Found
  UserNotFound = 1600,

  /// User Restricted
  UserRestricted = 1601,

  /// Permission Invalid
  PermissionInvalid = 1800,

  /// Argument Invalid
  ArgumentInvalid = 2000,

  /// Argument Null
  ArgumentNull = 2001,

  /// Argument Less Than Or Equal Zero
  ArgumentLessThanZero = 2002,

  /// Argument Less Than Or Equal Zero
  ArgumentLessThanOrEqualZero = 2003,

  /// Argument Our Of Range
  ArgumentOutOfRange = 2004,

  /// Argument Null Or Empty
  ArgumentNullOrEmpty = 2005,

  /// Argument Null Or White Space
  ArgumentNullOrWhiteSpace = 2006,

  /// Role Name Exists.
  RoleNameExists = 2008,

  /// Role Already Has User.
  RoleAlreadyHasUser = 2009,

  /// Permission is required.
  PermissionIsRequired = 2010,

  /// File Type Invalid.
  WorkspaceExists = 2013,

  /// File Type Invalid.
  WorkspaceNull = 2014,

  /// File Type Invalid
  GroupExists = 2015,

  /// File Type Invalid
  GroupNull = 2016,

  /// File Type Invalid.
  WorkspaceRoleExists = 2017,

  /// File Type Invalid.
  WorkspaceRoleNull = 2018,

  /// File Type Invalid.
  HostExist = 2019,

  /// File Type Invalid.
  HostNull = 2020,

  /// Invalid Invitation Id.
  InvalidInvitationId = 2021,

  /// GroupHostExist.
  GroupHostExists = 2022,

  /// EngineNotWork.
  EngineNotWork = 2023,

  /// GroupHostExist.
  WhiteIpExists = 2024,

  /// PleaseDeleteGroup.
  PleaseDeleteGroup = 2025,

  /// PleaseDeleteGroup.
  PleaseDeleteHost = 2026,

  /// EmailExistInvite.
  EmailExistInvite = 2027,

  /// EmailInvalid.
  EmailInvalid = 2028,

  /// RolePermissionNull.
  RolePermissionNull = 2029,

  /// WorkspaceRoleHaveMember.
  WorkspaceRoleHaveMember = 2030,

  /// ExpiredTimeNull.
  ExpiredTimeNull = 2031,

  /// ExpiredTimeInvalid.
  ExpiredTimeInvalid = 2032,

  /// HostLimitIsTooLarge.
  HostLimitIsTooLarge = 2039,

  /// CannotActive.
  CannotActive = 2041,

  /// NotInvite
  NotInvite = 2045,

  /// InvitationInvalid.
  InvitationInvalid = 2046,

  /// <summary>
  /// EmailNotCreatedOnIDserver.
  /// </summary>
  EmailNotCreatedOnIDserver = 2047,

  /// <summary>
  /// TeleTokenInValid.
  /// </summary>
  TeleTokenInValid = 2050,

  /// <summary>
  /// ConditionIsNotSatisfied.
  /// </summary>
  ConditionIsNotSatisfied = 2054
}

export enum SecurityNotificationCondition {
  Below = 0,
  Above = 1
}

export enum SecurityNotificationChannel {
  emails = 0,
  slack = 1,
  telegram = 2,
  zalo = 3,
  sms = 4
}

export enum SecurityLogDevices {
  workstations = 0,
  server = 1,
  network = 2
}
