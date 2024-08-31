'use client'

import { baseUrl } from '@/app/utils'
import React, { useState } from 'react'
import qs from 'qs'

export default function CheckInConfirm({ data }: { data: any }) {
  const [loading, setLoading] = useState(false)
  const [checkedIn, setCheckedIn] = useState(data.checkedIn)

  async function handleCheckIn() {
    const stringifiedQuery = qs.stringify(
      {
        where: {
          ticketNumber: {
            equals: data.ticketNumber,
          },
        },
      },
      { addQueryPrefix: true },
    )

    try {
      const req = await fetch(`${baseUrl}/api/tickets${stringifiedQuery}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkedIn: true,
        }),
      })
      const data = await req.json()
      console.log('data', data)
      if (data.error) throw new Error(data.error)
      setCheckedIn(true)
    } catch (err) {
      console.error(err)
      throw new Error('Error checking in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Check-In</h1>
      {checkedIn ? (
        <p>Checked in</p>
      ) : (
        <>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>School: {data.school}</p>
          <button
            disabled={loading}
            onClick={() => {
              handleCheckIn()
              setLoading(true)
            }}
          >
            Check-In
          </button>
        </>
      )}
    </div>
  )
}

// data
// Ticket: {"data":{"docs":[{"id":13,"name":"test","email":"test@test.com","school":"test","dietaryPreferences":"vegan","furtherDietaryPreferences":"test","event":{"id":1,"title":"35. BST","startDate":"2024-09-26T14:00:00.000Z","endDate":"2024-09-29T12:00:00.000Z","location":"Augsburg","description":{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"tag":"h1","type":"heading","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"Spielerisch","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"Warum nicht öfter im Büro tanzen?","type":"text","style":"","detail":0,"format":0,"version":1},{"type":"linebreak","version":1},{"mode":"normal","text":"Warum sich auf der suche nach seinem großen Glück, von Kleinigkeiten ausbremsen lassen? Sind wir erwachsen, oder nur großgewordene Kinder? Ist ein Lachen nicht die beste Musik? Kinder lachen beim lernen- warum wir nicht?","type":"text","style":"","detail":0,"format":0,"version":1},{"type":"linebreak","version":1},{"mode":"normal","text":"Lachfalten macht unser inneres Kind.","type":"text","style":"","detail":0,"format":0,"version":1},{"type":"linebreak","version":1},{"mode":"normal","text":"Warum nicht selbstbewusst den Bauch rausstrecken?","type":"text","style":"","detail":0,"format":0,"version":1},{"type":"linebreak","version":1},{"mode":"normal","text":"Verträumt und verspielt in der eigenen Welt sein, als die Farben noch bunter waren. Mit viel Spaß die Wellen surfen, anstatt dagegen anzukämpfen. Mit Leichtigkeit durchs Leben. Wer den ernsten Dingen zu viel Aufmerksamkeit widmet, verliert dabei oft den Blick für die wahrhaftige Schönheit des Lebens.","type":"text","style":"","detail":0,"format":0,"version":1},{"type":"linebreak","version":1},{"mode":"normal","text":"Warum nicht auch mal anders?","type":"text","style":"","detail":0,"format":0,"version":1},{"type":"linebreak","version":1},{"mode":"normal","text":"„Ynnovation“","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":"ltr","textStyle":"","textFormat":0}],"direction":"ltr"}},"event_school":"FWS Augsburg","flyer":{"id":1,"alt":"Tagungs Flyer","updatedAt":"2024-08-30T23:01:35.294Z","createdAt":"2024-08-30T23:01:35.294Z","url":"/api/media/file/PlakatNeonPinkFinalV2-1-scaled.webp","thumbnailURL":null,"filename":"PlakatNeonPinkFinalV2-1-scaled.webp","mimeType":"image/webp","filesize":4922,"width":271,"height":384,"focalX":50,"focalY":50},"updatedAt":"2024-08-30T23:05:27.234Z","createdAt":"2024-08-30T23:05:27.234Z"},"ticketNumber":"9b4b3c81-3170-4b46-b2a8-3783ad749ecb","checkedIn":false,"updatedAt":"2024-08-31T11:26:55.468Z","createdAt":"2024-08-31T11:26:55.468Z"}],"hasNextPage":false,"hasPrevPage":false,"limit":10,"nextPage":null,"page":1,"pagingCounter":1,"prevPage":null,"totalDocs":1,"totalPages":1}}

// build a button that says "Check-In" and when clicked, it will call the API to check in the user

// this is from the docs

// import qs from "qs";

// const stringifiedQuery = qs.stringify({
//   where: {
//     title: {
//       contains: "New",
//     },
//   },
// },{ addQueryPrefix: true });

// try {
//   const req = await fetch('{cms-url}/api/{collection-slug}/{stringifiedQuery}', {
//     method: "PATCH",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title: "I have been updated!"
//     }),
//   })
//   const data = await req.json()
// } catch (err) {
//   console.log(err)
// }
