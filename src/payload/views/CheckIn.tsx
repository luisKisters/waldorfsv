'use client'

import React, { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { baseUrl } from '@/app/utils'
import qs from 'qs'
import CheckInConfirm from '@/components/CheckInConfirm'
// import { Button } from '@/components/ui/button'

// export default function CheckIn() {
export const CheckIn: React.FC = () => {
  console.log('baseUrl', baseUrl)
  const [ticketNumber, setTicketNumber] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [ticket, setTicket] = useState<any>(null)

  async function handleScan(result: any) {
    const _ticketNumber = result[0].rawValue

    console.log('result[0].rawValue', result[0].rawValue)
    console.log('_ticketNumber', _ticketNumber)
    try {
      const query = {
        ticketNumber: {
          equals: _ticketNumber,
        },
      }
      const stringifiedQuery = qs.stringify(
        {
          where: query, // ensure that `qs` adds the `where` property, too!
        },
        { addQueryPrefix: true },
      )
      console.log(`URL: ${baseUrl}/api/tickets${stringifiedQuery}`)
      const response = await fetch(`${baseUrl}/api/tickets${stringifiedQuery}`)
      const data = await response.json()
      console.log('data: ', data)
      if (data.docs.length === 0) {
        throw new Error('Ticket not found')
      }
      setTicket(data.docs[0])
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching ticket')
    } finally {
      setTicketNumber(_ticketNumber)
      setLoading(false) // Ensure loading is set to false after the operation
    }
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : ticket ? (
        <CheckInConfirm data={ticket} />
      ) : (
        <>
          <h1>Check-In</h1>
          {/* <Button>Test</Button> */}
          <Scanner
            onScan={(result) => {
              handleScan(result)
              setLoading(true)
            }}
          />
        </>
      )}
    </div>
  )
}

// result
// [
//   {
//       "boundingBox": {
//           "x": 348,
//           "y": 268,
//           "width": 181,
//           "height": 192,
//           "top": 268,
//           "right": 529,
//           "bottom": 460,
//           "left": 348
//       },
//       "rawValue": "9b4b3c81-3170-4b46-b2a8-3783ad749ecb",
//       "format": "qr_code",
//       "cornerPoints": [
//           {
//               "x": 348,
//               "y": 293
//           },
//           {
//               "x": 509,
//               "y": 268
//           },
//           {
//               "x": 529,
//               "y": 445
//           },
//           {
//               "x": 367,
//               "y": 460
//           }
//       ]
//   }
// ]
