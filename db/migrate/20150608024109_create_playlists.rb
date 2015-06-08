class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.integer :user_id
      t.integer :course_id

      t.timestamps null: false
    end
    add_index :playlists, :user_id
    add_index :playlists, :course_id
    add_index :playlists, [:user_id, :course_id], unique: true
  end
end
