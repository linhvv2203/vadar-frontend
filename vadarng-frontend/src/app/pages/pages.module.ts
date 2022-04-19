import { NgModule } from "@angular/core";

import { ComponentsModule } from "src/app/components/components.module";
import { DirectivesModule } from "../directives/directives.module";
// page
import { Dashboard } from "./dashboard/dashboard";
import { CreateGroup } from "./group/components/create-group/create-group.component";
// component
import { TableScanedComponent } from "./group/components/table-group/table-group.component";
import { GroupComponent } from "./group/group.component";
import { WorkspacesComponent } from "./workspaces/workspaces.component";
import { CreateWorkspacesComponent } from "./workspaces/create-workspaces/create-workspaces.component";
import { TableWorkspacesComponent } from "./workspaces/table-workspaces/table-workspaces.component";
import { HostComponent } from "./host/host.component";
import { TableHostComponent } from "./host/components/table-host/table-host.component";
import { CreateHostComponent } from "./host/components/create-host/create-host.component";
import { AddHostToGroupComponent } from "./group/add-host-to-group/add-host-to-group.component";
import { HostEditComponent } from "./host/host-edit/host-edit.component";
import { TopComponent } from "./host/components/top/top.component";
import { HostEditFormComponent } from "./host/components/host-edit-form/host-edit-form.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { NotificationsTopComponent } from "./notifications/components/notifications-top/notifications-top.component";
import { DsEventsPerformnceComponent } from "./dashboard/components/ds-events-performnce/ds-events-performnce.component";
import { DsEventsAtttComponent } from "./dashboard/components/ds-events-attt/ds-events-attt.component";
import { DsSummaryComponent } from "./dashboard/components/ds-summary/ds-summary.component";
import { EventComponent } from "./event/event.component";
import { EventTopComponent } from "./event/components/event-top/event-top.component";
import { EventTableComponent } from "./event/components/event-table/event-table.component";
import { ActionComponent } from "./action/action.component";
import { ActionTopComponent } from "./action/components/action-top/action-top.component";
import { ActionTableComponent } from "./action/components/action-table/action-table.component";
import { ActionEditComponent } from "./action/action-edit/action-edit.component";
import { ActionEditFormComponent } from "./action/components/action-edit-form/action-edit-form.component";
import { ActionCreateComponent } from "./action/components/action-create/action-create.component";
import { ActionTableWhitelistComponent } from "./action/components/action-table-whitelist/action-table-whitelist.component";
import { GuideComponent } from "./guide/guide.component";
import { RolesComponent } from "./roles/roles.component";
import { MembersComponent } from "./members/members.component";
import { TableRolesComponent } from "./roles/components/table-roles/table-roles.component";
import { CreateRolesComponent } from "./roles/components/create-roles/create-roles.component";
import { TableMembersComponent } from "./members/components/table-members/table-members.component";
import { EditRolesComponent } from "./roles/edit-roles/edit-roles.component";
import { EditRolesFormComponent } from "./roles/components/edit-roles-form/edit-roles-form.component";
import { PopupInviteMembersComponent } from "./members/components/popup-invite-members/popup-invite-members.component";
import { PopupResendInviteComponent } from "./members/components/popup-resend-invite/popup-resend-invite.component";
import { PopupCancelInviteComponent } from "./members/components/popup-cancel-invite/popup-cancel-invite.component";
import { InvitationConfirmComponent } from "./members/components/invitation-confirm/invitation-confirm.component";
import { TableHostOfGroupComponent } from "./group/components/table-host-of-group/table-host-of-group.component";
import { DsAttackIpMapComponent } from "./dashboard/components/ds-attack-ip-map/ds-attack-ip-map.component";
import { DsTopAttackIpComponent } from "./dashboard/components/ds-top-attack-ip/ds-top-attack-ip.component";
import { PerformanceComponent } from "./performance/performance.component";
import { TopPerformanceComponent } from "./performance/components/top-performance/top-performance.component";
import { SecurityComponent } from "./security/security.component";
import { TopSecurityComponent } from "./security/components/top-security/top-security.component";
import { TableLogsPerformanceComponent } from "./performance/components/table-logs-performance/table-logs-performance.component";
import { FilterLogsPerformanceComponent } from "./performance/components/filter-logs-performance/filter-logs-performance.component";
import { TableLogsSecurityComponent } from "./security/components/table-logs-security/table-logs-security.component";
import { FilterLogsSecurityComponent } from "./security/components/filter-logs-security/filter-logs-security.component";
import { NetworkComponent } from "./network/network.component";
import { VadarTopNetworkComponent } from "./network/components/vadar-top-network/vadar-top-network.component";
import { FilterLogsNetworkComponent } from "./network/components/filter-logs-network/filter-logs-network.component";
import { TableLogsNetworkComponent } from "./network/components/table-logs-network/table-logs-network.component";
import { LicenseComponent } from "./license/license.component";
import { PopupDetailNetworkComponent } from "./network/components/popup-detail-network/popup-detail-network.component";
import { PopupDetailSecurityComponent } from "./security/components/popup-detail-security/popup-detail-security.component";
import { PopupDetailPerformanceComponent } from "./performance/components/popup-detail-performance/popup-detail-performance.component";
import { CancelModalComponent } from "./members/components/cancel-modal/cancel-modal.component";
import { ConfirmPopupComponent } from "./roles/components/confirm-popup/confirm-popup.component";
import { ConfirmAddHostModalComponent } from "./group/components/confirm-add-host-modal/confirm-add-host-modal.component";
import { SummarySecurityComponent } from "./security/components/summary-security/summary-security.component";
import { SecurityEventsComponent } from "./security/components/summary-security/security-events/security-events.component";
import { TopEventsByLevelComponent } from "./security/components/summary-security/components/top-events-by-level/top-events-by-level.component";
import { SecurityVulnerabilitiesComponent } from "./security/components/summary-security/security-vulnerabilities/security-vulnerabilities.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { SecurityIntegrityMonitoringComponent } from "./security/components/summary-security/security-integrity-monitoring/security-integrity-monitoring.component";
import { MitreAttCkComponent } from "./security/components/summary-security/mitre-att-ck/mitre-att-ck.component";
import { PciDssComponent } from "./security/components/summary-security/pci-dss/pci-dss.component";
import { TicketComponent } from "./ticket/ticket.component";
import { TableTicketsComponent } from "./ticket/components/table-tickets/table-tickets.component";
import { FilterTicketsComponent } from "./ticket/components/filter-tickets/filter-tickets.component";
import { TopTicketsComponent } from "./ticket/components/top-tickets/top-tickets.component";
import { PopupDetailTicketComponent } from "./ticket/components/popup-detail-ticket/popup-detail-ticket.component";
import { PopupConfirmModalTicketComponent } from "./ticket/components/popup-confirm-modal-ticket/popup-confirm-modal-ticket.component";
import { PopupConfirmCloseModalTicketComponent } from "./ticket/components/popup-confirm-close-modal-ticket/popup-confirm-close-modal-ticket.component";
import { NotificationSettingComponent } from "./notifications/notification-setting/notification-setting.component";
import { PopupConfirmAddConditionComponent } from "./notifications/popup-confirm-add-condition/popup-confirm-add-condition.component";
import { GroupByNameComponent } from "./security/components/group-by-name/group-by-name.component";
import { GrfSecurityComponent } from "./host/grf-security/grf-security.component";
import { GrfSecurityTable5Component } from "./host/grf-security/components/grf-security-table5/grf-security-table5.component";
import { GrfSecurityTable4Component } from "./host/grf-security/components/grf-security-table4/grf-security-table4.component";
import { GrfSecurityTable3Component } from "./host/grf-security/components/grf-security-table3/grf-security-table3.component";
import { GrfSecurityGraph1Component } from "./host/grf-security/components/grf-security-graph1/grf-security-graph1.component";
import { GrfSecurityGraph2Component } from "./host/grf-security/components/grf-security-graph2/grf-security-graph2.component";
import { GrfPerformanceComponent } from "./host/grf-performance/grf-performance.component";
import { TopGrfSecurityComponent } from "./host/grf-security/components/top-grf-security/top-grf-security.component";

@NgModule({
  imports: [ComponentsModule, DirectivesModule],
  declarations: [
    Dashboard,
    CreateGroup,
    TableScanedComponent,
    GroupComponent,
    WorkspacesComponent,
    CreateWorkspacesComponent,
    TableWorkspacesComponent,
    HostComponent,
    TableHostComponent,
    CreateHostComponent,
    AddHostToGroupComponent,
    HostEditComponent,
    TopComponent,
    HostEditFormComponent,
    TopPerformanceComponent,
    TopSecurityComponent,
    TableLogsPerformanceComponent,
    TableLogsSecurityComponent,
    FilterLogsPerformanceComponent,
    FilterLogsSecurityComponent,
    NotificationsComponent,
    NotificationsTopComponent,
    DsEventsPerformnceComponent,
    DsEventsAtttComponent,
    DsSummaryComponent,
    EventComponent,
    EventTopComponent,
    EventTableComponent,
    ActionComponent,
    ActionTopComponent,
    ActionTableComponent,
    ActionEditComponent,
    ActionEditFormComponent,
    ActionCreateComponent,
    ActionTableWhitelistComponent,
    GuideComponent,
    RolesComponent,
    MembersComponent,
    TableRolesComponent,
    CreateRolesComponent,
    TableMembersComponent,
    EditRolesComponent,
    EditRolesFormComponent,
    PopupInviteMembersComponent,
    PopupResendInviteComponent,
    PopupCancelInviteComponent,
    InvitationConfirmComponent,
    TableHostOfGroupComponent,
    DsAttackIpMapComponent,
    DsTopAttackIpComponent,
    PerformanceComponent,
    TopPerformanceComponent,
    SecurityComponent,
    TopSecurityComponent,
    NetworkComponent,
    VadarTopNetworkComponent,
    FilterLogsNetworkComponent,
    TableLogsNetworkComponent,
    LicenseComponent,
    PopupDetailNetworkComponent,
    PopupDetailSecurityComponent,
    PopupDetailPerformanceComponent,
    CancelModalComponent,
    ConfirmPopupComponent,
    ConfirmAddHostModalComponent,
    SummarySecurityComponent,
    SecurityEventsComponent,
    TopEventsByLevelComponent,
    SecurityVulnerabilitiesComponent,
    FeedbackComponent,
    SecurityIntegrityMonitoringComponent,
    MitreAttCkComponent,
    PciDssComponent,
    TicketComponent,
    TableTicketsComponent,
    FilterTicketsComponent,
    TopTicketsComponent,
    PopupConfirmAddConditionComponent,
    PopupDetailTicketComponent,
    PopupConfirmModalTicketComponent,
    PopupConfirmCloseModalTicketComponent,
    NotificationSettingComponent,
    GroupByNameComponent,
    GrfSecurityComponent,
    GrfSecurityTable5Component,
    GrfSecurityTable4Component,
    GrfSecurityTable3Component,
    GrfSecurityGraph1Component,
    GrfSecurityGraph2Component,
    GrfPerformanceComponent,
    TopGrfSecurityComponent
  ],
  exports: [
    CreateGroup,
    TableScanedComponent,
    TopPerformanceComponent,
    TopSecurityComponent,
    TableLogsPerformanceComponent,
    TableLogsSecurityComponent,
    FilterLogsPerformanceComponent,
    FilterLogsSecurityComponent,
    NotificationsTopComponent,
    FilterLogsNetworkComponent,
    TableLogsNetworkComponent,
    CancelModalComponent
  ]
})
export class PagesModule {}
