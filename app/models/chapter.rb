class Chapter < ActiveRecord::Base
  belongs_to :course
  has_many :completed_chapters, dependent: :destroy
end
