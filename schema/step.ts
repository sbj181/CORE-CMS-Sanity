import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'step',
  title: 'Step',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which the step appears',
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Estimated Completion Time',
      type: 'number',
      description: 'Estimated time to complete the step in minutes',
    }),
    defineField({
      name: 'nextStep',
      title: 'Next Step',
      type: 'reference',
      to: [{ type: 'step' }],
      description: 'Reference to the next step in the sequence',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'URL of a video related to the step',
    }),
    defineField({
      name: 'resources',
      title: 'Related Resources',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'resource' }],
        },
      ],
      description: 'List of resources related to this step',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image to illustrate the step',
    }),
  ],
})
