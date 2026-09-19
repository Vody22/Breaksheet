# Security

## Scope

Breaksheet is currently a static Vite/React planning interface deployed on Vercel. It does not currently expose an authentication system, database, API route, file upload endpoint, or server-side form processing.

## Controls currently applicable

- No API keys or private credentials are required by the frontend.
- No `service_role` or privileged database key is shipped to the browser.
- No passwords or authentication cookies are handled by the application.
- No user-upload endpoint exists.
- Search input is length-limited and treated only as UI state; it is never rendered as HTML.
- The application does not use `dangerouslySetInnerHTML` or equivalent HTML injection APIs.
- Vercel response headers enforce HTTPS, MIME sniffing protection, clickjacking protection, referrer restrictions, and browser capability restrictions.
- Dependencies are checked automatically in CI with npm audit.

## Controls that are not applicable yet

The following controls from generic application-security checklists require a backend or authenticated data layer and therefore are intentionally not simulated in this static application:

- Row-level security (RLS)
- Server-side authentication/authorization
- Password hashing
- Login rate limiting
- CSRF/session-cookie hardening
- Prepared SQL queries
- Server-side output encoding
- Upload-size/type enforcement
- Returning only selected database fields
- Server-side bot protection

If a backend, authentication, database, or upload feature is added later, these controls must be implemented at the server/data layer rather than only in the React client.

## Reporting

For security issues, do not publish credentials or exploit details in public issues. Report the issue privately to the project maintainer.
