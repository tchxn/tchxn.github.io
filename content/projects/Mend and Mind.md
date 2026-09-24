---
order: 4
title: Mend & Mind
kind: Service design · Conversational UX
image: mend-journey.webp
summary: An accessible clothes-mending service for university students, with a booking chatbot, "Thread", wired into a live Airtable database. Team of three. I built the chatbot end to end — every Voiceflow prototype, the final implementation, the API integration, the conversation design and the accessibility work.
meta:
  - label: My part
    value: Voiceflow build · API · conversation design
  - label: Scope
    value: 3 prototypes · GET/POST/PATCH · accessibility
  - label: Stack
    value: Voiceflow · Airtable API
  - label: Year
    value: "2025"
---

## The situation

Students throw away clothes that need small repairs, mostly because mending is inaccessible rather than because they don't care. The brief was sustainability; the actual barrier was access. Mend & Mind is a repair drop-off and workshop service on campus, and the chatbot is how students book it — including students who can't easily type, see small text or use a mouse.

This was a team of three. The service concept, journey map and website wireframes were shared work, tested through **physical walkthroughs** and designed against an explicit **accessibility statement**. **The chatbot was mine.**

<figure class="shot">
  <img src="/assets/mend-journey.webp" alt="Mend and Mind service journey map" loading="lazy" />
  <figcaption>The service journey map (team work). The chatbot sits at the booking and information touchpoints.</figcaption>
</figure>

## What I built

**Every Voiceflow prototype.** I built all three iterations, and each one changed because of what peer testing found:

- **Prototype 1** had the two core flows — book a drop-off repair, enrol in a workshop — but treated every user the same and offered little room to move. Testing said it needed to know who it was talking to.
- **Prototype 2** added a sign-in step for returning students and account creation for new ones, and a summary at the end. Testing found it gave up too quickly: if no workshop time suited, the conversation just ended.
- **Prototype 3** re-offered times or handed over to a person when nothing fitted, ended every flow with an email confirmation prompt, and let users loop back to the start. The last round of feedback was about branches that trailed off, so I closed every one.

<figure class="shot">
  <img src="/assets/mm-prototypes.webp" alt="Three chatbot flow diagrams side by side, each larger and more branched than the last" loading="lazy" />
  <figcaption>Prototypes 1 to 3. The first is two straight lines; by the third, every branch has a sign-in check, a re-prompt and an ending.</figcaption>
</figure>

**The final implementation.** I designed and built the whole Voiceflow diagram. The finished bot is organised around three intents — drop and collect, workshop enrolment, human assistance — colour-coded on the canvas by purpose so the logic stays readable as it grows.

<figure class="shot">
  <a href="/assets/mm-voiceflow-full.webp" target="_blank" rel="noopener"><img src="/assets/mm-voiceflow.webp" alt="The full Voiceflow canvas: colour-coded blocks for each intent, with API, re-prompt and end blocks" loading="lazy" /></a>
  <figcaption>The whole Voiceflow diagram. Each colour is a job: the two booking intents, onboarding, API calls to Airtable, re-prompts, endings. Open it full size to read every block.</figcaption>
</figure>

<figure class="shot">
  <img src="/assets/mm-vf-entry.webp" alt="Voiceflow close-up: Thread's greeting block with the cat avatar and eight quick-route buttons, global intents on the left, and the workshop schedule and human-assistance blocks" loading="lazy" />
  <figcaption>The front door. Thread's greeting offers eight routes as buttons; location, accessibility, human assistance and order changes are global, so they work from anywhere in the conversation.</figcaption>
</figure>

**The API integration.** The bot talks to Airtable in real time:

- **GET** checks whether a student ID already exists, using a filtered query, so returning students skip onboarding
- **POST** creates a record for a new student
- **PATCH** updates their record with the item description during a drop-off booking

<figure class="shot">
  <img src="/assets/mm-vf-onboarding.webp" alt="Voiceflow close-up: user status check, student ID capture, GET request, a conditional on whether the record exists, new-user detail capture and a POST request" loading="lazy" />
  <figcaption>Sign-in: ask, look the student ID up in Airtable, branch on whether it exists — welcome back by name, or collect details and create the record. (API addresses blurred.)</figcaption>
</figure>

**The conversation design.** Turn-taking, repair and a clear ending on every path. Anything unrecognised gets a re-prompt; a second miss routes to a person, so no one hits a dead end. Entity rules check that a student ID, phone number or email is in the right format and say what's wrong when it isn't. Details can be given all at once or one at a time, and the bot pulls out each piece either way.

<figure class="shot">
  <img src="/assets/mm-vf-dropcollect.webp" alt="Voiceflow close-up: drop and collect options, clothing description saved and PATCHed to Airtable, drop time selection, re-prompt sequences, connect-to-human, and a final summary block with a campus map" loading="lazy" />
  <figcaption>Booking and recovery. Every choice has a "none of these" and a "no match"; each leads to a re-prompt, then to a person. The final block reads the booking back and shows where to go. (API addresses blurred.)</figcaption>
</figure>

**The accessibility work.**

- **Button-first**: about 90% of actions are taps or clicks, for users who find typing slow or tiring
- **Speech-to-text in, text-to-speech out**, for users with limited mobility or low vision
- **Full keyboard navigation** and screen-reader labels on every control
- **Contrast at WCAG levels**, and a layout that holds up when zoomed
- **A person on request at any point**, recognised however it's phrased — "connect me to a real person", "I want to speak to a human"

<figure class="shot pair">
  <img src="/assets/mm-widget.webp" alt="The Mend and Mind chat widget open on the website, with quick buttons for Drop and Collect, Enrol in a Workshop, Workshop Schedule, location and accessibility" loading="lazy" />
  <img src="/assets/mm-human.webp" alt="Chat exchange: the user types 'Connect me to a real person' and the bot hands over to a team member" loading="lazy" />
  <figcaption>The widget opens on quick buttons, so most people never need to type — and "connect me to a real person" works from anywhere.</figcaption>
</figure>

<figure class="shot">
  <img src="/assets/mm-wcag.webp" alt="Contrast checker showing a 14.74 to 1 ratio, passing WCAG AA and AAA for text and interface components" loading="lazy" />
  <figcaption>Text and controls pass WCAG AAA contrast, at 14.74:1.</figcaption>
</figure>

## Why it belongs here

This gets filed as a design project, but the interesting part is the integration layer — a conversational front end reading from and writing into a structured backend, with the failure cases designed rather than ignored. It's service design and systems work in the same object, and the same instinct as [Delivery Control](/projects/delivery-control/): decide what happens when things go wrong before deciding what the happy path looks like.
