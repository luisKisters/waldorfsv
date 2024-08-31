'use server'

// import React, { useEffect, useState } from 'react'
// import { notFound } from 'next/navigation'
// import AnmeldeFormular from '@/components/AnmeldeFormular'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { payload } from '@/lib/utils'
import AnmeldeFormular from '@/components/AnmeldeFormular'

export default async function AnmeldenPage({ params }: { params: { slug: string } }) {
  const response = await payload.find({
    collection: 'events',
    where: {
      title: {
        equals: decodeURIComponent(params.slug),
      },
    },
  })
  const event = response.docs[0]

  console.log('params', params)
  console.log('response', response)
  console.log('event (from page)', event)

  //   useEffect(() => {
  //     const fetchEvent = async () => {
  //       const decodedSlug = decodeURIComponent(params.slug)
  //       const event = await payload.find({
  //         collection: 'events',
  //         where: {
  //           title: {
  //             equals: decodedSlug,
  //           },
  //         },
  //       })

  //       console.log(event)

  //       if (!event.docs.length) {
  //         notFound()
  //       }

  //       const selectedEvent = event.docs[0]
  //       setEvent(selectedEvent)
  //     }

  //     fetchEvent() // {{ edit_3 }}
  //   }, [params.slug]) // {{ edit_4 }}

  return (
    <div className="container mx-auto px-4 py-8">
      <AnmeldeFormular eventId={event?.id} />
    </div>
  )
}
