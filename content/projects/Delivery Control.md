---
order: 1
title: Delivery Control
kind: Systems design
image: dc-tile.webp
summary: A family distribution business in Papua New Guinea loses chain of custody the moment stock and cash leave the warehouse. I took the problem apart around one idea — the audit trail is the product. I wrote the specification, data model and permission design, and directed an AI coding agent to build a working prototype. Built and demoed to the owners; not rolled out.
meta:
  - label: Role
    value: Problem analysis · systems design
  - label: Scope
    value: Spec, data model, 5 roles, prototype
  - label: Status
    value: Built and demoed
    highlight: true
  - label: Year
    value: "2026"
---

## The situation

Orders are written by hand. The business runs two sites, each a retail front with manufacturing and a warehouse behind it. Drivers carry high-value stock from those sites out to customers, and often collect cash on delivery. Once a driver leaves, the business has no reliable record of what happened.

## What I found

The obvious reading is "the process is manual, so digitise it." That's wrong, or at least it's the smaller half.

The real problem is that **nothing links an order to the person, vehicle and outcome behind it.** Who packed it, which driver took it, which vehicle it went in, whether it arrived, whether the money came back — none of that is connected. So when stock or cash goes missing there is no trail to follow, and no way to tell theft from a mistake.

It isn't a paperwork problem. It's an accountability problem.

## What I designed

An order-to-reconciliation system where **the audit log is the deliverable** and every other feature has to justify itself against it.

- Six tracked stages: created, packed, assigned, dispatched, delivered (or failed), reconciled
- Five roles — office, warehouse, dispatcher, driver, manager — with permissions enforced in the back end rather than hidden in the interface. Hiding a button is not a control.
- Proof of delivery captured at the point of handover, not reconstructed afterwards
- Cash checked three ways: what was expected, what the driver collected, what came back to the office. If they don't balance, the order becomes an **Exception** that needs a written reason and a manager's sign-off before it can close.
- Vehicle tracking designed in from the start, so a real GPS feed can be connected later without a rewrite

<figure class="shot">
  <img src="/assets/dc-order-detail.webp" alt="Order detail page: customer, items, packing, dispatch, delivery and payment panels beside a timeline of audit events" loading="lazy" />
  <figcaption>An order's timeline is read straight from the audit log, not from the order's current fields. This one was delivered K800 short, raised as an Exception and signed off by a manager. Demo data.</figcaption>
</figure>

## How it works

I wrote the specification, data model and permission design, and directed an AI coding agent to build a working prototype against it: a web app over a hosted relational database, with real accounts and roles, with every schema change tracked, so the database can be rebuilt from scratch.

The rules live in the database, not the interface:

- **An order can only move to the next status through the rules of the workflow, checked on the server, so a client cannot skip a step.** A direct edit to an order's status is rejected. Every move checks who is making it and whether it is allowed — a driver can't mark an order reconciled, nothing jumps from created to dispatched — and the change and its audit record are saved together, so one never happens without the other.
- **The audit log can only be added to.** Nothing in it can be edited or deleted afterwards, including by an administrator. That was the point: a record an admin can quietly change is not evidence. Timestamps come from the server, never the device.
- **Drivers see only their own jobs.** Permissions are enforced in the database, not in the interface, because hiding a button is not an access control. A driver's account cannot read another driver's jobs even if the request is made directly.
- **Discrepancies need words.** A failed or partial delivery needs a reason. Cash that differs from what was expected needs a reason. An Exception needs a manager's note before it can close.
- **Nobody signs themselves up.** Managers create staff accounts; any other signup starts inactive with no access to data.

<figure class="shot">
  <img src="/assets/dc-dashboard.webp" alt="Dashboard with summary cards, recent orders and active dispatches" loading="lazy" />
  <figcaption>Dashboard — what's out, what's owed, and what doesn't balance.</figcaption>
</figure>

<figure class="shot">
  <img src="/assets/dc-fleet.webp" alt="Fleet and dispatch page: orders waiting for a driver, orders on the road, vehicles and drivers" loading="lazy" />
  <figcaption>Fleet and dispatch. "Mark returned" stands in for the vehicle-tracking geofence, so a live feed can replace it later.</figcaption>
</figure>

<figure class="shot">
  <img src="/assets/dc-reconciliation.webp" alt="Reconciliation queue listing two Exception orders with expected, collected and returned cash" loading="lazy" />
  <figcaption>Reconciliation. Orders where the cash didn't balance wait here until a manager signs them off.</figcaption>
</figure>

<figure class="shot">
  <img src="/assets/dc-audit.webp" alt="Audit history table of events with time, order, actor and status transition" loading="lazy" />
  <figcaption>Audit history. Every action, who did it and when. Rows can't be edited or deleted.</figcaption>
</figure>

<figure class="shot phone">
  <img src="/assets/dc-driver-mobile.webp" alt="Driver view on a phone: assigned deliveries with cash to collect and buttons to record outcome and payment" loading="lazy" />
  <figcaption>The driver's view, built for a phone in the field: their jobs only, the cash to collect, and the outcome recorded at handover.</figcaption>
</figure>

## Where it stopped

Built and demoed to the owners; not rolled out. They backed it and want to trial it. Rolling it out means training staff on it, and there hasn't been time to do that yet — so the open problem now is adoption, not the build.
