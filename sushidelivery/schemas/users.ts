import {defineField, defineType} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'

export default defineType({
  name: 'users',
  title: 'Users',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Please use "Firstname Lastname" format',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      description: 'Please enter city',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Please enter address',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Please enter phone',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {title: 'name', media: 'image'},
  },
})
