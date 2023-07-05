import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

type MiddlewareType = (
  req: NextRequest,
  res: NextResponse,
  callback: (result: unknown) => void,
) => void

const applyMiddleware =
  (middleware: MiddlewareType) =>
  (request: NextRequest, response: NextResponse) =>
    new Promise((resolve, reject) => {
      middleware(request, response, result =>
        result instanceof Error ? reject(result) : resolve(result),
      )
    })

export default applyMiddleware
