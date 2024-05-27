import Fill from './fill/hash.js'

// base.ts
class Base {
  fill: Fill

  card: Record<string, Card>

  task: Array<Task>

  // env vars
  host: Record<string, unknown>
}
