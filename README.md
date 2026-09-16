# Griffin Arts Council

Source for [griffinarts.org](https://griffinarts.org), the Jekyll site for Griffin Arts Council, Inc., serving Griffin, Georgia.

## Local development

```
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

## Deployment

Pushes to `main` trigger the `Deploy Jekyll site to Pages` GitHub Actions workflow (`.github/workflows/pages.yml`), which builds the site and publishes it to GitHub Pages.
