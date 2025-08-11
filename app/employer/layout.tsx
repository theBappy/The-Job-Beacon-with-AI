import { AppSidebar } from "@/components/shared-sidebar/app-sidebar";
import { SidebarNavMenuGroup } from "@/components/shared-sidebar/sidebar-nav-menu-group";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { SidebarOrganizationButton } from "@/features/organtizations/sidebar-organization-button";
import { getCurrentOrganization } from "@/services/clerk/lib/get-current-auth";
import { ClipboardListIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

export default function EmployerLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <LayoutSuspense>{children}</LayoutSuspense>
    </Suspense>
  );
}

async function LayoutSuspense({ children }: { children: ReactNode }) {
  const { orgId } = await getCurrentOrganization();
  if (orgId == null) return redirect("/organizations/select");
  return (
    <AppSidebar
      content={
        <>
          <SidebarGroup>
            <SidebarGroupLabel>Job Listings</SidebarGroupLabel>
          </SidebarGroup>
          <SidebarGroupAction title="Add Job Listing" asChild>
            <Link href="/employer/job-listings/new">
              <PlusIcon />
              <span className="sr-only">Add Job Listing</span>
            </Link>
          </SidebarGroupAction>
          <SidebarNavMenuGroup
            className="mt-auto"
            items={[
              { href: "/", icon: <ClipboardListIcon />, label: "Job Beacon" },
            ]}
          />
        </>
      }
      footerButton={<SidebarOrganizationButton />}
    >
      {children}
    </AppSidebar>
  );
}
