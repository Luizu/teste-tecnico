/**
 * Session Management - Gerencia o sessionId nos cookies
 */

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const SESSION_COOKIE_NAME = 'cart_session_id';
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

/**
 * Obtém ou cria um sessionId
 */
export async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    sessionId = uuidv4();
    cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
      maxAge: SESSION_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }

  return sessionId;
}

/**
 * Obtém o sessionId (se existir)
 */
export async function getSessionId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}
