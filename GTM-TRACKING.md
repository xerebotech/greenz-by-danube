# GTM / GA4 Tracking & Consent — Greenz by Danube landing page

Client-side Google Tag Manager with **Consent Mode v2** (default *denied*) and a
cookie banner. The site pushes a clean `dataLayer`; you wire the Data Layer
Variables, triggers and GA4 tags inside the GTM container UI.

## 1. Setup

1. Create / pick a GTM container and put its ID in the environment:
   ```
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```
   (`.env.local` locally; add it in your host/Vercel env for production.)
   Restart the dev server after setting it.
2. The app injects, in order: `gtag('consent','default', …denied…)` → `gtm.js`.
   So GTM and all tags load only after the consent default is set.
3. The **cookie banner** writes a `cc_consent` cookie and calls
   `gtag('consent','update', …)`; returning visitors keep their choice (read on
   load by the bootstrap script).

## 2. dataLayer events pushed by the site (code)

| Event | Parameters | Fires when |
|-------|------------|-----------|
| `form_start` | `form_id` | First focus into the enquiry form |
| `generate_lead` | `form_id`, `enquiry_type` (`to_live_in`\|`to_invest`), `method` (`whatsapp`) | Enquiry form submitted — **conversion** |
| `gallery_filter` | `gallery_category` | A gallery category tab is clicked |
| `view_gallery_image` | `gallery_category`, `image_position` | A gallery image opens in the lightbox |
| `faq_open` | `faq_question` | An FAQ item is expanded |
| `cookie_consent` | `consent_action` (`accept_all`\|`reject`) | Banner choice |
| `consent_update` | `consent` (object) | Consent Mode update |
| `geo_resolved` | `geo_country`, `geo_country_code`, `geo_city`, `geo_region` | After analytics consent (IP → geo) |

No PII (name/phone/email) is ever pushed to the dataLayer — only the enquiry
intent. Lead PII goes server-side to the Google Sheet via `/api/lead`.

## 3. Events handled in GTM (no code — use built-in triggers)

- **Contact clicks** — Click triggers on **Click URL** `contains`:
  - `wa.me` → `contact_whatsapp`
  - `tel:` → `contact_call`
  - `mailto:` → `contact_email`
- **CTA clicks** — Click trigger on **Click Classes** `contains` `btn-lux`
  (primary CTAs) — read **Click Text** for the label.
- **Scroll depth** — GTM **Scroll Depth** trigger (25/50/75/90%).
- **Page view** — GA4 config tag on Initialization / All Pages.

## 4. Data Layer Variables to create (GTM → Variables)

`enquiry_type`, `form_id`, `gallery_category`, `image_position`,
`faq_question`, `consent_action`, `geo_country`, `geo_country_code`,
`geo_city`, `geo_region` — each a **Data Layer Variable** with the matching key.

## 5. GA4 tags & triggers

1. **GA4 Configuration** ("Google tag") — your Measurement ID `G-XXXXXXX`,
   trigger **Consent Initialization – All Pages**.
2. **GA4 Event** tags, each on a **Custom Event** trigger matching the event name:
   - `generate_lead` → event `generate_lead`, params `enquiry_type`, `method` → **mark as Key Event (conversion) in GA4.**
   - `form_start`, `gallery_filter`, `view_gallery_image`, `faq_open` → pass their params.
   - `contact_whatsapp` / `contact_call` / `contact_email` (from the click triggers above).
3. Optional: set `geo_country` etc. as **user properties** or event params on the config tag.

## 6. Consent Mode v2

- Defaults (denied) are set in `app/components/GtmScripts.tsx` before GTM loads.
- Keys: `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`
  (+ `functionality_storage`/`security_storage` granted, `wait_for_update: 500`).
- In GTM, leave **Consent Settings** on tags at defaults — the Google tag &
  GA4 automatically respect Consent Mode (cookieless pings while denied, full
  data after consent). Add `Require additional consent` only for non-Google tags.

## 7. Files

- `app/components/GtmScripts.tsx` — consent default + GTM loader + `<noscript>`.
- `app/components/CookieConsent.tsx` — banner; writes `cc_consent`, updates consent.
- `app/components/GeoTracker.tsx` — consent-gated country/city → dataLayer.
- `app/lib/gtm.ts` — `gtmEvent()` / `updateConsent()` helpers + consent constants.
