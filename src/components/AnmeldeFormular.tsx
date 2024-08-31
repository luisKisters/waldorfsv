'use client'

import { baseUrl } from '@/app/utils'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface AnmeldeFormularProps {
  eventId: number
}

const AnmeldeFormular: React.FC<AnmeldeFormularProps> = ({ eventId }) => {
  const [formData, setFormData] = useState<{
    name: string
    email: string
    school: string
    dietaryPreferences: 'vegan' | 'vegetarian' | null
    furtherDietaryPreferences: string
  }>({
    name: '',
    email: '',
    school: '',
    dietaryPreferences: null,
    furtherDietaryPreferences: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      console.log(
        JSON.stringify({
          ...formData,
          event: eventId,
          checkedIn: false,
        }),
      )
      console.log('event', eventId)
      const response = await fetch(`${baseUrl}/api/tickets`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          event: eventId,
          ticketNumber: uuidv4(),
          checkedIn: false,
        }),
      })

      if (!response.ok) {
        throw new Error('Error submitting form: ' + response.statusText)
      }

      const data = await response.json()
      console.log(data)
      //   console.log(data)
      console.log('response', response)
      router.push(`/ticket/${data.doc.ticketNumber}`)
    } catch (error) {
      console.log(error)
      throw new Error('Error submitting form: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="Schule"
            required
          />
          <select
            name="dietaryPreferences"
            value={formData.dietaryPreferences || ''}
            onChange={handleChange}
          >
            <option value="">Wähle eine Ernährungsart</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarisch</option>
          </select>
          <textarea
            name="furtherDietaryPreferences"
            value={formData.furtherDietaryPreferences}
            onChange={handleChange}
            placeholder="Weitere Ernährungsdetails"
          />
          <button type="submit">Anmelden</button>
        </form>
      )}
    </div>
  )
}

export default AnmeldeFormular
