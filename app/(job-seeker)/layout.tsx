import { AppSidebar } from "@/components/shared-sidebar/app-sidebar";
import { SidebarNavMenuGroup } from "@/components/shared-sidebar/sidebar-nav-menu-group";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarUserButton } from "@/features/users/components/sidebar-user-button";
import { SignedOut } from "@/services/clerk/components/signed-in-status";
import {
  BrainCircuitIcon,
  ClipboardListIcon,
  LayoutDashboard,
  LogInIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function JobSeekerLayout({ children }: { children: ReactNode }) {
  return (
    <AppSidebar
      content={
        <SidebarNavMenuGroup
          className="mt-auto"
          items={[
            { href: "/", icon: <ClipboardListIcon />, label: "Job Beacon" },
            {
              href: "/ai-search",
              icon: <BrainCircuitIcon />,
              label: "AI Search",
            },
            {
              href: "/employer",
              icon: <LayoutDashboard />,
              label: "Employer Dashboard",
              authStatus: "signedIn",
            },
            {
              href: "/sign-in",
              icon: <LogInIcon />,
              label: "Login",
              authStatus: "signedOut",
            },
          ]}
        />
      }
      footerButton={<SidebarUserButton />}
    >
      {children}
    </AppSidebar>
  );
}
