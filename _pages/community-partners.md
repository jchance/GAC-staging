---
layout: page
title: Community Partners
description: Professional service partners who donate their time, expertise, and creative support to Griffin Arts Council.
permalink: /community-partners/
---

<div class="supporters-page">
  <section class="sponsor-page__intro" aria-labelledby="community-partners-title">
    <div>
      <h2 id="community-partners-title">Community Partners</h2>
      <p>Community partners contribute professional services, creative expertise, and in-kind support that help Griffin Arts Council serve artists and neighbors with care, consistency, and craft.</p>
    </div>
    <a class="button button--small sponsor-page__cta" href="{{ '/contact' | relative_url }}">Become a community partner</a>
  </section>

  <div class="community-partners" aria-label="Community partner directory">
    {% assign community_partners = site.data.community_partners | sort: "name" %}
    {% for partner in community_partners %}
      <article class="community-partner">
        <a class="community-partner__logo" href="{{ partner.url }}" target="_blank" rel="noopener noreferrer" aria-label="Visit {{ partner.name }}">
          <img src="{{ partner.logo | relative_url }}" alt="{{ partner.name }}">
        </a>
        <div class="community-partner__content">
          <h3>{{ partner.name }}</h3>
          {% if partner.url and partner.url != '' %}
            {% assign partner_domain = partner.url | remove: "https://" | remove: "http://" | remove: "www." | split: "/" | first %}
            <a class="community-partner__url" href="{{ partner.url }}" target="_blank" rel="noopener noreferrer">
              {{ partner_domain }}
              <i class="fa-duotone fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              <span class="screen-reader-text">(opens in a new tab)</span>
            </a>
          {% endif %}
          <p>{{ partner.description }}</p>
        </div>
      </article>
    {% endfor %}
  </div>
</div>
