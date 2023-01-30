/*  import {MdCategory} from 'react-icons/md'  */

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  /*   icon: MdCategory, */
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'id',
      title: 'Id',
      type: 'number',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
  ],
}
