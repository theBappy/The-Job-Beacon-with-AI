
import { inngest } from "@/services/clerk/components/inngest/client";
import { clerkCreateUser, clerkDeleteUser, clerkUpdateUser } from "@/services/clerk/components/inngest/functions/clerk";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [clerkCreateUser, clerkUpdateUser, clerkDeleteUser],
});
