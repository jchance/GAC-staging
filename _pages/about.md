---
layout: page
title: About Griffin Arts Council
description: Who we are, what we focus on, and the board that leads our work in Griffin and Spalding County.
---

Griffin Arts Council (GAC) builds public arts programs and supports creative talent across Griffin and Spalding County. You gain direct access to workshops, public exhibitions, and collaborative projects that keep local culture active.

## Our Focus

We direct resources to emerging artists and youth across our community. Our key focus areas include:

* **Youth Education:** We run hands-on classes and practical workshops in visual, digital, and traditional arts.
* **Public Art:** We install temporary exhibitions and pop-up galleries in local spaces.
* **Community Collaboration:** We partner with downtown merchants and local spaces to display your work without facility overhead.

## Why We Exist

Griffin needs spaces that welcome emerging creators and modern mediums. According to the [2023 Arts & Economic Prosperity 6 report for Georgia](https://gaarts.org/about/programs/arts-economic-impact/), arts and culture audiences spend an average of $37.68 per person per event beyond admission costs. Supporting local arts keeps economic activity inside our county.

We provide the foundation for you to create, show, and sell your work locally:

* You get direct platforms to display modern, digital, and visual art forms.
* You connect with mentors and peers through structured networking events.
* You help build a visible arts community in your hometown.

Join GAC today as a member, attend our next workshop, or submit your work to an open call.

## Board of Directors

Our board brings leadership, local knowledge, and creative vision to the arts in Griffin and surrounding communities.

<div class="row" style="display: flex; flex-wrap: wrap; justify-content: center;">
  {% for member in site.data.board %}
  <div class="col col-4 col-t-6 col-m-12" style="display: flex;">
    <button class="card content-card board-card" type="button" data-board-target="board-modal-{{ forloop.index }}" aria-haspopup="dialog" style="border-radius: 18px; padding: 1.5rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; width: 100%;">
      <img src="{{ member.image | relative_url }}" alt="{{ member.image_alt }}" class="no-lightense" loading="lazy" style="width: 100%; aspect-ratio: 1 / 1; object-fit: cover; object-position: center; border-radius: 12px; margin-bottom: 1rem;">
      <h3 style="margin-top: 0; margin-bottom: 0.25rem;">{{ member.name }}</h3>
      <p class="content-card__meta" style="margin: 0; font-weight: 600; min-height: 2.8em; line-height: 1.4;">{{ member.role }}</p>
    </button>
  </div>
  {% endfor %}
</div>

{% for member in site.data.board %}
<div class="board-modal" id="board-modal-{{ forloop.index }}" role="dialog" aria-modal="true" aria-labelledby="board-modal-title-{{ forloop.index }}" hidden>
  <div class="board-modal__backdrop" data-board-close></div>
  <div class="board-modal__panel" tabindex="-1">
    <button class="board-modal__close" type="button" aria-label="Close board member profile" data-board-close>
      <i class="fa-duotone fa-solid fa-xmark"></i>
    </button>
    <div class="board-modal__grid">
      <img src="{{ member.image | relative_url }}" alt="{{ member.image_alt }}" class="board-modal__image no-lightense" loading="lazy">
      <div class="board-modal__content">
        <p class="board-modal__eyebrow">Board of Directors</p>
        <h2 id="board-modal-title-{{ forloop.index }}" class="board-modal__name">{{ member.name }}</h2>
        <p class="board-modal__role">{{ member.role }}</p>
        {% if member.interests and member.interests.size > 0 %}
          <div class="board-modal__section">
            <h3>Art interests</h3>
            <ul class="board-modal__interests list-reset">
              {% for interest in member.interests %}
              <li>{{ interest }}</li>
              {% endfor %}
            </ul>
          </div>
        {% endif %}
        <div class="board-modal__section">
          <h3>About</h3>
          <p>{{ member.bio }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
{% endfor %}
