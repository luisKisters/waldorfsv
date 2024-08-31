import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { Button } from '@/components/ui/button'

const payload = await getPayloadHMR({ config })

const blogs = await payload.find({
  collection: 'blog',
})

export default function page() {
  return (
    <div>
      <Button>Click me</Button>
      <p>blogs</p>
      {blogs.docs.map((blog) => (
        <div key={blog.id}>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  )
}
