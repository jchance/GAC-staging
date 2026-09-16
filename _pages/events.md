---
layout: page
title: Events
description: Community gatherings, artist showcases, and creative experiences that bring people together across Griffin.
---

<div class="event-list">
{% assign today = 'now' | date: '%Y-%m-%d' %}
{% assign upcoming_events = site.events | where_exp: 'event', 'event.date >= site.time' | sort: 'date' %}
{% assign past_events = site.events | where_exp: 'event', 'event.date < site.time' | sort: 'date' | reverse %}

{% if upcoming_events.size > 0 %}
  <h2 style="margin: 1.5rem 0 1rem; font-size: 1.6rem;">Upcoming</h2>
  {% for event in upcoming_events %}
    <article class="event-card" style="border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; overflow: hidden;">
      <div style="display: flex; gap: 1rem; align-items: flex-start;">
        <div class="event-card__date" style="min-width: 88px; text-align: center; border-radius: 10px; padding: 0.75rem 0.5rem;">
          <div class="event-card__month" style="font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase;">{{ event.date | date: "%b" }}</div>
          <div style="font-size: 2rem; font-weight: 700; line-height: 1; margin-top: 0.5rem;">{{ event.date | date: "%d" }}</div>
        </div>
        <div style="flex: 1;">
          {% if event.badges %}
            <div style="margin-bottom: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
              {% for badge_id in event.badges %}
                {% assign badge = site.data.badges[badge_id] %}
                {% if badge %}
                  <span style="display: inline-block; padding: 0.3rem 0.6rem; border-radius: 999px; background: {{ badge.color }}; color: #fff; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none;">{{ badge.title }}</span>
                {% endif %}
              {% endfor %}
            </div>
          {% endif %}
          <h3 style="margin: 0 0 0.5rem; font-size: 1.5rem;">
            <a href="{{ event.url | relative_url }}" style="color: inherit; text-decoration: none;">{{ event.title }}</a>
          </h3>
          <p style="margin: 0 0 0.5rem;"><strong>Date:</strong> {{ event.date | date: "%A, %B %-d, %Y" }}<br>
          <strong>Time:</strong> {{ event.time }}<br>
          <strong>Location:</strong> {{ event.location }}</p>
          <p>{{ event.content | markdownify | strip_html | truncate: 180 }}</p>
          <div style="text-align: right; margin-top: 1rem;">
            <a class="section__link" href="{{ event.url | relative_url }}">Learn more <i class="fa-duotone fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </article>
  {% endfor %}
{% endif %}

{% assign past_limit = 6 %}
{% assign past_total = past_events.size %}

{% if past_events.size > 0 %}
  <h2 style="margin: 2.5rem 0 1rem; font-size: 1.6rem;">Past</h2>
  {% for event in past_events limit: past_limit %}
    <article class="event-card event-card--past" style="border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; overflow: hidden;">
      <div style="display: flex; gap: 1rem; align-items: flex-start;">
        <div class="event-card__date" style="min-width: 88px; text-align: center; border-radius: 10px; padding: 0.75rem 0.5rem;">
          <div style="font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase;">{{ event.date | date: "%b" }}</div>
          <div style="font-size: 2rem; font-weight: 700; line-height: 1; margin-top: 0.5rem;">{{ event.date | date: "%d" }}</div>
        </div>
        <div style="flex: 1;">
          {% if event.badges %}
            <div style="margin-bottom: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
              {% for badge_id in event.badges %}
                {% assign badge = site.data.badges[badge_id] %}
                {% if badge %}
                  <span style="display: inline-block; padding: 0.3rem 0.6rem; border-radius: 999px; background: {{ badge.color }}; color: #fff; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; opacity: 0.8;">{{ badge.title }}</span>
                {% endif %}
              {% endfor %}
            </div>
          {% endif %}
          <h3 style="margin: 0 0 0.5rem; font-size: 1.5rem;">
            <a href="{{ event.url | relative_url }}" style="color: inherit; text-decoration: none;">{{ event.title }}</a>
          </h3>
          <p class="event-card__meta" style="margin: 0 0 0.5rem;"><strong>Date:</strong> {{ event.date | date: "%A, %B %-d, %Y" }}<br>
          <strong>Time:</strong> {{ event.time }}<br>
          <strong>Location:</strong> {{ event.location }}</p>
          <p class="event-card__meta">{{ event.content | markdownify | strip_html | truncate: 180 }}</p>
          <div style="text-align: right; margin-top: 1rem;">
            <a class="section__link" href="{{ event.url | relative_url }}">Learn more <i class="fa-duotone fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </article>
  {% endfor %}
  {% if past_total > past_limit %}
    <p class="event-list__summary" style="text-align: center; font-size: 0.9rem; margin-top: 0.5rem;">Showing {{ past_limit }} of {{ past_total }} past events.</p>
  {% endif %}
{% endif %}
</div>
