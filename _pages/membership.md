---
layout: page
title: Membership
permalink: /membership/
---

<div class="page-content">
  <p>Membership keeps our community connected to the work of the Griffin Arts Council through access, advocacy, and local creative participation.</p>

  <div class="row">
    <div class="col col-4 col-md-12">
      <div class="card content-card" style="border-radius: 18px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h3 style="margin-top: 0;">Individual Membership</h3>
        <p>Support artist opportunities, community events, and youth programming with a flexible annual membership.</p>
      </div>
    </div>
    <div class="col col-4 col-md-12">
      <div class="card content-card" style="border-radius: 18px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h3 style="margin-top: 0;">Patron Membership</h3>
        <p>Provide sustaining individual support and receive recognition among the patrons helping our programs grow.</p>
      </div>
    </div>
    <div class="col col-4 col-md-12">
      <div class="card content-card" style="border-radius: 18px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h3 style="margin-top: 0;">Business &amp; Partner Membership</h3>
        <p>Collaborate with the council to bring arts education, cultural programming, and neighborhood connection to broader audiences.</p>
      </div>
    </div>
  </div>

  <p>Membership benefits include event updates, community access, volunteer opportunities, and invitations to local arts initiatives.</p>

  <section class="patrons" aria-labelledby="patrons-title">
    <div class="patrons__heading">
      <h2 id="patrons-title">Our Patrons</h2>
      <p>Patrons are sustaining members whose individual generosity provides a strong foundation for the Council's work.</p>
    </div>

    {% if site.data.patrons and site.data.patrons.size > 0 %}
      <ul class="patrons__list">
        {% for patron in site.data.patrons %}
          <li>{{ patron.name }}</li>
        {% endfor %}
      </ul>
    {% else %}
      <div class="patrons__empty">
        <p>Patron recognition will be added as sustaining memberships are confirmed.</p>
        <a href="{{ '/contact' | relative_url }}">Ask about patron membership <i class="fa-duotone fa-solid fa-arrow-right" aria-hidden="true"></i></a>
      </div>
    {% endif %}
  </section>
</div>
