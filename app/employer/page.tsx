import { Suspense } from "react";
import { getCurrentOrganization } from "../../services/clerk/lib/get-current-auth";
import { db } from "../../drizzle/db";
import { JobListingTable } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getJobListingOrganizationTag } from "@/features/job-listings/cache/job-listing";

export default function EmployerHomePage() {
  return (
    <Suspense>
      <SuspendedPage></SuspendedPage>
    </Suspense>
  );
}

async function SuspendedPage() {
  const { orgId } = await getCurrentOrganization();

  if (orgId == null) return null;

  const jobListing = await getMostRecentJobListing(orgId);

  if (jobListing == null) {
    redirect("/employer/job-listings/new");
  } else {
    redirect(`/employer/job-listings-${jobListing.id}`);
  }
}

async function getMostRecentJobListing(orgId: string) {
  "use cache";

  // TODO
  cacheTag(getJobListingOrganizationTag(orgId));

  return db.query.JobListingTable.findFirst({
    where: eq(JobListingTable.organizationId, orgId),
    orderBy: desc(JobListingTable.createdAt),
    columns: { id: true },
  });
}
