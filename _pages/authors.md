---
layout: default
title: Authors
permalink: /authors/
---

<div class="container">
  <div class="page-head">
    <h1 class="page-title">Authors</h1>
  </div>
</div>

<div class="container">
  <div class="row">
    {% for author in site.data.authors %}
      {% assign author_key = author[0] %}
      {% assign author_record = author[1] %}
      {% assign author_data = author_record %}
      {% if author_record.board_id %}
        {% assign author_data = site.data.board | where: 'id', author_record.board_id | first %}
      {% endif %}
      <div class="col col-4 col-d-6 col-t-12" style="margin-bottom:2rem;">
        <div class="article__inner content-card" style="padding:1.25rem; border-radius:12px;">
          <img src="{{ author_data.avatar | default: author_data.image | relative_url }}" alt="{{ author_data.name }}" style="width:90px; height:90px; object-fit:cover; border-radius:50%; margin-bottom:1rem;">
          <h3><a href="{{ '/authors/' | relative_url }}{{ author_key }}">{{ author_data.name }}</a></h3>
          <p>{{ author_data.title | default: author_data.role }}</p>
        </div>
      </div>
    {% endfor %}
  </div>
</div>
