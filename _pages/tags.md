---
layout: default
title: Tags
permalink: /tags/
---

<div class="container">
  <div class="page-head">
    <h1 class="page-title">Tags</h1>
  </div>
</div>

<div class="container">
  <div class="row">
    {% assign all_tags = '' | split: ',' %}

    {% assign visible_posts = site.posts | where_exp: 'post', 'post.date <= site.time' %}
    {% for post in visible_posts %}
      {% for tag in post.tags %}
        {% unless all_tags contains tag %}
          {% assign all_tags = all_tags | push: tag %}
        {% endunless %}
      {% endfor %}
    {% endfor %}

    {% for event in site.events %}
      {% for tag in event.tags %}
        {% unless all_tags contains tag %}
          {% assign all_tags = all_tags | push: tag %}
        {% endunless %}
      {% endfor %}
    {% endfor %}

    {% assign all_tags = all_tags | sort %}

    {% for tag in all_tags %}
      <div class="col col-4 col-d-6 col-t-12" style="margin-bottom: 1rem;">
        <div class="article__inner content-card" style="padding: 1rem 1.25rem; border-radius: 12px;">
          <a href="{{ '/tag/' | relative_url }}{{ tag | slugify }}" class="article__tag" style="display: inline-block; margin: 0;">{{ tag }}</a>
        </div>
      </div>
    {% endfor %}
  </div>
</div>
