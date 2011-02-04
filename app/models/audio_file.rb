class AudioFile < ActiveRecord::Base

  has_attached_file :file

  validates_attachment_presence :file

  def self.generate_uid  
    DateTime::now.strftime("%H%M%L") 
    # naiv uid generation, it should involve user id etc to be more secure / uniq. for purpose of demo 
    # time is ok
  end

end
