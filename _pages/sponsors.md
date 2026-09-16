---
layout: page
title: Sponsors
description: The businesses whose generosity helps creativity thrive throughout Griffin.
permalink: /sponsors/
---

<div class="sponsor-page">
  <section class="sponsor-page__intro" aria-labelledby="corporate-sponsors-title">
    <div>
      <h2 id="corporate-sponsors-title">Corporate Sponsors</h2>
      <p>Our corporate sponsors make arts education, public programs, and shared creative experiences possible. We recognize their support at three levels, reflecting the scale of their investment in Griffin's creative community.</p>
    </div>
    <a class="button button--small sponsor-page__cta" href="{{ '/become-a-sponsor' | relative_url }}">Become a sponsor</a>
  </section>

  {% assign sponsorship_tiers = "visionary,champion,community" | split: "," %}
  {% for tier in sponsorship_tiers %}
    {% assign tier_sponsors = site.data.sponsors | where: "tier", tier %}
    {% if tier_sponsors.size > 0 %}
      <section class="supporter-tier supporter-tier--{{ tier }}" aria-labelledby="{{ tier }}-title">
        <div class="supporter-tier__heading">
          <h3 id="{{ tier }}-title">{{ tier | capitalize }} Sponsors</h3>
          {% case tier %}
            {% when "visionary" %}
              <p>Leading partners whose transformational support expands what is possible.</p>
            {% when "champion" %}
              <p>Committed advocates who sustain accessible arts programs and events.</p>
            {% when "community" %}
              <p>Local partners helping creative experiences reach more of our neighbors.</p>
          {% endcase %}
        </div>

        <ul class="supporter-tier__logos">
          {% for sponsor in tier_sponsors %}
            <li class="supporter-tier__item">
              {% if sponsor.opportunity %}
                <a class="supporter-tier__logo supporter-tier__opportunity" href="{{ '/become-a-sponsor' | relative_url }}">
                  <span class="supporter-tier__opportunity-icon" aria-hidden="true">
                    <i class="fa-duotone fa-solid fa-sparkles"></i>
                  </span>
                  <span class="supporter-tier__opportunity-label">{{ sponsor.name }}</span>
                  <strong>{{ sponsor.message }}</strong>
                  <span class="supporter-tier__opportunity-description">{{ sponsor.description }}</span>
                  <span class="supporter-tier__opportunity-action">
                    Explore sponsorship <i class="fa-duotone fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </a>
              {% elsif sponsor.url and sponsor.url != '' %}
                <a class="supporter-tier__logo" href="{{ sponsor.url }}" target="_blank" rel="noopener noreferrer">
                  <img src="{{ sponsor.logo | relative_url }}" alt="{{ sponsor.name }}">
                </a>
              {% else %}
                <div class="supporter-tier__logo">
                  <img src="{{ sponsor.logo | relative_url }}" alt="{{ sponsor.name }}">
                </div>
              {% endif %}
              {% unless sponsor.opportunity %}
                <div class="supporter-tier__details">
                  <h4>{{ sponsor.name }}</h4>
                  {% if sponsor.url and sponsor.url != '' %}
                    {% assign sponsor_domain = sponsor.url | remove: "https://" | remove: "http://" | remove: "www." | split: "/" | first %}
                    <a href="{{ sponsor.url }}" target="_blank" rel="noopener noreferrer">
                      {{ sponsor_domain }}
                      <i class="fa-duotone fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                      <span class="screen-reader-text">(opens in a new tab)</span>
                    </a>
                  {% endif %}
                </div>
              {% endunless %}
            </li>
          {% endfor %}
        </ul>
      </section>
    {% endif %}
  {% endfor %}

</div>
