class CreateCompletedChapters < ActiveRecord::Migration
  def change
    create_table :completed_chapters do |t|
      t.integer :user_id
      t.integer :chapter_id

      t.timestamps null: false
    end
    add_index :completed_chapters, :user_id
    add_index :completed_chapters, :chapter_id
    add_index :completed_chapters, [:user_id, :chapter_id], unique: true
  end
end
