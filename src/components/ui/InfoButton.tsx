"use client"

import * as React from "react"
import Link from "next/link"
import { Info } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function InfoButton({ href = "/info" }: { href?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={href} aria-label="Info">
          <Button variant="ghost" size="icon" asChild>
            <a>
              <Info className="h-4 w-4" />
            </a>
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="bottom">Additional information available on hover</TooltipContent>
    </Tooltip>
  )
}

export default InfoButton
