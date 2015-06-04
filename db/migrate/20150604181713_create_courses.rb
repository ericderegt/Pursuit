class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.integer :user_id
      t.string :title
      t.string :image_url
      t.string :description

      t.timestamps null: false
    end
  end
end
