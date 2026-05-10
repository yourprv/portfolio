# Security Policy

## Supported Versions

The following versions of this portfolio project are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Measures in Place

This project implements several security best practices:

- **Content Security Policy (CSP)** — Configured via Next.js headers to restrict script sources, inline styles, and external connections.
- **XSS Protection** — `X-XSS-Protection` header enabled and user input is escaped before rendering in the AI chat interface.
- **Clickjacking Protection** — `X-Frame-Options: DENY` prevents the site from being embedded in iframes.
- **Rate Limiting** — The AI chat API endpoint (`/api/chat`) includes IP-based rate limiting (10 requests per minute) to prevent abuse.
- **Input Validation** — Contact form and AI chat inputs are validated for length and format before processing.
- **Secure Headers** — `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` headers are all configured.

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **Do not** open a public GitHub issue for security-related bugs.
2. Send an email to **voxprv@gmail.com** with details of the vulnerability.
3. Include steps to reproduce, potential impact, and any suggested fixes if possible.
4. You can expect an initial response within **72 hours** acknowledging your report.
5. If the vulnerability is accepted, a patch will be prioritized and you will be credited (unless you wish to remain anonymous).
6. If declined, you will receive a clear explanation of why the reported issue does not constitute a security vulnerability.

Thank you for helping keep this project secure!
