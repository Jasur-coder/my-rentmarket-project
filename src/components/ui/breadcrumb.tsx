import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    aria-label="Breadcrumb"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
)

const BreadcrumbList = ({
  className,
  ...props
}: React.ComponentProps<"ol">) => (
  <ol
    className={cn("flex flex-wrap items-center gap-1.5 sm:gap-2.5", className)}
    {...props}
  />
)

const BreadcrumbItem = ({
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />
)

const BreadcrumbLink = ({
  className,
  ...props
}: React.ComponentProps<"a">) => (
  <a
    className={cn(
      "transition-colors hover:text-foreground text-muted-foreground",
      className,
    )}
    {...props}
  />
)

const BreadcrumbPage = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-current="page"
    className={cn("font-semibold text-foreground", className)}
    {...props}
  />
)

const BreadcrumbSeparator = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    className={cn("flex h-3 w-3 items-center justify-center", className)}
    {...props}
  >
    <ChevronRight className="h-3 w-3" aria-hidden="true" />
  </span>
)

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}

