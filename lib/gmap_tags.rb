module GmapTags
  include Radiant::Taggable
  include ActionView::Helpers::TagHelper
  
  class TagError < StandardError; end

  desc %{
    Displays a Google map (see README).
    Usage:
    <pre><code><r:gmap id="map" name="Company name" ll="51.15394,2.96294" street="Street 11" 
      city="1234 City" country="Belgium" balloon_stuff="Things that go into the bottom of the balloon" /></code></pre>
  }
  tag 'gmap' do |tag|
    %w(id name ll street city country).each do |prop|
      # require all attributes
      raise TagError, "Gmap tag must contain a '#{prop}' attribute" unless tag.attr[prop]
      eval "@#{prop} = tag.attr.delete('#{prop}')"
    end
    
    @balloon_stuff = tag.attr.delete('balloon_stuff')
    
    if tag.attr
      html_options = tag.attr.stringify_keys
      tag_options = tag_options(html_options)
    else
      tag_options = nil
    end
    
    if defined?(SiteLanguage)  && SiteLanguage.count > 0
      %{
        <div id="#{@id}"#{tag_options}> </div>
        <script type="text/javascript">
          Event.observe(window, 'load', function (){ gmap('#{@id}','#{@name}',#{@ll},'#{@street}','#{@city}','#{@country}','#{@balloon_stuff}','#{I18n.locale.to_s}'); }, false);
        </script>
      }
    else
      %{
        <div id="#{@id}"#{tag_options}> </div>
        <script type="text/javascript">
          Event.observe(window, 'load', function (){ gmap('#{@id}','#{@name}',#{@ll},'#{@street}','#{@city}','#{@country}','#{@balloon_stuff}'); }, false);
        </script>
      }
    end
  end
  
end