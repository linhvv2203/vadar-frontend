import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "src/app/services/auth/auth-guard.service";
// container
import { NotFoundComponent } from "src/app/containers/not-found/not-found.component";
import { UnauthorizedComponent } from "src/app/containers/unauthorized/unauthorized.component";
import { ForbiddenComponent } from "src/app/containers/forbidden/forbidden.component";
import { CallbackComponent } from "src/app/containers/callback/callback/callback.component";
import { CallbackSilentComponent } from "src/app/containers/callback/callback-silent/callback-silent.component";
//
import { LayoutComponent } from "src/app/components/layout/layout.component";
//
import { Dashboard } from "src/app/pages/dashboard/dashboard";
import { GroupComponent } from "./pages/group/group.component";
import { WorkspacesComponent } from "./pages/workspaces/workspaces.component";
import { HostComponent } from "./pages/host/host.component";
import { AddHostToGroupComponent } from "./pages/group/add-host-to-group/add-host-to-group.component";
import { HostEditComponent } from "./pages/host/host-edit/host-edit.component";
import { NotificationsComponent } from "./pages/notifications/notifications.component";
import { EventComponent } from "./pages/event/event.component";
import { ActionComponent } from "./pages/action/action.component";
import { ActionEditComponent } from "./pages/action/action-edit/action-edit.component";
import { GuideComponent } from "./pages/guide/guide.component";
import { RolesComponent } from "./pages/roles/roles.component";
import { MembersComponent } from "./pages/members/members.component";
import { EditRolesComponent } from "./pages/roles/edit-roles/edit-roles.component";
import { InvitationConfirmComponent } from "./pages/members/components/invitation-confirm/invitation-confirm.component";
import { ChooseWorkspaceComponent } from "./containers/choose-workspace/choose-workspace.component";
import { PerformanceComponent } from "./pages/performance/performance.component";
import { SecurityComponent } from "./pages/security/security.component";
import { NetworkComponent } from "./pages/network/network.component";
import { LicenseComponent } from "./pages/license/license.component";
import { LogoutComponent } from "./containers/logout/logout.component";
import { FeedbackComponent } from "./pages/feedback/feedback.component";
import { TicketComponent } from "./pages/ticket/ticket.component";
import { GrfSecurityComponent } from "./pages/host/grf-security/grf-security.component";

const routes: Routes = [
  {
    path: "callback",
    pathMatch: "full",
    component: CallbackComponent
  },
  {
    path: "callback-silent",
    pathMatch: "full",
    component: CallbackSilentComponent
  },
  {
    path: "unauthorized",
    component: UnauthorizedComponent
  },
  {
    path: "logout",
    component: LogoutComponent
  },
  {
    path: "members",
    children: [
      {
        path: "invitation-confirm/:inviteCode/:name",
        component: InvitationConfirmComponent
      }
    ]
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "forbidden",
        component: ForbiddenComponent
      },
      {
        path: "choose-workspace",
        component: ChooseWorkspaceComponent
      },
      {
        path: "",
        component: Dashboard
      },
      {
        path: "dashboard",
        component: Dashboard
      },
      {
        path: "group",
        children: [
          {
            path: "",
            component: GroupComponent
          },
          {
            path: "add-host",
            component: AddHostToGroupComponent
          }
        ]
      },
      {
        path: "workspaces",
        component: WorkspacesComponent
      },
      {
        path: "feedback",
        component: FeedbackComponent
      },
      {
        path: "ticket",
        component: TicketComponent
      },
      {
        path: "license",
        component: LicenseComponent
      },
      {
        path: "host",
        children: [
          {
            path: "",
            component: HostComponent
          },
          {
            path: "edit",
            component: HostEditComponent
          },
          {
            path: "grf-security",
            component: GrfSecurityComponent
          }
        ]
      },
      {
        path: "performance",
        children: [
          {
            path: "",
            component: PerformanceComponent
          }
        ]
      },
      {
        path: "security",
        children: [
          {
            path: "",
            component: SecurityComponent
          }
        ]
      },
      {
        path: "network",
        children: [
          {
            path: "",
            component: NetworkComponent
          }
        ]
      },
      {
        path: "roles",
        children: [
          {
            path: "",
            component: RolesComponent
          },
          {
            path: "edit",
            component: EditRolesComponent
          }
        ]
      },
      {
        path: "member",
        children: [
          {
            path: "",
            component: MembersComponent
          }
          // {
          //   path: "invitation-confirm/:inviteCode/:name",
          //   component: InvitationConfirmComponent
          // }
        ]
      },
      {
        path: "notifications",
        children: [
          {
            path: "",
            component: NotificationsComponent
          }
        ]
      },
      {
        path: "events",
        children: [
          {
            path: "",
            component: EventComponent
          }
        ]
      },
      {
        path: "actions",
        children: [
          {
            path: "",
            component: ActionComponent
          },
          {
            path: "edit",
            component: ActionEditComponent
          }
        ]
      },
      {
        path: "guide",
        children: [
          {
            path: "",
            component: GuideComponent
          }
        ]
      },
      {
        path: "**",
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
