import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const payload = await getPayloadHMR({
  config,
})
