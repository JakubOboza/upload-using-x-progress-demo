require 'spec_helper'

describe AudioFile do

  describe "#valid" do
    it "should not be valid without file" do
      file = AudioFile.new
      file.should_not be_valid
    end

    it "should always return uid" do
      AudioFile::generate_uid.should_not be_nil
    end

  end

end
