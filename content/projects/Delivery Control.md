---
order: 1
title: Delivery Control
kind: Systems design
image: dc-tile.webp
summary: A family distribution business in Papua New Guinea loses chain of custody the moment stock and cash leave the warehouse. I took the problem apart and proposed a system built around one idea — the audit trail is the product.
meta:
  - label: Role
    value: Problem analysis · systems design
  - label: Scope
    value: Risk model, 5 roles, permissions, spec
  - label: Status
    value: Concept — not built
    highlight: true
  - label: Year
    value: "2026"
gallery:
  - src: dc-tile.webp
    caption: Chain of custody — six stages, with the two blind spots marked
---

## The situation

Orders are written by hand. Drivers carry high-value stock between a warehouse, three retail stores and customers across Port Moresby, and often collect cash on delivery. Once a driver leaves, the business has no reliable record of what happened.

## What I found

The obvious reading is "the process is manual, so digitise it." That's wrong, or at least it's the smaller half.

The real problem is that **nothing links an order to the person, vehicle and outcome behind it.** Who packed it, which driver took it, which vehicle it went in, whether it arrived, whether the money came back — none of that is connected. So when stock or cash goes missing there is no trail to follow, and no way to tell theft from a mistake.

It isn't a paperwork problem. It's an accountability problem.

## What I proposed

An order-to-reconciliation system where **the audit log is the deliverable** and every other feature has to justify itself against it.

- Six tracked stages from created through to reconciled
- Five roles — office, warehouse, dispatcher, driver, manager — with permissions enforced in the back end rather than hidden in the interface. Hiding a button is not a control.
- Proof of delivery captured at the point of handover, not reconstructed afterwards
- Vehicle tracking designed in from the start, so a real GPS feed can be connected later without a rewrite

## Where it stopped

This is a concept and a written specification. It has not been built or deployed. The value in it is the problem analysis and the system design, not a shipped product — and I'd rather say that plainly than imply otherwise.
