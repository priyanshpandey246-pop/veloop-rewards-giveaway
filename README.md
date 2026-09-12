# VELOOP Rewards Giveaway

A full-stack giveaway and rewards experience developed for VELOOP Rewards.

The project combines a premium and responsive React frontend with a secure Node.js, Express and MongoDB backend. Giveaway configuration, participation, balances, winner records and prize claims are controlled by the backend instead of trusted frontend state.

## Live Demo

Frontend:

https://veloop-rewards-giveaway-ten.vercel.app

Giveaway Page:

https://veloop-rewards-giveaway-ten.vercel.app/giveaways

Backend API:

https://backend-production-ffd8.up.railway.app

API Health Check:

https://backend-production-ffd8.up.railway.app/api/health

## Project Overview

The VELOOP Rewards Giveaway experience allows users to:

- Explore the current giveaway
- View available rewards
- Open dedicated prize pages
- Review entry fees before participation
- Check the required VELOOP currency
- View balance and participation status
- Join a giveaway
- Track giveaway countdown and status
- View winner announcements
- Explore previous winners
- Detect winner-specific account states
- Submit prize claims
- Track claim status

The frontend focuses on presentation and user experience, while the backend remains authoritative for business-critical operations.

## Core Security Principle

Anything visible or editable in the browser is treated as untrusted.

The frontend does not determine authoritative values such as:

- User identity
- Entry fee
- Required currency
- User balance
- Giveaway status
- Participation eligibility
- Winner identity
- Claim eligibility

These values are independently determined or validated by the backend.

## Main Features

### Giveaway Experience

- Premium VELOOP Rewards UI
- Responsive giveaway hero
- Backend-driven giveaway status
- Backend-driven prize configuration
- Live countdown
- Giveaway statistics
- Prize cards
- Dedicated individual giveaway pages
- Entry fee and currency display
- Participation confirmation
- How-to-participate section
- Winner announcement slider
- Winners and Previous Winners tabs
- Giveaway rules
- FAQ
- Trust and transparency section
- Custom giveaway loader
- Loading, empty and error states

## Supported Giveaway States

The application supports the giveaway lifecycle:

```text
UPCOMING
   ↓
ACTIVE
   ↓
ENDED
   ↓
ARCHIVED