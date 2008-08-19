# Uncomment this if you reference any of your controllers in activate
# require_dependency 'application'

class GmapsExtension < Radiant::Extension
  version "0.1"
  description "Adds a <r:gmap> tag. See README for instructions"
  url "http://gorilla-webdesign.be"
  
  def activate
    Page.send :include, GmapTags
  end
  
  def deactivate
  end
  
end