'use client'

import React, { useState } from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

const payload = await getPayloadHMR({ config })

interface AnmeldeFormularProps {
  eventId: number
}

const AnmeldeFormular: React.FC<AnmeldeFormularProps> = ({ eventId }) => {
  const [formData, setFormData] = useState<{
    name: string
    email: string
    school: string
    dietaryPreferences: 'vegan' | 'vegetarian' | null // Update type
  }>({
    name: '',
    email: '',
    school: '',
    dietaryPreferences: null, // Initialize as null
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await payload.create({
        collection: 'tickets',
        data: {
          ...formData,
          event: eventId,
          checkedIn: false,
          dietaryPreferences: formData.dietaryPreferences, // No need for null check
        },
      })
      alert('Anmeldung erfolgreich!')
      setFormData({
        name: '',
        email: '',
        school: '',
        dietaryPreferences: null, // Ensure it defaults to null
      })
    } catch (error) {
      console.error('Fehler bei der Anmeldung:', error)
      alert('Es gab einen Fehler bei der Anmeldung. Bitte versuchen Sie es erneut.')
    }
  }

  //   return (
  //     <form onSubmit={handleSubmit} className="space-y-4">
  //       <div>
  //         <label htmlFor="name" className="block mb-1">
  //           Name
  //         </label>
  //         <input
  //           type="text"
  //           id="name"
  //           name="name"
  //           value={formData.name}
  //           onChange={handleChange}
  //           required
  //           className="w-full px-3 py-2 border rounded"
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="email" className="block mb-1">
  //           E-Mail
  //         </label>
  //         <input
  //           type="email"
  //           id="email"
  //           name="email"
  //           value={formData.email}
  //           onChange={handleChange}
  //           required
  //           className="w-full px-3 py-2 border rounded"
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="school" className="block mb-1">
  //           Schule
  //         </label>
  //         <input
  //           type="text"
  //           id="school"
  //           name="school"
  //           value={formData.school}
  //           onChange={handleChange}
  //           required
  //           className="w-full px-3 py-2 border rounded"
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="dietaryPreferences" className="block mb-1">
  //           Ernährungsvorlieben
  //         </label>
  //         <select
  //           id="dietaryPreferences"
  //           name="dietaryPreferences"
  //           value={formData.dietaryPreferences || ''} // Ensure it defaults to an empty string
  //           onChange={handleChange}
  //           className="w-full px-3 py-2 border rounded"
  //         >
  //           <option value="">Keine besonderen Vorlieben</option>
  //           <option value="vegan">Vegan</option>
  //           <option value="vegetarian">Vegetarisch</option>
  //         </select>
  //       </div>
  //       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  //         Anmelden
  //       </button>
  //     </form>
  //   )
  return (
    <div>
      <p>Anmeldeformular</p>
    </div>
  )
}

export default AnmeldeFormular

// import React from 'react'
// import { getPayloadHMR } from '@payloadcms/next/utilities'
// import config from '@payload-config'

// const payload = await getPayloadHMR({ config })

// const events = await payload.find({
//   collection: 'events',
// })

// export default function AnmeldeFormular() {
//   return (
//     <div>
//       {events.docs.map((event) => (
//         <div key={event.id}>
//           <h1>{event.title}</h1>
//           {/* <p>{event.description}</p> */}
//         </div>
//       ))}
//     </div>
//   )
// }
