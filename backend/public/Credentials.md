# Week 2: Credentials & Requirements

To implement the **Auth System** in Week 2, we need to configure the following credentials. 

### 1. Required from You (Action Items)
Please prepare these and add them to your local `.env` file (never commit them):

- **GitHub OAuth**:
  - `GITHUB_CLIENT_ID`: Create an OAuth App in GitHub Settings > Developer Settings.
  - `GITHUB_CLIENT_SECRET`: Generated after creating the app.
  - *Callback URL*: `http://localhost:8080/auth/callback/github` (for local dev).

- **Stripe (For Phase 1 Marketplace)**:
  - `STRIPE_API_KEY`: Your test mode secret key.
  - `STRIPE_WEBHOOK_SECRET`: Generated from the Stripe CLI or Dashboard for local testing.

### 2. Auto-Generated or Internal
I will implement these in the code/config:

- **JWT / PASETO**:
  - `JWT_SECRET`: A secure random string for signing tokens.
  - `PASETO_FOOTER`: Optional footer for PASETO tokens.
- **Session Configuration**:
  - `SESSION_SECRET`: For Redis-backed session management.

### 3. Database
- Ensure you have a secure `DB_PASSWORD` set in your local environment.

---

**Note:** Once you have the GitHub and Stripe keys, we can implement the full login flow and payment webhooks.
