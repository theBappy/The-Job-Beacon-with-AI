import { JobListingTable } from "@/drizzle/schema";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Badge } from "@/components/ui/badge";
import {
  formatExperienceLevel,
  formatJoblistingLocation,
  formatJobType,
  formatLocationRequirement,
  formatWage,
} from "../lib/formatter";
import {
  BanknoteIcon,
  BuildingIcon,
  GraduationCapIcon,
  HourglassIcon,
  MapPin,
} from "lucide-react";

export function JobListingBadges({
  jobListing: {
    wage,
    wageInterval,
    stateAbbreviation,
    city,
    type,
    experienceLevel,
    locationRequirement,
    isFeatured,
  },
  className,
}: {
  jobListing: Pick<
    typeof JobListingTable.$inferSelect,
    | "wage"
    | "wageInterval"
    | "stateAbbreviation"
    | "city"
    | "type"
    | "experienceLevel"
    | "locationRequirement"
    | "isFeatured"
  >;
  className?: string;
}) {
  const badgeProps = {
    variant: "outline",
    className,
  } satisfies ComponentProps<typeof Badge>;

  return (
    <>
      {isFeatured && (
        <Badge
          {...badgeProps}
          className={cn(
            className,
            "border-featured bg-featured/50 text-featured-foreground"
          )}
        >
          Featured
        </Badge>
      )}
      {wage != null && wageInterval != null && (
        <Badge {...badgeProps}>
          <BanknoteIcon /> {formatWage(wage, wageInterval)}
        </Badge>
      )}
      {stateAbbreviation != null && city != null && (
        <Badge {...badgeProps}>
          <MapPin className="size-10" />{" "}
          {formatJoblistingLocation({ stateAbbreviation, city })}
        </Badge>
      )}
      {stateAbbreviation != null && city != null && (
        <Badge {...badgeProps}>
          <BuildingIcon className="size-10" />{" "}
          {formatLocationRequirement(locationRequirement)}
        </Badge>
      )}
      {stateAbbreviation != null && city != null && (
        <HourglassIcon {...badgeProps}>
          <BuildingIcon className="size-10" /> {formatJobType(type)}
        </HourglassIcon>
      )}
      {stateAbbreviation != null && city != null && (
        <HourglassIcon {...badgeProps}>
          <GraduationCapIcon className="size-10" />{" "}
          {formatExperienceLevel(experienceLevel)}
        </HourglassIcon>
      )}
    </>
  );
}
