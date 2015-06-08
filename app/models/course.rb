class Course < ActiveRecord::Base
  has_many :chapters
  belongs_to :user

  has_many :tags
  has_many :playlists, dependent: :destroy
end
