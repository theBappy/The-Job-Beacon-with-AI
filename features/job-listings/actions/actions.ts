"use server";

import { z } from "zod";
import { jobListingSchema } from "./schema";
import { getCurrentOrganization } from "@/services/clerk/lib/get-current-auth";
import { redirect } from "next/navigation";
import { insertJobListing } from "@/features/users/components/db/job-listings";

export async function createJobListing(
  unsafeData: z.infer<typeof jobListingSchema>
) {
  const { orgId } = await getCurrentOrganization();
  if (orgId == null) {
    return {
      error: true,
      message: "You do not have permissions to create a job listing",
    };
  }

  const { success, data } = jobListingSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: "There was an error creating a new job listing",
    };
  }

  const jobListing = await insertJobListing({
    ...data,
    organizationId: orgId,
    status: "draft",
  });

  redirect(`/employer/job-listings/${jobListing.id}`);
}
