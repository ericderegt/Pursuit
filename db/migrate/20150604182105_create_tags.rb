class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :category_id
      t.integer :course_id

      t.timestamps null: false
    end
  end
end
