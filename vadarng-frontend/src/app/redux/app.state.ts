import { ActionReducerMap } from "@ngrx/store";
import { RouterReducerState, routerReducer } from "@ngrx/router-store";

import { IRouterStateUrl } from "src/app/services/router-serializer/router.state";

import { settingReducers } from "./setting/reducers";
import { leftMenuReducers } from "./left-menu/reducers";
import { firstActiveReducers } from "./first-active/reducers";
import { authReducers } from "./auth/reducers";
import { loaderReducers } from "./loader/reducers";

import { initialSettingState, ISettingState } from "./setting/models";
import { initialAuthState, IState as IAuthState } from "./auth/models";

import {
  IState as IGroupState,
  reducers as groupReducers,
  initialState as initialGroupState
} from "src/app/redux/group";

import {
  IState as IHostState,
  reducers as hostReducers,
  initialState as initialHostState
} from "src/app/redux/host";

import {
  IState as ILogsPerformanceState,
  reducers as logsPerformanceReducers,
  initialState as initialLogsPerformanceState
} from "src/app/redux/logs-performance";

import {
  IState as ILogsNetworkState,
  reducers as logsNetworkReducers,
  initialState as initialLogsNetworkState
} from "src/app/redux/logs-network";

import {
  IState as ILogsSecurityState,
  reducers as logsSecurityReducers,
  initialState as initialLogsSecurityState
} from "src/app/redux/logs-security";

import {
  IState as ILogsSecurityGroupByState,
  reducers as logsSecurityGroupByReducers,
  initialState as initialLogsSecurityGroupByState
} from "src/app/redux/logs-security-group-by";

import {
  IState as IEventsState,
  reducers as eventsReducers,
  initialState as initialEventsState
} from "src/app/redux/events";

import {
  IState as IWorkspacesState,
  reducers as workspacesReducers,
  initialState as initialWorkspacesState
} from "src/app/redux/workspaces";

import {
  IState as IWorkspaceRolesState,
  reducers as workspaceRolesReducers,
  initialState as initialWorkspaceRolesState
} from "src/app/redux/workspaceRoles";

import {
  IState as ISummaryState,
  reducers as summaryReducers,
  initialState as initialSummaryState
} from "src/app/redux/summary";

import {
  IState as IPerformanceEventStatisticsState,
  reducers as performanceEventStatisticsReducers,
  initialState as initialPerformanceEventStatisticsState
} from "src/app/redux/performance-event-statistics";

import {
  IState as ISecurityEventStatisticsState,
  reducers as securityEventStatisticsReducers,
  initialState as initialSecurityEventStatisticsState
} from "src/app/redux/security-event-statistics";

import {
  IState as ISecurityAlertLevelEvolutionState,
  reducers as SecurityAlertLevelEvolutionReducers,
  initialState as initialSecurityAlertLevelEvolutionState
} from "src/app/redux/security-alert-level-evolution";

import {
  IState as ISecurityAlertsState,
  reducers as SecurityAlertsReducers,
  initialState as initialSecurityAlertsState
} from "src/app/redux/security-alerts";

import {
  IState as ILogSecuritySummaryState,
  reducers as LogSecuritySummaryReducers,
  initialState as initialLogSecuritySummaryState
} from "src/app/redux/log-security-summary";

import {
  IState as IActionState,
  reducers as actionReducers,
  initialState as initialActionState
} from "src/app/redux/action";

import {
  IState as IActionWhiteListState,
  reducers as actionWhiteListReducers,
  initialState as initialActionWhiteListState
} from "src/app/redux/action-white-list";

import {
  IState as IEventsSecurityState,
  reducers as eventsSecurityReducers,
  initialState as initialEventsSecurityState
} from "src/app/redux/events-secutiry";

import {
  IState as IEventsPerformanceState,
  reducers as eventsPerformanceReducers,
  initialState as initialEventsPerformanceState
} from "src/app/redux/events-performance";

import {
  IState as ITop10EventsState,
  reducers as top10EventsReducers,
  initialState as initialTop10EventsState
} from "src/app/redux/top-10-events";

import {
  IState as ITop10AttackIpState,
  reducers as top10AttackIpReducers,
  initialState as initialTop10AttackIpState
} from "src/app/redux/top-10-attack-ip";

import {
  IState as IMembersState,
  reducers as membersReducers,
  initialState as initialMembersState
} from "src/app/redux/members";

import {
  IState as IUserState,
  reducers as usersReducers,
  initialState as initialUsersState
} from "src/app/redux/user";

import {
  IState as IAlertChannelState,
  reducers as alertChannelReducers,
  initialState as initialAlertChannelState
} from "src/app/redux/notifications";

import {
  IState as ISecurityTopEventAgentsState,
  reducers as securityTopEventAgentsReducers,
  initialState as initialSecurityTopEventAgentsState
} from "src/app/redux/security-top-event-by-agents";

import {
  IState as ISecurityAgentStatusStatisticalState,
  reducers as SecurityAgentStatusStatisticalReducers,
  initialState as initialSecurityAgentStatusStatisticalState
} from "src/app/redux/security-agent-status-statistical";

import {
  IState as ISecurityMostAffectedAgentsState,
  reducers as SecurityMostAffectedAgentsReducers,
  initialState as initialSecurityMostAffectedAgentsState
} from "src/app/redux/security-most-affected-agents";

import {
  IState as ISecurityAlertsSeverityState,
  reducers as SecurityAlertsSeverityReducers,
  initialState as initialSecurityAlertsSeverityState
} from "src/app/redux/security-alerts-severity";

import {
  IState as ISecurityMostCommonCVEsState,
  reducers as SecurityMostCommonCVEsReducers,
  initialState as initialSecurityMostCommonCVEsState
} from "src/app/redux/security-most-common-CVEs";

import {
  IState as ISecurityMostCommonCWEsState,
  reducers as SecurityMostCommonCWEsReducers,
  initialState as initialSecurityMostCommonCWEsState
} from "src/app/redux/security-most-common-CWEs";

import {
  IState as ISecurityalertsByActionOverTimeState,
  reducers as SecurityalertsByActionOverTimeReducers,
  initialState as initialSecurityalertsByActionOverTimeState
} from "src/app/redux/security-alerts-by-action-over-time";

import {
  IState as ISecurityTop5AgentsState,
  reducers as SecurityTop5AgentsReducers,
  initialState as initialSecurityTop5AgentsState
} from "src/app/redux/security-top-5-agents";

import {
  IState as ISecurityEventsSummaryState,
  reducers as SecurityEventsSummaryReducers,
  initialState as initialSecurityEventsSummaryState
} from "src/app/redux/security-events-summary";

import {
  IState as ISecurityAlertEvolutionOverTimeState,
  reducers as SecurityAlertEvolutionOverTimeReducers,
  initialState as initialSecurityAlertEvolutionOverTimeState
} from "src/app/redux/security-alert-evolution-over-time";

import {
  IState as ISecurityTopRequirementsOverTimeState,
  reducers as SecurityTopRequirementsOverTimeReducers,
  initialState as initialSecurityTopRequirementsOverTimeState
} from "src/app/redux/security-top-requirements-over-time";

import {
  IState as ISecurityTopAgentsByAlertsState,
  reducers as SecurityTopAgentsByAlertsReducers,
  initialState as initialSecurityTopAgentsByAlertsState
} from "src/app/redux/security-top-agents-by-alerts";

import {
  IState as ISecurityTopEventsByLevelState,
  reducers as SecurityTopEventsByLevelReducers,
  initialState as initialSecurityTopEventsByLevelState
} from "src/app/redux/security-top-events-by-level";

import {
  IState as ISecurityReqPCIDSSState,
  reducers as SecurityReqPCIDSSReducers,
  initialState as initialSecurityReqPCIDSSState
} from "src/app/redux/security-requirements-pci-dss";

import {
  IState as ISecurityVulSummaryState,
  reducers as SecurityVulSummaryReducers,
  initialState as initialSecurityVulSummaryState
} from "src/app/redux/security-vul-summary";

import {
  IState as ILogTicketState,
  reducers as LogTicketReducers,
  initialState as initialLogTicketState
} from "src/app/redux/logs-ticket";

export interface IAppState {
  workspaceRoles: IWorkspaceRolesState;
  workspaces: IWorkspacesState;
  events: IEventsState;
  logPerformance: ILogsPerformanceState;
  logSecurity: ILogsSecurityState;
  logSecurityGroupBy: ILogsSecurityGroupByState;
  logNetwork: ILogsNetworkState;
  router?: RouterReducerState<IRouterStateUrl>;
  setting: ISettingState;
  auth: IAuthState;
  loading: boolean;
  showLeftMenu: boolean;
  firstActive: boolean;
  group: IGroupState;
  host: IHostState;
  summary: ISummaryState;
  performanceEventStatistics: IPerformanceEventStatisticsState;
  securityEventStatistics: ISecurityEventStatisticsState;
  securityAlertLevelEvolution: ISecurityAlertLevelEvolutionState;
  securityAlerts: ISecurityAlertsState;
  logSecuritySummary: ILogSecuritySummaryState;
  action: IActionState;
  actionWhiteList: IActionWhiteListState;
  eventsSecurity: IEventsSecurityState;
  eventsPerformance: IEventsPerformanceState;
  top10AttackIp: ITop10AttackIpState;
  top10events: ITop10EventsState;
  members: IMembersState;
  users: IUserState;
  alertChannel: IAlertChannelState;
  securityTopEventAgents: ISecurityTopEventAgentsState;
  securityAgentStatusStatistical: ISecurityAgentStatusStatisticalState;
  securityMostAffectedAgents: ISecurityMostAffectedAgentsState;
  securityAlertsSeverity: ISecurityAlertsSeverityState;
  securityMostCommonCVEs: ISecurityMostCommonCVEsState;
  securityMostCommonCWEs: ISecurityMostCommonCWEsState;
  securityAlertsByActionOverTime: ISecurityalertsByActionOverTimeState;
  securityTop5Agents: ISecurityTop5AgentsState;
  securityEventsSummary: ISecurityEventsSummaryState;
  securityAlertEvolutionOverTime: ISecurityAlertEvolutionOverTimeState;
  securityTopRequirementsOverTime: ISecurityTopRequirementsOverTimeState;
  securityTopAgentsByAlerts: ISecurityTopAgentsByAlertsState;
  securityTopEventsByLevel: ISecurityTopEventsByLevelState;
  securityReqPCIDSS: ISecurityReqPCIDSSState;
  securityVulSummary: ISecurityVulSummaryState;
  logTicket: ILogTicketState;
}

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  setting: settingReducers,
  auth: authReducers,
  loading: loaderReducers,
  showLeftMenu: leftMenuReducers,
  firstActive: firstActiveReducers,
  group: groupReducers,
  host: hostReducers,
  logPerformance: logsPerformanceReducers,
  logSecurity: logsSecurityReducers,
  logSecurityGroupBy: logsSecurityGroupByReducers,
  logNetwork: logsNetworkReducers,
  events: eventsReducers,
  workspaces: workspacesReducers,
  workspaceRoles: workspaceRolesReducers,
  summary: summaryReducers,
  performanceEventStatistics: performanceEventStatisticsReducers,
  securityEventStatistics: securityEventStatisticsReducers,
  securityAlertLevelEvolution: SecurityAlertLevelEvolutionReducers,
  securityAlerts: SecurityAlertsReducers,
  logSecuritySummary: LogSecuritySummaryReducers,
  action: actionReducers,
  actionWhiteList: actionWhiteListReducers,
  eventsSecurity: eventsSecurityReducers,
  eventsPerformance: eventsPerformanceReducers,
  top10events: top10EventsReducers,
  top10AttackIp: top10AttackIpReducers,
  members: membersReducers,
  users: usersReducers,
  alertChannel: alertChannelReducers,
  securityTopEventAgents: securityTopEventAgentsReducers,
  securityAgentStatusStatistical: SecurityAgentStatusStatisticalReducers,
  securityMostAffectedAgents: SecurityMostAffectedAgentsReducers,
  securityAlertsSeverity: SecurityAlertsSeverityReducers,
  securityMostCommonCVEs: SecurityMostCommonCVEsReducers,
  securityMostCommonCWEs: SecurityMostCommonCWEsReducers,
  securityAlertsByActionOverTime: SecurityalertsByActionOverTimeReducers,
  securityTop5Agents: SecurityTop5AgentsReducers,
  securityEventsSummary: SecurityEventsSummaryReducers,
  securityAlertEvolutionOverTime: SecurityAlertEvolutionOverTimeReducers,
  securityTopRequirementsOverTime: SecurityTopRequirementsOverTimeReducers,
  securityTopAgentsByAlerts: SecurityTopAgentsByAlertsReducers,
  securityTopEventsByLevel: SecurityTopEventsByLevelReducers,
  securityReqPCIDSS: SecurityReqPCIDSSReducers,
  securityVulSummary: SecurityVulSummaryReducers,
  logTicket: LogTicketReducers
};

export const initialAppState: IAppState = {
  setting: initialSettingState,
  auth: initialAuthState,
  loading: false,
  showLeftMenu: false,
  firstActive: true,
  group: initialGroupState,
  host: initialHostState,
  logPerformance: initialLogsPerformanceState,
  logSecurity: initialLogsSecurityState,
  logSecurityGroupBy: initialLogsSecurityGroupByState,
  logNetwork: initialLogsNetworkState,
  events: initialEventsState,
  workspaces: initialWorkspacesState,
  workspaceRoles: initialWorkspaceRolesState,
  summary: initialSummaryState,
  performanceEventStatistics: initialPerformanceEventStatisticsState,
  securityEventStatistics: initialSecurityEventStatisticsState,
  securityAlertLevelEvolution: initialSecurityAlertLevelEvolutionState,
  securityAlerts: initialSecurityAlertsState,
  logSecuritySummary: initialLogSecuritySummaryState,
  action: initialActionState,
  actionWhiteList: initialActionWhiteListState,
  eventsSecurity: initialEventsSecurityState,
  eventsPerformance: initialEventsPerformanceState,
  top10events: initialTop10EventsState,
  top10AttackIp: initialTop10AttackIpState,
  members: initialMembersState,
  users: initialUsersState,
  alertChannel: initialAlertChannelState,
  securityTopEventAgents: initialSecurityTopEventAgentsState,
  securityAgentStatusStatistical: initialSecurityAgentStatusStatisticalState,
  securityMostAffectedAgents: initialSecurityMostAffectedAgentsState,
  securityAlertsSeverity: initialSecurityAlertsSeverityState,
  securityMostCommonCVEs: initialSecurityMostCommonCVEsState,
  securityMostCommonCWEs: initialSecurityMostCommonCWEsState,
  securityAlertsByActionOverTime: initialSecurityalertsByActionOverTimeState,
  securityTop5Agents: initialSecurityTop5AgentsState,
  securityEventsSummary: initialSecurityEventsSummaryState,
  securityAlertEvolutionOverTime: initialSecurityAlertEvolutionOverTimeState,
  securityTopRequirementsOverTime: initialSecurityTopRequirementsOverTimeState,
  securityTopAgentsByAlerts: initialSecurityTopAgentsByAlertsState,
  securityTopEventsByLevel: initialSecurityTopEventsByLevelState,
  securityReqPCIDSS: initialSecurityReqPCIDSSState,
  securityVulSummary: initialSecurityVulSummaryState,
  logTicket: initialLogTicketState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
