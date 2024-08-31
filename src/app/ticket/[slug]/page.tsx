import { payload } from '@/lib/utils'
import { QRCodeSVG } from 'qrcode.react'
import { notFound } from 'next/navigation'
import { Scanner } from '@yudiel/react-qr-scanner'

export default async function TicketPage({ params }: { params: { slug: string } }) {
  console.log('params', params)
  const ticketNumber = params.slug
  console.log('ticketNumber', ticketNumber)

  const res = await payload.find({
    collection: 'tickets',
    depth: 1,
    limit: 1,
    where: { ticketNumber: { equals: ticketNumber } },
  })
  const ticket = res.docs[0]
  !ticket && notFound()

  console.log('ticket', ticket)
  return (
    <div>
      <h1>Ticket</h1>
      {JSON.stringify(ticket)}
      <div className="flex flex-col gap-4">
        <QRCodeSVG value={ticket.ticketNumber} />
      </div>
    </div>
  )
}
