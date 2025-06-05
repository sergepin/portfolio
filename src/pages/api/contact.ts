export const prerender = false

import type { APIRoute } from 'astro'

const LAMBDA_URL = import.meta.env.LAMBDA_URL
const ALLOWED_ORIGIN = import.meta.env.ALLOWED_ORIGIN

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()
    const { name, email, subject, message } = data

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400, headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': ALLOWED_ORIGIN
          } }
      )
    }

    const lambdaResponse = await fetch(LAMBDA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const lambdaData = await lambdaResponse.json()

    return new Response(
      JSON.stringify(lambdaData),
      { status: lambdaResponse.status, headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN
        } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ message: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN
        } }
    )
  }
}
