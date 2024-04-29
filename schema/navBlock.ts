import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'navBlock',
  title: 'Navigation Block',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name from your chosen icon set, e.g., mdi:head-idea-outline'
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'viewDetailsButtonText',
      title: 'View Details Button Text',
      type: 'string'
    }),
    defineField({
      name: 'resourceDetailsLink',
      title: 'Resource Details Link',
      type: 'string'
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      options: {
        list: [
          { title: 'Half', value: 'half' },
          { title: 'Full', value: 'full' }
        ],
        layout: 'radio' // or 'dropdown'
      },
      description: 'Set the width of the nav block'
    })
  ]
});
