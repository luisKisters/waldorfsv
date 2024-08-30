import React from 'react'
import { notFound } from 'next/navigation'
import AnmeldeFormular from '@/components/AnmeldeFormular'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

const payload = await getPayloadHMR({ config })

export default async function AnmeldenPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug)

  const event = await payload.find({
    collection: 'events',
    where: {
      title: {
        equals: decodedSlug,
      },
    },
  })

  if (!event.docs.length) {
    notFound()
  }

  const selectedEvent = event.docs[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Anmeldung für {selectedEvent.title}</h1>
      <AnmeldeFormular eventId={selectedEvent.id} />
    </div>
  )
}
