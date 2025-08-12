import { Badge } from "@/components/ui/badge";
import { db } from "@/drizzle/db";
import { JobListingTable } from "@/drizzle/schema";
import { getJobListingIdTag } from "@/features/job-listings/cache/job-listing";
import { JobListingBadges } from "@/features/job-listings/components/job-listing-badges";
import { formatJobListingStatus } from "@/features/job-listings/lib/formatter";
import { getCurrentOrganization } from "@/services/clerk/lib/get-current-auth";
import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ jobListingId: string }>;
};

export default function JobListingIdPage(props: Props) {
  return (
    <Suspense>
      <SuspendedPage {...props} />
    </Suspense>
  );
}

async function SuspendedPage({ params }: Props) {
  const { orgId } = await getCurrentOrganization();
  if (orgId == null) return null;

  const { jobListingId } = await params;
  const jobListing = await getJobListing(jobListingId, orgId);

  if (jobListing == null) return notFound();

  return <div className="space-y-6 max-w-6xl max-auto p-4 @container">
    <div className="flex items-center justify-between gap-4 @max-4xl:flex-col @max-4xl:items-start">
        <div className="">
        <h1 className="text-2xl font-bold tracking-tight">
            {jobListing.title}
        </h1>
        <div className="flex flex-wrap gap-2 mt-2">
            <Badge>{formatJobListingStatus(jobListing.status)}</Badge>
            <JobListingBadges jobListing={jobListing} />
        </div>
        </div>
        <div className="flex items-center gap-2 empty:-mt-4">
            
        </div>
    </div>
  </div>
}

async function getJobListing(jobListingId: string, orgId: string) {
  "use cache";

  cacheTag(getJobListingIdTag(jobListingId));

  return db.query.JobListingTable.findFirst({
    where: and(
      eq(JobListingTable.id, jobListingId),
      eq(JobListingTable.organizationId, orgId)
    ),
  });
}
