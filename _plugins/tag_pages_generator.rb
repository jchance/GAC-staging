module Jekyll
  class CustomTagPage < Page
    def initialize(site, base, dir, tag, docs)
      @site = site
      @base = base
      @dir = File.join(dir, Utils.slugify(tag))
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag_page.html')
      self.data['tag'] = tag
      self.data['title'] = tag
      self.data['posts'] = docs.sort_by { |doc| doc.data['date'] || Date.new(1970, 1, 1) }.reverse
      self.data['layout'] = 'tag_page'
    end
  end

  class TagPagesGenerator < Generator
    safe true
    priority :low

    def generate(site)
      tagged_docs = {}

      collections = [site.posts]
      collections << site.collections['projects'].docs if site.collections['projects']
      collections << site.collections['events'].docs if site.collections['events']

      collections.each do |collection|
        next unless collection

        collection.each do |doc|
          tags = Array(doc.data['tags']).map { |tag| tag.to_s.strip }.reject(&:empty?)
          badge = doc.data['badge']
          tags << badge.to_s.strip if badge
          tags.uniq.each do |tag|
            tagged_docs[tag] ||= []
            tagged_docs[tag] << doc
          end
        end
      end

      tagged_docs.sort_by { |tag, _docs| tag.to_s.downcase }.each do |tag, docs|
        site.pages << CustomTagPage.new(site, site.source, 'tag', tag, docs)
      end
    end
  end
end
