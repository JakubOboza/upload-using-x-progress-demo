class AddNameToAudioFile < ActiveRecord::Migration
  def self.up    
    add_column(:audio_files, :name, :string)
  end

  def self.down 
    remove_column(:audio_files, :name, :string)
  end
end
