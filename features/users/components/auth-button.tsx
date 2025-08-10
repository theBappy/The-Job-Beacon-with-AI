import { Button } from "@/components/ui/button";
import {
  SignInButton as ClerkSignInButton,
  SignOutButton as ClerkSignOutButton,
  SignUpButton as ClerkSignUpButton,
} from "@clerk/nextjs";
import { ComponentProps } from "react";

// The SignInButton component wraps Clerk's SignInButton
export function SignInButton({
  children = <Button>Sign In</Button>,
  ...props
}: ComponentProps<typeof ClerkSignInButton>) {
  return <ClerkSignInButton {...props}>{children}</ClerkSignInButton>;
}

// The SignUpButton component wraps Clerk's SignUpButton
export function SignUpButton({
  children = <Button>Sign Up</Button>,
  ...props
}: ComponentProps<typeof ClerkSignUpButton>) {
  return <ClerkSignUpButton {...props}>{children}</ClerkSignUpButton>;
}

// The SignOutButton component wraps Clerk's SignOutButton
export function SignOutButton({
  children = <Button>Sign Out</Button>,
  ...props
}: ComponentProps<typeof ClerkSignOutButton>) {
  return <ClerkSignOutButton {...props}>{children}</ClerkSignOutButton>;
}