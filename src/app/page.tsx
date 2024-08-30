import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

const payload = await getPayloadHMR({ config })

const blogs = await payload.find({
  collection: 'blog',
})

export default function page() {
  return (
    <div>
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
