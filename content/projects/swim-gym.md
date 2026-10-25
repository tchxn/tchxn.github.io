---
order: 3
title: Swim + Gym
kind: Personal tool · Data visualisation
image: sg-thumb.webp
summary: A training dashboard I use every day while preparing for international meets. It reads the notes I already keep, plus my gym app exports, and turns them into one page that answers "am I on plan?" and a race replay that shows where in a 50 m the time goes. I designed the data model and screens and directed Claude Code to build it. In daily use by one athlete, me.
meta:
  - label: Role
    value: Athlete · product owner · designer
  - label: Scope
    value: Data contract, 5 views, logging
  - label: Status
    value: In daily use (personal)
    highlight: true
  - label: Year
    value: "2026"
---

## The situation

I swim the 50 breaststroke for Papua New Guinea. My training lives in three places: swim sessions and timed efforts in my notes, race results in a table, and gym sessions in a lifting app. Each one is fine on its own. None of them can tell me whether this week is on plan, or whether my 50 is getting faster in the front half or the back half.

Sports science platforms answer those questions for teams with staff. I wanted the same answers for one athlete with no staff and no budget.

## What I decided

**Keep writing where I already write.** The dashboard reads my notes and exports; it does not ask me to move my training log into a new app. If logging gets harder, I stop logging, and then the charts are worthless.

**Plan versus done, not totals.** A week is measured against what was planned (swims and gym sessions), so a light week reads as a light week instead of disappearing into an average. Consistency is the share of the plan done over the last four weeks.

**Every number shows its change and its target.** Each tile carries the latest result, the change since last time, a trend line and the gap to the target date, in the style of athlete-monitoring tools.

<figure class="shot">
  <img src="/assets/sg-week.webp" alt="Three cards: next race in 37 days with PB 29.14 and target 28.99, this week at 3 of 4 swims and 1 of 2 gym sessions, consistency 92 percent, and a stacked weekly chart against a dashed plan line" loading="lazy" />
  <figcaption>The first screen answers one question: am I on plan this week? Demo data.</figcaption>
</figure>

## How it works

A small local web app reads the notes and exports every time the page refreshes, so there is no second copy of the data to fall out of date. I wrote the data contract (every field the page relies on, and what happens when a value is missing) before any screen was built, and directed Claude Code to build against it.

- **Logging writes one row and nothing else.** A swim time, pool session or benchmark entered in the app is added as a single new row in the right note. The note is backed up first, and a day that is already logged is never overwritten.
- **Missing data is shown as missing.** An event with no short-course time says so and points to where it should be entered, instead of drawing an empty chart.
- **Gym sessions come in on their own.** See below.

<figure class="shot">
  <img src="/assets/sg-numbers.webp" alt="Grid of metric tiles: race times by event and course, training times for 25, 35 and 50 m breaststroke, and gym benchmarks for weighted pull-up, pull-up max, box jump and bodyweight, each with a change badge and trend line" loading="lazy" />
  <figcaption>Race, training and gym numbers on one grid, each against its target. Demo data.</figcaption>
</figure>

<figure class="shot">
  <img src="/assets/sg-activity.webp" alt="Twelve-month activity grid, one square per day, darker for days with both a swim and a gym session, with race days outlined and gaps at Christmas and after a meet" loading="lazy" />
  <figcaption>A year on one grid. The gaps are planned: Christmas, and the rest week after a meet. Demo data.</figcaption>
</figure>

## The gym side: openGym

I log lifting in openGym, an open-source workout app that I host myself. It runs on my own machine and my phone reaches it over a private network (Tailscale), so the logs never sit on someone else's server. Every five minutes the dashboard pulls finished workouts into my notes. The sync only reads from openGym and never writes back, and a workout imported from an older app is not counted twice.

<figure class="shot">
  <img src="/assets/sg-opengym.webp" alt="openGym stats screen: 21 workouts, an 11-week streak, a 12-month activity grid, and a front and back body map shaded by sets worked per muscle over 90 days" loading="lazy" />
  <figcaption>openGym on its own: streak, activity and which muscles the last 90 days actually hit. Demo profile with a generic starter plan.</figcaption>
</figure>

## The race replay

The view I use most. Pick an event and a swim, and it draws the lane split by segment speed, then replays the swim against my best time, a target "ghost" or any other swim. Under it: split, speed, stroke count and distance per stroke for each length.

That is what turned the dashboard from a log into a coaching tool. A 50 that is 0.3 s slower can be slower off the wall or slower home, and those need different work.

<figure class="shot">
  <img src="/assets/sg-visualize.webp" alt="50 m breaststroke swim drawn as two lane bars coloured by speed, compared with a 28.99 target ghost, with final time, gap, fade and stroke count tiles, a segment table and a speed profile chart" loading="lazy" />
  <figcaption>A training 50 against the target ghost. The gap is in both halves, but the back half is where most of it is. Demo data.</figcaption>
</figure>

## Where it stands

In daily use by me, through a meet block. It runs on my laptop only. Next is getting the week view onto my phone, so I can check it on pool deck. The screenshots here use demo training volume; the race times are my real results.
