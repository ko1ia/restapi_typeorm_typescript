import type { Request } from 'express'

type NoNull = NonNullable<unknown>
// For .body
type RequestBody<T> = Request<NoNull, NoNull, T>
// For .params
type RequestParams<T> = Request<T>
// For .query
type RequestQuery<T> = Request<NoNull, NoNull, NoNull, T>
// And so on... similarly for Response

export { RequestBody, RequestParams, RequestQuery }
