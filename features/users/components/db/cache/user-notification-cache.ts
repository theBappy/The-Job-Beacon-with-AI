import { getGlobalTag, getIdTag } from "@/services/clerk/lib/data-cache";
import { revalidateTag } from "next/cache";

export function getUserNotificationSettingsGlobalTag() {
  return getGlobalTag("userNotificationSettings");
}

export function getUserNotificationSettingsIdTag(userId: string) {
  return getIdTag("userNotificationSettings", userId);
}

export function revalidateUserNotificationSettingsCache(userId: string) {
  revalidateTag(getUserNotificationSettingsGlobalTag());
  revalidateTag(getUserNotificationSettingsIdTag(userId));
}
