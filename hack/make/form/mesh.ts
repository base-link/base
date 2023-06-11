import { Base } from './base'
import { Riff, RiffCard } from './riff'
import { SiteFork } from './site'

export type MeshLoad = {
  base: Base
  card: RiffCard
  fork: SiteFork
  // link: Link
  riff: Riff
}
