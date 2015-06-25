class User < ActiveRecord::Base
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true

  has_many :courses
  has_many :chapters, through: :courses
  has_many :playlists, dependent: :destroy
  has_many :completed_chapters, dependent: :destroy

end
