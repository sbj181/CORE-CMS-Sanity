import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
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
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'blockContent',  // Now using blockContent type for rich text editing
    }),
    defineField({
      name: 'imageSrc',
      title: 'Image Source',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'viewDetailsButtonText',
      title: 'View Details Button Text',
      type: 'string',
    }),
    defineField({
      name: 'shareButtonText',
      title: 'Share Button Text',
      type: 'string',
    }),
    defineField({
      name: 'resourceDetailsLink',
      title: 'Resource Details Link',
      type: 'url',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'lastModified',
      title: 'Last Modified',
      type: 'string',
    }),
    defineField({
      name: 'BMSResourceLink',
      title: 'BMS Resource Link',
      type: 'url',
    }),
    defineField({
      name: 'PfizerResourceLink',
      title: 'Pfizer Resource Link',
      type: 'url',
    }),
    defineField({
      name: 'RelatedResources',
      title: 'Related Resources',
      type: 'object',
      fields: [
        defineField({
          name: 'tags',
          type: 'array',
          of: [{ type: 'string' }],
          title: 'Tags'
        }),
        defineField({
          name: 'titles',
          type: 'array',
          of: [{ type: 'string' }],
          title: 'Titles'
        }),
      ],
    }),
  ],
})
