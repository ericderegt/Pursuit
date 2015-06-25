class Course < ActiveRecord::Base
  has_many :chapters, dependent: :destroy
  has_many :completed_chapters, through: :chapters
  belongs_to :user

  has_many :tags, dependent: :destroy
  has_many :playlists, dependent: :destroy
end
