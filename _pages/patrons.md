---
layout: page
title: Patrons
description: Sustaining members whose individual generosity supports the work of Griffin Arts Council.
permalink: /patrons/
---

<div class="supporters-page patrons-page">
  <section class="sponsor-page__intro" aria-labelledby="patrons-page-title">
    <div>
      <h2 id="patrons-page-title">Our Patrons</h2>
      <p>Patrons are sustaining members whose individual generosity helps Griffin Arts Council create access to arts education, public programming, and creative opportunity throughout our community.</p>
    </div>
    <a class="button button--small sponsor-page__cta" href="https://givebutter.com/gac-membership-8j3hum" target="_blank" rel="noopener">Become a patron</a>
  </section>

  <ul class="patron-directory">
    {% for patron in site.data.patrons %}
      <li class="patron-directory__item">
        <h3>{{ patron.name }}</h3>
        {% if patron.dedication %}
          <p>{{ patron.dedication }}</p>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
</div>
