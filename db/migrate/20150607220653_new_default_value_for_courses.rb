class NewDefaultValueForCourses < ActiveRecord::Migration
  def change
    change_column_default :courses, :image_url, 'http://semantic-ui.com/images/wireframe/image.png'
  end
end
