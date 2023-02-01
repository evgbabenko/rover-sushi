import {MdPerson as icon} from 'react-icons/md'

export default {
  name: 'user',
  title: 'Users',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Please use "Firstname Lastname" format',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      description: 'Please enter city',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Please enter address',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Please enter phone',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {title: 'name', media: 'image'},
  },
}
