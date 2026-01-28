import { type SchemaTypeDefinition } from 'sanity'
import hero from './hero'
import page from './page'
import project from './project'
import settings from './settings'
import company from './company'
import sector from './sector'
import socialActivity from './socialActivity'
import office from './office'

export const schema = {
  types: [
    hero,
    page,
    project,
    settings,
    company,
    sector,
    socialActivity,
    office,
  ],
}