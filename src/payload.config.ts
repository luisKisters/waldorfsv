// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { AdminViewComponent, buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Blog } from './payload/collections/Blog'
import { Events } from './payload/collections/Events'
import { Tickets } from './payload/collections/Tickets'
// import CheckIn from '@/payload/views/CheckIn'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // localization: {
  //   locales: ['en', 'es', 'de'],
  //   defaultLocale: 'en',
  //   fallback: true,
  // },
  i18n: {},
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      views: {
        CheckIn: {
          path: '/check-in',
          Component: {
            path: '@/payload/views/CheckIn',
            exportName: 'CheckIn',
          },
          // meta: {
          //   title: 'Check-In',
          //   description: 'Check-In',
          // },
        },
      },
    },
  },
  collections: [Users, Media, Blog, Events, Tickets],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
